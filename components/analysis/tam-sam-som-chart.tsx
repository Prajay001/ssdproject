"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { MarketMetrics } from "@/types";
import { PieChart as PieIcon, BarChart3, Info } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { useState } from "react";

export function TamSamSomChartCard({ metrics }: { metrics: MarketMetrics }) {
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");

  const data = [
    { name: "TAM (Total)", value: metrics.tam, label: metrics.tamLabel, color: "#3B82F6" },
    { name: "SAM (Serviceable)", value: metrics.sam, label: metrics.samLabel, color: "#6366F1" },
    { name: "SOM (Obtainable)", value: metrics.som, label: metrics.somLabel, color: "#10B981" },
  ];

  return (
    <GlassCard glow="primary" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BarChart3 className="w-4 h-4" />
          <span>TAM / SAM / SOM Market Sizing</span>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200/80 dark:border-slate-800/80">
          <button
            onClick={() => setChartType("bar")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              chartType === "bar"
                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Bar Chart
          </button>
          <button
            onClick={() => setChartType("pie")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              chartType === "pie"
                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Pie Chart
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">TAM (Total Addressable)</span>
          <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100 mt-1">{metrics.tamLabel}</div>
          <p className="text-[11px] text-slate-500 mt-1">Global market demand if 100% market share is captured.</p>
        </div>

        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">SAM (Serviceable)</span>
          <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100 mt-1">{metrics.samLabel}</div>
          <p className="text-[11px] text-slate-500 mt-1">Target segment reached by product geography & business model.</p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">SOM (Share of Market)</span>
          <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100 mt-1">{metrics.somLabel}</div>
          <p className="text-[11px] text-slate-500 mt-1">Realistically obtainable market share in Years 1-3.</p>
        </div>
      </div>

      {/* Recharts Animated Container */}
      <div className="h-64 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${(val / 1e9).toFixed(0)}B`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  borderColor: "#1E293B",
                  borderRadius: "12px",
                  color: "#F8FAFC",
                  fontSize: "12px",
                }}
                formatter={(value: any) => [metrics.currency + " " + value.toLocaleString(), "Market Size"]}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  borderColor: "#1E293B",
                  borderRadius: "12px",
                  color: "#F8FAFC",
                  fontSize: "12px",
                }}
              />
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={(entry) => entry.label}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Methodology note */}
      {metrics.methodology && (
        <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 flex items-center gap-2 text-xs text-slate-500">
          <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />
          <span><strong>Methodology:</strong> {metrics.methodology}</span>
        </div>
      )}
    </GlassCard>
  );
}
