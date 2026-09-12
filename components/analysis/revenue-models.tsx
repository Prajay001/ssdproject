"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { RevenueModel } from "@/types";
import { DollarSign, Check, X, Award, TrendingUp } from "lucide-react";

export function RevenueModelsRankedCard({ models }: { models: RevenueModel[] }) {
  const sorted = [...models].sort((a, b) => a.rank - b.rank);

  return (
    <GlassCard glow="emerald" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
          <DollarSign className="w-4 h-4" />
          <span>Revenue Models (Ranked)</span>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
          Monetization Strategy
        </span>
      </div>

      <div className="space-y-4">
        {sorted.map((model) => (
          <div
            key={model.name}
            className="p-5 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-500/50 transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-extrabold text-sm border border-emerald-500/20">
                  #{model.rank}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">{model.name}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {model.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{model.description}</p>
                </div>
              </div>

              {model.estimatedARPU && (
                <div className="text-right flex-shrink-0">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Est. ARPU</span>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {model.estimatedARPU}
                  </span>
                </div>
              )}
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Pros</span>
                {model.pros.map((pro, idx) => (
                  <div key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>{pro}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Cons</span>
                {model.cons.map((con, idx) => (
                  <div key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <X className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                    <span>{con}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
