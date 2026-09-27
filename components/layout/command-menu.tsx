"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, FileText, Settings, History, BookmarkCheck, X, ArrowRight } from "lucide-react";
import { getSavedReports } from "@/lib/supabase/client";
import { AnalysisReport } from "@/types";

export function CommandMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [reports, setReports] = useState<AnalysisReport[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setReports(getSavedReports());
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setReports(getSavedReports());
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredReports = reports.filter(
    (r) =>
      r.ideaInput.name.toLowerCase().includes(query.toLowerCase()) ||
      r.ideaInput.problem.toLowerCase().includes(query.toLowerCase()) ||
      r.marketOpportunity.industry.toLowerCase().includes(query.toLowerCase())
  );

  const navigateTo = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in">
      <div className="glass-panel w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95">
        {/* Search Input */}
        <div className="flex items-center px-4 border-b border-slate-200/80 dark:border-slate-800/80">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search startups..."
            className="w-full py-4 bg-transparent text-sm font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command Menu Results */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {/* Quick Actions */}
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Quick Actions
          </div>
          <button
            onClick={() => navigateTo("/analysis/new")}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 text-left transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Start New Startup Analysis</p>
                <p className="text-[10px] text-slate-500">Run 14-module AI validation wizard</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={() => navigateTo("/compare")}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 text-left transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-500">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Compare Studio</p>
                <p className="text-[10px] text-slate-500">Head-to-head startup benchmarking & radar analysis</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={() => navigateTo("/history")}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 text-left transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
                <History className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">View History & Audit Logs</span>
            </div>
          </button>

          {/* Reports */}
          {filteredReports.length > 0 && (
            <>
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-2">
                Saved Reports ({filteredReports.length})
              </div>
              {filteredReports.map((report) => (
                <button
                  key={report.id}
                  onClick={() => navigateTo(`/reports/${report.id}`)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {report.ideaInput.name}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate max-w-xs">
                        {report.ideaInput.oneSentenceIdea}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    Score: {report.overallScore}/100
                  </span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
