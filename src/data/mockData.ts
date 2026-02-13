// Mock data for GE Vernova Commerce Intelligence Platform

export const kpiData = [
  { label: "Equipment Orders", value: "$8.2B", change: +6.8, trend: "up" as const, period: "vs last quarter" },
  { label: "Services Revenue", value: "$4.6B", change: +4.2, trend: "up" as const, period: "vs last quarter" },
  { label: "Backlog", value: "$118B", change: +11.3, trend: "up" as const, period: "vs prior year" },
  { label: "Fleet Availability", value: "94.7%", change: +1.2, trend: "up" as const, period: "vs last quarter" },
  { label: "Outage Days Saved", value: "2,840", change: +22.4, trend: "up" as const, period: "vs prior year" },
  { label: "Parts Fill Rate", value: "96.1%", change: -0.8, trend: "down" as const, period: "vs last quarter" },
  { label: "Digital Attach Rate", value: "38%", change: +5.4, trend: "up" as const, period: "vs prior year" },
  { label: "CSA Renewal Rate", value: "91.2%", change: +2.1, trend: "up" as const, period: "vs last quarter" },
];

export const revenueChartData = [
  { month: "Q1'24", revenue: 7200000000, target: 7000000000 },
  { month: "Q2'24", revenue: 7800000000, target: 7500000000 },
  { month: "Q3'24", revenue: 8100000000, target: 7800000000 },
  { month: "Q4'24", revenue: 8900000000, target: 8200000000 },
  { month: "Q1'25", revenue: 7600000000, target: 7800000000 },
  { month: "Q2'25", revenue: 8200000000, target: 8000000000 },
];

export const channelData = [
  { channel: "Gas Power", revenue: 4200000000, sessions: 342, conversion: 28.4, roas: null },
  { channel: "Wind", revenue: 2800000000, sessions: 218, conversion: 22.1, roas: null },
  { channel: "Electrification", revenue: 1900000000, sessions: 186, conversion: 31.2, roas: null },
  { channel: "Power Conversion", revenue: 680000000, sessions: 94, conversion: 26.8, roas: null },
  { channel: "Grid Solutions", revenue: 1100000000, sessions: 128, conversion: 24.6, roas: null },
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
    name: "Revenue & Orders Agent",
    status: "monitoring",
    insight: "Gas Power equipment orders trending 8.2% above forecast. HA turbine demand accelerating in Middle East and Southeast Asia.",
    confidence: 94,
    action: "Accelerate proposal pipeline for 4 qualified HA opportunities",
    impact: "+$1.8B potential orders",
    icon: "⚡",
  },
  {
    id: "fleet",
    name: "Fleet Performance Agent",
    status: "alert",
    insight: "Anomaly detected: 7HA.03 unit at Dammam plant showing 2.1% heat rate degradation. Compressor fouling pattern matches pre-failure signature.",
    confidence: 92,
    action: "Schedule predictive wash + deploy remote diagnostic team",
    impact: "Prevent $12M unplanned outage",
    icon: "🔧",
  },
  {
    id: "supply",
    name: "Supply Chain Agent",
    status: "monitoring",
    insight: "Hot gas path parts lead time extended 3 weeks for 9F fleet. Nickel alloy supplier capacity constrained through Q3.",
    confidence: 88,
    action: "Activate alternate supplier + pre-position critical spares at 6 regional hubs",
    impact: "Maintain 96%+ fill rate",
    icon: "📦",
  },
  {
    id: "retention",
    name: "CSA Renewal Agent",
    status: "acting",
    insight: "12 Contractual Service Agreements worth $2.4B approaching renewal in next 90 days. 3 accounts showing competitive engagement signals.",
    confidence: 87,
    action: "Deploy proactive value reviews + customized renewal proposals with digital upsell",
    impact: "+$2.4B renewal pipeline",
    icon: "🔄",
  },
  {
    id: "grid",
    name: "Grid Modernization Agent",
    status: "monitoring",
    insight: "IRA/IIJA-driven grid investment pipeline expanded 34%. Transformer demand exceeding manufacturing capacity by 18%.",
    confidence: 85,
    action: "Prioritize HVDC and transformer quotes for IRA-eligible projects",
    impact: "+$640M qualified pipeline",
    icon: "🔌",
  },
];

