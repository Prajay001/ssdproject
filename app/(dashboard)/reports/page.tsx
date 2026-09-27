"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { getSavedReports, deleteReport, duplicateReport } from "@/lib/supabase/client";
import { AnalysisReport } from "@/types";
import {
  FileText,
  Search,
  Filter,
  Trash2,
  Copy,
  Download,
  Sparkles,
  ArrowUpRight,
  Inbox,
  Plus,
} from "lucide-react";
import { downloadMarkdownFile } from "@/lib/export/markdown";
import { getScoreBadgeColor } from "@/lib/utils";

export default function SavedReportsPage() {
  const [reports, setReports] = useState<AnalysisReport[]>([]);
  const [search, setSearch] = useState("");
  const [selectedStage, setSelectedStage] = useState<string>("All");

  useEffect(() => {
    setReports(getSavedReports());
  }, []);

  const handleDelete = (id: string) => {
    deleteReport(id);
    setReports(getSavedReports());
  };

  const handleDuplicate = (id: string) => {
    duplicateReport(id);
    setReports(getSavedReports());
  };

  const filtered = reports.filter((r) => {
    const matchesSearch =
      r.ideaInput.name.toLowerCase().includes(search.toLowerCase()) ||
      r.ideaInput.oneSentenceIdea.toLowerCase().includes(search.toLowerCase());
    const matchesStage = selectedStage === "All" || r.ideaInput.stage === selectedStage;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Saved Analysis Reports
          </h1>
          <p className="text-xs text-slate-500">
            Access, export, duplicate, or inspect your startup validation dossiers.
          </p>
        </div>

        <Link
          href="/analysis/new"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Analysis</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reports by startup name or idea..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="All">All Stages</option>
            <option value="Idea">Idea Stage</option>
            <option value="MVP">MVP Stage</option>
            <option value="Early Users">Early Users</option>
            <option value="Growing">Growing</option>
          </select>
        </div>
      </div>

      {/* Reports Grid or Empty State */}
      {filtered.length === 0 ? (
        <GlassCard className="p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-400 flex items-center justify-center mx-auto border border-slate-200 dark:border-slate-800">
            <Inbox className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">No Saved Reports Found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              You haven't saved any startup analysis reports yet. Run the 6-step wizard to create your first report.
            </p>
          </div>
          <Link
            href="/analysis/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Analysis</span>
          </Link>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((report) => (
            <GlassCard key={report.id} className="p-6 space-y-4 flex flex-col justify-between group">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    {report.ideaInput.stage}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getScoreBadgeColor(report.overallScore)}`}>
                    Score: {report.overallScore}/100
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors">
                  {report.ideaInput.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {report.ideaInput.oneSentenceIdea}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>TAM: {report.marketMetrics.tamLabel}</span>
                  <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <Link
                    href={`/reports/${report.id}`}
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow transition-all"
                  >
                    <span>Open Report</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => downloadMarkdownFile(report)}
                      title="Export Markdown"
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDuplicate(report.id)}
                      title="Duplicate Report"
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(report.id)}
                      title="Delete Report"
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-rose-500 hover:text-white text-rose-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
