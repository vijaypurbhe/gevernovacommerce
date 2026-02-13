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

// Agent conversation mock responses
export const agentConversations: Record<string, { greeting: string; responses: Record<string, string> }> = {
  revenue: {
    greeting: `I'm actively monitoring all revenue streams across your $42.8M monthly operation. Here's my current assessment:

**Key Observations:**
- Electronics category is outperforming by 18% vs forecast
- Holiday campaign ROI at 7.2x (above 5.5x target)
- B2B segment showing unexpected 12% growth

What would you like to explore? You can ask me about specific categories, channels, or time periods.`,
    responses: {
      electronics: `**Electronics Category Deep Dive**

📊 **Performance:** $8.4M revenue (+18% vs forecast)
- Top SKU: Wireless Earbuds Pro ($1.2M, 340% above forecast)
- Smart Home devices surging: +42% WoW
- Laptop category flat (-2%) due to supply constraints

**Recommendation:** Increase electronics ad spend by 15% ($48K) to capture remaining holiday demand. Predicted incremental revenue: **+$1.2M** at current conversion rates.

Shall I execute this budget reallocation?`,
      forecast: `**Q1 Revenue Forecast**

| Scenario | Revenue | vs Current |
|----------|---------|------------|
| Pessimistic | $38.2M | -10.7% |
| Baseline | $44.6M | +4.2% |
| Optimistic | $49.1M | +14.7% |

**Key Drivers:**
1. Holiday momentum carry-over (+$2.1M)
2. New product launches in Feb (+$1.4M)
3. Seasonal dip risk in Jan (-$3.2M)

Confidence: **91%** based on 18mo historical patterns + current pipeline.`,
      default: `Based on current data, revenue is performing well at $42.8M (+5.2% MoM). The strongest contributors are:

1. **Electronics:** $8.4M (+18% vs forecast)
2. **Fashion:** $6.2M (on target)
3. **Home & Garden:** $4.8M (+8%)

I'm watching two risk factors:
- Paid search CPCs rising 22% on brand terms
- Inventory constraints on 12 high-velocity SKUs

**Net outlook:** Positive. Projected to hit $44.6M next month if current trends hold. Want me to drill into any specific area?`,
    },
  },
  personalization: {
    greeting: `⚠️ **Active Alert:** Mobile conversion has dropped 3.1% in the last 48 hours.

I've completed my diagnostic analysis:

**Root Cause:** PDP load time increased from 2.5s → 4.2s on iOS devices after the Sept 14 deployment. Image payload grew 68% due to uncompressed hero images.

**Impact:** ~$890K/month in lost revenue across 1.2M monthly mobile sessions.

**Ready to fix:** I have a solution staged. Ask me about the fix, the affected segments, or the A/B test results.`,
    responses: {
      fix: `**Proposed Fix: Mobile PDP Optimization**

🔧 **Changes:**
1. WebP image compression (68% size reduction)
2. Lazy loading for below-fold images
3. Critical CSS inlining for above-fold content

**Expected Results:**
- Load time: 4.2s → 2.1s (50% improvement)
- Conversion uplift: +1.5% (based on Q2 A/B test, n=240K)
- Revenue recovery: **+$890K/month**

**Risk:** Low. Desktop/tablet unaffected. Rollback available in <5 min.

**Timeline:** Can deploy in 2 hours with your approval. Shall I proceed?`,
      segments: `**Affected Customer Segments:**

| Segment | Sessions | Conv. Drop | Revenue Impact |
|---------|----------|------------|----------------|
| Mobile iOS | 480K | -4.2% | -$520K |
| Mobile Android | 320K | -1.8% | -$220K |
| Tablet | 180K | -0.5% | -$80K |
| Desktop | 620K | No change | $0 |

**Most impacted personas:**
- "Browse & Buy" shoppers (high intent, low patience)
- New customers (65% higher bounce rate)
- Premium segment showing 2x higher abandonment

The iOS impact is most severe because Safari's image rendering pipeline handles large payloads differently than Chrome.`,
      default: `I'm your Personalization Agent, focused on delivering 1:1 experiences across 2M customer profiles.

**Current Status:**
- 🔴 Mobile conversion anomaly (active investigation)
- 🟢 Desktop personalization performing at 98.4% accuracy
- 🟢 Email content personalization: 34% higher CTR vs generic

**Active Experiments:**
- Homepage hero personalization (n=180K, +2.1% uplift)
- PDP recommendation engine v3 (n=95K, +$4.20 AOV)
- Cart cross-sell optimization (n=62K, pending significance)

What would you like to dive into?`,
    },
  },
  merchandising: {
    greeting: `I'm tracking 150K SKUs across all categories. Here's what needs your attention:

**🔥 Hot Items (Demand Surge):**
- SKU #A4821 (Wireless Earbuds): 340% above forecast, 6 days inventory
- SKU #B1293 (Smart Thermostat): 180% above forecast, 12 days inventory

**⚠️ Stockout Risks:**
- 8 SKUs projected to stock out within 7 days
- Estimated lost revenue: **$480K** if not addressed

**📉 Slow Movers:**
- 1,240 SKUs below 20% of forecast
- $2.1M in excess inventory recommended for markdown

Ask me about specific products, reorder recommendations, or markdown strategy.`,
    responses: {
      reorder: `**Automated Reorder Recommendations**

| SKU | Product | Current Stock | Velocity | Reorder Qty | Urgency |
|-----|---------|--------------|----------|-------------|----------|
| A4821 | Wireless Earbuds | 1,200 | 200/day | 5,000 | 🔴 Critical |
| B1293 | Smart Thermostat | 840 | 70/day | 2,500 | 🟡 High |
| C4567 | USB-C Hub | 320 | 45/day | 1,500 | 🟡 High |
| D8901 | Desk Lamp | 180 | 30/day | 1,000 | 🟠 Medium |

**Total reorder value:** $342K
**Projected revenue protection:** $480K
**Supplier lead times:** 3-7 business days

I can trigger these POs automatically. Approve all, or select specific items?`,
      markdown: `**Markdown Optimization Strategy**

 I've identified 1,240 slow-moving SKUs with $2.1M in excess inventory:

**Recommended Markdown Tiers:**
- **Tier 1 (15% off):** 420 SKUs, projected 60% sell-through in 14 days
- **Tier 2 (25% off):** 380 SKUs, projected 75% sell-through in 21 days
- **Tier 3 (40% off):** 440 SKUs, projected 85% sell-through in 30 days

**Financial Impact:**
- Gross markdown cost: $380K
- Recovered inventory value: $1.72M
- Net benefit: **+$1.34M** vs holding costs

Shall I stage these markdowns in SFCC?`,
      default: `Here's your merchandising health overview:

**Inventory Health Score: 78/100**

- ✅ 82% of SKUs within optimal stock range
- ⚠️ 8 SKUs at critical stockout risk
- 📦 1,240 SKUs flagged for markdown
- 🔄 Average inventory turn: 4.2x (target: 4.5x)

**Category Performance:**
- Electronics: 🔥 Outperforming (+18%)
- Fashion: ✅ On target
- Home: ✅ Slight over (+8%)
- Beauty: ⚠️ Below target (-6%)

I'm continuously optimizing product placement, carousel rankings, and category page layouts based on real-time demand signals.`,
    },
  },
  retention: {
    greeting: `🔄 **Currently Acting:** I've identified 342 high-value customers at elevated churn risk and I'm preparing a retention intervention.

**Segment Profile:**
- Average LTV: $2,840
- Average tenure: 3.2 years
- Common churn signals: 60% fewer sessions, 45% fewer email opens
- Aggregate at-risk LTV: **$684K**

**Proposed Intervention:**
Personalized loyalty tier upgrade + exclusive early access to spring collection

**Historical success rate:** 72% retention for similar interventions

Ask me about the at-risk customers, the intervention details, or past retention campaign results.`,
    responses: {
      customers: `**At-Risk Customer Analysis (Top 10 by LTV)**

| Customer | LTV | Churn Score | Last Purchase | Signal |
|----------|------|------------|---------------|--------|
| Sarah Chen | $4,280 | 67% | 32 days | Email disengagement |
| Michael Torres | $3,920 | 71% | 28 days | Browse frequency -80% |
| Emma Williams | $3,650 | 58% | 45 days | Cart abandonment 3x |
| James Park | $3,410 | 74% | 52 days | Support complaint |
| Lisa Johnson | $3,280 | 62% | 38 days | Competitor browsing detected |

**Common Patterns:**
- 78% showed email disengagement first (14-day lead indicator)
- 45% had a negative support interaction in last 60 days
- 62% browsed competitor sites (Data Cloud cross-reference)

Shall I generate personalized offers for each customer?`,
      intervention: `**Retention Intervention Plan**

**Phase 1: Immediate (Day 1-3)**
- Personalized email from brand team (not marketing template)
- Exclusive loyalty tier upgrade notification
- $50 appreciation credit (no minimum purchase)

**Phase 2: Engagement (Day 4-14)**
- Early access to spring collection (72h before public)
- Personalized product recommendations based on purchase DNA
- Dedicated customer success manager for top 50 accounts

**Phase 3: Measurement (Day 15-30)**
- Track re-engagement metrics
- A/B test offer variations
- Adjust strategy based on response patterns

**Projected Results:**
- 72% retention rate (vs 28% without intervention)
- $684K protected LTV
- Cost of intervention: ~$28K
- **ROI: 24.4x**`,
      default: `**Retention Dashboard**

📊 **Overall Health:**
- 30-day retention: 84.2% (target: 85%)
- 90-day retention: 71.8% (target: 75%)
- Repeat purchase rate: 42.6%

**Active Interventions:**
1. 🔴 High-value churn prevention (342 customers, $684K at risk)
2. 🟡 Win-back campaign for 60-day inactive (1,240 customers)
3. 🟢 New customer nurture sequence (89K customers, 68% engagement)

**Recent Wins:**
- Q3 churn prevention saved $1.2M in LTV
- Win-back campaign recovered 18% of lapsed customers
- NPS improved from 42 → 56 after support workflow changes`,
    },
  },
  marketing: {
    greeting: `I'm continuously optimizing your $800K/month marketing budget across all channels.

**Current Budget Health:**
- Total spend: $800K/month
- Blended ROAS: 5.8x
- Best performer: Email (12.4x ROAS)
- Underperformer: Social (4.1x ROAS, declining)

**🔔 Active Recommendation:**
I've detected diminishing returns on social spend above $150K. Recommend shifting $120K to email automation for a projected **+$340K incremental revenue**.

Ask me about channel performance, budget scenarios, or campaign optimization.`,
    responses: {
      channels: `**Channel Performance Deep Dive**

| Channel | Spend | Revenue | ROAS | Trend | Action |
|---------|-------|---------|------|-------|--------|
| Paid Search | $320K | $1.98M | 6.2x | ↗️ Stable | Optimize bids |
| Social | $180K | $738K | 4.1x | ↘️ Declining | Reduce spend |
| Email | $60K | $744K | 12.4x | ↗️ Growing | Scale up |
| Display | $120K | $384K | 3.2x | → Flat | Monitor |
| Affiliate | $80K | $464K | 5.8x | ↗️ Growing | Expand partners |
| Video | $40K | $84K | 2.1x | ↘️ New | Test & learn |

**Key Insight:** Email has 3x capacity headroom. Every $1 shifted from social to email yields $2.40 more revenue based on current conversion data.

**Multi-touch attribution** shows email influences 34% of all conversions (often as the final touchpoint).`,
      scenarios: `**Budget Scenario Modeling**

**Scenario A: Conservative Rebalance**
- Shift $60K from social → email
- Predicted impact: +$170K revenue/month
- Risk: Low

**Scenario B: Aggressive Optimization (Recommended)**
- Shift $120K from social → email ($96K) + affiliate ($24K)
- Predicted impact: +$340K revenue/month
- Risk: Medium (social reach may decline 15%)

**Scenario C: Growth Mode**
- Increase total budget by $100K, focus on email + affiliate
- Predicted impact: +$580K revenue/month
- Risk: Medium-High (requires budget approval)

Each scenario includes automatic rollback if ROAS drops below 4x threshold. Which scenario would you like to explore?`,
      default: `**Marketing Intelligence Summary**

I'm processing data from GA4, Marketing Cloud, and Data Cloud to optimize your marketing spend in real-time.

**Today's Highlights:**
- 📧 Email campaign "Winter Preview" achieving 28% open rate (vs 22% avg)
- 🔍 Paid search: New Performance Max campaign outperforming manual by 34%
- 📱 Social: TikTok ROAS up 18% after creative refresh
- 🎯 Retargeting: Dynamic product ads showing 8.2x ROAS

**Upcoming Optimizations:**
1. Automated bid adjustments for Black Friday (T-45 days)
2. Audience expansion based on lookalike modeling
3. Creative fatigue detection and auto-rotation

What area would you like to optimize?`,
    },
  },
};

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