// Agent conversation mock responses - GE Vernova context
export const agentConversations: Record<string, { greeting: string; responses: Record<string, string> }> = {
  revenue: {
    greeting: `I'm tracking equipment orders and services revenue across all GE Vernova segments. Let me walk you through what I'm seeing right now.\n\nThe headline is strong — equipment orders hit $8.2B this quarter, up 6.8% versus plan. But there's an interesting story underneath.\n\n**What's driving the beat:**\n- Gas Power HA turbine orders are surging, particularly in the Middle East where decarbonization timelines are pulling forward\n- Electrification segment is seeing a 31% win rate, highest in 3 years\n- Wind offshore pipeline just added 2 new framework agreements in Europe\n\nI've got a few areas I'd recommend we dig into. What's on your mind?`,
    responses: {
      gas: `So here's what's happening in Gas Power specifically — and honestly, this is probably the strongest position I've seen in the data going back 18 months.\n\n**The HA platform is the story.** We've got 14 active opportunities in various stages:\n- 4 are in final commercial negotiation (combined value ~$1.8B)\n- 6 more in technical evaluation phase\n- Win probability on the near-term 4 is sitting at 72% based on competitive positioning\n\n**Regionally:**\n- Middle East: 6 opportunities — Saudi Arabia's capacity expansion is real, Dammam and Yanbu both have follow-on potential\n- Southeast Asia: 4 opportunities — Vietnam and Philippines replacing aging coal capacity\n- Americas: 3 opportunities — data center power demand is creating greenfield gas opportunities we didn't have 12 months ago\n- Europe: 1 opportunity — hydrogen-ready spec giving us an edge\n\nThe thing I'd flag is timing. Three of these four near-term deals have decision dates in the next 45 days. I've already prepped proposal acceleration packages — want me to push those to the commercial teams?`,
      forecast: `Let me pull together the forward view. I'm cross-referencing our pipeline data with macroeconomic signals, IRA/IIJA funding flows, and competitive intelligence.\n\n**Full Year 2025 Outlook:**\n\n| Scenario | Orders | Revenue | Margin |\n|----------|--------|---------|--------|\n| Downside | $28.4B | $33.1B | 8.2% |\n| Base | $32.8B | $36.4B | 9.8% |\n| Upside | $35.6B | $38.2B | 11.1% |\n\n**Key assumptions in the base case:**\n- Gas Power continues current momentum (no macro shock)\n- 3 of 4 near-term HA deals close\n- Wind offshore recovers to planned cadence in H2\n- Grid/Electrification captures 25%+ of IRA-eligible pipeline\n\n**What I'm watching closely:**\n1. Natural gas prices — if Henry Hub stays below $3.50, combined cycle economics remain compelling vs renewables-only\n2. Interest rates — project financing costs are the #1 delay factor right now\n3. Supply chain — nickel alloy and transformer steel availability could cap upside\n\nMy confidence on the base case is 91%. The upside scenario requires wind offshore timing to accelerate, which I'm currently rating at 35% probability.`,
      default: `Let me give you the current picture across the portfolio.\n\n**Orders by Segment (YTD):**\n- Gas Power: $4.2B (+12% vs plan) — HA platform driving the beat\n- Wind: $2.8B (-4% vs plan) — offshore timing delays, onshore stable\n- Electrification: $1.9B (+8% vs plan) — grid infrastructure demand strong\n- Power Conversion: $680M (on plan)\n- Grid Solutions: $1.1B (+6% vs plan)\n\n**Services backlog is the real anchor here** — $118B total, which gives us incredible visibility. CSA renewal rates at 91.2% mean the recurring revenue base is solid.\n\nWhat I'd highlight to leadership: the Gas Power momentum is real but concentrated. If we execute on the four near-term HA opportunities, we're looking at a beat. If even one slips to Q1 next year, we'll be right at plan.\n\nWant me to dig into any specific segment or region?`,
    },
  },
  fleet: {
    greeting: `I need to bring something to your attention right away.\n\nI've been monitoring the global installed fleet — 7,000+ gas turbines, 40,000+ wind turbines — and one of our units just crossed a threshold that concerns me.\n\n**⚠️ Active Alert: 7HA.03 Unit #4 at SEC Dammam PP14**\n\nThe unit's heat rate has degraded 2.1% over the last 72 hours. That might not sound like much, but the pattern matches a compressor fouling signature I've seen precede forced outages in 3 other HA units over the past 18 months.\n\nIf this progresses unchecked, we're looking at a potential forced outage in 10-14 days. For a unit running at 95% capacity factor in a Saudi summer — that's roughly $12M in customer impact and significant relationship risk on a $4.2B account.\n\nI have a recommended action ready. Want me to walk you through it, or would you rather see the technical diagnostics first?`,
    responses: {
      fix: `Here's what I'm recommending, and I've already pre-staged the resources:\n\n**Immediate (Next 24h):**\n1. Deploy remote diagnostic deep-dive from Atlanta monitoring center — I've reserved a slot on the 7HA analytics team\n2. Share preliminary findings with SEC plant operations team (they'll want to know we caught this early)\n3. Review last 3 compressor wash records — I'm seeing a possible pattern of insufficient wash effectiveness\n\n**Short-term (48-72h):**\n1. Schedule online compressor water wash during next planned power reduction window\n2. If wash doesn't restore 1.5% of the 2.1% degradation → recommend offline crank wash\n3. Position borescope inspection team in region (they're currently finishing a job in Abu Dhabi, 2-day mobilization)\n\n**Cost-Benefit:**\n- Proactive wash + inspection: ~$180K\n- Prevented forced outage: $12M+ (including replacement power costs to SEC)\n- Customer satisfaction: Immeasurable — this is their flagship expansion plant\n\n**What makes me confident:** The fouling signature I'm detecting has a 89% correlation with the failure mode database. The 3 prior cases where we intervened proactively, we avoided outage 100% of the time.\n\nShall I trigger the diagnostic reservation and draft the customer communication?`,
      diagnostics: `Let me show you the technical picture.\n\n**Unit Operating Data (Last 72h):**\n- Compressor discharge pressure: Trending down 0.8% (normal: stable ±0.2%)\n- Exhaust temperature spread: Increased from 12°C to 18°C across cans\n- Heat rate: 2.1% degradation (from 5,820 BTU/kWh baseline to 5,942 BTU/kWh)\n- Vibration: Within limits but proxy 3 bearing showing slight upward trend\n\n**Pattern Match Analysis:**\nI compared this signature against our fleet database of 1,847 similar operating events:\n- 89% match to "progressive compressor fouling — inlet filter bypass"\n- 7% match to "IGV calibration drift"\n- 4% other/noise\n\n**Environmental Context:**\n- Dammam has been experiencing elevated dust/sandstorm activity (PM10 readings 3x normal for past 2 weeks)\n- Unit is running on extended continuous duty — 847 hours since last wash (recommended interval: 720 hours)\n\n**Why this matters beyond this unit:**\nI'm seeing similar early indicators on 2 other HA units in the Gulf region. If this is an environmental pattern, we may want to adjust wash intervals fleet-wide for Gulf-based units during summer months.\n\nWant me to pull the cross-fleet analysis?`,
      default: `Here's the fleet health overview across the GE Vernova installed base.\n\n**Gas Turbine Fleet (7,000+ units):**\n- Overall availability: 94.7% (target: 94.0%)\n- Units with active alerts: 14 (of which 3 are critical)\n- Predictive maintenance interventions this quarter: 47 (prevented est. $340M in unplanned downtime)\n\n**Wind Fleet (40,000+ turbines):**\n- Average availability: 96.2%\n- Active predictive alerts: 28 gearbox, 12 generator, 8 blade\n- Proactive interventions saved 2,840 outage-days this year\n\n**Digital Twin Coverage:**\n- 78% of HA fleet has active digital twin models\n- Twin accuracy: 97.4% correlation with actual performance\n- Predictive lead time: Average 14 days advance warning on failure modes\n\nThe Dammam alert is my top priority right now, but I'm also watching a bearing temperature trend on a 9F unit in Egypt that I'll escalate if it continues another 24 hours.\n\nWhat would you like to drill into?`,
    },
  },
  supply: {
    greeting: `I'm monitoring the end-to-end supply chain across 12,000+ suppliers and 450+ commodity categories. Here's my current situation assessment.\n\n**Overall Supply Chain Health: 82/100** (down from 87 last quarter)\n\nThe main pressure point right now is in our hot gas path components — specifically the nickel-based superalloys used in first-stage turbine buckets and nozzles.\n\n**What's happening:**\n- Our primary Inconel 718 supplier (Haynes International) has notified us of a 3-week lead time extension\n- This affects approximately 340 planned HGP inspections in the next 6 months\n- Root cause: their Kokomo facility had an unplanned furnace outage + elevated demand from aerospace sector\n\n**Parts fill rate** has dipped from 96.9% to 96.1%. Still above target, but the trend concerns me.\n\nI've already mapped out contingency options. Would you like to see the mitigation plan, or should we look at the broader commodity picture?`,
    responses: {
      reorder: `Here's what I'm recommending for the critical spares pre-positioning:\n\n**Tier 1 — Immediate Action (HGP Components):**\n\n| Part | Current Stock | 6mo Demand | Gap | Action |\n|------|-------------|------------|-----|--------|\n| 1st Stage Buckets (7HA) | 42 sets | 68 sets | 26 | Activate Precision Castparts (alt supplier) |\n| 1st Stage Nozzles (7HA) | 38 sets | 52 sets | 14 | Pull forward from Greenville inventory |\n| Combustion Liners (9F) | 124 units | 180 units | 56 | Split order: Haynes (60%) + Arconic (40%) |\n| Transition Pieces | 86 units | 112 units | 26 | Greenville can accelerate |\n\n**Tier 2 — Pre-positioning at Regional Hubs:**\nI want to push safety stock to 6 locations:\n- Houston (Americas)\n- Belfort (Europe)\n- Dubai (Middle East)\n- Singapore (Asia Pacific)\n- Greenville (Manufacturing)\n- Stafford (UK - Wind)\n\n**Investment required:** $48M in additional inventory carry\n**Risk mitigated:** $340M+ in potential outage exposure across 340 planned services\n\nThe ROI is clear. Shall I generate the POs for the alternate supplier activation?`,
      default: `Let me give you the full supply chain picture.\n\n**Commodity Watch List:**\n- 🔴 Nickel Superalloys: 3-week lead time extension, mitigation in progress\n- 🟡 Transformer Steel (grain-oriented): Demand up 40%, lead times stretching to 18 months\n- 🟡 Rare Earth Magnets (wind generators): China export controls creating uncertainty\n- 🟢 Steel Forgings: Stable, multiple qualified sources\n- 🟢 Electronics/Controls: Lead times normalizing post-shortage\n\n**Key Metrics:**\n- Parts fill rate: 96.1% (target: 96.0%)\n- On-time delivery: 89.4% (target: 92.0%) ← watching this\n- Supplier quality: 98.2% first-pass yield\n- Inventory turns: 4.8x\n\n**What I'm proactively doing:**\n1. Qualifying 3 alternate nickel alloy suppliers (will be online Q4)\n2. Building 12-week forward demand signals for top 50 suppliers\n3. Running scenario models on rare earth supply disruption\n\nThe transformer steel situation is the one that could become a bigger issue. Grid segment orders are surging faster than anyone expected, and every utility in America wants transformers yesterday.`,
    },
  },
  retention: {
    greeting: `I've been analyzing our Contractual Service Agreement portfolio and I need to walk you through something that requires attention in the next few weeks.\n\nWe have **12 CSAs worth a combined $2.4B** coming up for renewal in the next 90 days. That's normal — we always have a steady cadence. But what's different this time is the competitive landscape.\n\n**Here's what's concerning me:**\n- 3 of these 12 accounts are showing signals of competitive engagement\n- Specifically: increased RFI activity with Siemens Energy on 2 accounts, and Mitsubishi Power on 1\n- Customer portal engagement has dropped 34% on these 3 accounts over the last quarter\n- Two of them have also delayed their annual business review meetings\n\nThese 3 accounts alone represent **$890M in recurring services revenue**.\n\nThe good news: our renewal rate has been 91.2%, and we have strong technical lock-in on these fleets. But I don't want to be complacent. I've prepared intervention strategies for each account.\n\nWant to see the account-level analysis, or should I walk you through the intervention plan?`,
    responses: {
      customers: `Here are the three accounts I'm flagging, with the signals that triggered my alert:\n\n**1. ACWA Power (Saudi Arabia) — $420M CSA**\n- Fleet: 6x 7HA.03 units across 2 plants\n- Renewal: 67 days\n- Risk signals: Issued RFI to Siemens Energy for "long-term service options assessment"\n- Our position: Strong — we built these plants and have deep digital integration\n- Mitigant: Offer HA upgrade path + hydrogen co-firing roadmap (they're under NEOM pressure to decarbonize)\n\n**2. Tenaga Nasional (Malaysia) — $310M CSA**\n- Fleet: 4x 9F units + 2x 6F units\n- Renewal: 45 days\n- Risk signals: New procurement lead hired from Siemens; portal logins down 60%\n- Our position: Good — 9F fleet dependency, but 6F units could go competitive\n- Mitigant: Digital twin value demonstration + outcome-based pricing model\n\n**3. JERA (Japan) — $160M CSA**\n- Fleet: 3x 7F units (aging)\n- Renewal: 82 days  \n- Risk signals: Exploratory discussions with MHI for fleet modernization\n- Our position: Moderate — units approaching end of first major interval\n- Mitigant: Propose fleet modernization pathway with efficiency upgrade package\n\nFor each of these, I've drafted personalized value review presentations that quantify what our services have delivered — avoided outages, efficiency improvements, digital insight value. Would you like me to queue those up?`,
      intervention: `Here's the three-wave intervention plan I've put together:\n\n**Wave 1 — Value Reinforcement (This Week)**\nFor all 3 at-risk accounts:\n- Generate personalized "Value Delivered" reports showing quantified impact\n- ACWA: $47M in avoided forced outages over contract life\n- Tenaga: 1.8% heat rate improvement worth $12M/year in fuel savings\n- JERA: 97.2% availability vs industry average of 93.1%\n- Schedule executive sponsor calls (VP/SVP level)\n\n**Wave 2 — Strategic Upsell (Week 2-3)**\n- ACWA: Present hydrogen readiness roadmap + advanced digital monitoring package\n- Tenaga: Offer outcome-based pricing pilot — ties our fee to their plant performance\n- JERA: Propose fleet modernization study — show them the path to 5-7% efficiency gain\n\n**Wave 3 — Commercial Close (Week 4-8)**\n- Tailored renewal proposals with multi-year lock-in incentives\n- Digital attach offerings (predictive analytics, remote monitoring, digital twin)\n- Executive relationship reinforcement\n\n**Expected outcome:**\n- Baseline: Renew 10 of 12 (83%) = $2.0B\n- With intervention: Renew 11-12 of 12 (92-100%) = $2.2-2.4B\n- Digital upsell potential: Additional $180M in new digital services\n\nThe total cost of this intervention program is roughly $2.4M. Against $890M at risk, that's a no-brainer ROI.`,
      default: `Here's the overall CSA portfolio health:\n\n**Portfolio Overview:**\n- Total active CSAs: 847\n- Combined contract value: $48.2B\n- Average contract length: 12.4 years\n- Renewal rate (trailing 12 months): 91.2%\n\n**Upcoming Renewals:**\n- Next 30 days: 4 contracts ($680M)\n- Next 90 days: 12 contracts ($2.4B)\n- Next 180 days: 23 contracts ($4.1B)\n\n**Competitive Landscape:**\n- Siemens Energy: Aggressive on 9F/9HA competitive captures, pricing 8-12% below\n- Mitsubishi Power: Targeting J-series fleet for modernization pitches\n- Local ISPs: Growing in emerging markets, particularly on older E/F-class\n\n**What's working in our favor:**\n- Digital twin integration creates switching costs\n- HA platform has no credible third-party alternative for hot gas path\n- Customer satisfaction NPS: 72 (up from 64 last year)\n\nI'm most concerned about the 3 accounts I flagged earlier, but the broader portfolio is healthy. The digital attach strategy is our best defense — customers with our digital solutions renew at 96% vs 87% without.`,
    },
  },
  grid: {
    greeting: `The grid modernization space is moving faster than any of us anticipated, and I want to make sure we're positioned to capture it.\n\n**The macro picture is staggering:**\n- US grid infrastructure investment: $65B+ allocated through IRA/IIJA\n- Global transformer demand: Up 40% year-over-year, with 18-month+ backlogs industry-wide\n- HVDC project pipeline: 34 projects globally in active procurement\n\n**Where GE Vernova sits:**\n- Our Grid Solutions order book is up 34% YTD\n- Transformer manufacturing is running at 104% of nameplate capacity\n- HVDC technology pipeline has 8 active proposals worth $2.1B combined\n\nThe challenge isn't demand — it's capacity. We're turning away work we could profitably execute. I'm modeling expansion scenarios and prioritization frameworks.\n\nWant to explore the IRA pipeline, the capacity constraints, or the competitive landscape?`,
    responses: {
      ira: `Let me break down the IRA/IIJA opportunity landscape:\n\n**Qualified Pipeline by Category:**\n\n| Category | Pipeline | GEV Position | Win Prob |\n|----------|----------|-------------|----------|\n| Grid-enhancing tech | $1.2B | Strong | 35% |\n| Transformer replacements | $2.8B | Capacity-limited | 28% |\n| HVDC interconnects | $4.1B | Differentiated | 42% |\n| Substation modernization | $1.6B | Moderate | 25% |\n| EV charging infra | $0.8B | Emerging | 15% |\n\n**Total addressable: $10.5B** over next 5 years\n\n**What makes this unique:**\n- "Buy American" requirements favor our US manufacturing base\n- Many utilities are dealing with this scale of investment for the first time — they need partners, not just suppliers\n- Our digital grid solutions (ADMS, DER management) create a stickier relationship than hardware alone\n\n**My recommendation:** Focus commercial resources on HVDC (highest margin, most differentiated) and transformer replacements (highest near-term revenue). De-prioritize EV charging infrastructure — margin profile doesn't justify the engineering resources.\n\nI've already flagged 12 specific RFPs that match our sweet spot. Want me to walk through the top 5?`,
      default: `Here's the grid segment landscape:\n\n**Order Book Health:**\n- YTD orders: $1.1B (+34% vs prior year)\n- Backlog: $6.8B\n- Book-to-bill: 1.4x (very healthy)\n\n**Capacity Situation:**\n- Transformer manufacturing: 104% utilization (unsustainable)\n- HVDC converter stations: 2 active builds, 3 in proposal\n- Switchgear: On plan, adequate capacity\n\n**Competitive Intelligence:**\n- Hitachi Energy: Winning on HVDC pricing in Asia\n- Siemens Energy: Strong in European HVDC corridor projects\n- Chinese OEMs: Increasingly competitive on standard transformers, but locked out of IRA-funded projects\n\n**What I'm recommending:**\n1. Prioritize highest-margin transformer orders (utility-scale > industrial)\n2. Invest in manufacturing expansion — Clearwater facility could add 30% capacity for $120M investment\n3. Bundle digital solutions with hardware to improve win rates and margin\n\nThe grid modernization wave is a multi-decade trend. The question isn't whether demand is there — it's whether we can scale to meet it while maintaining quality and margin.`,
    },
  },
};

