import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";

interface Alert {
  id: number;
  agent: string;
  message: string;
  severity: "warning" | "critical";
  time: string;
}

const alertsPool: Omit<Alert, "id">[] = [
  { agent: "Personalization Agent", message: "Mobile conversion anomaly detected: -3.1% in 48h", severity: "critical", time: "Just now" },
  { agent: "Retention Agent", message: "342 premium customers entering churn risk zone", severity: "warning", time: "2 min ago" },
  { agent: "Merchandising Agent", message: "SKU #A4821 inventory critical: 6 days remaining", severity: "warning", time: "5 min ago" },
  { agent: "Revenue Agent", message: "Paid search CPC spike +22% on brand terms", severity: "warning", time: "8 min ago" },
  { agent: "Marketing Agent", message: "Social ROAS dropped below 4.0x threshold", severity: "critical", time: "12 min ago" },
];

const StreamingAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());

  useEffect(() => {
    let idx = 0;
    const addAlert = () => {
      if (idx >= alertsPool.length) return;
      const alert = { ...alertsPool[idx], id: idx };
      setAlerts((prev) => [alert, ...prev]);
      idx++;
    };

    // Stagger alerts on mount
    const timers = alertsPool.map((_, i) => setTimeout(addAlert, i * 2500));
    return () => timers.forEach(clearTimeout);
  }, []);

  const dismiss = (id: number) => setDismissed((prev) => new Set(prev).add(id));

  const visible = alerts.filter((a) => !dismissed.has(a.id));

  if (visible.length === 0) return null;

  return (
    <div className="space-y-2">
      {visible.map((alert, i) => (
        <div
          key={alert.id}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border animate-slide-up ${
            alert.severity === "critical"
              ? "bg-destructive/5 border-destructive/20"
              : "bg-warning/5 border-warning/20"
          }`}
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <AlertTriangle
            className={`w-3.5 h-3.5 shrink-0 ${
              alert.severity === "critical" ? "text-destructive" : "text-warning"
            } animate-stream`}
          />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] text-muted-foreground">{alert.agent}</span>
            <span className="text-[10px] text-muted-foreground mx-1.5">•</span>
            <span className="text-xs text-foreground">{alert.message}</span>
          </div>
          <span className="text-[9px] text-muted-foreground shrink-0">{alert.time}</span>
          <button onClick={() => dismiss(alert.id)} className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default StreamingAlerts;
