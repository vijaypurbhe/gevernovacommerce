import { customerProfile } from "@/data/mockData";

const CustomerProfile = () => {
  const p = customerProfile;

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">360° Customer Profile</h3>
        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{p.segment}</span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">👤</div>
        <div>
          <div className="text-sm font-semibold text-foreground">{p.name}</div>
          <div className="text-[10px] text-muted-foreground font-mono">{p.id}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "Current LTV", value: p.ltv },
          { label: "Predicted LTV", value: p.predictedLtv },
          { label: "Churn Risk", value: `${p.churnProbability}%` },
          { label: "Orders", value: p.totalOrders.toString() },
          { label: "Avg Order", value: p.avgOrderValue },
          { label: "Last Purchase", value: p.lastPurchase },
        ].map((item) => (
          <div key={item.label} className="bg-secondary/50 rounded-lg p-2">
            <div className="text-[9px] text-muted-foreground uppercase tracking-wide">{item.label}</div>
            <div className="text-xs font-mono font-semibold text-foreground mt-0.5">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-2">Recent Events</div>
        <div className="space-y-1.5">
          {p.recentEvents.map((ev, i) => (
            <div key={i} className="flex items-center justify-between text-[10px]">
              <span className="text-foreground">{ev.detail}</span>
              <span className="text-muted-foreground">{ev.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
        <div className="text-[10px] text-primary font-medium mb-1">🎯 Next Best Action</div>
        <div className="text-xs text-foreground">{p.nextBestAction}</div>
      </div>
    </div>
  );
};

export default CustomerProfile;
