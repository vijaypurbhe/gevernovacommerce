const nodes = [
  { id: "sfcc", label: "SFCC Storefront", x: 50, y: 30, color: "hsl(195, 100%, 50%)" },
  { id: "ga4", label: "GA4 Events", x: 200, y: 30, color: "hsl(38, 95%, 55%)" },
  { id: "crm", label: "CRM", x: 350, y: 30, color: "hsl(280, 70%, 60%)" },
  { id: "datacloud", label: "Data Cloud", x: 200, y: 120, color: "hsl(195, 100%, 50%)" },
  { id: "bigquery", label: "BigQuery", x: 50, y: 120, color: "hsl(152, 70%, 45%)" },
  { id: "einstein", label: "Einstein AI", x: 350, y: 120, color: "hsl(38, 95%, 55%)" },
  { id: "agentforce", label: "Agentforce", x: 200, y: 210, color: "hsl(195, 100%, 50%)" },
  { id: "mktcloud", label: "Marketing Cloud", x: 50, y: 210, color: "hsl(280, 70%, 60%)" },
  { id: "activation", label: "Activation", x: 350, y: 210, color: "hsl(152, 70%, 45%)" },
];

const edges = [
  { from: "sfcc", to: "datacloud" },
  { from: "ga4", to: "datacloud" },
  { from: "crm", to: "datacloud" },
  { from: "sfcc", to: "bigquery" },
  { from: "ga4", to: "bigquery" },
  { from: "datacloud", to: "einstein" },
  { from: "bigquery", to: "einstein" },
  { from: "datacloud", to: "agentforce" },
  { from: "einstein", to: "agentforce" },
  { from: "agentforce", to: "mktcloud" },
  { from: "agentforce", to: "activation" },
];

const DataLineage = () => {
  const getNode = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-3">Data Lineage & Architecture</h3>
      <p className="text-[10px] text-muted-foreground mb-4">Unified data flow: ingestion → unification → intelligence → activation</p>
      <svg viewBox="0 0 430 260" className="w-full" style={{ maxHeight: 260 }}>
        {/* Edges */}
        {edges.map((e, i) => {
          const from = getNode(e.from);
          const to = getNode(e.to);
          return (
            <line
              key={i}
              x1={from.x + 40}
              y1={from.y + 18}
              x2={to.x + 40}
              y2={to.y + 18}
              stroke="hsl(220, 16%, 22%)"
              strokeWidth={1.5}
              strokeDasharray="4 3"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="2s" repeatCount="indefinite" />
            </line>
          );
        })}

        {/* Nodes */}
        {nodes.map((n) => (
          <g key={n.id}>
            <rect
              x={n.x}
              y={n.y}
              width={80}
              height={36}
              rx={8}
              fill="hsl(220, 18%, 12%)"
              stroke={n.color}
              strokeWidth={1}
              opacity={0.9}
            />
            <text
              x={n.x + 40}
              y={n.y + 21}
              textAnchor="middle"
              fill="hsl(210, 20%, 92%)"
              fontSize={9}
              fontWeight={500}
              fontFamily="Inter, system-ui"
            >
              {n.label}
            </text>
            {/* Glow dot */}
            <circle cx={n.x + 8} cy={n.y + 8} r={2.5} fill={n.color} opacity={0.8}>
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Layer Labels */}
        <text x={420} y={45} fill="hsl(215, 15%, 40%)" fontSize={8} textAnchor="end" fontFamily="JetBrains Mono">INGESTION</text>
        <text x={420} y={135} fill="hsl(215, 15%, 40%)" fontSize={8} textAnchor="end" fontFamily="JetBrains Mono">UNIFICATION</text>
        <text x={420} y={225} fill="hsl(215, 15%, 40%)" fontSize={8} textAnchor="end" fontFamily="JetBrains Mono">ACTIVATION</text>
      </svg>
    </div>
  );
};

export default DataLineage;
