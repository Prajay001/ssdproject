"use client";

import { useTheme } from "next-themes";
import { Search, Sun, Moon, Bell, Plus, Sparkles, User, Settings, LogOut, Check } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getUserProfile } from "@/lib/supabase/client";
import { UserProfile } from "@/types";

export function Header({ onOpenSearch }: { onOpenSearch: () => void }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUser(getUserProfile());
  }, []);

  return (
    <header className="h-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Search Bar / Keyboard Trigger */}
      <button
        onClick={onOpenSearch}
        className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-medium transition-all group max-w-sm w-full"
      >
        <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
        <span className="truncate">Search startups, reports, SWOT...</span>
        <kbd className="ml-auto font-mono text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md border border-slate-300 dark:border-slate-700">
          ⌘K
        </kbd>
      </button>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* New Analysis CTA */}
        <Link
          href="/analysis/new"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Analysis</span>
        </Link>

        {/* Theme Toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
        )}

        {/* User Dropdown Menu */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-md focus:outline-none ring-2 ring-transparent focus:ring-blue-500/50"
          >
            {user?.name ? user.name.charAt(0) : "A"}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 border-b border-slate-200/60 dark:border-slate-800/60 mb-1">
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{user?.name || "Alex Rivera"}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email || "founder@ventureiq.ai"}</p>
              </div>

              <Link
                href="/settings"
                onClick={() => setShowDropdown(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                Settings
              </Link>
              <Link
                href="/billing"
                onClick={() => setShowDropdown(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                Billing & Credits
              </Link>

              <div className="border-t border-slate-200/60 dark:border-slate-800/60 my-1" />

              <Link
                href="/login"
                onClick={() => setShowDropdown(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
