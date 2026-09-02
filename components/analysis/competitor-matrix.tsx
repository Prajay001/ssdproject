"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Competitor } from "@/types";
import { Swords, CheckCircle2, XCircle, DollarSign, Target, PieChart } from "lucide-react";

export function CompetitorMatrixCard({ competitors }: { competitors: Competitor[] }) {
  return (
    <GlassCard glow="primary" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <Swords className="w-4 h-4" />
          <span>Competitor Matrix</span>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
          {competitors.length} Tracked Players
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {competitors.map((comp) => (
          <div
            key={comp.id}
            className="p-5 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 space-y-4 hover:border-blue-500/50 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    comp.type === "Direct"
                      ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                      : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                  }`}
                >
                  {comp.type} Competitor
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">{comp.name}</h4>
              </div>

              {comp.marketShareEstimate && (
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 flex items-center gap-1 justify-end">
                    <PieChart className="w-3 h-3" />
                    <span>Share</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                    {comp.marketShareEstimate}
                  </span>
                </div>
              )}
            </div>

            {/* Pricing & Audience */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-xs">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-500" /> Pricing:
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">{comp.pricing}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-blue-500" /> Target:
                </span>
                <span className="font-medium text-slate-800 dark:text-slate-300 truncate max-w-[130px]" title={comp.targetAudience}>
                  {comp.targetAudience}
                </span>
              </div>
            </div>

            {/* Strengths */}
            <div>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mb-1">
                <CheckCircle2 className="w-3 h-3" /> Key Strengths
              </span>
              <ul className="space-y-1">
                {comp.strengths.map((s, idx) => (
                  <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 leading-tight">
                    • {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div>
              <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 mb-1">
                <XCircle className="w-3 h-3" /> Key Weaknesses
              </span>
              <ul className="space-y-1">
                {comp.weaknesses.map((w, idx) => (
                  <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 leading-tight">
                    • {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
