"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { CustomerPersona } from "@/types";
import { User, Target, Frown, ShoppingBag, Quote } from "lucide-react";

export function CustomerPersonaCard({ personas }: { personas: CustomerPersona[] }) {
  return (
    <GlassCard glow="primary" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-wider">
          <User className="w-4 h-4" />
          <span>Ideal Customer Personas</span>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
          Target Buyer Profiles
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {personas.map((persona, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 space-y-4 hover:border-purple-500/50 transition-all duration-200"
          >
            {/* Header Avatar & Bio */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-purple-500/20">
                {persona.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">{persona.name}</h4>
                <p className="text-xs text-slate-500 font-medium">
                  {persona.age} yrs • {persona.occupation}
                </p>
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20 mt-1">
                  {persona.role}
                </span>
              </div>
            </div>

            {/* Quote */}
            {persona.quote && (
              <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 text-xs italic text-slate-700 dark:text-slate-300 flex items-start gap-2">
                <Quote className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>{persona.quote}</span>
              </div>
            )}

            {/* Pain Points */}
            <div>
              <span className="text-[11px] font-bold text-rose-500 flex items-center gap-1.5 mb-1.5">
                <Frown className="w-3.5 h-3.5" /> Core Pain Points
              </span>
              <ul className="space-y-1">
                {persona.painPoints.map((point, i) => (
                  <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Goals */}
            <div>
              <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-1.5 mb-1.5">
                <Target className="w-3.5 h-3.5" /> Goals & Ambitions
              </span>
              <ul className="space-y-1">
                {persona.goals.map((goal, i) => (
                  <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buying Behaviour */}
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
              <span className="text-[11px] font-bold text-blue-500 flex items-center gap-1.5 mb-1">
                <ShoppingBag className="w-3.5 h-3.5" /> Buying Behaviour
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                {persona.buyingBehaviour}
              </p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