export interface Scenario {
  id: string;
  title: string;
  trigger: string;
  steps: { label: string; detail: string; status: "complete" | "active" | "pending" }[];
  impact: string;
  deepDive: {
    rootCause: string;
    dataPoints: string[];
    financialImpact: { label: string; value: string }[];
    recommendation: string;
  };
}

export const scenarios: Scenario[] = [
  {
    id: "turbine-anomaly",
    title: "Turbine Anomaly Prevention",
    trigger: "7HA.03 heat rate degradation exceeds 2σ threshold at SEC Dammam",
    steps: [
      { label: "Anomaly Detected", detail: "Heat rate degraded 2.1% over 72h — compressor fouling pattern identified", status: "complete" },
      { label: "Root Cause Analyzed", detail: "Inlet filter bypass suspected + 847h since last wash (720h recommended)", status: "complete" },
      { label: "Solution Recommended", detail: "Online compressor wash + borescope inspection + filter replacement", status: "complete" },
      { label: "Impact Predicted", detail: "Prevents $12M forced outage + protects $4.2B account relationship", status: "active" },
      { label: "Execution Pending", detail: "Awaiting plant operations approval for wash window", status: "pending" },
    ],
    impact: "$12M saved",
    deepDive: {
      rootCause: "Elevated sandstorm activity in Dammam region (PM10 readings 3x normal for 2 weeks) combined with extended continuous operation beyond recommended wash interval. The compressor fouling signature shows 89% correlation with 3 prior forced outage events across the HA fleet.",
      dataPoints: [
        "Compressor discharge pressure: -0.8% (normal: ±0.2%)",
        "Exhaust temperature spread: 12°C → 18°C across combustion cans",
        "Heat rate: 5,820 → 5,942 BTU/kWh (2.1% degradation)",
        "Vibration proxy 3 bearing: slight upward trend (within limits)",
        "Digital twin prediction: 92% probability of forced outage within 14 days if untreated",
      ],
      financialImpact: [
        { label: "Proactive intervention cost", value: "$180K" },
        { label: "Avoided forced outage", value: "$12M" },
        { label: "Avoided replacement power (customer)", value: "$8.4M" },
        { label: "CSA penalty avoided", value: "$2.1M" },
        { label: "ROI", value: "67x" },
      ],
      recommendation: "The Fleet Performance Agent recommends immediate deployment of online compressor water wash during the next planned power reduction window (scheduled in 36 hours). If wash effectiveness is below 70% recovery, escalate to offline crank wash with borescope inspection. Remote diagnostic team from Atlanta has been pre-reserved.",
    },
  },
  {
    id: "csa-retention",
    title: "CSA Competitive Defense",
    trigger: "3 high-value CSA accounts ($890M) showing competitive engagement signals",
    steps: [
      { label: "Risk Signals Detected", detail: "Competitive RFIs, portal disengagement, and delayed business reviews identified", status: "complete" },
      { label: "Account Analysis Complete", detail: "ACWA ($420M), Tenaga ($310M), JERA ($160M) profiled with risk scores", status: "complete" },
      { label: "Intervention Designed", detail: "Personalized value reviews + strategic upsell proposals drafted", status: "active" },
      { label: "Executive Engagement", detail: "SVP-level sponsor calls being scheduled", status: "pending" },
      { label: "Renewal Secured", detail: "Target: 100% retention with digital upsell attach", status: "pending" },
    ],
    impact: "$890M protected",
    deepDive: {
      rootCause: "Three factors converging: (1) Siemens Energy has launched an aggressive 'competitive capture' campaign in the Middle East and Asia Pacific, pricing 8-12% below our benchmarks. (2) Two accounts have new procurement leadership with no prior GE relationship. (3) Industry-wide scrutiny of long-term service costs following recent utility margin pressures.",
      dataPoints: [
        "ACWA Power: RFI issued to Siemens for 'service options assessment' (30 days ago)",
        "Tenaga Nasional: New CPO hired from Siemens background, portal logins down 60%",
        "JERA: Exploratory discussions with MHI for fleet modernization",
        "Customer NPS for at-risk accounts: 58 (vs portfolio average 72)",
        "Digital attachment on at-risk accounts: 1 of 3 (vs 38% portfolio average)",
      ],
      financialImpact: [
        { label: "At-risk revenue (annual)", value: "$890M" },
        { label: "Intervention program cost", value: "$2.4M" },
        { label: "Digital upsell opportunity", value: "$180M" },
        { label: "Competitive re-capture cost (if lost)", value: "$45M+" },
        { label: "Expected retention with intervention", value: "92-100%" },
      ],
      recommendation: "Deploy three-wave intervention: (1) Immediate value reinforcement with quantified 'value delivered' reports for each account. (2) Strategic upsell with hydrogen readiness, outcome-based pricing, and fleet modernization proposals. (3) Commercial close with executive engagement and multi-year incentives. The digital attach strategy is key — customers with our digital solutions renew at 96% vs 87% without.",
    },
  },
];

