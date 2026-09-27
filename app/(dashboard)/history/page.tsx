"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { getHistory, HistoryItem } from "@/lib/supabase/client";
import { History as HistoryIcon, Search, Clock, ArrowUpRight, RefreshCw, Inbox } from "lucide-react";

export default function HistoryPage() {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setHistoryItems(getHistory());
  }, []);

  const filtered = historyItems.filter(
    (item) =>
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.actionType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <HistoryIcon className="w-6 h-6 text-blue-500" />
            <span>Activity History & Audit Logs</span>
          </h1>
          <p className="text-xs text-slate-500">
            Complete record of every startup analysis, export, duplication, and report modification.
          </p>
        </div>

        <button
          onClick={() => setHistoryItems(getHistory())}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Audit Logs</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md w-full">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter history logs..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* History Table or Empty State */}
      {filtered.length === 0 ? (
        <GlassCard className="p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-400 flex items-center justify-center mx-auto border border-slate-200 dark:border-slate-800">
            <Inbox className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">No History Logs Yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Your actions will be logged here as you create, export, duplicate, and manage startup analyses.
            </p>
          </div>
        </GlassCard>
      ) : (
        <GlassCard className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Action Type</th>
                  <th className="py-3.5 px-6">Description</th>
                  <th className="py-3.5 px-6">Timestamp</th>
                  <th className="py-3.5 px-6 text-right">View Report</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60 text-xs font-medium">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          item.actionType === "Created"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : item.actionType === "Exported"
                            ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                            : item.actionType === "Duplicated"
                            ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
                            : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                        }`}
                      >
                        {item.actionType}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-800 dark:text-slate-200 font-semibold">{item.description}</td>
                    <td className="py-4 px-6 text-slate-500 font-mono flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{new Date(item.createdAt).toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {item.reportId ? (
                        <Link
                          href={`/reports/${item.reportId}`}
                          className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold hover:underline"
                        >
                          <span>Open</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
