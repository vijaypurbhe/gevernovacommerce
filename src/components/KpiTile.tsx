import { useState } from "react";
import { TrendingUp, TrendingDown, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import type { KpiDetail } from "@/data/mockData";

const KpiTile = ({ label, value, change, trend, period, chartData, breakdown, insight, index }: KpiDetail & { index: number }) => {
  const [open, setOpen] = useState(false);
  const isInverse = label === "Cart Abandonment";
  const displayPositive = isInverse ? change < 0 : change > 0;

  const barColors = ["hsl(var(--primary))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="glass-card-hover p-5 flex flex-col gap-2 animate-slide-up cursor-pointer group"
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
        <div className="h-0 group-hover:h-1 transition-all duration-200 bg-primary/30 rounded-full mt-1" />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-base">
              <span>{label}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-2xl font-bold text-foreground">{value}</span>
                <span className={`text-xs font-mono font-medium px-1.5 py-0.5 rounded ${displayPositive ? "text-success bg-success/10" : "text-destructive bg-destructive/10"}`}>
                  {change > 0 ? "+" : ""}{change}%
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* Trend Chart */}
          <div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium mb-2">6-Month Trend</div>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 11 }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Area type="monotone" dataKey="previous" stroke="hsl(var(--muted-foreground))" strokeWidth={1} strokeDasharray="4 4" fill="none" name="Previous" />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fill={`url(#grad-${label})`} name="Current" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Breakdown */}
          <div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium mb-2">Breakdown</div>
            <div className="space-y-2">
              {breakdown.map((item, i) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-24 text-xs text-foreground truncate">{item.label}</div>
                  <div className="flex-1 h-5 bg-secondary/50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${item.pct}%`, background: barColors[i % barColors.length], animationDelay: `${i * 100}ms` }}
                    />
                  </div>
                  <div className="w-16 text-right text-xs font-mono font-medium text-foreground">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insight */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
            <div className="text-[10px] text-primary font-medium mb-1">⚡ Einstein Insight</div>
            <p className="text-xs text-foreground leading-relaxed">{insight}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KpiTile;
