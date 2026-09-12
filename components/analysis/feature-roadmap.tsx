"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { FeatureRoadmap } from "@/types";
import { MapPin, CheckCircle, Calendar, Flag } from "lucide-react";

export function FeatureRoadmapTimelineCard({ roadmap }: { roadmap: FeatureRoadmap }) {
  return (
    <GlassCard glow="primary" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <Flag className="w-4 h-4" />
          <span>Product Execution Roadmap</span>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
          4 Sequential Phases
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roadmap.phases.map((phase, idx) => (
          <div
            key={idx}
            className="relative p-5 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 space-y-3 hover:border-blue-500/40 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-extrabold text-xs">
                P{idx + 1}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {phase.duration}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{phase.phase}</h4>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Key Deliverables</span>
              {phase.milestones.map((m, mIdx) => (
                <div key={mIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
