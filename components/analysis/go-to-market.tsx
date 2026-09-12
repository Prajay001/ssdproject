"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { GoToMarketStrategy } from "@/types";
import { Send, Megaphone, Target, DollarSign, TrendingUp } from "lucide-react";

export function GoToMarketCard({ data }: { data: GoToMarketStrategy }) {
  return (
    <GlassCard glow="emerald" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
          <Send className="w-4 h-4" />
          <span>Go-To-Market (GTM) Strategy</span>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
          Launch & Scale Plan
        </span>
      </div>

      <div className="space-y-6">
        {/* Launch Plan Timeline */}
        <div>
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-blue-500" /> Sequential Launch Plan
          </h4>
          <div className="space-y-2">
            {data.launchPlan.map((step, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-normal">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Marketing Channels */}
        <div>
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Megaphone className="w-3.5 h-3.5 text-indigo-500" /> Marketing Channels & ROI
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.marketingChannels.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400">{item.channel}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    {item.expectedROI}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sales & Growth Strategy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-2">
            <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-purple-500" /> Sales Motion
            </h5>
            <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
              {data.salesStrategy.map((s, idx) => (
                <li key={idx}>• {s}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-2">
            <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Growth & Referral Loop
            </h5>
            <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
              {data.growthStrategy.map((g, idx) => (
                <li key={idx}>• {g}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
