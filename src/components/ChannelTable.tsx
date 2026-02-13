import { channelData } from "@/data/mockData";

const ChannelTable = () => (
  <div className="glass-card p-5">
    <h3 className="text-sm font-semibold text-foreground mb-4">Channel Performance</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border/50">
            <th className="text-left py-2 text-muted-foreground font-medium">Channel</th>
            <th className="text-right py-2 text-muted-foreground font-medium">Revenue</th>
            <th className="text-right py-2 text-muted-foreground font-medium">Sessions</th>
            <th className="text-right py-2 text-muted-foreground font-medium">CVR</th>
            <th className="text-right py-2 text-muted-foreground font-medium">ROAS</th>
          </tr>
        </thead>
        <tbody>
          {channelData.map((ch) => (
            <tr key={ch.channel} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
              <td className="py-2.5 font-medium text-foreground">{ch.channel}</td>
              <td className="py-2.5 text-right font-mono text-foreground">
                ${(ch.revenue / 1000000).toFixed(1)}M
              </td>
              <td className="py-2.5 text-right font-mono text-muted-foreground">
                {(ch.sessions / 1000).toFixed(0)}K
              </td>
              <td className="py-2.5 text-right font-mono text-foreground">{ch.conversion}%</td>
              <td className="py-2.5 text-right font-mono">
                {ch.roas ? (
                  <span className="text-success">{ch.roas}x</span>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ChannelTable;
