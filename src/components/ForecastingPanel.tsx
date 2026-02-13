import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const forecastData = [
  { month: "Jul", actual: 108, forecast: null, upper: null, lower: null },
  { month: "Aug", actual: 112, forecast: null, upper: null, lower: null },
  { month: "Sep", actual: 118, forecast: null, upper: null, lower: null },
  { month: "Oct", actual: 126, forecast: 126, upper: 126, lower: 126 },
  { month: "Nov", actual: 134, forecast: 134, upper: 134, lower: 134 },
  { month: "Dec", actual: null, forecast: 142, upper: 152, lower: 132 },
  { month: "Jan", actual: null, forecast: 148, upper: 162, lower: 134 },
  { month: "Feb", actual: null, forecast: 156, upper: 174, lower: 138 },
];

const segmentData = [
  { segment: "Replacement Parts", customers: "2,840", revenue: "$62M", growth: "+14%", churn: "6%", ltv: "$48K" },
  { segment: "Service Kits & Bundles", customers: "1,420", revenue: "$34M", growth: "+22%", churn: "4%", ltv: "$62K" },
  { segment: "Safety & Compliance", customers: "1,860", revenue: "$22M", growth: "+8%", churn: "3%", ltv: "$28K" },
  { segment: "Tools & Equipment", customers: "980", revenue: "$14M", growth: "+18%", churn: "8%", ltv: "$18K" },
  { segment: "Digital Subscriptions", customers: "420", revenue: "$10M", growth: "+34%", churn: "12%", ltv: "$82K" },
];

const ForecastingPanel = () => {
  const [scenario, setScenario] = useState<"baseline" | "optimistic" | "pessimistic">("baseline");
  const multiplier = scenario === "optimistic" ? 1.08 : scenario === "pessimistic" ? 0.92 : 1;

  const adjustedData = forecastData.map((d) => ({
    ...d,
    forecast: d.forecast ? +(d.forecast * multiplier).toFixed(1) : null,
    upper: d.upper ? +(d.upper * multiplier).toFixed(1) : null,
    lower: d.lower ? +(d.lower * (scenario === "pessimistic" ? 0.88 : multiplier)).toFixed(1) : null,
  }));

  return (
    <div className="glass-card p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Revenue Forecasting & Product Intelligence</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5">Einstein predictive models • 95% confidence interval • SFCC + GA4 data</p>
        </div>
        <div className="flex gap-1">
          {(["pessimistic", "baseline", "optimistic"] as const).map((s) => (
            <button key={s} onClick={() => setScenario(s)} className={`text-[10px] px-2.5 py-1 rounded-md capitalize transition-colors ${scenario === s ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}>{s}</button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={adjustedData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="confidenceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(195, 100%, 50%)" stopOpacity={0.15} />
              <stop offset="100%" stopColor="hsl(195, 100%, 50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
          <Tooltip contentStyle={{ backgroundColor: "hsl(220, 18%, 12%)", border: "1px solid hsl(220, 16%, 22%)", borderRadius: "8px", fontSize: "11px" }} formatter={(v: number) => [`$${v}M`]} />
          <Area type="monotone" dataKey="upper" stroke="none" fill="url(#confidenceGrad)" />
          <Area type="monotone" dataKey="lower" stroke="none" fill="hsl(220, 20%, 6%)" />
          <Line type="monotone" dataKey="actual" stroke="hsl(195, 100%, 50%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(195, 100%, 50%)" }} connectNulls={false} />
          <Line type="monotone" dataKey="forecast" stroke="hsl(195, 100%, 50%)" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 3, fill: "hsl(195, 80%, 40%)", strokeDasharray: "0" }} connectNulls={false} />
        </AreaChart>
      </ResponsiveContainer>

      <div>
        <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium mb-2">Product Category Performance</div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-1.5 text-muted-foreground font-medium">Category</th>
                <th className="text-right py-1.5 text-muted-foreground font-medium">Buyers</th>
                <th className="text-right py-1.5 text-muted-foreground font-medium">Revenue</th>
                <th className="text-right py-1.5 text-muted-foreground font-medium">Growth</th>
                <th className="text-right py-1.5 text-muted-foreground font-medium">Churn</th>
                <th className="text-right py-1.5 text-muted-foreground font-medium">Avg LTV</th>
              </tr>
            </thead>
            <tbody>
              {segmentData.map((s) => (
                <tr key={s.segment} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                  <td className="py-2 font-medium text-foreground">{s.segment}</td>
                  <td className="py-2 text-right font-mono text-muted-foreground">{s.customers}</td>
                  <td className="py-2 text-right font-mono text-foreground">{s.revenue}</td>
                  <td className={`py-2 text-right font-mono ${s.growth.startsWith("+") ? "text-success" : "text-destructive"}`}>{s.growth}</td>
                  <td className={`py-2 text-right font-mono ${parseInt(s.churn) > 10 ? "text-warning" : "text-muted-foreground"}`}>{s.churn}</td>
                  <td className="py-2 text-right font-mono text-foreground">{s.ltv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ForecastingPanel;
