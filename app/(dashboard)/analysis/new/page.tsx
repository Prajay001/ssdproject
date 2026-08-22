"use client";

import { StartupWizard } from "@/components/wizard/startup-wizard";

export default function NewAnalysisPage() {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          New Startup Validation Analysis
        </h1>
        <p className="text-xs md:text-sm text-slate-500">
          Complete the 6 quick steps below. Our AI engine will synthesize 14 strategic modules including TAM metrics, competitor matrices, and investor pitch decks.
        </p>
      </div>

      <StartupWizard />
    </div>
  );
}
