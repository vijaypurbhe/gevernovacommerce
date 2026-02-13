import { useState } from "react";

const StateToggle = ({ state, onChange }: { state: "current" | "agentic"; onChange: (s: "current" | "agentic") => void }) => (
  <div className="flex items-center gap-2 bg-secondary/50 rounded-lg p-1">
    <button onClick={() => onChange("current")} className={`text-[11px] font-medium px-4 py-1.5 rounded-md transition-all ${state === "current" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>Current State</button>
    <button onClick={() => onChange("agentic")} className={`text-[11px] font-medium px-4 py-1.5 rounded-md transition-all ${state === "agentic" ? "bg-primary/20 text-primary shadow-sm glow-primary" : "text-muted-foreground hover:text-foreground"}`}>⚡ Agentic Future State</button>
  </div>
);

const currentMetrics = [
  { label: "Fleet Anomaly Detection", current: "Manual inspection cycles (30-90 day intervals)", agentic: "Real-time digital twin detection (<5 min)" },
  { label: "Root Cause Analysis", current: "Field engineer investigation (3-7 days)", agentic: "AI pattern matching across fleet database (<30 sec)" },
  { label: "Parts Availability", current: "Reactive ordering (5-10 day mobilization)", agentic: "Predictive pre-positioning at regional hubs (24h)" },
  { label: "CSA Risk Detection", current: "Annual account reviews", agentic: "Continuous competitive signal monitoring (real-time)" },
  { label: "Outage Prevention", current: "Scheduled maintenance windows", agentic: "Predictive intervention 14+ days before failure" },
  { label: "Grid Capacity Planning", current: "Quarterly demand planning", agentic: "AI-driven continuous capacity rebalancing" },
];

const CurrentVsFuture = ({ state }: { state: "current" | "agentic" }) => (
  <div className="glass-card p-5">
    <h3 className="text-sm font-semibold text-foreground mb-3">{state === "current" ? "Current Operations" : "Agentic Future State"}</h3>
    <div className="space-y-2">
      {currentMetrics.map((m) => (
        <div key={m.label} className="flex items-center gap-3 text-xs">
          <span className="text-muted-foreground w-40 shrink-0">{m.label}</span>
          <div className={`flex-1 rounded-lg p-2 transition-all ${state === "agentic" ? "bg-primary/5 border border-primary/20" : "bg-secondary/50 border border-border/30"}`}>
            <span className={state === "agentic" ? "text-primary" : "text-foreground"}>{state === "agentic" ? m.agentic : m.current}</span>
          </div>
        </div>
      ))}
    </div>
    {state === "agentic" && (
      <div className="mt-4 bg-primary/5 border border-primary/20 rounded-lg p-3">
        <div className="text-[10px] text-primary font-medium mb-1">Projected Annual Impact</div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div><div className="font-mono text-lg font-bold text-success">+$2.1B</div><div className="text-[9px] text-muted-foreground">Revenue Protection</div></div>
          <div><div className="font-mono text-lg font-bold text-primary">14 days</div><div className="text-[9px] text-muted-foreground">Avg Early Warning</div></div>
          <div><div className="font-mono text-lg font-bold text-warning">-62%</div><div className="text-[9px] text-muted-foreground">Unplanned Outages</div></div>
        </div>
      </div>
    )}
  </div>
);

export { StateToggle, CurrentVsFuture };
