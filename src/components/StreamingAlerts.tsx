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
  { agent: "Cart Recovery Agent", message: "Checkout step 3 drop-off spiked to 38% in last hour — shipping cost shock on 12 high-value carts ($84K total)", severity: "critical", time: "Just now" },
  { agent: "Retention Agent", message: "Duke Energy Services (Top 1 account, $3.2M/yr) — no orders in 94 days, competitor portal visits detected in GA4", severity: "critical", time: "2 min ago" },
  { agent: "Merchandising Agent", message: "GA4 site search: 1,240 queries for 'wind gearbox bearing' today — product page missing from SFCC catalog", severity: "warning", time: "5 min ago" },
  { agent: "Marketing Attribution Agent", message: "Google Ads CPC up 18% this week — ROAS dropping below 4.5x threshold on non-brand campaigns", severity: "warning", time: "8 min ago" },
  { agent: "Revenue Optimization Agent", message: "Einstein A/B test results: dynamic pricing variant showing +14% revenue on top 200 SKUs (95% confidence)", severity: "warning", time: "12 min ago" },
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
    const timers = alertsPool.map((_, i) => setTimeout(addAlert, i * 2500));
    return () => timers.forEach(clearTimeout);
  }, []);

  const dismiss = (id: number) => setDismissed((prev) => new Set(prev).add(id));
  const visible = alerts.filter((a) => !dismissed.has(a.id));
  if (visible.length === 0) return null;

  return (
    <div className="space-y-2">
      {visible.map((alert, i) => (
        <div key={alert.id} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border animate-slide-up ${alert.severity === "critical" ? "bg-destructive/5 border-destructive/20" : "bg-warning/5 border-warning/20"}`} style={{ animationDelay: `${i * 100}ms` }}>
          <AlertTriangle className={`w-3.5 h-3.5 shrink-0 ${alert.severity === "critical" ? "text-destructive" : "text-warning"} animate-stream`} />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] text-muted-foreground">{alert.agent}</span>
            <span className="text-[10px] text-muted-foreground mx-1.5">•</span>
            <span className="text-xs text-foreground">{alert.message}</span>
          </div>
          <span className="text-[9px] text-muted-foreground shrink-0">{alert.time}</span>
          <button onClick={() => dismiss(alert.id)} className="text-muted-foreground hover:text-foreground transition-colors shrink-0"><X className="w-3 h-3" /></button>
        </div>
      ))}
    </div>
  );
};

export default StreamingAlerts;
