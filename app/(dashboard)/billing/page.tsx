"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { getUserProfile } from "@/lib/supabase/client";
import { UserProfile } from "@/types";
import { CreditCard, Zap, Check, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";

export default function BillingPage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(getUserProfile());
  }, []);

  const plans = [
    {
      name: "Starter",
      price: "$0",
      period: "forever free",
      credits: "50 AI Credits / mo",
      features: [
        "Up to 2 Startup Analyses",
        "Executive Summary & Problem Analysis",
        "Basic Competitor Matrix",
        "Community Support",
      ],
      current: false,
    },
    {
      name: "Pro",
      price: "$49",
      period: "per month",
      credits: "500 AI Credits / mo",
      features: [
        "Unlimited Startup Analyses",
        "14-Module Full Strategic Report",
        "Interactive 9-Box Business Model Canvas",
        "10-Slide Investor Deck + PDF/MD Exports",
        "TAM / SAM / SOM Recharts Visualizations",
        "Priority Customer Support",
      ],
      current: true,
    },
    {
      name: "Scale & Enterprise",
      price: "$199",
      period: "per month",
      credits: "2,500 AI Credits / mo",
      features: [
        "Everything in Pro Tier",
        "Custom OpenAI API Model Integration",
        "Team Workspace Collaboration (5 Seats)",
        "Dedicated Accelerator Account Manager",
        "Custom White-Label Export Branding",
      ],
      current: false,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-500" />
            <span>Billing & AI Credits Management</span>
          </h1>
          <p className="text-xs text-slate-500">
            Monitor credit usage, upgrade your plan, or view past invoices.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 text-xs font-bold font-mono">
          <Zap className="w-4 h-4 fill-current" />
          <span>Active Plan: {user?.plan || "Pro"}</span>
        </div>
      </div>

      {/* Credit Meter Card */}
      <GlassCard glow="primary" className="p-6 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 border-blue-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              AI Credit Balance
            </span>
            <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-slate-100 flex items-center gap-3">
              <span>{user?.aiCredits ?? 480} Credits</span>
              <span className="text-xs font-normal text-slate-500 font-sans">out of 500</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Each startup validation analysis consumes 20 AI credits.
            </p>
          </div>

          <button
            onClick={() => alert("Refilled 200 demo AI credits!")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Add 200 Extra Credits</span>
          </button>
        </div>
      </GlassCard>

      {/* Subscription Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <GlassCard
            key={plan.name}
            glow={plan.current ? "primary" : "none"}
            className={`p-6 space-y-6 flex flex-col justify-between ${
              plan.current ? "border-2 border-blue-500/80 shadow-xl" : ""
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{plan.name}</h3>
                {plan.current && (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500 text-white shadow">
                    CURRENT PLAN
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
                    {plan.price}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ {plan.period}</span>
                </div>
                <span className="text-xs font-semibold text-blue-500 mt-1 block">{plan.credits}</span>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Included Features
                </span>
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => alert(`Upgraded to ${plan.name}!`)}
              disabled={plan.current}
              className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                plan.current
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/20"
              }`}
            >
              {plan.current ? "Active Plan" : `Upgrade to ${plan.name}`}
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
