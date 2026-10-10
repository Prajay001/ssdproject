"use client";

import { useState, useMemo } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import {
  TrendingUp,
  DollarSign,
  Users,
  Percent,
  Activity,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Sliders,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

interface FinancialSimulatorProps {
  startupName: string;
  stage: string;
  country: string;
}

export function FinancialSimulatorCard({
  startupName,
  stage,
  country,
}: FinancialSimulatorProps) {
  // Configurable sandbox state with sensible defaults
  const [arpu, setArpu] = useState<number>(140); // $ / month
  const [cac, setCac] = useState<number>(290); // $
  const [churnRate, setChurnRate] = useState<number>(2.5); // % / month
  const [newCustomersPerMonth, setNewCustomersPerMonth] = useState<number>(45);
  const [monthlyOpex, setMonthlyOpex] = useState<number>(14000); // $ / month

  // Preset scenarios
  const applyPreset = (preset: "b2b_saas" | "enterprise" | "devtools" | "consumer") => {
    switch (preset) {
      case "b2b_saas":
        setArpu(180);
        setCac(350);
        setChurnRate(2.0);
        setNewCustomersPerMonth(50);
        setMonthlyOpex(18000);
        break;
      case "enterprise":
        setArpu(1200);
        setCac(2400);
        setChurnRate(0.8);
        setNewCustomersPerMonth(8);
        setMonthlyOpex(35000);
        break;
      case "devtools":
        setArpu(65);
        setCac(110);
        setChurnRate(3.2);
        setNewCustomersPerMonth(120);
        setMonthlyOpex(12000);
        break;
      case "consumer":
        setArpu(24);
        setCac(45);
        setChurnRate(4.8);
        setNewCustomersPerMonth(400);
        setMonthlyOpex(9000);
        break;
    }
  };

  // Calculations
  const ltv = useMemo(() => {
    const monthlyChurnDecimal = churnRate / 100;
    return monthlyChurnDecimal > 0 ? Math.round(arpu / monthlyChurnDecimal) : 0;
  }, [arpu, churnRate]);

  const ltvToCacRatio = useMemo(() => {
    if (cac <= 0) return 0;
    return Number((ltv / cac).toFixed(2));
  }, [ltv, cac]);

  const paybackMonths = useMemo(() => {
    if (arpu <= 0) return 0;
    return Number((cac / arpu).toFixed(1));
  }, [cac, arpu]);

  // 24-Month Financial Trajectory Projection
  const projectionData = useMemo(() => {
    const months = [];
    let activeCustomers = 0;
    const monthlyChurnDecimal = churnRate / 100;

    for (let m = 1; m <= 24; m++) {
      // New additions minus churned customers
      const churned = Math.round(activeCustomers * monthlyChurnDecimal);
      activeCustomers = Math.max(0, activeCustomers - churned + newCustomersPerMonth);

      const mrr = activeCustomers * arpu;
      const marketingSpend = newCustomersPerMonth * cac;
      const totalExpenses = monthlyOpex + marketingSpend;
      const netCashFlow = mrr - totalExpenses;

      months.push({
        month: `M${m}`,
        revenue: mrr,
        expenses: totalExpenses,
        marketing: marketingSpend,
        opex: monthlyOpex,
        netCashFlow: netCashFlow,
        activeCustomers: activeCustomers,
      });
    }
    return months;
  }, [arpu, cac, churnRate, newCustomersPerMonth, monthlyOpex]);

  // Breakeven month
  const breakevenMonth = useMemo(() => {
    const found = projectionData.find((p) => p.netCashFlow >= 0);
    return found ? found.month : "Month 24+";
  }, [projectionData]);

  // VC Benchmark status
  const getLtvCacBadge = (ratio: number) => {
    if (ratio >= 3.0) {
      return {
        label: "Institutional Grade (>3.0x)",
        color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
        icon: ShieldCheck,
      };
    }
    if (ratio >= 2.0) {
      return {
        label: "Viable (2.0x - 3.0x)",
        color: "text-blue-500 bg-blue-500/10 border-blue-500/30",
        icon: TrendingUp,
      };
    }
    return {
      label: "Unit Economics At Risk (<2.0x)",
      color: "text-rose-500 bg-rose-500/10 border-rose-500/30",
      icon: AlertTriangle,
    };
  };

  const badge = getLtvCacBadge(ltvToCacRatio);
  const BadgeIcon = badge.icon;

  return (
    <GlassCard glow="primary" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
            <DollarSign className="w-4 h-4" />
            <span>Unit Economics & 24-Month Financial Sandbox</span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            Pro-Forma Cash Flow & Sensitivity Modeling
          </h3>
          <p className="text-xs text-slate-500">
            Interactive parameter simulation calibrated for {startupName} ({stage} in {country}).
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200/80 dark:border-slate-800/80">
          <span className="text-[10px] font-bold text-slate-400 uppercase px-2">Presets:</span>
          <button
            onClick={() => applyPreset("b2b_saas")}
            className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white dark:bg-slate-800 hover:text-blue-500 text-slate-700 dark:text-slate-300 shadow-sm transition-all"
          >
            B2B SaaS
          </button>
          <button
            onClick={() => applyPreset("enterprise")}
            className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white dark:bg-slate-800 hover:text-blue-500 text-slate-700 dark:text-slate-300 shadow-sm transition-all"
          >
            Enterprise
          </button>
          <button
            onClick={() => applyPreset("devtools")}
            className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white dark:bg-slate-800 hover:text-blue-500 text-slate-700 dark:text-slate-300 shadow-sm transition-all"
          >
            DevTools
          </button>
          <button
            onClick={() => applyPreset("consumer")}
            className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white dark:bg-slate-800 hover:text-blue-500 text-slate-700 dark:text-slate-300 shadow-sm transition-all"
          >
            Consumer
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Customer LTV</span>
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
            ${ltv.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">ARPU / Monthly Churn</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>LTV : CAC Ratio</span>
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
            {ltvToCacRatio}x
          </div>
          <div className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded border ${badge.color}`}>
            <BadgeIcon className="w-3 h-3" />
            <span>{badge.label}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Payback Period</span>
            <Zap className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
            {paybackMonths} mo
          </div>
          <p className="text-[11px] text-slate-500">
            {paybackMonths <= 12 ? "✓ Under 12 Mo Target" : "⚠️ High payback capital drag"}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Cash Breakeven</span>
            <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-blue-600 dark:text-blue-400">
            {breakevenMonth}
          </div>
          <p className="text-[11px] text-slate-500">Net monthly cash flow positive</p>
        </div>
      </div>

      {/* Interactive Controls Sliders */}
      <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/70 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          <Sliders className="w-3.5 h-3.5 text-blue-500" />
          <span>Interactive Sensitivity Parameters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* ARPU Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Monthly ARPU ($)</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">${arpu}</span>
            </div>
            <input
              type="range"
              min={15}
              max={1500}
              step={5}
              value={arpu}
              onChange={(e) => setArpu(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg"
            />
          </div>

          {/* CAC Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Customer CAC ($)</span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">${cac}</span>
            </div>
            <input
              type="range"
              min={20}
              max={3000}
              step={10}
              value={cac}
              onChange={(e) => setCac(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg"
            />
          </div>

          {/* Churn Rate Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Monthly Churn (%)</span>
              <span className="font-mono font-bold text-rose-500">{churnRate}%</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={12}
              step={0.1}
              value={churnRate}
              onChange={(e) => setChurnRate(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg"
            />
          </div>

          {/* New Customer Additions */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400">New Users / Month</span>
              <span className="font-mono font-bold text-emerald-500">+{newCustomersPerMonth}</span>
            </div>
            <input
              type="range"
              min={5}
              max={350}
              step={5}
              value={newCustomersPerMonth}
              onChange={(e) => setNewCustomersPerMonth(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg"
            />
          </div>

          {/* Fixed OpEx Slider */}
          <div className="space-y-2 sm:col-span-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Monthly Fixed OpEx ($)</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                ${monthlyOpex.toLocaleString()} / mo
              </span>
            </div>
            <input
              type="range"
              min={3000}
              max={60000}
              step={1000}
              value={monthlyOpex}
              onChange={(e) => setMonthlyOpex(Number(e.target.value))}
              className="w-full accent-slate-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* 24-Month Chart Projection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-300">
            24-Month Revenue vs. Total Outflows vs. Net Cash Flow
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            Month 24 MRR: ${projectionData[23].revenue.toLocaleString()}
          </span>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={projectionData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="month" stroke="#888888" fontSize={10} tickLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={10}
                tickLine={false}
                tickFormatter={(val) => `$${Math.round(val / 1000)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  borderColor: "#1E293B",
                  borderRadius: "12px",
                  color: "#F8FAFC",
                  fontSize: "12px",
                }}
                formatter={(value: any, name: any) => [
                  `$${Number(value).toLocaleString()}`,
                  name === "revenue"
                    ? "MRR"
                    : name === "expenses"
                    ? "Total Outflows"
                    : "Net Cash Flow",
                ]}
              />
              <Legend
                wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                formatter={(val) =>
                  val === "revenue"
                    ? "Monthly Recurring Revenue (MRR)"
                    : val === "expenses"
                    ? "Total Expenses (OpEx + CAC)"
                    : "Net Cash Flow"
                }
              />
              <Area type="monotone" dataKey="revenue" fill="#3B82F6" fillOpacity={0.15} stroke="#3B82F6" strokeWidth={2} />
              <Bar dataKey="expenses" fill="#64748B" opacity={0.35} radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="netCashFlow" stroke="#10B981" strokeWidth={2.5} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </GlassCard>
  );
}
