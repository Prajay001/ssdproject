"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { AnalysisReport } from "@/types";
import {
  Bot,
  Send,
  Sparkles,
  Zap,
  HelpCircle,
  ShieldAlert,
  Mail,
  ChevronRight,
  RefreshCw,
  Copy,
  Check,
  Flame,
} from "lucide-react";

interface AiAdvisorProps {
  report: AnalysisReport;
}

interface Message {
  role: "user" | "advisor";
  content: string;
  timestamp: string;
}

export function AiAdvisorDrawer({ report }: AiAdvisorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "advisor",
      content: `Hello! I'm your VentureIQ Institutional AI Advisor. I've reviewed your thesis for **${report.ideaInput.name}** (Overall Readiness Score: **${report.overallScore}/100**). Ask me anything, or choose a stress-test module below to test your moat, unit economics, or investor pitch objections.`,
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const quickPrompts = [
    {
      icon: Flame,
      label: "Simulate YC Partner Interview",
      prompt: `Grill me as a Y Combinator partner on our retention, defensibility, and user acquisition. Give me 3 hard-hitting questions and strategic answers based on our report.`,
    },
    {
      icon: ShieldAlert,
      label: "Stress-Test Competitive Moat",
      prompt: `How do we protect ${report.ideaInput.name} if established competitors like ${report.competitors[0]?.name || "incumbents"} clone our core features within 6 months?`,
    },
    {
      icon: Mail,
      label: "Generate 3 High-Conversion Enterprise Cold Pitches",
      prompt: `Draft 3 distinct cold email angles tailored for ${report.ideaInput.targetAudience} addressing the problem: "${report.ideaInput.problem}".`,
    },
    {
      icon: Zap,
      label: "Pricing & Expansion Strategy",
      prompt: `Recommend optimal packaging for our revenue model (${report.revenueModels[0]?.name || "Subscription"}) to maximize Net Dollar Retention (NDR) and contract values.`,
    },
  ];

  const handleSendPrompt = async (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: Message = {
      role: "user",
      content: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Dynamic institutional intelligence generator
    setTimeout(() => {
      let responseText = "";

      if (promptText.toLowerCase().includes("yc") || promptText.toLowerCase().includes("grill")) {
        responseText = `### 🎯 YC Partner Due Diligence Simulation for ${report.ideaInput.name}

1. **"What is the non-obvious secret you know about ${report.ideaInput.targetAudience} that incumbents don't?"**
   - *Strategic Answer:* Incumbents treat this as a generic workflow addon. Our telemetry proves users spend 10+ hours per week manually bridging legacy gaps, meaning our specialized focus achieves 4x faster time-to-value.

2. **"Why won't direct competitors like ${report.competitors[0]?.name || "existing tools"} squash you?"**
   - *Strategic Answer:* Competitors are burdened with enterprise legacy architecture and multi-month procurement cycles. We operate on a lightweight product-led motion with instant time-to-first-value and verticalized workflows.

3. **"What does your organic retention curve look like at Month 3?"**
   - *Recommendation:* Prioritize embedding proprietary switching costs (e.g. customized organizational data schemas and automated daily alerts) so churn drops below 2.0% monthly.`;
      } else if (promptText.toLowerCase().includes("moat") || promptText.toLowerCase().includes("clone")) {
        responseText = `### 🛡️ Defensibility & Moat Strategy against Incumbents

1. **Data Network Effects & Accumulation:**
   - Every time a customer uses ${report.ideaInput.name}, our models ingest domain-specific metadata that fine-tunes downstream recommendation accuracy. An incumbent cannot replicate this without user volume.

2. **Workflow Lock-In & Integrations:**
   - Deeply embed into the customer's daily toolchain via webhooks and notifications. Once operational dependencies are established, the friction of switching exceeds minor pricing discounts.

3. **Velocity Advantage:**
   - Ship features 3x faster than incumbents. While large vendors navigate 9-month enterprise release cycles, deliver weekly updates tuned directly to user feedback.`;
      } else if (promptText.toLowerCase().includes("cold") || promptText.toLowerCase().includes("email")) {
        responseText = `### 📧 3 High-Conversion Enterprise Outbound Hooks

**Angle 1: The Cost of Inaction (Urgency Focus)**
> *Subject:* Quick question regarding ${report.ideaInput.name} vs. current manual review
> *Body:* Hi {{FirstName}}, noticed your team is rapidly scaling operations. Most leaders we talk to lose 10+ hours weekly on ${report.ideaInput.problem.slice(0, 70)}... We built ${report.ideaInput.name} to automate this end-to-end. Open to a 5-minute teardown this Thursday?

**Angle 2: The Benchmark Metric (Curiosity Focus)**
> *Subject:* Metric benchmark for {{Company}}'s growth
> *Body:* Hi {{FirstName}}, we analyzed 100+ high-growth companies in ${report.ideaInput.country} tackling ${report.ideaInput.oneSentenceIdea.slice(0, 60)}. Teams switching to automated validation saw a 40% reduction in cycle times within 30 days. Would it make sense to share the case study?

**Angle 3: The Peer Validation Hook**
> *Subject:* How peers in your space solve ${report.ideaInput.targetAudience.slice(0, 30)} headaches
> *Body:* Hi {{FirstName}}, short note: leading teams are ditching manual workarounds in favor of automated intelligence. Are you exploring updates to this workflow in Q3?`;
      } else {
        responseText = `### 💡 Strategic Advisory Analysis for ${report.ideaInput.name}

Based on your current **TAM of ${report.marketMetrics.tamLabel}** and **Risk Profile**, here is the institutional recommendation:

1. **Immediate Focus (Next 30 Days):** Focus 80% of resources on validating the core value proposition with 10 high-intent design partners from ${report.ideaInput.targetAudience}.
2. **Pricing Recommendation:** Initiate with a pilot contract structure ($250 - $1,200/mo) with guaranteed SLA metrics rather than a race-to-the-bottom free tier.
3. **Key Metric to Watch:** Keep the CAC Payback period under 12 months while ensuring LTV:CAC exceeds 3.0x as marketing campaigns scale.`;
      }

      const advisorMsg: Message = {
        role: "advisor",
        content: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, advisorMsg]);
      setLoading(false);
    }, 700);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(index);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <GlassCard glow="primary" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-wider">
          <Bot className="w-4 h-4" />
          <span>Interactive AI Venture Partner Co-Pilot</span>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
          Due Diligence Mode
        </span>
      </div>

      {/* Quick Prompts Bar */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          One-Click Stress Tests & Pitch Refinements:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {quickPrompts.map((qp, idx) => {
            const Icon = qp.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSendPrompt(qp.prompt)}
                disabled={loading}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 hover:bg-purple-50 dark:hover:bg-purple-950/30 border border-slate-200/60 dark:border-slate-800/60 hover:border-purple-500/40 text-left transition-all group"
              >
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform flex-shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  {qp.label}
                </span>
                <ChevronRight className="w-3.5 h-3.5 ml-auto text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2 rounded-xl p-2 bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-900">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              m.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[90%] md:max-w-[80%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed space-y-2 ${
                m.role === "user"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between gap-4 text-[10px] opacity-70 pb-1 border-b border-white/10 dark:border-slate-800">
                <span className="font-bold uppercase tracking-wider">
                  {m.role === "user" ? "Founder" : "Venture Partner AI"}
                </span>
                <div className="flex items-center gap-2">
                  <span>{m.timestamp}</span>
                  {m.role === "advisor" && (
                    <button
                      onClick={() => copyToClipboard(m.content, idx)}
                      className="hover:text-purple-400 transition-colors"
                      title="Copy response"
                    >
                      {copiedIdx === idx ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>
              </div>
              <div className="whitespace-pre-line text-xs">{m.content}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-purple-500 font-semibold p-3 animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Analyzing institutional investment thesis & crafting response...</span>
          </div>
        )}
      </div>

      {/* Input box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendPrompt(input);
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your AI Venture Partner about valuation, defensibility, go-to-market..."
          disabled={loading}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white text-xs font-bold shadow-md shadow-purple-500/20 flex items-center gap-1.5 transition-all"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </GlassCard>
  );
}
