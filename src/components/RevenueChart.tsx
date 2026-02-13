import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { revenueChartData } from "@/data/mockData";

const formatValue = (value: number) => `$${(value / 1000000000).toFixed(1)}B`;

const RevenueChart = () => (
  <div className="glass-card p-5">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-semibold text-foreground">Equipment Orders vs Target</h3>
      <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-0.5 bg-primary rounded-full" /> Actual Orders
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-0.5 bg-muted-foreground/40 rounded-full" /> Target
        </span>
      </div>
    </div>
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={revenueChartData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(195, 100%, 50%)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="hsl(195, 100%, 50%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={formatValue} tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ backgroundColor: "hsl(220, 18%, 12%)", border: "1px solid hsl(220, 16%, 22%)", borderRadius: "8px", fontSize: "12px" }}
          formatter={(value: number) => [formatValue(value)]}
          labelStyle={{ color: "hsl(210, 20%, 92%)" }}
        />
        <Area type="monotone" dataKey="target" stroke="hsl(215, 15%, 35%)" strokeWidth={1.5} strokeDasharray="4 4" fill="none" />
        <Area type="monotone" dataKey="revenue" stroke="hsl(195, 100%, 50%)" strokeWidth={2} fill="url(#revenueGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default RevenueChart;
