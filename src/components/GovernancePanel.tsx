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
    agent: "Personalization Agent",
    action: "Deploy image compression on mobile PDPs",
    impact: "+$890K/month revenue recovery",
    risk: "low",
    status: "pending",
    reasoning: [
      "Mobile conversion declined 3.1% over 48 hours (2σ anomaly detected)",
      "Root cause: PDP image payload increased 68% after Sept 14 deployment",
      "Similar optimization yielded 1.8% uplift in Q2 A/B test (n=240K)",
      "No negative impact predicted on desktop or tablet experiences",
    ],
    dataLineage: [
      "GA4 → page_view events (mobile filter)",
      "SFCC → PDP template version history",
      "BigQuery → conversion funnel analysis",
      "Data Cloud → segment performance comparison",
      "Einstein → uplift prediction model v3.2",
    ],
    timestamp: "2 min ago",
  },
  {
    id: "APR-002",
    agent: "Retention Agent",
    action: "Deploy loyalty tier upgrade for at-risk premium customers",
    impact: "+$684K retained LTV",
    risk: "medium",
    status: "pending",
    reasoning: [
      "342 customers with LTV > $2,000 showing 67% churn probability",
      "Historical data shows tier upgrades retain 72% of at-risk customers",
      "Cost of offer: ~$28K in loyalty points + exclusive access perks",
      "Net positive ROI projected at 24.4x within 90 days",
    ],
    dataLineage: [
      "Data Cloud → unified customer profiles",
      "SFCC → purchase history + RFM scoring",
      "Marketing Cloud → engagement decay analysis",
      "Einstein → churn prediction model v4.1",
      "BigQuery → cohort retention benchmarks",
    ],
    timestamp: "8 min ago",
  },
  {
    id: "APR-003",
    agent: "Marketing Allocation Agent",
    action: "Shift $120K from social to email automation",
    impact: "+$340K incremental revenue",
    risk: "low",
    status: "approved",
    reasoning: [
      "Social ROAS declined 22% over 30 days (from 5.3x to 4.1x)",
      "Email ROAS consistently at 12.4x with capacity for 40% more volume",
      "Diminishing returns detected on social spend above $150K/month",
      "Email automation sequences have 3.2x higher conversion than social ads",
    ],
    dataLineage: [
      "GA4 → campaign attribution data",
      "BigQuery → channel ROI time series",
      "Marketing Cloud → email capacity analysis",
      "Data Cloud → cross-channel customer journey",
    ],
    timestamp: "1 hour ago",
  },
];

const riskColors = {
  low: "text-success bg-success/10",
  medium: "text-warning bg-warning/10",
  high: "text-destructive bg-destructive/10",
};

const GovernancePanel = () => {
  const [items, setItems] = useState(approvals);
  const [expanded, setExpanded] = useState<string | null>("APR-001");

  const handleApprove = (id: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: "approved" as const } : item)));
  };

  const handleReject = (id: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: "rejected" as const } : item)));
  };

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
            <div
              key={item.id}
              className={`border rounded-xl transition-all ${
                item.status === "approved"
                  ? "border-success/20 bg-success/5"
                  : item.status === "rejected"
                  ? "border-destructive/20 bg-destructive/5"
                  : "border-border/50 bg-secondary/20"
              }`}
            >
              {/* Header */}
              <button
                onClick={() => setExpanded(isExpanded ? null : item.id)}
                className="w-full flex items-center gap-3 p-3 text-left"
              >
                <div className="shrink-0">
                  {item.status === "approved" ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : item.status === "rejected" ? (
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                  ) : (
                    <Clock className="w-4 h-4 text-warning animate-pulse" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground truncate">{item.action}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${riskColors[item.risk]}`}>
                      {item.risk} risk
                    </span>
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    {item.agent} • {item.timestamp} • Impact: <span className="text-success font-mono">{item.impact}</span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`} />
              </button>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-3 pb-3 space-y-3 border-t border-border/30 pt-3 ml-7">
                  {/* AI Reasoning */}
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium mb-1.5 flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Decision Reasoning
                    </div>
                    <ol className="space-y-1">
                      {item.reasoning.map((r, i) => (
                        <li key={i} className="text-[10px] text-foreground flex gap-2">
                          <span className="text-muted-foreground font-mono shrink-0">{i + 1}.</span>
                          {r}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Data Lineage */}
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium mb-1.5">
                      Data Lineage
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.dataLineage.map((d, i) => (
                        <span key={i} className="text-[9px] bg-secondary/60 text-muted-foreground px-2 py-0.5 rounded-md font-mono">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Approval Actions */}
                  {item.status === "pending" && (
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="text-[10px] font-medium px-4 py-1.5 rounded-md bg-success/10 text-success hover:bg-success/20 transition-colors"
                      >
                        ✓ Approve & Execute
                      </button>
                      <button
                        onClick={() => handleReject(item.id)}
                        className="text-[10px] font-medium px-4 py-1.5 rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                      >
                        ✕ Reject
                      </button>
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
