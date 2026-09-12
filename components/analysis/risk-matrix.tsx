"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { RiskAnalysis } from "@/types";
import { ShieldAlert, CheckCircle, AlertTriangle, XCircle, ShieldCheck } from "lucide-react";

export function RiskMatrixCard({ risk }: { risk: RiskAnalysis }) {
  const categories = [
    { key: "technicalRisk", title: "Technical Risk", data: risk.technicalRisk },
    { key: "financialRisk", title: "Financial Risk", data: risk.financialRisk },
    { key: "legalRisk", title: "Legal Risk", data: risk.legalRisk },
    { key: "marketRisk", title: "Market Risk", data: risk.marketRisk },
    { key: "executionRisk", title: "Execution Risk", data: risk.executionRisk },
  ];

  const getTrafficLight = (level: "Green" | "Amber" | "Red") => {
    switch (level) {
      case "Green":
        return {
          badge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
          dot: "bg-emerald-500 shadow-emerald-500/50",
          icon: CheckCircle,
          label: "Low Risk",
        };
      case "Amber":
        return {
          badge: "bg-amber-500/10 text-amber-500 border-amber-500/20",
          dot: "bg-amber-500 shadow-amber-500/50",
          icon: AlertTriangle,
          label: "Moderate Risk",
        };
      case "Red":
        return {
          badge: "bg-rose-500/10 text-rose-500 border-rose-500/20",
          dot: "bg-rose-500 shadow-rose-500/50",
          icon: XCircle,
          label: "High Risk",
        };
    }
  };

  return (
    <GlassCard glow="amber" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>Risk Matrix Analysis</span>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
          Traffic-Light Indicators
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const style = getTrafficLight(cat.data.level);
          const Icon = style.icon;

          return (
            <div
              key={cat.key}
              className="p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-slate-100">{cat.title}</span>
                <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${style.badge}`}>
                  <span className={`w-2 h-2 rounded-full ${style.dot} animate-pulse`} />
                  <span>{cat.data.level}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">{cat.data.description}</p>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  Mitigation Action
                </span>
                <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                  🛡️ {cat.data.mitigation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
