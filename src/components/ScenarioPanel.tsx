import type { Scenario } from "@/data/mockData";
import { useState } from "react";

const ScenarioPanel = ({ scenarios }: { scenarios: Scenario[] }) => {
  const [active, setActive] = useState(0);
  const scenario = scenarios[active];

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Scenario Simulation</h3>
        <div className="flex gap-1">
          {scenarios.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`text-[10px] px-2.5 py-1 rounded-md transition-colors ${
                i === active ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.title.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-warning/5 border border-warning/20 rounded-lg p-3 mb-4">
        <div className="text-[10px] text-warning font-medium mb-0.5">Trigger</div>
        <div className="text-xs text-foreground">{scenario.trigger}</div>
      </div>

      <div className="space-y-2">
        {scenario.steps.map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex flex-col items-center mt-1">
              <div
                className={`w-2 h-2 rounded-full ${
                  step.status === "complete"
                    ? "bg-success"
                    : step.status === "active"
                    ? "bg-primary animate-pulse"
                    : "bg-muted-foreground/30"
                }`}
              />
              {i < scenario.steps.length - 1 && (
                <div className={`w-px h-6 ${step.status === "complete" ? "bg-success/30" : "bg-border"}`} />
              )}
            </div>
            <div className="flex-1 pb-1">
              <div className={`text-xs font-medium ${step.status === "pending" ? "text-muted-foreground" : "text-foreground"}`}>
                {step.label}
              </div>
              <div className="text-[10px] text-muted-foreground">{step.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground">Projected Impact</span>
        <span className="font-mono text-sm font-bold text-success">{scenario.impact}</span>
      </div>
    </div>
  );
};

export default ScenarioPanel;
