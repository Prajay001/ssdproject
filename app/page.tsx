"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  TrendingUp,
  BarChart3,
  Presentation,
  DollarSign,
  Bot,
  Layers,
  ChevronRight,
  Star,
  Users,
  Compass,
  FileText,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export default function LandingPage() {
  const [annualBilling, setAnnualBilling] = useState(true);

  // Interactive Demo State
  const [demoIdea, setDemoIdea] = useState("Autonomous drone monitoring and thermographic anomaly detection for utility-scale solar farms.");
  const [demoResult, setDemoResult] = useState({
    score: 87,
    tam: "$14.2 Billion",
    stage: "Series Seed Viable",
    primaryMonetization: "Enterprise SaaS + Hardware-as-a-Service",
    cacPayback: "7.4 Months",
  });

  const handleSelectPreset = (idea: string, score: number, tam: string, stage: string, mon: string, payback: string) => {
    setDemoIdea(idea);
    setDemoResult({
      score,
      tam,
      stage,
      primaryMonetization: mon,
      cacPayback: payback,
    });
  };

  const modules = [
    {
      icon: DollarSign,
      title: "Unit Economics & Cash Sandbox",
      desc: "Interactive 24-month pro-forma financial simulation with LTV/CAC sensitivity modeling and burn horizon.",
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      icon: BarChart3,
      title: "TAM / SAM / SOM Market Sizing",
      desc: "Top-down & bottom-up market sizing calibrated with real-time CAGR projections and sector demand drivers.",
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      icon: Presentation,
      title: "10-Slide Investor Pitch Deck",
      desc: "Full-screen presentation studio with stopwatch timer, speaker notes, and instant print-ready PDF export.",
      color: "text-indigo-500 bg-indigo-500/10",
    },
    {
      icon: Bot,
      title: "AI Venture Partner Co-Pilot",
      desc: "Real-time institutional due diligence grill session, YC partner simulation, and cold outbound pitch generator.",
      color: "text-purple-500 bg-purple-500/10",
    },
    {
      icon: Layers,
      title: "9-Box Business Model Canvas",
      desc: "Interactive editable grid covering Key Partners, Channels, Cost Structures, and Value Propositions.",
      color: "text-amber-500 bg-amber-500/10",
    },
    {
      icon: Compass,
      title: "Startup Comparison Studio",
      desc: "Multi-axis radar chart benchmarking two validated startup concepts head-to-head with VC verdicts.",
      color: "text-rose-500 bg-rose-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white relative overflow-hidden">
      {/* Background Ambient Lighting FX */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-blue-600/20 via-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 -right-48 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Floating Glass Navigation */}
      <header className="sticky top-4 z-50 max-w-6xl mx-auto px-4">
        <div className="glass-panel rounded-2xl px-5 py-3 border border-slate-800/80 bg-slate-900/80 backdrop-blur-xl flex items-center justify-between shadow-2xl">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              VentureIQ AI
            </span>
            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
              v2.5
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
            <a href="#demo" className="hover:text-white transition-colors">
              Interactive Demo
            </a>
            <a href="#modules" className="hover:text-white transition-colors">
              15 Modules
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="hover:text-white transition-colors">
              Testimonials
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-semibold text-slate-300 hover:text-white transition-colors px-3 py-1.5"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 max-w-5xl mx-auto text-center space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-bold tracking-wide animate-in fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen Institutional Startup Validation Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Validate Startup Ideas with{" "}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            VC-Grade Precision
          </span>{" "}
          in 60 Seconds.
        </h1>

        <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Transform raw concepts into comprehensive quantitative due diligence packages: TAM/SAM/SOM market sizing, unit economics sensitivity, Business Model Canvas, and a 10-slide pitch deck ready for investors.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/analysis/new"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-blue-500/30 hover:scale-[1.02] transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start 7-Step Validation Wizard</span>
          </Link>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-800 transition-all"
          >
            <span>Explore Dashboard & Reports</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>

        {/* Social Proof */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> VC-Calibrated Methodology
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-blue-400" /> 15 Automated Strategic Modules
          </span>
          <span className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-purple-400" /> 10-Slide Deck + PDF Export
          </span>
        </div>
      </section>

      {/* Interactive Live Demo Widget Section */}
      <section id="demo" className="py-12 px-4 max-w-5xl mx-auto relative z-10">
        <GlassCard glow="primary" className="p-8 md:p-10 border-slate-800 bg-slate-900/90 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                <Sparkles className="w-4 h-4" />
                <span>Live Interactive Validation Engine</span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1">
                Test Any Idea Right Now
              </h2>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              Click a sample idea or test your own hypothesis:
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() =>
                handleSelectPreset(
                  "Autonomous drone monitoring and thermographic anomaly detection for utility-scale solar farms.",
                  87,
                  "$14.2 Billion",
                  "Series Seed Ready",
                  "Enterprise SaaS + Hardware-as-a-Service",
                  "7.4 Months"
                )
              }
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-all"
            >
              ☀️ Solar Farm Drone AI
            </button>
            <button
              onClick={() =>
                handleSelectPreset(
                  "Real-time B2B SaaS revenue leakage and customer churn prevention via automated webhook telemetry.",
                  91,
                  "$28.6 Billion",
                  "Institutional Grade",
                  "Tiered Subscription + % Recovered Revenue",
                  "5.2 Months"
                )
              }
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-all"
            >
              💳 B2B SaaS Churn Predictor
            </button>
            <button
              onClick={() =>
                handleSelectPreset(
                  "AI agent that conducts continuous automated security code audits and vulnerability patch PRs for GitHub.",
                  94,
                  "$36.8 Billion",
                  "Top Tier VC Fit",
                  "Developer Seat Subscription ($49/seat/mo)",
                  "4.1 Months"
                )
              }
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-all"
            >
              🛡️ DevSecOps Autonomous Agent
            </button>
          </div>

          {/* Input Box */}
          <div className="space-y-2">
            <textarea
              rows={2}
              value={demoIdea}
              onChange={(e) => setDemoIdea(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs md:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your startup idea..."
            />
          </div>

          {/* Calculated Live Metrics Preview Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Investor Readiness</span>
              <div className="text-2xl md:text-3xl font-extrabold font-mono text-emerald-400">
                {demoResult.score}/100
              </div>
              <span className="text-[10px] font-semibold text-emerald-500">{demoResult.stage}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Estimated TAM</span>
              <div className="text-2xl md:text-3xl font-extrabold font-mono text-blue-400">
                {demoResult.tam}
              </div>
              <span className="text-[10px] text-slate-500">Global addressable market</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Primary Monetization</span>
              <div className="text-sm md:text-base font-bold text-slate-200 line-clamp-1">
                {demoResult.primaryMonetization}
              </div>
              <span className="text-[10px] text-slate-500">High margin recurring</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">CAC Payback</span>
              <div className="text-2xl md:text-3xl font-extrabold font-mono text-purple-400">
                {demoResult.cacPayback}
              </div>
              <span className="text-[10px] text-slate-500">Capital efficient target</span>
            </div>
          </div>

          {/* Direct CTA into Wizard */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              Want the full 15-module analysis with Recharts graphs and pitch deck slides?
            </span>
            <Link
              href="/analysis/new"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all"
            >
              <span>Generate Full Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </GlassCard>
      </section>

      {/* 15 Modules Grid */}
      <section id="modules" className="py-16 px-4 max-w-6xl mx-auto space-y-10 relative z-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <Layers className="w-4 h-4" />
            <span>Comprehensive Strategic Intelligence</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            15 Institutional Modules in One Click
          </h2>
          <p className="text-xs md:text-sm text-slate-400">
            Every analysis equips founders and investors with deep quantitative due diligence, not generic marketing text.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m, idx) => {
            const Icon = m.icon;
            return (
              <GlassCard key={idx} className="p-6 space-y-3 border-slate-800 bg-slate-900/60 hover:border-blue-500/40 transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{m.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 max-w-5xl mx-auto space-y-10 relative z-10">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xs md:text-sm text-slate-400">
            Start validating ideas today. Upgrade when you need continuous cohort analysis and venture syndicate exports.
          </p>

          {/* Annual Toggle */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <span className={`text-xs font-bold ${!annualBilling ? "text-white" : "text-slate-500"}`}>
              Monthly
            </span>
            <button
              onClick={() => setAnnualBilling(!annualBilling)}
              className="w-12 h-6 rounded-full bg-slate-800 p-1 flex items-center border border-slate-700 transition-colors"
            >
              <div
                className={`w-4 h-4 rounded-full bg-blue-500 transition-transform ${
                  annualBilling ? "translate-x-6" : ""
                }`}
              />
            </button>
            <span className={`text-xs font-bold flex items-center gap-1.5 ${annualBilling ? "text-white" : "text-slate-500"}`}>
              <span>Annual</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Tier */}
          <GlassCard className="p-6 space-y-6 border-slate-800 bg-slate-900/60">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Starter</h3>
              <p className="text-xs text-slate-400">For early concept ideation</p>
            </div>
            <div className="text-3xl font-extrabold font-mono text-white">
              $0 <span className="text-xs text-slate-500 font-normal">/ forever</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> 3 Startup Analyses / month
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Core 7-Step Intake Wizard
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> TAM/SAM/SOM Recharts sizing
              </li>
              <li className="flex items-center gap-2 text-slate-500">
                <Check className="w-4 h-4 text-slate-600" /> PDF & Pitch Deck Export
              </li>
            </ul>
            <Link
              href="/analysis/new"
              className="block w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center border border-slate-700 transition-all"
            >
              Get Started Free
            </Link>
          </GlassCard>

          {/* Pro Tier (Featured) */}
          <GlassCard glow="primary" className="p-6 space-y-6 border-blue-500/40 bg-gradient-to-b from-blue-950/30 via-slate-900/80 to-slate-900/80 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
              Most Popular
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Founder Pro</h3>
              <p className="text-xs text-slate-400">For active founders raising capital</p>
            </div>
            <div className="text-3xl font-extrabold font-mono text-white">
              {annualBilling ? "$39" : "$49"}{" "}
              <span className="text-xs text-slate-500 font-normal">/ month</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Unlimited Startup Analyses
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Full 15-Module Reports
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> 10-Slide Pitch Deck Viewer & PDF
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Financial Sandbox & Burn Simulator
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> AI Venture Partner Co-Pilot
              </li>
            </ul>
            <Link
              href="/billing"
              className="block w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs text-center shadow-lg shadow-blue-500/25 transition-all"
            >
              Upgrade to Pro
            </Link>
          </GlassCard>

          {/* Enterprise Tier */}
          <GlassCard className="p-6 space-y-6 border-slate-800 bg-slate-900/60">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Venture Syndicate</h3>
              <p className="text-xs text-slate-400">For accelerators & VC scouts</p>
            </div>
            <div className="text-3xl font-extrabold font-mono text-white">
              {annualBilling ? "$159" : "$199"}{" "}
              <span className="text-xs text-slate-500 font-normal">/ month</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Everything in Pro
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Compare Studio Benchmarking
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Custom OpenAI API Key Support
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> White-label PDF & Markdown exports
              </li>
            </ul>
            <Link
              href="/billing"
              className="block w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center border border-slate-700 transition-all"
            >
              Contact Sales
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 px-4 max-w-5xl mx-auto space-y-10 relative z-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Endorsed by Founders & Investors
          </h2>
          <p className="text-xs text-slate-400">
            From early ideation to institutional seed rounds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-5 space-y-3 border-slate-800 bg-slate-900/60">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "VentureIQ cut our pitch preparation time from 3 weeks to 1 hour. The TAM breakdown and unit economics sandbox gave our seed investors total confidence."
            </p>
            <div>
              <p className="text-xs font-bold text-white">Marcus Vance</p>
              <p className="text-[11px] text-slate-500">Founder, CloudScale (YC W24)</p>
            </div>
          </GlassCard>

          <GlassCard className="p-5 space-y-3 border-slate-800 bg-slate-900/60">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "The AI Venture Partner stress-test asked the exact same defensibility questions our lead partner asked at Sequoia. Absolute game changer."
            </p>
            <div>
              <p className="text-xs font-bold text-white">Elena Rostova</p>
              <p className="text-[11px] text-slate-500">CEO, FinPulse Systems</p>
            </div>
          </GlassCard>

          <GlassCard className="p-5 space-y-3 border-slate-800 bg-slate-900/60">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "We run every cohort applicant through VentureIQ's Compare Studio. The multi-axis radar chart eliminates 90% of manual screening friction."
            </p>
            <div>
              <p className="text-xs font-bold text-white">David K.</p>
              <p className="text-[11px] text-slate-500">Managing Director, Horizon Ventures</p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-10 px-4 text-center text-xs text-slate-500 space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px]">All AI Inference Models Operational (99.98% SLA)</span>
        </div>
        <p>© 2026 VentureIQ AI. Built with Next.js 15, Supabase, Recharts & OpenAI GPT-4o.</p>
      </footer>
    </div>
  );
}