export const aiResponses: Record<string, string> = {
  revenue: `**Root Cause Analysis**

Revenue declined 4.2% ($1.8M) in the last month driven by three key factors:

1. **Mobile Conversion Drop** (-$890K): PDP load times increased 68% on iOS after the Sept 14 deployment, causing a 3.1% conversion decline on mobile.

2. **Paid Search ROAS Decline** (-$620K): CPCs increased 22% in core brand terms due to competitor bidding. Recommend shifting 15% of budget to performance max campaigns.

3. **Seasonal Category Shift** (-$290K): Summer categories winding down without adequate fall transition merchandising.

**Predicted Impact if Addressed:** Recovery of $1.4M (78%) within 2 weeks through mobile optimization and budget reallocation.

**Recommended Actions:**
- Deploy mobile PDP optimization (high priority)
- Reallocate paid search budget (medium priority)  
- Accelerate fall merchandising calendar (medium priority)`,

  segment: `**Segment Profitability Analysis**

| Segment | Customers | Revenue | Margin | Growth |
|---------|-----------|---------|--------|--------|
| Premium Loyal | 42K | $18.2M | 42% | +12% |
| Rising Stars | 128K | $12.4M | 38% | +28% |
| At-Risk High Value | 38K | $6.8M | 35% | -15% |
| Occasional | 340K | $4.2M | 28% | +3% |
| New | 89K | $1.2M | 22% | +45% |

**Key Insight:** "Rising Stars" segment shows highest growth potential. Recommend increasing personalization investment for this cohort—predicted LTV uplift of 34% with targeted nurture sequences.

**At-Risk Alert:** 38K high-value customers showing disengagement signals. Retention Agent has been activated with personalized interventions.`,

  conversion: `**Conversion Funnel Analysis**

📊 **Overall: 3.42% (↓0.18% MoM)**

**Funnel Breakdown:**
- Landing → PDP: 42% (stable)
- PDP → Add to Cart: 18% (↓2.1%)  ← **Primary drop**
- Cart → Checkout: 64% (stable)
- Checkout → Purchase: 78% (↑1.2%)

**Root Cause of PDP → Cart Decline:**
1. Mobile load time regression (4.2s vs 2.5s target)
2. Price comparison widget showing competitor prices 8% lower
3. "Add to Cart" button below fold on 3 product templates

**Quick Wins:**
- Fix mobile load time → +1.5% conversion (+$890K/month)
- A/B test CTA button placement → +0.3% estimated
- Review pricing strategy on top 50 SKUs

**Personalization Agent** has already staged the mobile fix for your approval.`,

  inventory: `**Inventory Intelligence Report**

📦 **Health Score: 78/100**

**Critical Alerts:**
- 🔴 8 SKUs will stock out within 7 days ($480K at risk)
- 🟡 24 SKUs below safety stock threshold
- 🟢 82% of inventory within optimal range

**Top Velocity Items:**
1. Wireless Earbuds Pro: 200 units/day (6 days remaining)
2. Smart Thermostat: 70 units/day (12 days remaining)
3. USB-C Hub: 45 units/day (7 days remaining)

**Slow Movers ($2.1M excess):**
- 1,240 SKUs below 20% of forecast
- Recommended markdown strategy: 3-tier approach
- Projected recovery: $1.72M (82% of excess value)

**Merchandising Agent** has prepared reorder POs for critical items. Approve?`,

  customer: `**Customer Intelligence Summary**

👥 **2M Active Customers | 847K Monthly Active**

**Lifecycle Distribution:**
- New (0-30d): 89K (10.5%)
- Growing (31-180d): 234K (27.6%)
- Mature (181d-2y): 386K (45.6%)
- At-Risk: 98K (11.6%)
- Lapsed (>1y): 40K (4.7%)

**Key Metrics:**
- Average LTV: $1,284
- Median time to 2nd purchase: 18 days
- 90-day retention: 71.8%
- NPS: 56 (↑14 from Q2)

**Identity Resolution:**
- 78% of customers matched across 3+ channels
- Data Cloud unification rate: 94.2%
- Average touchpoints per customer: 8.4

**Next Best Actions generated** for 342K customers in the active pipeline.`,

  marketing: `**Marketing Budget Optimization**

💰 **Total Spend: $800K/month | Blended ROAS: 5.8x**

**Channel Efficiency:**
| Channel | Spend | ROAS | Recommendation |
|---------|-------|------|----------------|
| Email | $60K | 12.4x | ↑ Scale (+$36K) |
| Affiliate | $80K | 5.8x | ↑ Expand (+$10K) |
| Paid Search | $320K | 6.2x | → Optimize bids |
| Display | $120K | 3.2x | → Monitor |
| Social | $180K | 4.1x | ↓ Reduce (-$36K) |
| Video | $40K | 2.1x | ↓ Test & learn |

**AI Recommendation:** Shift $120K from social to email ($96K) + affiliate ($24K).
- Predicted incremental revenue: **+$340K/month**
- Improved blended ROAS: 5.8x → 6.4x

**Multi-Touch Attribution** shows email as the #1 conversion-assisting channel (34% of all conversions).`,

  default: `I've analyzed your query across our unified data ecosystem (2M customers, 150K SKUs, 18 months of data).

**Quick Summary:**
Based on current trends, the business is performing well overall at $42.8M monthly revenue (+5.2% MoM), with specific areas of concern in mobile conversion (-3.1%) and social ROAS (declining from 5.3x to 4.1x).

**Active AI Agents:**
- 💰 Revenue Agent: Monitoring, revenue above forecast
- 🎯 Personalization Agent: Alert, mobile conversion fix ready
- 📦 Merchandising Agent: Monitoring, 8 SKUs need reorder
- 🔄 Retention Agent: Acting, protecting $684K in at-risk LTV
- 📊 Marketing Agent: Recommending $120K budget reallocation

**Suggested Questions:**
- "Why did conversion drop this month?"
- "Show me inventory risks"
- "Optimize my marketing budget"
- "Which segments are most profitable?"
- "What's the churn risk for premium customers?"

What would you like to explore?`,
};
