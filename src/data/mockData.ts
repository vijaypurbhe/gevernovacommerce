// Mock data for the commerce intelligence platform

export const kpiData = [
  { label: "Revenue", value: "$42.8M", change: +5.2, trend: "up" as const, period: "vs last month" },
  { label: "Conversion Rate", value: "3.42%", change: -0.18, trend: "down" as const, period: "vs last month" },
  { label: "AOV", value: "$127.50", change: +3.8, trend: "up" as const, period: "vs last month" },
  { label: "Active Customers", value: "847K", change: +12.4, trend: "up" as const, period: "vs last month" },
  { label: "Cart Abandonment", value: "68.2%", change: +2.1, trend: "down" as const, period: "vs last month" },
  { label: "CLV (Avg)", value: "$1,284", change: +7.6, trend: "up" as const, period: "vs last quarter" },
  { label: "Inventory Velocity", value: "4.2x", change: -0.3, trend: "down" as const, period: "vs last month" },
  { label: "ROAS", value: "5.8x", change: +0.4, trend: "up" as const, period: "vs last month" },
];

export const revenueChartData = [
  { month: "Jul", revenue: 35200000, target: 34000000 },
  { month: "Aug", revenue: 37800000, target: 35500000 },
  { month: "Sep", revenue: 36100000, target: 37000000 },
  { month: "Oct", revenue: 39400000, target: 38000000 },
  { month: "Nov", revenue: 44200000, target: 42000000 },
  { month: "Dec", revenue: 48900000, target: 46000000 },
  { month: "Jan", revenue: 40700000, target: 41000000 },
  { month: "Feb", revenue: 38200000, target: 40000000 },
  { month: "Mar", revenue: 41500000, target: 41500000 },
  { month: "Apr", revenue: 39800000, target: 42000000 },
  { month: "May", revenue: 43100000, target: 43000000 },
  { month: "Jun", revenue: 42800000, target: 44000000 },
];

export const channelData = [
  { channel: "Organic Search", revenue: 14800000, sessions: 2100000, conversion: 3.8, roas: null },
  { channel: "Paid Search", revenue: 10200000, sessions: 890000, conversion: 3.1, roas: 6.2 },
  { channel: "Social", revenue: 6400000, sessions: 1200000, conversion: 2.4, roas: 4.1 },
  { channel: "Email", revenue: 7200000, sessions: 420000, conversion: 5.8, roas: 12.4 },
  { channel: "Direct", revenue: 4200000, sessions: 680000, conversion: 3.2, roas: null },
];

export type AgentStatus = "monitoring" | "alert" | "acting";

export interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  insight: string;
  confidence: number;
  action: string;
  impact: string;
  icon: string;
}

export const agents: Agent[] = [
  {
    id: "revenue",
    name: "Revenue Agent",
    status: "monitoring",
    insight: "Revenue trending 2.7% above Q4 forecast. Holiday campaign over-performing in electronics category.",
    confidence: 94,
    action: "Increase budget allocation to electronics by 15%",
    impact: "+$1.2M projected",
    icon: "💰",
  },
  {
    id: "personalization",
    name: "Personalization Agent",
    status: "alert",
    insight: "Mobile conversion dropped 3.1% in the last 48h. PDP load time increased to 4.2s on iOS devices.",
    confidence: 91,
    action: "Deploy image compression + lazy loading on mobile PDPs",
    impact: "+1.5% conversion uplift",
    icon: "🎯",
  },
  {
    id: "merchandising",
    name: "Merchandising Agent",
    status: "monitoring",
    insight: "SKU #A4821 trending 340% above forecast. Current inventory covers 6 days at current velocity.",
    confidence: 88,
    action: "Trigger reorder for 5,000 units + promote in carousel",
    impact: "Prevent $480K stockout loss",
    icon: "📦",
  },
  {
    id: "retention",
    name: "Retention Agent",
    status: "acting",
    insight: "High-value segment (LTV > $2,000) churn risk increased 18% this week. 342 customers at risk.",
    confidence: 87,
    action: "Deploy targeted loyalty offer via Marketing Cloud",
    impact: "+$684K retained LTV",
    icon: "🔄",
  },
  {
    id: "marketing",
    name: "Marketing Allocation Agent",
    status: "monitoring",
    insight: "Social ROAS declining. Recommend reallocating 20% of social budget to email campaigns.",
    confidence: 82,
    action: "Shift $120K from social to email automation",
    impact: "+$340K incremental revenue",
    icon: "📊",
  },
];

