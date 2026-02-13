import { channelData } from "@/data/mockData";

const ChannelTable = () => (
  <div className="glass-card p-5">
    <h3 className="text-sm font-semibold text-foreground mb-4">Business Segment Performance</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border/50">
            <th className="text-left py-2 text-muted-foreground font-medium">Segment</th>
            <th className="text-right py-2 text-muted-foreground font-medium">Orders</th>
            <th className="text-right py-2 text-muted-foreground font-medium">Opportunities</th>
            <th className="text-right py-2 text-muted-foreground font-medium">Win Rate</th>
          </tr>
        </thead>
        <tbody>
          {channelData.map((ch) => (
            <tr key={ch.channel} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
              <td className="py-2.5 font-medium text-foreground">{ch.channel}</td>
              <td className="py-2.5 text-right font-mono text-foreground">
                ${(ch.revenue / 1000000000).toFixed(1)}B
              </td>
              <td className="py-2.5 text-right font-mono text-muted-foreground">
                {ch.sessions}
              </td>
              <td className="py-2.5 text-right font-mono text-success">{ch.conversion}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ChannelTable;
