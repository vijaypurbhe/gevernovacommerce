

# Replicate Dashboard in Google Looker Studio — Plan

## What this delivers

A detailed implementation guide document (`.docx`) that maps every component of your current AI Commerce Navigator dashboard to its Looker Studio equivalent, with step-by-step instructions for recreating the layout using real GA4 data.

## Document structure

### 1. Dashboard-to-Looker Mapping Table
For each current dashboard section, document:
- Current component name and what it shows
- Equivalent Looker Studio widget type (scorecard, time series, table, etc.)
- GA4 dimensions and metrics to use
- Configuration notes

### 2. Component-by-Component Recreation Guide

| Dashboard Section | Looker Studio Widget | GA4 Data Source |
|---|---|---|
| 8 KPI tiles (revenue, sessions, conversion, etc.) | Scorecards with comparison | `totalRevenue`, `sessions`, `ecommercePurchases`, etc. |
| Revenue chart (monthly trend) | Time series chart | `totalRevenue` by `date` |
| Channel performance table | Table with heatmap | `sessionSource` / `sessionMedium` dimensions |
| Forecasting panel | Trendline with forecast | Built-in Looker Studio forecast feature |
| Customer segments | Pie / donut chart | `userAgeBracket`, `newVsReturning` |
| Budget optimization | Stacked bar chart | `sessionCampaignName` with cost metrics |

### 3. GA4 Connection Setup
- How to add GA4 as a data source in Looker Studio
- Recommended date range controls and filters
- Calculated fields for metrics like conversion rate, AOV

### 4. Layout and Theming
- Page structure recommendations to mirror the current 3-column layout
- Color palette mapping from the current dark theme
- Typography and branding guidelines

### 5. Limitations and Alternatives
- Features that don't have direct Looker equivalents (AI agents, chat, streaming alerts)
- Suggestions for approximating them (embedded Vertex AI links, alert annotations)

## Implementation
- I will review `mockData.ts` and all dashboard components to extract every metric, dimension, and visualization type
- Generate a polished `.docx` guide with tables, screenshots from the current demo, and Looker Studio configuration instructions
- QA the document visually before delivery

## Output
Single `.docx` file in `/mnt/documents/` — ready to hand to a team building the Looker Studio version.

