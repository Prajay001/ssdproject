"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  History,
  BookmarkCheck,
  Settings,
  CreditCard,
  Zap,
  ChevronRight,
  ShieldCheck,
  GitCompare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { getUserProfile } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { UserProfile } from "@/types";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "New Analysis", href: "/analysis/new", icon: Sparkles, badge: "AI" },
  { name: "Compare Studio", href: "/compare", icon: GitCompare, badge: "NEW" },
  { name: "Saved Reports", href: "/reports", icon: BookmarkCheck },
  { name: "History", href: "/history", icon: History },
  { name: "Billing", href: "/billing", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(getUserProfile());
  }, []);

  return (
    <aside className="w-64 border-r border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl flex flex-col justify-between p-4 h-screen sticky top-0 z-30 select-none">
      <div>
        {/* Brand Header */}
        <Link href="/dashboard" className="flex items-center gap-3 px-2 py-3 mb-6 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                VentureIQ
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Startup Idea Validation
            </p>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-500/10 shadow-sm border border-blue-200/50 dark:border-blue-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-900/60"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebarActiveIndicator"
                    className="absolute left-0 w-1 h-5 bg-blue-600 dark:bg-blue-400 rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-colors",
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                    )}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge ? (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm">
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight
                    className={cn(
                      "w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400",
                      isActive && "opacity-100 text-blue-500"
                    )}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* AI Credits Meter & User Mini Profile */}
      <div className="space-y-3 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="glass-card rounded-xl p-3 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-transparent border border-blue-500/10">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-500 fill-current" />
              <span>AI Credits</span>
            </div>
            <span className="text-blue-600 dark:text-blue-400 font-mono">
              {user?.aiCredits ?? 480} / 500
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${((user?.aiCredits ?? 480) / 500) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-slate-700 to-slate-900 text-white flex items-center justify-center font-bold text-xs shadow">
              {user?.name ? user.name.charAt(0) : "A"}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold truncate text-slate-800 dark:text-slate-200">
                {user?.name || "Alex Rivera"}
              </p>
              <p className="text-[10px] text-slate-500 truncate">{user?.plan || "Pro Plan"}</p>
            </div>
          </div>
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
        </div>
      </div>
    </aside>
  );
}
