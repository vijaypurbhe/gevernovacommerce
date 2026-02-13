import { useState } from "react";
import { Activity, Zap } from "lucide-react";
import KpiTile from "@/components/KpiTile";
import AgentCard from "@/components/AgentCard";
import RevenueChart from "@/components/RevenueChart";
import ChannelTable from "@/components/ChannelTable";
import AiCommandInput from "@/components/AiCommandInput";
import ScenarioPanel from "@/components/ScenarioPanel";
import CustomerProfile from "@/components/CustomerProfile";
import BudgetOptimization from "@/components/BudgetOptimization";
import GovernancePanel from "@/components/GovernancePanel";
import ForecastingPanel from "@/components/ForecastingPanel";
import { StateToggle, CurrentVsFuture } from "@/components/StateToggle";
import DataLineage from "@/components/DataLineage";
import StreamingAlerts from "@/components/StreamingAlerts";
import ThemeToggle from "@/components/ThemeToggle";
import { kpiData, agents, scenarios } from "@/data/mockData";

const Index = () => {
  const [viewState, setViewState] = useState<"current" | "agentic">("agentic");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/40 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground tracking-tight">
                GE Vernova — Agentic Commerce Intelligence
              </h1>
              <p className="text-[10px] text-muted-foreground">
                Predix APM • Data Cloud • Salesforce CRM • IoT/SCADA • Field Service
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <StateToggle state={viewState} onChange={setViewState} />
            <div className="flex items-center gap-1.5 text-[10px]">
              <Activity className="w-3 h-3 text-success animate-pulse" />
              <span className="text-success font-medium">Live</span>
              <span className="text-muted-foreground">• 5 agents active</span>
            </div>
            <div className="text-[10px] text-muted-foreground font-mono hidden lg:block">
              2M customers • 150K SKUs • 18mo data
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
        {/* KPI Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {kpiData.map((kpi, i) => (
            <KpiTile key={kpi.label} {...kpi} index={i} />
          ))}
        </section>

        {/* Charts + AI Command */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <RevenueChart />
            <ChannelTable />
          </div>
          <AiCommandInput />
        </section>

        {/* Streaming Alerts - after stats and graph */}
        <StreamingAlerts />

        {/* Forecasting + Segmentation */}
        <ForecastingPanel />

        {/* Agent Cards */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-sm font-bold text-foreground">AI Agent Layer</h2>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">Agentforce</span>
            <span className="text-[10px] text-muted-foreground ml-1">Click "Chat" to interact with any agent</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </section>

        {/* Scenarios + Customer Profile */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ScenarioPanel scenarios={scenarios} />
          <CustomerProfile />
        </section>

        {/* Attribution & Budget Optimization */}
        <BudgetOptimization />

        {/* Data Lineage + Current vs Future */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DataLineage />
          <CurrentVsFuture state={viewState} />
        </section>

        {/* Governance */}
        <GovernancePanel />

        {/* Footer */}
        <footer className="text-center py-4 border-t border-border/30">
          <p className="text-[10px] text-muted-foreground">
            Simulated Demo Environment • Salesforce Commerce Cloud + GA4 + Data Cloud + Einstein + Agentforce
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
