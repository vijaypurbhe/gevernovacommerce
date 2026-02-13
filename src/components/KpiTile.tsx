import { useState, useRef, useEffect } from "react";
import { TrendingUp, TrendingDown, X } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { KpiDetail } from "@/data/mockData";

const KpiTile = ({ label, value, change, trend, period, chartData, breakdown, insight, index }: KpiDetail & { index: number }) => {
  const [open, setOpen] = useState(false);
  const isInverse = label === "Cart Abandonment";
  const displayPositive = isInverse ? change < 0 : change > 0;
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const barColors = ["hsl(var(--primary))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

  useEffect(() => {
    if (open && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open]);

  return (
    <div className="relative">
      <div
        onClick={() => setOpen(!open)}
        className={`glass-card-hover p-5 flex flex-col gap-2 animate-slide-up cursor-pointer transition-all duration-300 ${open ? "ring-1 ring-primary/40 shadow-lg shadow-primary/10" : ""}`}
        style={{ animationDelay: `${index * 60}ms` }}
      >
        <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
          {label}
        </span>
        <span className="font-mono text-2xl font-bold text-foreground animate-count-up">
          {value}
        </span>
        <div className="flex items-center gap-1.5 mt-auto">
          {displayPositive ? (
            <TrendingUp className="w-3.5 h-3.5 text-success" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-destructive" />
          )}
          <span className={`text-xs font-mono font-medium ${displayPositive ? "text-success" : "text-destructive"}`}>
            {change > 0 ? "+" : ""}{change}%
          </span>
          <span className="text-xs text-muted-foreground">{period}</span>
        </div>
      </div>

      {/* Expandable detail card */}
      <div
        className="overflow-hidden transition-all duration-400 ease-out"
        style={{ maxHeight: height, opacity: open ? 1 : 0 }}
      >
        <div ref={contentRef} className="glass-card mt-2 p-4 space-y-4 border border-primary/20">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-foreground">{label} Detail</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${displayPositive ? "text-success bg-success/10" : "text-destructive bg-destructive/10"}`}>
                {change > 0 ? "+" : ""}{change}%
              </span>
            </div>
            <button onClick={(e) => { e.stopPropagation(); setOpen(false); }} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Trend Chart */}
          <div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium mb-1.5">6-Month Trend</div>
            <div className="h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`grad-${label.replace(/\s/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 10 }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Area type="monotone" dataKey="previous" stroke="hsl(var(--muted-foreground))" strokeWidth={1} strokeDasharray="4 4" fill="none" name="Previous" />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fill={`url(#grad-${label.replace(/\s/g, "")})`} name="Current" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Breakdown */}
          <div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium mb-1.5">Breakdown</div>
            <div className="space-y-1.5">
              {breakdown.map((item, i) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className="w-20 text-[10px] text-foreground truncate">{item.label}</div>
                  <div className="flex-1 h-4 bg-secondary/50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: open ? `${item.pct}%` : "0%", background: barColors[i % barColors.length], transitionDelay: `${i * 80}ms` }}
                    />
                  </div>
                  <div className="w-12 text-right text-[10px] font-mono font-medium text-foreground">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insight */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-2.5">
            <div className="text-[9px] text-primary font-medium mb-0.5">⚡ Einstein Insight</div>
            <p className="text-[10px] text-foreground leading-relaxed">{insight}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiTile;
