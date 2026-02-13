import { useState } from "react";
import { Check, Clock, AlertTriangle, Eye, ChevronRight } from "lucide-react";

interface ApprovalItem {
  id: string;
  agent: string;
  action: string;
  impact: string;
  risk: "low" | "medium" | "high";
  status: "pending" | "approved" | "rejected";
  reasoning: string[];
  dataLineage: string[];
  timestamp: string;
}

const approvals: ApprovalItem[] = [
  {
    id: "APR-001",
    agent: "Fleet Performance Agent",
    action: "Deploy predictive compressor wash at SEC Dammam 7HA.03 Unit #4",
    impact: "Prevent $12M forced outage",
    risk: "low",
    status: "pending",
    reasoning: [
      "Heat rate degraded 2.1% over 72 hours — exceeds 2σ anomaly threshold",
      "Pattern matches compressor fouling signature with 89% correlation to prior forced outage events",
      "Unit has operated 847 hours since last wash (recommended interval: 720 hours)",
      "Digital twin predicts 92% probability of forced outage within 14 days if untreated",
    ],
    dataLineage: [
      "IoT Sensors → real-time turbine telemetry",
      "Digital Twin → performance deviation model",
      "Fleet Database → historical failure mode correlation",
      "Weather API → regional sand/dust activity data",
      "Predix APM → asset health scoring engine",
    ],
    timestamp: "2 min ago",
  },
  {
    id: "APR-002",
    agent: "CSA Renewal Agent",
    action: "Launch proactive retention intervention for 3 at-risk accounts ($890M)",
    impact: "$890M renewal pipeline protected",
    risk: "medium",
    status: "pending",
    reasoning: [
      "ACWA Power ($420M) issued competitive RFI to Siemens Energy 30 days ago",
      "Tenaga Nasional ($310M) new CPO from Siemens background, engagement down 60%",
      "Historical data: proactive interventions retain 92% of flagged accounts vs 71% without",
      "Digital-attached accounts renew at 96% — 2 of 3 at-risk accounts lack digital products",
    ],
    dataLineage: [
      "CRM → account engagement scoring",
      "Competitive Intel → RFI/RFP tracking",
      "Customer Portal → usage analytics decline detection",
      "Services History → value delivered quantification",
      "AI Model → churn prediction v4.2 (87% confidence)",
    ],
    timestamp: "8 min ago",
  },
  {
    id: "APR-003",
    agent: "Supply Chain Agent",
    action: "Activate alternate nickel alloy suppliers + pre-position critical spares",
    impact: "Protect 340 planned services ($480M+ exposure)",
    risk: "low",
    status: "approved",
    reasoning: [
      "Haynes International lead time extended 3 weeks due to Kokomo furnace outage",
      "Precision Castparts and Arconic qualified as alternates — can absorb 60% of volume",
      "Pre-positioning at 6 regional hubs reduces emergency mobilization time from 5 days to 24 hours",
      "$48M inventory investment yields 10x+ risk mitigation ROI",
    ],
    dataLineage: [
      "Supplier Portal → delivery timeline tracking",
      "ERP → inventory position by location",
      "Services Schedule → 6-month demand forecast",
      "Procurement → alternate supplier qualification status",
    ],
    timestamp: "1 hour ago",
  },
];

const riskColors = { low: "text-success bg-success/10", medium: "text-warning bg-warning/10", high: "text-destructive bg-destructive/10" };

const GovernancePanel = () => {
  const [items, setItems] = useState(approvals);
  const [expanded, setExpanded] = useState<string | null>("APR-001");

  const handleApprove = (id: string) => setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: "approved" as const } : item)));
  const handleReject = (id: string) => setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: "rejected" as const } : item)));

  return (
    <div className="glass-card p-5 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-foreground">Governance & Explainability</h3>
        <p className="text-[10px] text-muted-foreground mt-0.5">Human-in-the-loop approval workflow with full AI decision transparency</p>
      </div>
      <div className="space-y-3">
        {items.map((item) => {
          const isExpanded = expanded === item.id;
          return (
            <div key={item.id} className={`border rounded-xl transition-all ${item.status === "approved" ? "border-success/20 bg-success/5" : item.status === "rejected" ? "border-destructive/20 bg-destructive/5" : "border-border/50 bg-secondary/20"}`}>
              <button onClick={() => setExpanded(isExpanded ? null : item.id)} className="w-full flex items-center gap-3 p-3 text-left">
                <div className="shrink-0">
                  {item.status === "approved" ? <Check className="w-4 h-4 text-success" /> : item.status === "rejected" ? <AlertTriangle className="w-4 h-4 text-destructive" /> : <Clock className="w-4 h-4 text-warning animate-pulse" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground truncate">{item.action}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${riskColors[item.risk]}`}>{item.risk} risk</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{item.agent} • {item.timestamp} • Impact: <span className="text-success font-mono">{item.impact}</span></div>
                </div>
                <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`} />
              </button>
              {isExpanded && (
                <div className="px-3 pb-3 space-y-3 border-t border-border/30 pt-3 ml-7">
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium mb-1.5 flex items-center gap-1"><Eye className="w-3 h-3" /> Decision Reasoning</div>
                    <ol className="space-y-1">{item.reasoning.map((r, i) => (<li key={i} className="text-[10px] text-foreground flex gap-2"><span className="text-muted-foreground font-mono shrink-0">{i + 1}.</span>{r}</li>))}</ol>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium mb-1.5">Data Lineage</div>
                    <div className="flex flex-wrap gap-1">{item.dataLineage.map((d, i) => (<span key={i} className="text-[9px] bg-secondary/60 text-muted-foreground px-2 py-0.5 rounded-md font-mono">{d}</span>))}</div>
                  </div>
                  {item.status === "pending" && (
                    <div className="flex gap-2 pt-1">
                      <button onClick={() => handleApprove(item.id)} className="text-[10px] font-medium px-4 py-1.5 rounded-md bg-success/10 text-success hover:bg-success/20 transition-colors">✓ Approve & Execute</button>
                      <button onClick={() => handleReject(item.id)} className="text-[10px] font-medium px-4 py-1.5 rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">✕ Reject</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GovernancePanel;
