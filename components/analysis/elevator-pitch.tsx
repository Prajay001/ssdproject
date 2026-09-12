"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { ElevatorPitch } from "@/types";
import { Mic, Copy, Check, Clock } from "lucide-react";
import { useState } from "react";

export function ElevatorPitchCard({ pitch }: { pitch: ElevatorPitch }) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <GlassCard glow="primary" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <Mic className="w-4 h-4" />
          <span>Elevator Pitch Variations</span>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
          30s / 1m / 5m Speeches
        </span>
      </div>

      <div className="space-y-4">
        {/* 30 Seconds Pitch */}
        <div className="p-5 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> 30-Second Quick Pitch (Networking / Events)
            </span>
            <button
              onClick={() => copyText("30s", pitch.thirtySeconds)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-500 hover:text-white text-slate-600 dark:text-slate-300 text-xs font-semibold flex items-center gap-1 transition-all"
            >
              {copiedKey === "30s" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === "30s" ? "Copied!" : "Copy"}</span>
            </button>
          </div>
          <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic">
            "{pitch.thirtySeconds}"
          </p>
        </div>

        {/* 1 Minute Pitch */}
        <div className="p-5 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> 1-Minute Pitch (Incubator Application / Demo Day)
            </span>
            <button
              onClick={() => copyText("1m", pitch.oneMinute)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-500 hover:text-white text-slate-600 dark:text-slate-300 text-xs font-semibold flex items-center gap-1 transition-all"
            >
              {copiedKey === "1m" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === "1m" ? "Copied!" : "Copy"}</span>
            </button>
          </div>
          <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic">
            "{pitch.oneMinute}"
          </p>
        </div>

        {/* 5 Minutes Pitch */}
        <div className="p-5 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> 5-Minute Pitch (Angel / VC Partner Meeting)
            </span>
            <button
              onClick={() => copyText("5m", pitch.fiveMinutes)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-purple-500 hover:text-white text-slate-600 dark:text-slate-300 text-xs font-semibold flex items-center gap-1 transition-all"
            >
              {copiedKey === "5m" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === "5m" ? "Copied!" : "Copy"}</span>
            </button>
          </div>
          <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic">
            "{pitch.fiveMinutes}"
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