export interface Scenario {
  id: string;
  title: string;
  trigger: string;
  steps: { label: string; detail: string; status: "complete" | "active" | "pending" }[];
  impact: string;
}

export const scenarios: Scenario[] = [
  {
    id: "mobile-conversion",
    title: "Mobile Conversion Recovery",
    trigger: "Conversion rate drops 3% on mobile",
    steps: [
      { label: "Anomaly Detected", detail: "Mobile conversion declined 3.1% over 48h", status: "complete" },
      { label: "Root Cause Identified", detail: "PDP load time increased to 4.2s (target: 2.5s)", status: "complete" },
      { label: "Solution Recommended", detail: "Image compression + lazy loading deployment", status: "complete" },
      { label: "Impact Predicted", detail: "1.5% conversion uplift → $890K/month recovery", status: "active" },
      { label: "Execution Pending", detail: "Awaiting executive approval", status: "pending" },
    ],
    impact: "$890K/month",
  },
  {
    id: "churn-prevention",
    title: "High-Value Churn Prevention",
    trigger: "LTV > $2,000 segment churn risk +18%",
    steps: [
      { label: "Segment Identified", detail: "342 customers with LTV > $2,000 flagged", status: "complete" },
      { label: "Risk Scored", detail: "Churn probability 67% within 30 days", status: "complete" },
      { label: "Offer Generated", detail: "Personalized loyalty tier upgrade + exclusive access", status: "active" },
      { label: "Journey Triggered", detail: "Marketing Cloud activation pending", status: "pending" },
      { label: "Retention Measured", detail: "Projected 72% retention rate", status: "pending" },
    ],
    impact: "$684K retained LTV",
  },
];

export const customerProfile = {
  name: "Sarah Chen",
  id: "CUS-2847193",
  email: "s.chen@example.com",
  ltv: "$4,280",
  predictedLtv: "$6,120",
  churnProbability: 12,
  segment: "Premium Loyal",
  totalOrders: 47,
  avgOrderValue: "$142",
  lastPurchase: "3 days ago",
  preferredChannel: "Mobile App",
  topCategories: ["Electronics", "Home & Garden", "Fashion"],
  recentEvents: [
    { type: "Purchase", detail: "Order #48291 - $218.40", time: "3 days ago" },
    { type: "Browse", detail: "Viewed 12 items in Electronics", time: "1 day ago" },
    { type: "Email", detail: "Opened loyalty tier notification", time: "5 hours ago" },
    { type: "Cart", detail: "Added wireless headphones ($89.99)", time: "2 hours ago" },
  ],
  nextBestAction: "Send personalized bundle offer: headphones + charging case at 15% off",
};

export const aiConversations = [
  {
    query: "Why did revenue decline last month?",
    response: `**Root Cause Analysis**

Revenue declined 4.2% ($1.8M) in the last month driven by three key factors:

1. **Mobile Conversion Drop** (-$890K): PDP load times increased 68% on iOS after the Sept 14 deployment, causing a 3.1% conversion decline on mobile.

2. **Paid Search ROAS Decline** (-$620K): CPCs increased 22% in core brand terms due to competitor bidding. Recommend shifting 15% of budget to performance max campaigns.

3. **Seasonal Category Shift** (-$290K): Summer categories winding down without adequate fall transition merchandising.

**Predicted Impact if Addressed:** Recovery of $1.4M (78%) within 2 weeks through mobile optimization and budget reallocation.

**Recommended Actions:**
- Deploy mobile PDP optimization (high priority)
- Reallocate paid search budget (medium priority)  
- Accelerate fall merchandising calendar (medium priority)`,
  },
];
