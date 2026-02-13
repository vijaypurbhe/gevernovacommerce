import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const initialBudget = [
  { channel: "Gas Power R&D", current: 420, recommended: 460, roas: 4.8 },
  { channel: "Wind Technology", current: 280, recommended: 240, roas: 3.2 },
  { channel: "Grid Solutions", current: 180, recommended: 240, roas: 5.6 },
  { channel: "Digital & Software", current: 120, recommended: 160, roas: 8.4 },
  { channel: "Hydrogen/Decarbonization", current: 80, recommended: 120, roas: 2.1 },
  { channel: "Manufacturing Capacity", current: 200, recommended: 260, roas: 6.2 },
];

const attributionData = [
  { touchpoint: "Direct Sales", gasPower: 38, wind: 22, grid: 18, digital: 12, services: 10 },
  { touchpoint: "Channel Partners", gasPower: 18, wind: 28, grid: 32, digital: 8, services: 14 },
  { touchpoint: "Digital Leads", gasPower: 24, wind: 16, grid: 22, digital: 28, services: 10 },
  { touchpoint: "Multi-Touch", gasPower: 28, wind: 22, grid: 24, digital: 16, services: 10 },
];

const BudgetOptimization = () => {
  const [budgets, setBudgets] = useState(initialBudget.map((b) => ({ ...b, adjusted: b.current })));
  const [activeModel, setActiveModel] = useState("Multi-Touch");

  const totalCurrent = budgets.reduce((s, b) => s + b.current, 0);
  const totalAdjusted = budgets.reduce((s, b) => s + b.adjusted, 0);
  const predictedRevenue = budgets.reduce((s, b) => s + b.adjusted * b.roas, 0);
  const currentRevenue = budgets.reduce((s, b) => s + b.current * b.roas, 0);
  const delta = predictedRevenue - currentRevenue;

  const handleSlider = (i: number, val: number) => {
    setBudgets((prev) => prev.map((b, idx) => (idx === i ? { ...b, adjusted: val } : b)));
  };

  const applyRecommended = () => {
    setBudgets((prev) => prev.map((b) => ({ ...b, adjusted: b.recommended })));
  };

  return (
    <div className="glass-card p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Investment & Capacity Allocation</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5">Multi-touch attribution + what-if investment simulator</p>
        </div>
        <button onClick={applyRecommended} className="text-[10px] font-medium px-3 py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors">Apply AI Recommendations</button>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">Attribution Model</span>
          <div className="flex gap-1">
            {attributionData.map((m) => (
              <button key={m.touchpoint} onClick={() => setActiveModel(m.touchpoint)} className={`text-[10px] px-2 py-0.5 rounded-md transition-colors ${activeModel === m.touchpoint ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}>{m.touchpoint}</button>
            ))}
          </div>
        </div>
        <div className="h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[attributionData.find((d) => d.touchpoint === activeModel)!]} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 40]} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="touchpoint" hide />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220, 18%, 12%)", border: "1px solid hsl(220, 16%, 22%)", borderRadius: "8px", fontSize: "11px" }} formatter={(v: number) => [`${v}%`]} />
              <Bar dataKey="gasPower" name="Gas Power" stackId="a" fill="hsl(195, 100%, 50%)" />
              <Bar dataKey="wind" name="Wind" stackId="a" fill="hsl(152, 70%, 45%)" />
              <Bar dataKey="grid" name="Grid" stackId="a" fill="hsl(38, 95%, 55%)" />
              <Bar dataKey="digital" name="Digital" stackId="a" fill="hsl(280, 70%, 60%)" />
              <Bar dataKey="services" name="Services" stackId="a" fill="hsl(215, 15%, 45%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-3 mt-1">
          {[
            { label: "Gas Power", color: "hsl(195, 100%, 50%)" },
            { label: "Wind", color: "hsl(152, 70%, 45%)" },
            { label: "Grid", color: "hsl(38, 95%, 55%)" },
            { label: "Digital", color: "hsl(280, 70%, 60%)" },
            { label: "Services", color: "hsl(215, 15%, 45%)" },
          ].map((l) => (
            <span key={l.label} className="flex items-center gap-1 text-[9px] text-muted-foreground">
              <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium mb-3">What-If Investment Allocation ($M/year)</div>
        <div className="space-y-3">
          {budgets.map((b, i) => (
            <div key={b.channel} className="flex items-center gap-3">
              <span className="text-xs text-foreground w-40 shrink-0">{b.channel}</span>
              <input type="range" min={0} max={500} value={b.adjusted} onChange={(e) => handleSlider(i, Number(e.target.value))} className="flex-1 h-1.5 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer" />
              <div className="w-20 text-right">
                <span className="font-mono text-xs text-foreground">${b.adjusted}M</span>
                {b.adjusted !== b.current && (
                  <span className={`text-[9px] ml-1 font-mono ${b.adjusted > b.current ? "text-success" : "text-destructive"}`}>
                    {b.adjusted > b.current ? "+" : ""}{b.adjusted - b.current}M
                  </span>
                )}
              </div>
              <span className="text-[9px] text-muted-foreground w-12 text-right">{b.roas}x ROI</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border/50">
        <div className="bg-secondary/50 rounded-lg p-3 text-center">
          <div className="text-[9px] text-muted-foreground uppercase">Total Investment</div>
          <div className="font-mono text-sm font-bold text-foreground">${totalAdjusted}M</div>
          {totalAdjusted !== totalCurrent && <div className={`text-[9px] font-mono ${totalAdjusted > totalCurrent ? "text-warning" : "text-success"}`}>{totalAdjusted > totalCurrent ? "+" : ""}{totalAdjusted - totalCurrent}M</div>}
        </div>
        <div className="bg-secondary/50 rounded-lg p-3 text-center">
          <div className="text-[9px] text-muted-foreground uppercase">Predicted Return</div>
          <div className="font-mono text-sm font-bold text-foreground">${(predictedRevenue / 1000).toFixed(1)}B</div>
        </div>
        <div className="bg-secondary/50 rounded-lg p-3 text-center">
          <div className="text-[9px] text-muted-foreground uppercase">Incremental</div>
          <div className={`font-mono text-sm font-bold ${delta >= 0 ? "text-success" : "text-destructive"}`}>{delta >= 0 ? "+" : ""}${(delta / 1000).toFixed(1)}B</div>
        </div>
      </div>
    </div>
  );
};

export default BudgetOptimization;
