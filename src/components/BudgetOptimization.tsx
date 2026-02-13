import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const initialBudget = [
  { channel: "Paid Search", current: 320, recommended: 350, roas: 6.2 },
  { channel: "Social", current: 180, recommended: 144, roas: 4.1 },
  { channel: "Email", current: 60, recommended: 96, roas: 12.4 },
  { channel: "Display", current: 120, recommended: 100, roas: 3.2 },
  { channel: "Affiliate", current: 80, recommended: 90, roas: 5.8 },
  { channel: "Video", current: 40, recommended: 20, roas: 2.1 },
];

const attributionData = [
  { touchpoint: "First Click", organic: 34, paid: 28, social: 22, email: 10, direct: 6 },
  { touchpoint: "Linear", organic: 28, paid: 24, social: 18, email: 18, direct: 12 },
  { touchpoint: "Last Click", organic: 22, paid: 32, social: 14, email: 20, direct: 12 },
  { touchpoint: "Data-Driven", organic: 30, paid: 26, social: 16, email: 19, direct: 9 },
];

const BudgetOptimization = () => {
  const [budgets, setBudgets] = useState(initialBudget.map((b) => ({ ...b, adjusted: b.current })));
  const [activeModel, setActiveModel] = useState("Data-Driven");

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
          <h3 className="text-sm font-semibold text-foreground">Attribution & Budget Optimization</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5">Multi-touch attribution model + what-if budget simulator</p>
        </div>
        <button
          onClick={applyRecommended}
          className="text-[10px] font-medium px-3 py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          Apply AI Recommendations
        </button>
      </div>

      {/* Attribution Models */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">Attribution Model</span>
          <div className="flex gap-1">
            {attributionData.map((m) => (
              <button
                key={m.touchpoint}
                onClick={() => setActiveModel(m.touchpoint)}
                className={`text-[10px] px-2 py-0.5 rounded-md transition-colors ${
                  activeModel === m.touchpoint
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m.touchpoint}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[attributionData.find((d) => d.touchpoint === activeModel)!]}
              layout="vertical"
              margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 40]} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="touchpoint" hide />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220, 18%, 12%)", border: "1px solid hsl(220, 16%, 22%)", borderRadius: "8px", fontSize: "11px" }} formatter={(v: number) => [`${v}%`]} />
              <Bar dataKey="organic" name="Organic" stackId="a" fill="hsl(195, 100%, 50%)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="paid" name="Paid" stackId="a" fill="hsl(152, 70%, 45%)" />
              <Bar dataKey="social" name="Social" stackId="a" fill="hsl(38, 95%, 55%)" />
              <Bar dataKey="email" name="Email" stackId="a" fill="hsl(280, 70%, 60%)" />
              <Bar dataKey="direct" name="Direct" stackId="a" fill="hsl(215, 15%, 45%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-3 mt-1">
          {[
            { label: "Organic", color: "hsl(195, 100%, 50%)" },
            { label: "Paid", color: "hsl(152, 70%, 45%)" },
            { label: "Social", color: "hsl(38, 95%, 55%)" },
            { label: "Email", color: "hsl(280, 70%, 60%)" },
            { label: "Direct", color: "hsl(215, 15%, 45%)" },
          ].map((l) => (
            <span key={l.label} className="flex items-center gap-1 text-[9px] text-muted-foreground">
              <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      </div>

      {/* What-If Sliders */}
      <div>
        <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium mb-3">What-If Budget Allocation ($K/month)</div>
        <div className="space-y-3">
          {budgets.map((b, i) => (
            <div key={b.channel} className="flex items-center gap-3">
              <span className="text-xs text-foreground w-24 shrink-0">{b.channel}</span>
              <input
                type="range"
                min={0}
                max={500}
                value={b.adjusted}
                onChange={(e) => handleSlider(i, Number(e.target.value))}
                className="flex-1 h-1.5 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="w-20 text-right">
                <span className="font-mono text-xs text-foreground">${b.adjusted}K</span>
                {b.adjusted !== b.current && (
                  <span className={`text-[9px] ml-1 font-mono ${b.adjusted > b.current ? "text-success" : "text-destructive"}`}>
                    {b.adjusted > b.current ? "+" : ""}
                    {b.adjusted - b.current}K
                  </span>
                )}
              </div>
              <span className="text-[9px] text-muted-foreground w-12 text-right">{b.roas}x ROAS</span>
            </div>
          ))}
        </div>
      </div>

      {/* Predicted Impact */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border/50">
        <div className="bg-secondary/50 rounded-lg p-3 text-center">
          <div className="text-[9px] text-muted-foreground uppercase">Total Budget</div>
          <div className="font-mono text-sm font-bold text-foreground">${totalAdjusted}K</div>
          {totalAdjusted !== totalCurrent && (
            <div className={`text-[9px] font-mono ${totalAdjusted > totalCurrent ? "text-warning" : "text-success"}`}>
              {totalAdjusted > totalCurrent ? "+" : ""}{totalAdjusted - totalCurrent}K
            </div>
          )}
        </div>
        <div className="bg-secondary/50 rounded-lg p-3 text-center">
          <div className="text-[9px] text-muted-foreground uppercase">Predicted Revenue</div>
          <div className="font-mono text-sm font-bold text-foreground">${(predictedRevenue / 1000).toFixed(1)}M</div>
        </div>
        <div className="bg-secondary/50 rounded-lg p-3 text-center">
          <div className="text-[9px] text-muted-foreground uppercase">Incremental</div>
          <div className={`font-mono text-sm font-bold ${delta >= 0 ? "text-success" : "text-destructive"}`}>
            {delta >= 0 ? "+" : ""}${(delta / 1000).toFixed(1)}M
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetOptimization;
