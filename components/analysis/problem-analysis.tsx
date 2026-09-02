"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { ProblemAnalysis as ProblemAnalysisType } from "@/types";
import { AlertTriangle, Users, AlertCircle, TrendingDown } from "lucide-react";

export function ProblemAnalysisCard({ data }: { data: ProblemAnalysisType }) {
  return (
    <GlassCard glow="amber" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>Problem Analysis</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 font-bold text-xs border border-amber-500/20">
          <span>Severity:</span>
          <span className="font-mono text-sm">{data.severityScore} / 10</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Core Problem Statement</h3>
          <p className="text-base font-medium text-slate-900 dark:text-slate-100">{data.coreProblem}</p>
        </div>

        {/* Affected Audience */}
        <div>
          <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-500" />
            <span>Affected Target Audience Segments</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.affectedSegments.map((segment, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200/60 dark:border-slate-700/60"
              >
                {segment}
              </span>
            ))}
          </div>
        </div>

        {/* Current Workarounds & Inaction Cost */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>Current Workarounds</span>
            </h4>
            <ul className="space-y-1.5">
              {data.currentWorkarounds.map((w, idx) => (
                <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/5 dark:bg-rose-950/20 border border-rose-500/20">
            <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400 mb-2 flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Cost of Inaction</span>
            </h4>
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
              {data.costOfInaction}
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