export interface CustomerAccount {
  name: string;
  id: string;
  type: string;
  contractValue: string;
  predictedLifetimeValue: string;
  riskScore: number;
  segment: string;
  fleet: string;
  csa: string;
  lastOutage: string;
  digitalProducts: string[];
  topAssets: string[];
  recentEvents: { type: string; detail: string; time: string }[];
  nextBestAction: string;
  aiSummary: string;
}

export const customerProfile: CustomerAccount = {
  name: "Saudi Electricity Company (SEC)",
  id: "ACCT-SEC-001",
  type: "Tier 1 Strategic Account",
  contractValue: "$4.2B",
  predictedLifetimeValue: "$8.6B",
  riskScore: 18,
  segment: "Gas Power — Middle East",
  fleet: "12x 7HA.03, 8x 9F.05, 4x LM6000",
  csa: "Multi-year CSA through 2031",
  lastOutage: "Planned — 14 days ago",
  digitalProducts: ["Digital Twin (7HA fleet)", "APM Health", "Remote Monitoring", "Fuel Optimization"],
  topAssets: ["Dammam PP14 (6x 7HA.03)", "Yanbu PP12 (6x 7HA.03)", "Riyadh PP11 (8x 9F.05)"],
  recentEvents: [
    { type: "Alert", detail: "7HA.03 Unit #4 Dammam — heat rate anomaly detected", time: "2 hours ago" },
    { type: "Service", detail: "Planned HGP inspection completed at Yanbu PP12", time: "14 days ago" },
    { type: "Commercial", detail: "Hydrogen co-firing feasibility study requested", time: "3 weeks ago" },
    { type: "Digital", detail: "APM Health deployed on remaining 4x 9F units", time: "6 weeks ago" },
  ],
  nextBestAction: "Address Dammam heat rate anomaly proactively, then leverage successful intervention to reinforce upcoming CSA renewal discussion. Position hydrogen readiness roadmap for Vision 2030 alignment.",
  aiSummary: "SEC is GE Vernova's largest single account in the Middle East with $4.2B in active contracts. The relationship is strong (NPS: 78) but requires attention on the Dammam anomaly to maintain trust. The hydrogen co-firing inquiry represents a significant expansion opportunity aligned with Saudi Vision 2030. Digital twin coverage is at 100% for the HA fleet, which is our strongest competitive moat against Siemens Energy's recent overtures in the region.",
};

