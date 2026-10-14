"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getSavedReports } from "@/lib/supabase/client";
import { AnalysisReport } from "@/types";
import { GlassCard } from "@/components/ui/glass-card";
import { ExecutiveSummaryCard } from "@/components/analysis/executive-summary";
import { ProblemAnalysisCard } from "@/components/analysis/problem-analysis";
import { MarketOpportunityCard } from "@/components/analysis/market-opportunity";
import { CompetitorMatrixCard } from "@/components/analysis/competitor-matrix";
import { SWOTGridCard } from "@/components/analysis/swot-grid";
import { RevenueModelsRankedCard } from "@/components/analysis/revenue-models";
import { TamSamSomChartCard } from "@/components/analysis/tam-sam-som-chart";
import { CustomerPersonaCard } from "@/components/analysis/customer-persona";
import { BusinessModelCanvasGrid } from "@/components/analysis/business-model-canvas";
import { GoToMarketCard } from "@/components/analysis/go-to-market";
import { InvestorReadinessGaugeCard } from "@/components/analysis/investor-readiness";
import { RiskMatrixCard } from "@/components/analysis/risk-matrix";
import { FeatureRoadmapTimelineCard } from "@/components/analysis/feature-roadmap";
import { ElevatorPitchCard } from "@/components/analysis/elevator-pitch";
import { PitchDeckViewerCard } from "@/components/analysis/pitch-deck-viewer";
import { FinancialSimulatorCard } from "@/components/analysis/financial-simulator";
import { AiAdvisorDrawer } from "@/components/analysis/ai-advisor-drawer";
import { downloadMarkdownFile } from "@/lib/export/markdown";
import { downloadJsonFile } from "@/lib/export/json";
import { exportReportToPdf } from "@/lib/export/pdf";
import { exportReportToCsv } from "@/lib/export/csv";
import { getScoreBadgeColor } from "@/lib/utils";
import {
  Download,
  Share2,
  ArrowLeft,
  Printer,
  Sparkles,
  FileCode,
  FileSpreadsheet,
  Check,
  DollarSign,
  Bot,
} from "lucide-react";

export default function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const reports = getSavedReports();
    const found = reports.find((r) => r.id === resolvedParams.id);
    if (found) {
      setReport(found);
    }
  }, [resolvedParams.id]);

  if (!report) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Loading analysis report...</h2>
        <p className="text-xs text-slate-500">If it does not load shortly, please check saved reports.</p>
        <Link href="/reports" className="inline-block px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold">
          Back to Saved Reports
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const tabs = [
    { id: "all", label: "Full Report (15 Modules)" },
    { id: "financial", label: "Financial Sandbox", icon: DollarSign },
    { id: "advisor", label: "AI Venture Partner", icon: Bot },
    { id: "deck", label: "Pitch Deck (10 Slides)" },
    { id: "executive", label: "Executive Summary" },
    { id: "tam", label: "TAM / Market Sizing" },
    { id: "competitors", label: "Competitor Matrix" },
    { id: "swot", label: "SWOT" },
    { id: "bmc", label: "Business Canvas" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in pb-16">
      {/* Top Breadcrumb & Export Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/reports"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-blue-500 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Reports</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              {report.ideaInput.name}
            </h1>
            <span className={`text-xs font-bold px-3 py-0.5 rounded-full border ${getScoreBadgeColor(report.overallScore)}`}>
              Score: {report.overallScore}/100
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => exportReportToPdf(report)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
            title="Export PDF Report"
          >
            <Printer className="w-3.5 h-3.5 text-blue-500" />
            <span>PDF Print</span>
          </button>

          <button
            onClick={() => exportReportToCsv(report)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
            title="Export CSV Data Table"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
            <span>CSV Data</span>
          </button>

          <button
            onClick={() => downloadMarkdownFile(report)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
            title="Export Markdown File"
          >
            <Download className="w-3.5 h-3.5 text-purple-500" />
            <span>Markdown</span>
          </button>

          <button
            onClick={() => downloadJsonFile(report)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
            title="Export Raw JSON"
          >
            <FileCode className="w-3.5 h-3.5 text-indigo-500" />
            <span>JSON</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? "Link Copied!" : "Share Link"}</span>
          </button>
        </div>
      </div>

      {/* Navigation Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200/80 dark:border-slate-800/80 no-scrollbar">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                activeTab === t.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Modules Render Logic */}
      <div className="space-y-8">
        {(activeTab === "all" || activeTab === "executive") && (
          <ExecutiveSummaryCard data={report.executiveSummary} />
        )}

        {(activeTab === "all" || activeTab === "advisor") && (
          <AiAdvisorDrawer report={report} />
        )}

        {(activeTab === "all" || activeTab === "financial") && (
          <FinancialSimulatorCard
            startupName={report.ideaInput.name}
            stage={report.ideaInput.stage}
            country={report.ideaInput.country}
          />
        )}

        {(activeTab === "all" || activeTab === "executive") && (
          <ProblemAnalysisCard data={report.problemAnalysis} />
        )}

        {(activeTab === "all" || activeTab === "tam") && (
          <MarketOpportunityCard data={report.marketOpportunity} />
        )}

        {(activeTab === "all" || activeTab === "tam") && (
          <TamSamSomChartCard metrics={report.marketMetrics} />
        )}

        {(activeTab === "all" || activeTab === "competitors") && (
          <CompetitorMatrixCard competitors={report.competitors} />
        )}

        {(activeTab === "all" || activeTab === "swot") && (
          <SWOTGridCard swot={report.swot} />
        )}

        {activeTab === "all" && (
          <RevenueModelsRankedCard models={report.revenueModels} />
        )}

        {activeTab === "all" && (
          <CustomerPersonaCard personas={report.customerPersonas} />
        )}

        {(activeTab === "all" || activeTab === "bmc") && (
          <BusinessModelCanvasGrid initialCanvas={report.businessCanvas} />
        )}

        {activeTab === "all" && (
          <GoToMarketCard data={report.goToMarket} />
        )}

        {activeTab === "all" && (
          <InvestorReadinessGaugeCard data={report.investorReadiness} />
        )}

        {activeTab === "all" && (
          <RiskMatrixCard risk={report.riskAnalysis} />
        )}

        {activeTab === "all" && (
          <FeatureRoadmapTimelineCard roadmap={report.featureRoadmap} />
        )}

        {activeTab === "all" && (
          <ElevatorPitchCard pitch={report.elevatorPitch} />
        )}

        {(activeTab === "all" || activeTab === "deck") && (
          <PitchDeckViewerCard slides={report.pitchDeck} report={report} />
        )}
      </div>
    </div>
  );
}
