"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { SWOTAnalysis } from "@/types";
import { ShieldCheck, AlertCircle, Sparkles, AlertTriangle } from "lucide-react";

export function SWOTGridCard({ swot }: { swot: SWOTAnalysis }) {
  return (
    <GlassCard glow="primary" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>SWOT Matrix Analysis</span>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
          4 Quadrants
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="p-5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Strengths (Internal)</span>
          </div>
          <ul className="space-y-2">
            {swot.strengths.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 space-y-3">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>Weaknesses (Internal)</span>
          </div>
          <ul className="space-y-2">
            {swot.weaknesses.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Opportunities */}
        <div className="p-5 rounded-2xl bg-blue-500/5 dark:bg-blue-950/20 border border-blue-500/20 space-y-3">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Opportunities (External)</span>
          </div>
          <ul className="space-y-2">
            {swot.opportunities.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Threats */}
        <div className="p-5 rounded-2xl bg-rose-500/5 dark:bg-rose-950/20 border border-rose-500/20 space-y-3">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Threats (External)</span>
          </div>
          <ul className="space-y-2">
            {swot.threats.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </GlassCard>
  );
}
