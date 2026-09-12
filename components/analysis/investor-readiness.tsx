"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { InvestorReadiness } from "@/types";
import { Award, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
import { getScoreBadgeColor } from "@/lib/utils";

export function InvestorReadinessGaugeCard({ data }: { data: InvestorReadiness }) {
  return (
    <GlassCard glow="primary" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <Award className="w-4 h-4" />
          <span>Investor Readiness Score</span>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getScoreBadgeColor(data.score)}`}>
          {data.tier}
        </span>
      </div>

      {/* Main Score Radial / Gauge Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20">
        <div className="relative w-32 h-32 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="54"
              stroke="currentColor"
              strokeWidth="10"
              className="text-slate-200 dark:text-slate-800"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r="54"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray={339}
              strokeDashoffset={339 - (339 * data.score) / 100}
              strokeLinecap="round"
              className="text-blue-600 dark:text-blue-400 transition-all duration-1000"
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
              {data.score}
            </span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">/ 100</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">VC Investment Appetite Evaluation</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{data.summary}</p>
        </div>
      </div>

      {/* Strengths & Deductions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Key Strengths */}
        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
          <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Core Investment Strengths
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {data.keyStrengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Deductions & Recommendations */}
        <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-2">
          <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" /> Score Deductions & Fixes
          </h4>
          <div className="space-y-2">
            {data.deductionReasons.map((d, idx) => (
              <div key={idx} className="text-xs space-y-0.5">
                <div className="flex items-center justify-between text-slate-900 dark:text-slate-200 font-semibold">
                  <span>{d.point}</span>
                  <span className="text-rose-500 font-mono text-[11px]">-{d.deduction} pts</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">💡 {d.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
