"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { getSavedReports, getUserProfile } from "@/lib/supabase/client";
import { AnalysisReport, UserProfile } from "@/types";
import {
  Sparkles,
  Award,
  Zap,
  TrendingUp,
  FileText,
  ArrowRight,
  Plus,
  ShieldCheck,
  Building2,
  Clock,
  Inbox,
} from "lucide-react";
import { getScoreBadgeColor } from "@/lib/utils";

export default function DashboardPage() {
  const [reports, setReports] = useState<AnalysisReport[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setReports(getSavedReports());
    setUser(getUserProfile());
  }, []);

  const totalAnalyses = reports.length;
  const avgScore =
    reports.length > 0
      ? Math.round(reports.reduce((acc, r) => acc + r.overallScore, 0) / reports.length)
      : 0;

  const trendingIndustries = [
    { name: "Developer Tools & AI", growth: "+42%", color: "text-blue-500" },
    { name: "FinTech & Payments", growth: "+28%", color: "text-emerald-500" },
    { name: "HealthTech & Biotech", growth: "+35%", color: "text-purple-500" },
    { name: "CleanTech & Energy", growth: "+19%", color: "text-amber-500" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Top Banner Hero */}
      <GlassCard glow="primary" hoverEffect={false} className="p-8 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 border-blue-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                AI Validation Engine
              </span>
              <span className="text-xs text-slate-500 font-medium">Enterprise SaaS</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Welcome back, {user?.name || "Founder"}
            </h1>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Validate your startup ideas in seconds with real market sizing, competitor intelligence, Business Model Canvas, and 10-slide investor pitch decks.
            </p>
          </div>

          <Link
            href="/analysis/new"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex-shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>New Startup Analysis</span>
          </Link>
        </div>
      </GlassCard>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Analyses</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
            {totalAnalyses}
          </div>
          <p className="text-[11px] text-slate-500">Completed startup evaluations</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Idea Score</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{avgScore > 0 ? avgScore : "—"}</span>
            {avgScore > 0 && <span className="text-xs font-normal text-slate-400">/ 100</span>}
          </div>
          <p className="text-[11px] text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500" /> VC Grade Benchmark
          </p>
        </GlassCard>

        <GlassCard className="p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Credits Left</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
            {user?.aiCredits ?? 500}
          </div>
          <p className="text-[11px] text-slate-500">Auto-renews next billing cycle</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Plan Status</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            {user?.plan || "Pro Tier"}
          </div>
          <p className="text-[11px] text-slate-500">Unlimited PDF & MD exports</p>
        </GlassCard>
      </div>

      {/* Main Content Grid: Recent Projects & Trending Industries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-500" /> Recent Startup Projects
            </h3>
            {reports.length > 0 && (
              <Link
                href="/reports"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>View All Reports</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {reports.length === 0 ? (
            <GlassCard className="p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-400 flex items-center justify-center mx-auto border border-slate-200 dark:border-slate-800">
                <Inbox className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">No Analyses Generated Yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Run your first startup idea validation wizard to generate 14 strategic modules including TAM metrics, Business Canvas, and investor decks.
                </p>
              </div>
              <Link
                href="/analysis/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Start First Startup Analysis</span>
              </Link>
            </GlassCard>
          ) : (
            <div className="space-y-3">
              {reports.map((report) => (
                <GlassCard
                  key={report.id}
                  className="p-5 hover:border-blue-500/40 transition-all cursor-pointer group"
                >
                  <Link href={`/reports/${report.id}`} className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors">
                          {report.ideaInput.name}
                        </h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {report.ideaInput.stage}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                        {report.ideaInput.oneSentenceIdea}
                      </p>
                      <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {new Date(report.createdAt).toLocaleDateString()}
                        </span>
                        <span>Region: {report.ideaInput.country}</span>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getScoreBadgeColor(report.overallScore)}`}>
                        Score: {report.overallScore}/100
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-1 font-mono">
                        {report.marketMetrics.tamLabel} TAM
                      </span>
                    </div>
                  </Link>
                </GlassCard>
              ))}
            </div>
          )}
        </div>

        {/* Trending Industries Widget (1 Col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> Market Trajectory
            </h3>
          </div>

          <GlassCard className="p-5 space-y-4">
            <div className="space-y-3">
              {trendingIndustries.map((ind, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60"
                >
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">{ind.name}</h5>
                  <span className={`text-xs font-mono font-bold ${ind.color}`}>{ind.growth}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 text-xs text-slate-600 dark:text-slate-400">
              💡 <strong>Market Insight:</strong> Software Infrastructure and Generative AI applications represent top investor momentum in 2026.
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
