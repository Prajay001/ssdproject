"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { getSavedReports } from "@/lib/supabase/client";
import { AnalysisReport } from "@/types";
import Link from "next/link";
import {
  GitCompare,
  Trophy,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  BarChart2,
  DollarSign,
  Compass,
} from "lucide-react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
} from "recharts";
import { getScoreBadgeColor } from "@/lib/utils";

export default function ComparePage() {
  const [reports, setReports] = useState<AnalysisReport[]>([]);
  const [leftId, setLeftId] = useState<string>("");
  const [rightId, setRightId] = useState<string>("");

  useEffect(() => {
    const list = getSavedReports();
    setReports(list);
    if (list.length >= 2) {
      setLeftId(list[0].id);
      setRightId(list[1].id);
    } else if (list.length === 1) {
      setLeftId(list[0].id);
    }
  }, []);

  const leftReport = reports.find((r) => r.id === leftId);
  const rightReport = reports.find((r) => r.id === rightId);

  // Radar chart benchmark data
  const radarData = [
    {
      subject: "Overall Score",
      A: leftReport ? leftReport.overallScore : 0,
      B: rightReport ? rightReport.overallScore : 0,
      fullMark: 100,
    },
    {
      subject: "Market TAM ($B)",
      A: leftReport ? Math.min(100, Math.round(leftReport.marketMetrics.tam / 1e9) * 2) : 0,
      B: rightReport ? Math.min(100, Math.round(rightReport.marketMetrics.tam / 1e9) * 2) : 0,
      fullMark: 100,
    },
    {
      subject: "Problem Severity",
      A: leftReport ? leftReport.problemAnalysis.severityScore * 10 : 0,
      B: rightReport ? rightReport.problemAnalysis.severityScore * 10 : 0,
      fullMark: 100,
    },
    {
      subject: "Investor Interest",
      A: leftReport ? leftReport.investorReadiness.score : 0,
      B: rightReport ? rightReport.investorReadiness.score : 0,
      fullMark: 100,
    },
    {
      subject: "GTM Velocity",
      A: leftReport ? 80 : 0,
      B: rightReport ? 75 : 0,
      fullMark: 100,
    },
  ];

  // Winner analysis
  const winner =
    leftReport && rightReport
      ? leftReport.overallScore >= rightReport.overallScore
        ? leftReport
        : rightReport
      : null;

  return (
    <div className="space-y-8 animate-in fade-in pb-16">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
            <GitCompare className="w-4 h-4" />
            <span>Due Diligence Studio</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
            Startup Comparison & Head-to-Head Benchmarking
          </h1>
          <p className="text-xs text-slate-500">
            Compare validated startup ideas across market size, defensibility, unit economics, and VC readiness.
          </p>
        </div>

        <Link
          href="/analysis/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>New Analysis</span>
        </Link>
      </div>

      {/* Selectors Bar */}
      <GlassCard className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Select Startup A:
            </label>
            <select
              value={leftId}
              onChange={(e) => setLeftId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Choose Startup A --</option>
              {reports.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.ideaInput.name} ({r.overallScore}/100) - {r.marketMetrics.tamLabel}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Select Startup B:
            </label>
            <select
              value={rightId}
              onChange={(e) => setRightId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">-- Choose Startup B --</option>
              {reports.map((r) => (
                <option key={r.id} value={r.id} disabled={r.id === leftId}>
                  {r.ideaInput.name} ({r.overallScore}/100) - {r.marketMetrics.tamLabel}
                </option>
              ))}
            </select>
          </div>
        </div>
      </GlassCard>

      {/* When 2 startups are selected */}
      {leftReport && rightReport ? (
        <div className="space-y-6">
          {/* Winner Banner */}
          {winner && (
            <GlassCard glow="primary" className="p-6 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-transparent border-emerald-500/30">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-500 border border-emerald-500/30">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-500">
                      Institutional VC Verdict
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                      {winner.ideaInput.name} holds superior risk-adjusted return profile
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Driven by higher overall investor readiness ({winner.overallScore}/100) and substantial TAM of {winner.marketMetrics.tamLabel}.
                    </p>
                  </div>
                </div>

                <Link
                  href={`/reports/${winner.id}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex-shrink-0"
                >
                  <span>View Winner Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </GlassCard>
          )}

          {/* Radar Benchmark Chart */}
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <BarChart2 className="w-4 h-4" />
                <span>Multi-Axis Competitive Radar</span>
              </div>
              <span className="text-xs text-slate-500 font-mono">Normalized 0-100 Scale</span>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#475569" strokeDasharray="3 3" opacity={0.3} />
                  <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={11} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" opacity={0.2} />
                  <Radar
                    name={leftReport.ideaInput.name}
                    dataKey="A"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name={rightReport.ideaInput.name}
                    dataKey="B"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.3}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0F172A",
                      borderColor: "#1E293B",
                      borderRadius: "12px",
                      color: "#F8FAFC",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Side-by-Side Comparison Matrix Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Startup A Card */}
            <GlassCard className="p-6 space-y-4 border-blue-500/30">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">Startup A</span>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{leftReport.ideaInput.name}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getScoreBadgeColor(leftReport.overallScore)}`}>
                  {leftReport.overallScore}/100
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Value Proposition:</span>
                  <p className="text-slate-700 dark:text-slate-200 mt-0.5">{leftReport.ideaInput.oneSentenceIdea}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900">
                    <span className="text-slate-400 block text-[11px]">Total Addressable Market</span>
                    <span className="text-base font-bold font-mono text-blue-600 dark:text-blue-400">
                      {leftReport.marketMetrics.tamLabel}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900">
                    <span className="text-slate-400 block text-[11px]">Primary Monetization</span>
                    <span className="text-base font-bold text-slate-800 dark:text-slate-200 truncate block">
                      {leftReport.revenueModels[0]?.name || "SaaS"}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-slate-400 block text-[11px] font-semibold uppercase mb-1">Key Advantages:</span>
                  <ul className="space-y-1">
                    {leftReport.swot.strengths.slice(0, 3).map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <Link
                    href={`/reports/${leftReport.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>Inspect Full 15-Module Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </GlassCard>

            {/* Startup B Card */}
            <GlassCard className="p-6 space-y-4 border-purple-500/30">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-purple-500 uppercase tracking-wider">Startup B</span>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{rightReport.ideaInput.name}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getScoreBadgeColor(rightReport.overallScore)}`}>
                  {rightReport.overallScore}/100
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Value Proposition:</span>
                  <p className="text-slate-700 dark:text-slate-200 mt-0.5">{rightReport.ideaInput.oneSentenceIdea}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900">
                    <span className="text-slate-400 block text-[11px]">Total Addressable Market</span>
                    <span className="text-base font-bold font-mono text-purple-600 dark:text-purple-400">
                      {rightReport.marketMetrics.tamLabel}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900">
                    <span className="text-slate-400 block text-[11px]">Primary Monetization</span>
                    <span className="text-base font-bold text-slate-800 dark:text-slate-200 truncate block">
                      {rightReport.revenueModels[0]?.name || "SaaS"}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-slate-400 block text-[11px] font-semibold uppercase mb-1">Key Advantages:</span>
                  <ul className="space-y-1">
                    {rightReport.swot.strengths.slice(0, 3).map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <Link
                    href={`/reports/${rightReport.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    <span>Inspect Full 15-Module Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      ) : (
        <GlassCard className="p-12 text-center space-y-3">
          <Compass className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
            Select Two Ideas to Compare
          </h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Choose two startup analyses from the dropdowns above to trigger the side-by-side comparative radar chart and institutional VC investment thesis.
          </p>
        </GlassCard>
      )}
    </div>
  );
}
