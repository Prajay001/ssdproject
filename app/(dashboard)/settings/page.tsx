"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { getUserProfile, updateUserProfile } from "@/lib/supabase/client";
import { UserProfile } from "@/types";
import { useTheme } from "next-themes";
import { User, Key, Bell, Sun, Moon, Trash2, Check, ShieldAlert } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const prof = getUserProfile();
    setUser(prof);
    setName(prof.name);
    setEmail(prof.email);
    setApiKey(prof.customOpenAiKey || "");
    setNotifications(prof.notificationsEnabled);
  }, []);

  const handleSave = () => {
    updateUserProfile({
      name,
      email,
      customOpenAiKey: apiKey,
      notificationsEnabled: notifications,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Account & Application Settings
        </h1>
        <p className="text-xs text-slate-500">
          Manage your profile, theme preferences, OpenAI API keys, and notification preferences.
        </p>
      </div>

      {/* Profile Section */}
      <GlassCard className="p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-500" /> Profile Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </GlassCard>

      {/* OpenAI API Key Management */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Key className="w-4 h-4 text-purple-500" /> OpenAI API Key Management
          </h3>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20">
            Optional Custom Key
          </span>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
            Custom OpenAI API Key (`sk-...`)
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-proj-..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <p className="text-[11px] text-slate-500 mt-1">
            If provided, VentureIQ will use your custom key for unlimited GPT-4o analysis generations.
          </p>
        </div>
      </GlassCard>

      {/* Appearance & Preferences */}
      <GlassCard className="p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-500" /> Appearance & Notifications
        </h3>

        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
          <div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Color Theme</span>
            <span className="text-[11px] text-slate-500">Toggle dark and light mode</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setTheme("light")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                theme === "light" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                theme === "dark" ? "bg-slate-900 text-white shadow-sm" : "text-slate-500"
              }`}
            >
              Dark
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
          <div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Email Alerts</span>
            <span className="text-[11px] text-slate-500">Receive analysis completion notifications</span>
          </div>

          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
          />
        </div>
      </GlassCard>

      {/* Save Button */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : null}
          <span>{savedSuccess ? "Settings Saved!" : "Save Changes"}</span>
        </button>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white text-xs font-bold transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete Account</span>
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel max-w-md w-full rounded-2xl p-6 space-y-4 border border-rose-500/30">
            <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
              <ShieldAlert className="w-5 h-5" />
              <span>Confirm Account Deletion</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Are you sure you want to permanently delete your VentureIQ account? All saved reports, history, and AI credits will be permanently removed.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  alert("Account deletion simulated.");
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow"
              >
                Delete Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