export const aiResponses: Record<string, string> = {
  revenue: `Let me pull that analysis together. One moment while I cross-reference the order book data with our pipeline models...\n\n**Orders & Revenue Analysis**\n\nSo the picture is actually quite nuanced. The $8.2B headline number is strong, but there are some dynamics worth understanding:\n\n**What's working:**\n- Gas Power equipment orders are running 12% above plan — the HA platform is genuinely winning in competitive situations\n- Services revenue ($4.6B) continues to be the bedrock — predictable, high-margin, and growing\n- Electrification segment win rates hit 31%, best in 3 years\n\n**Where I see risk:**\n- Wind offshore orders are 4% below plan due to permitting delays in Europe\n- 3 large gas power orders ($1.8B combined) have decision dates in the next 45 days — timing risk\n- Parts fill rate dipped slightly, which could affect services execution speed\n\n**The strategic view:**\nOur $118B backlog provides exceptional revenue visibility — roughly 3+ years at current run rates. But the mix is shifting. Gas Power is the growth engine today, while Grid/Electrification is where the multi-decade structural growth lives.\n\nWhat aspect would you like me to dig deeper on?`,

  fleet: `Running the fleet diagnostics now... pulling data from 7,000+ connected gas turbines and 40,000+ wind assets...\n\n**Fleet Performance Summary**\n\n**Gas Turbine Fleet:**\n- Overall availability: 94.7% (above 94.0% target)\n- Active alerts requiring attention: 14 units\n  - 3 critical (including the Dammam 7HA.03 I flagged earlier)\n  - 11 advisory-level\n- Predictive maintenance interventions this year: 47\n  - Estimated avoided unplanned downtime: $340M+\n  - Average advance warning: 14 days before failure\n\n**Wind Fleet:**\n- Availability: 96.2% (above target)\n- Active predictive alerts: 48 total\n  - Gearbox: 28 (mostly bearing temperature trends)\n  - Generator: 12 (winding insulation degradation)\n  - Blade: 8 (leading edge erosion)\n\n**Digital Twin Performance:**\n- Coverage: 78% of HA fleet, 45% of F-class\n- Model accuracy: 97.4% correlation with actual performance data\n- The twins predicted the Dammam fouling event 6 hours before traditional alarm thresholds would have triggered\n\nHonestly, the Dammam situation is my top priority right now. But I'm also watching a bearing temperature trend in Egypt that could escalate in the next 24-48 hours.`,

  grid: `Let me pull the grid modernization data... this is an area where the numbers are moving fast.\n\n**Grid & Electrification Intelligence**\n\n**The IRA/IIJA picture:**\nThere's $65B+ allocated for grid infrastructure in the US alone, and we're seeing the pipeline materialize faster than our planning models predicted. Here's where we are:\n\n| Category | Pipeline | Our Position |\n|----------|----------|-------------|\n| Transformers | $2.8B | Capacity-constrained |\n| HVDC Systems | $4.1B | Technically differentiated |\n| Grid Enhancement | $1.2B | Competitive |\n| Substation Modernization | $1.6B | Moderate |\n\n**The capacity challenge is real:**\n- Transformer manufacturing at 104% utilization\n- Industry-wide transformer lead times: 18+ months\n- Every utility in America is competing for the same supply\n\n**What concerns me:**\nWe're in a demand environment where the limiting factor is our ability to manufacture, not our ability to sell. That's a nice problem to have strategically, but operationally it means every capacity decision we make now has 3-5 year revenue implications.\n\n**My recommendation:**\nThe Clearwater facility expansion ($120M investment, +30% capacity) pays back in under 2 years at current order rates. Meanwhile, I'm prioritizing our existing capacity toward the highest-margin opportunities — utility-scale transformers and HVDC systems.`,

  supply: `Pulling supply chain data across 12,000+ suppliers and 450 commodity categories...\n\n**Supply Chain Intelligence Report**\n\n**Critical Watch Items:**\n- 🔴 **Nickel Superalloys:** Haynes International lead times extended 3 weeks. Root cause: Kokomo furnace outage + aerospace demand surge. This directly impacts 340 planned HGP services.\n- 🟡 **Transformer Steel (GOES):** Global demand up 40%. Lead times now 18+ months. This is becoming a strategic bottleneck for Grid Solutions growth.\n- 🟡 **Rare Earth Magnets:** China's export controls creating supply uncertainty for wind generator production.\n- 🟢 **Steel Forgings:** Stable with multiple qualified sources.\n\n**Parts Fill Rate Trend:**\n96.9% → 96.1% over last quarter. Still above target, but the trajectory needs intervention.\n\n**What I'm doing about it:**\n1. Activated Precision Castparts and Arconic as alternate superalloy sources — qualification in progress\n2. Pre-positioning critical spares at 6 regional hubs ($48M inventory investment)\n3. Building 12-week demand forecast feeds to top 50 suppliers\n4. Running scenario models on rare earth disruption (worst case: 6-month China embargo)\n\nThe near-term nickel situation is manageable with the mitigation plan. The transformer steel situation is the one that worries me more — it could cap our grid growth if we don't secure long-term supply agreements soon.`,

  services: `Analyzing the services portfolio... one moment while I aggregate data across 847 active CSAs.\n\n**Services & CSA Portfolio Analysis**\n\n**Portfolio Health:**\n- Active CSAs: 847 contracts\n- Total contract value: $48.2B\n- Renewal rate (trailing 12 months): 91.2% — solid, but we can do better\n- Digital attach rate: 38% — this is our biggest growth lever\n\n**Revenue Mix:**\n- Transactional services: 35% (parts, field service)\n- CSAs: 52% (recurring, predictable)\n- Digital solutions: 13% (fastest growing at +28% YoY)\n\n**What the data tells me about retention risk:**\nAccounts with our digital solutions (APM, digital twins, remote monitoring) renew at 96%. Accounts without: 87%. That 9-point gap is worth approximately $4.3B in the current renewal pipeline.\n\n**The competitive picture:**\n- Siemens Energy: Aggressive pricing (8-12% below) on competitive captures\n- MHI: Targeting aging J-series and F-class fleets for modernization\n- Independent service providers: Growing in emerging markets on older E/F-class\n\n**My strategic recommendation:**\nEvery dollar we invest in digital attach rate drives exponential returns in retention. The goal should be 50% digital attach by end of next year — that would effectively lock in $2.1B in renewals that are currently at risk.`,

  default: `Let me scan across the full GE Vernova portfolio to give you a comprehensive view. Give me a moment to correlate the data streams...\n\n**Executive Summary — GE Vernova Intelligence Briefing**\n\nHere's what I'd put in front of the leadership team right now:\n\n**Wins:**\n- Equipment orders at $8.2B, beating plan by 6.8%\n- $118B backlog provides 3+ years of revenue visibility\n- Fleet availability at 94.7%, above target\n- Predictive maintenance prevented $340M in unplanned outages this year\n\n**Watch Items:**\n- Dammam 7HA.03 anomaly — $12M exposure, intervention recommended\n- 3 CSA renewals ($890M) showing competitive risk signals\n- Nickel alloy supply chain pressure on HGP services pipeline\n- Wind offshore orders 4% below plan\n\n**Opportunities:**\n- IRA/IIJA grid investment: $10.5B addressable pipeline\n- Hydrogen readiness positioning for Middle East accounts\n- Digital attach rate increase from 38% → 50% would protect $2.1B in renewals\n\n**Active AI Agents:**\n- ⚡ Revenue Agent: Orders above forecast, 4 near-term HA deals in play\n- 🔧 Fleet Agent: Alert on Dammam unit, monitoring Egypt 9F\n- 📦 Supply Agent: Managing nickel alloy constraint\n- 🔄 CSA Agent: Defending 3 at-risk renewals\n- 🔌 Grid Agent: Prioritizing IRA-eligible pipeline\n\nWhat area would you like to explore?`,
};
