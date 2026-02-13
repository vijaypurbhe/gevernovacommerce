import { useState } from "react";

const StateToggle = ({ state, onChange }: { state: "current" | "agentic"; onChange: (s: "current" | "agentic") => void }) => {
  return (
    <div className="flex items-center gap-2 bg-secondary/50 rounded-lg p-1">
      <button
        onClick={() => onChange("current")}
        className={`text-[11px] font-medium px-4 py-1.5 rounded-md transition-all ${
          state === "current"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Current State
      </button>
      <button
        onClick={() => onChange("agentic")}
        className={`text-[11px] font-medium px-4 py-1.5 rounded-md transition-all ${
          state === "agentic"
            ? "bg-primary/20 text-primary shadow-sm glow-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        ⚡ Agentic Future State
      </button>
    </div>
  );
};

const currentMetrics = [
  { label: "Anomaly Detection", current: "Manual review (24-48h)", agentic: "Real-time AI detection (<5 min)" },
  { label: "Root Cause Analysis", current: "Analyst investigation (2-5 days)", agentic: "Automated diagnosis (<30 sec)" },
  { label: "Personalization", current: "Segment-based (5 segments)", agentic: "1:1 real-time (2M profiles)" },
  { label: "Budget Optimization", current: "Monthly review cycle", agentic: "Continuous rebalancing" },
  { label: "Retention Actions", current: "Batch campaigns (weekly)", agentic: "Trigger-based (instant)" },
  { label: "Inventory Response", current: "Weekly reorder review", agentic: "Predictive auto-reorder" },
];

const CurrentVsFuture = ({ state }: { state: "current" | "agentic" }) => {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-3">
        {state === "current" ? "Current Operations" : "Agentic Future State"}
      </h3>
      <div className="space-y-2">
        {currentMetrics.map((m) => (
          <div key={m.label} className="flex items-center gap-3 text-xs">
            <span className="text-muted-foreground w-36 shrink-0">{m.label}</span>
            <div className={`flex-1 rounded-lg p-2 transition-all ${
              state === "agentic" ? "bg-primary/5 border border-primary/20" : "bg-secondary/50 border border-border/30"
            }`}>
              <span className={state === "agentic" ? "text-primary" : "text-foreground"}>
                {state === "agentic" ? m.agentic : m.current}
              </span>
            </div>
          </div>
        ))}
      </div>
      {state === "agentic" && (
        <div className="mt-4 bg-primary/5 border border-primary/20 rounded-lg p-3">
          <div className="text-[10px] text-primary font-medium mb-1">Projected Annual Impact</div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="font-mono text-lg font-bold text-success">+$18.4M</div>
              <div className="text-[9px] text-muted-foreground">Revenue Uplift</div>
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-primary">92%</div>
              <div className="text-[9px] text-muted-foreground">Faster Response</div>
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-warning">-34%</div>
              <div className="text-[9px] text-muted-foreground">Manual Effort</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { StateToggle, CurrentVsFuture };
