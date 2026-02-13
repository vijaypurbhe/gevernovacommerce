import { TrendingUp, TrendingDown } from "lucide-react";

interface KpiTileProps {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
  period: string;
  index: number;
}

const KpiTile = ({ label, value, change, trend, period, index }: KpiTileProps) => {
  const isPositiveTrend = (trend === "up" && change > 0) || (trend === "down" && change < 0);
  const isInverse = label === "Cart Abandonment";
  const displayPositive = isInverse ? change < 0 : change > 0;

  return (
    <div
      className="glass-card-hover p-5 flex flex-col gap-2 animate-slide-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
        {label}
      </span>
      <span className="font-mono text-2xl font-bold text-foreground animate-count-up">
        {value}
      </span>
      <div className="flex items-center gap-1.5 mt-auto">
        {displayPositive ? (
          <TrendingUp className="w-3.5 h-3.5 text-success" />
        ) : (
          <TrendingDown className="w-3.5 h-3.5 text-destructive" />
        )}
        <span
          className={`text-xs font-mono font-medium ${
            displayPositive ? "text-success" : "text-destructive"
          }`}
        >
          {change > 0 ? "+" : ""}
          {change}%
        </span>
        <span className="text-xs text-muted-foreground">{period}</span>
      </div>
    </div>
  );
};

export default KpiTile;
