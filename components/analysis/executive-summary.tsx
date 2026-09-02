"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { ExecutiveSummary as ExecutiveSummaryType } from "@/types";
import { Sparkles, Target, Compass, Award, Quote } from "lucide-react";

export function ExecutiveSummaryCard({ data }: { data: ExecutiveSummaryType }) {
  return (
    <GlassCard glow="primary" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Executive Summary</span>
        </div>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
          AI Synthesis
        </span>
      </div>

      {/* Main Pitch */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20">
        <div className="flex items-start gap-3">
          <Quote className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
          <p className="text-base font-medium leading-relaxed text-slate-800 dark:text-slate-100">
            {data.pitch}
          </p>
        </div>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center gap-2 mb-2 text-indigo-500 font-semibold text-xs">
            <Target className="w-4 h-4" />
            <span>Core Value Prop</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-normal">
            {data.coreValueProp}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center gap-2 mb-2 text-purple-500 font-semibold text-xs">
            <Award className="w-4 h-4" />
            <span>Key Differentiator</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-normal">
            {data.keyDifferentiator}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center gap-2 mb-2 text-emerald-500 font-semibold text-xs">
            <Compass className="w-4 h-4" />
            <span>Mission Statement</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-normal">
            {data.missionStatement}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
