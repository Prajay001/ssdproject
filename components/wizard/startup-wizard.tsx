"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { StartupIdeaInput, BusinessStage } from "@/types";
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Zap, Rocket, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { saveReport, consumeAiCredits } from "@/lib/supabase/client";

export function StartupWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<StartupIdeaInput>({
    name: "",
    oneSentenceIdea: "",
    problem: "",
    targetAudience: "",
    country: "United States",
    stage: "Idea",
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState("Initializing neural analysis...");

  const stages: BusinessStage[] = ["Idea", "MVP", "Early Users", "Growing"];

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsAnalyzing(true);
    setStep(7);

    // Simulated progress steps for wow factor
    const steps = [
      { progress: 15, msg: "Evaluating market problem severity & audience size..." },
      { progress: 35, msg: "Calculating TAM / SAM / SOM metrics & CAGR rates..." },
      { progress: 55, msg: "Mapping direct & indirect competitor pricing matrices..." },
      { progress: 75, msg: "Constructing 9-box Business Model Canvas & SWOT grid..." },
      { progress: 90, msg: "Generating 10-slide investor deck & pitch speeches..." },
      { progress: 100, msg: "Analysis complete! Preparing dashboard..." },
    ];

    for (const s of steps) {
      setAnalysisProgress(s.progress);
      setProgressStatus(s.msg);
      await new Promise((res) => setTimeout(res, 600));
    }

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.report) {
        saveReport(data.report);
        consumeAiCredits(20);

        // Confetti celebration
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });

        setTimeout(() => {
          router.push(`/reports/${data.report.id}`);
        }, 800);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Wizard Header Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>STEP {step} OF 6</span>
          <span>{Math.round((step / 6) * 100)}% COMPLETED</span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 6) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <GlassCard glow="primary" hoverEffect={false} className="p-8">
        <AnimatePresence mode="wait">
          {/* STEP 1: Startup Name */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                  What is the name of your startup or project?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Give it a working title or brand name.
                </p>
              </div>

              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. CloudScale AI, FinPulse, DevPulse..."
                className="w-full px-4 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </motion.div>
          )}

          {/* STEP 2: One Sentence Idea */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                  Summarize your startup idea in one sentence.
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Keep it clear and focused on the core concept.
                </p>
              </div>

              <textarea
                rows={3}
                value={formData.oneSentenceIdea}
                onChange={(e) => setFormData({ ...formData, oneSentenceIdea: e.target.value })}
                placeholder="e.g. Automated AI code review and architectural health scoring for Next.js engineering teams."
                className="w-full px-4 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </motion.div>
          )}

          {/* STEP 3: Problem Being Solved */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                  What specific problem are you solving?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Describe the pain point, inefficiency, or frustration experienced today.
                </p>
              </div>

              <textarea
                rows={4}
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                placeholder="e.g. Engineering leads waste 10+ hours per week manually reviewing complex PRs, resulting in tech debt accumulation and delayed releases."
                className="w-full px-4 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </motion.div>
          )}

          {/* STEP 4: Target Audience */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                  Who is your target audience or primary customer?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Define the buyers or users who feel this pain most acutely.
                </p>
              </div>

              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                placeholder="e.g. Engineering Managers, VPs of Technology, and Lead Developers at software companies."
                className="w-full px-4 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </motion.div>
          )}

          {/* STEP 5: Country / Market Region */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                  What is your primary target country or region?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Used to calibrate TAM/SAM/SOM market sizing models.
                </p>
              </div>

              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="e.g. United States, Global, Europe, Southeast Asia..."
                className="w-full px-4 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </motion.div>
          )}

          {/* STEP 6: Business Stage */}
          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                  What is your current business stage?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Select the stage that best describes your progress.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {stages.map((stg) => (
                  <button
                    key={stg}
                    type="button"
                    onClick={() => setFormData({ ...formData, stage: stg })}
                    className={`p-5 rounded-2xl border text-left transition-all ${
                      formData.stage === stg
                        ? "bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/30"
                        : "bg-slate-100/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400"
                    }`}
                  >
                    <span className="font-bold text-sm block">{stg}</span>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      {stg === "Idea" && "Unlaunched concept or napkin sketch"}
                      {stg === "MVP" && "Working prototype or beta test"}
                      {stg === "Early Users" && "First paying or active users onboarded"}
                      {stg === "Growing" && "Scaling revenue & team headcount"}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 7: Submit & Real-Time AI Loading */}
          {step === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center space-y-6"
            >
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/30">
                  <Sparkles className="w-8 h-8 animate-spin" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                  Synthesizing Strategic Intelligence...
                </h3>
                <p className="text-xs text-blue-500 font-mono mt-1 font-semibold">{progressStatus}</p>
              </div>

              <div className="w-full max-w-md mx-auto h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${analysisProgress}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        {step < 7 && (
          <div className="flex items-center justify-between pt-8 border-t border-slate-200/60 dark:border-slate-800/60 mt-6">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 disabled:opacity-30 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:bg-slate-200 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !formData.name) ||
                (step === 2 && !formData.oneSentenceIdea) ||
                (step === 3 && !formData.problem) ||
                (step === 4 && !formData.targetAudience)
              }
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 disabled:opacity-40 transition-all"
            >
              <span>{step === 6 ? "Generate AI Validation" : "Continue"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
