"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { MarketOpportunity as MarketOpportunityType } from "@/types";
import { TrendingUp, Globe, ShieldAlert, Rocket } from "lucide-react";

export function MarketOpportunityCard({ data }: { data: MarketOpportunityType }) {
  return (
    <GlassCard glow="emerald" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
          <TrendingUp className="w-4 h-4" />
          <span>Market Opportunity</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-xs border border-emerald-500/20">
          <span>Growth:</span>
          <span className="font-mono text-xs">{data.growthRateCAGR}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Industry Sector</span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{data.industry}</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{data.marketSizeSummary}</p>
        </div>

        {/* Demand Drivers & Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
              <Rocket className="w-3.5 h-3.5" />
              <span>Key Demand Drivers</span>
            </h4>
            <ul className="space-y-1.5">
              {data.demandDrivers.map((driver, idx) => (
                <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                  <span>{driver}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
            <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Industry Challenges</span>
            </h4>
            <ul className="space-y-1.5">
              {data.industryChallenges.map((challenge, idx) => (
                <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5" />
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Future Outlook */}
        <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 flex items-start gap-3">
          <Globe className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">5-Year Market Outlook</h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{data.futureOutlook}</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
