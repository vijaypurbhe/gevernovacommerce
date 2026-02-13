import { useState } from "react";
import type { Agent, AgentStatus } from "@/data/mockData";

const statusConfig: Record<AgentStatus, { label: string; dotClass: string; bgClass: string }> = {
  monitoring: { label: "Monitoring", dotClass: "bg-success", bgClass: "bg-success/10 text-success" },
  alert: { label: "Alert", dotClass: "bg-warning", bgClass: "bg-warning/10 text-warning" },
  acting: { label: "Acting", dotClass: "bg-primary", bgClass: "bg-primary/10 text-primary" },
};

const AgentCard = ({ agent }: { agent: Agent }) => {
  const [executing, setExecuting] = useState(false);
  const [executed, setExecuted] = useState(false);
  const config = statusConfig[agent.status];

  const handleExecute = () => {
    setExecuting(true);
    setTimeout(() => {
      setExecuting(false);
      setExecuted(true);
    }, 2000);
  };

  return (
    <div className={`glass-card-hover p-5 flex flex-col gap-3 ${agent.status === "alert" ? "border-warning/30" : ""}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{agent.icon}</span>
          <h3 className="text-sm font-semibold text-foreground">{agent.name}</h3>
        </div>
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1.5 ${config.bgClass}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass} ${agent.status === "alert" ? "animate-pulse" : ""}`} />
          {config.label}
        </span>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">{agent.insight}</p>

      <div className="flex items-center gap-3 text-xs">
        <span className="text-muted-foreground">Confidence</span>
        <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-1000"
            style={{ width: `${agent.confidence}%` }}
          />
        </div>
        <span className="font-mono text-foreground font-medium">{agent.confidence}%</span>
      </div>

      <div className="bg-secondary/50 rounded-lg p-3 text-xs">
        <div className="text-muted-foreground mb-1">Recommended Action</div>
        <div className="text-foreground font-medium">{agent.action}</div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs">
          <span className="text-muted-foreground">Impact: </span>
          <span className="font-mono font-semibold text-success">{agent.impact}</span>
        </span>
        <button
          onClick={handleExecute}
          disabled={executing || executed}
          className={`text-[11px] font-medium px-3 py-1.5 rounded-md transition-all ${
            executed
              ? "bg-success/20 text-success cursor-default"
              : executing
              ? "bg-primary/20 text-primary animate-pulse cursor-wait"
              : "bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
          }`}
        >
          {executed ? "✓ Executed" : executing ? "Executing..." : "Execute →"}
        </button>
      </div>
    </div>
  );
};

export default AgentCard;
