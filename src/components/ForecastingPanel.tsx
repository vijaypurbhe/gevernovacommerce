import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const forecastData = [
  { month: "Q1'25", actual: 7.6, forecast: null, upper: null, lower: null },
  { month: "Q2'25", actual: 8.2, forecast: 8.2, upper: 8.2, lower: 8.2 },
  { month: "Q3'25", actual: null, forecast: 8.8, upper: 9.4, lower: 8.2 },
  { month: "Q4'25", actual: null, forecast: 9.6, upper: 10.4, lower: 8.8 },
  { month: "Q1'26", actual: null, forecast: 8.4, upper: 9.2, lower: 7.6 },
  { month: "Q2'26", actual: null, forecast: 9.2, upper: 10.1, lower: 8.3 },
];

const segmentData = [
  { segment: "Gas Power — HA Fleet", customers: "84", revenue: "$4.2B", growth: "+12%", churn: "3%", ltv: "$680M" },
  { segment: "Gas Power — F-Class", customers: "210", revenue: "$2.8B", growth: "+4%", churn: "6%", ltv: "$240M" },
  { segment: "Wind — Offshore", customers: "42", revenue: "$1.6B", growth: "+18%", churn: "2%", ltv: "$520M" },
  { segment: "Wind — Onshore", customers: "380", revenue: "$1.2B", growth: "-2%", churn: "12%", ltv: "$48M" },
  { segment: "Grid Solutions", customers: "620", revenue: "$1.1B", growth: "+34%", churn: "8%", ltv: "$28M" },
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
          <h3 className="text-sm font-semibold text-foreground">Orders Forecasting & Segment Intelligence</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5">Predictive models • 95% confidence interval • Cross-segment analysis</p>
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
          <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}B`} />
          <Tooltip contentStyle={{ backgroundColor: "hsl(220, 18%, 12%)", border: "1px solid hsl(220, 16%, 22%)", borderRadius: "8px", fontSize: "11px" }} formatter={(v: number) => [`$${v}B`]} />
          <Area type="monotone" dataKey="upper" stroke="none" fill="url(#confidenceGrad)" />
          <Area type="monotone" dataKey="lower" stroke="none" fill="hsl(220, 20%, 6%)" />
          <Line type="monotone" dataKey="actual" stroke="hsl(195, 100%, 50%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(195, 100%, 50%)" }} connectNulls={false} />
          <Line type="monotone" dataKey="forecast" stroke="hsl(195, 100%, 50%)" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 3, fill: "hsl(195, 80%, 40%)", strokeDasharray: "0" }} connectNulls={false} />
        </AreaChart>
      </ResponsiveContainer>

      <div>
        <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium mb-2">Segment Intelligence</div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-1.5 text-muted-foreground font-medium">Segment</th>
                <th className="text-right py-1.5 text-muted-foreground font-medium">Accounts</th>
                <th className="text-right py-1.5 text-muted-foreground font-medium">Orders</th>
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
