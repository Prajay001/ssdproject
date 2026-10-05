"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { PitchDeckSlide, AnalysisReport } from "@/types";
import {
  Presentation,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Download,
  Check,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Clock,
  FileText,
  Volume2,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { exportReportToPdf } from "@/lib/export/pdf";

export function PitchDeckViewerCard({
  slides,
  report,
}: {
  slides: PitchDeckSlide[];
  report: AnalysisReport;
}) {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const currentSlide = slides[currentSlideIdx] || slides[0];

  // Presentation stopwatch timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Auto-play interval
  useEffect(() => {
    let autoInterval: NodeJS.Timeout;
    if (autoPlay) {
      autoInterval = setInterval(() => {
        setCurrentSlideIdx((prev) => (prev + 1) % slides.length);
      }, 6000);
    }
    return () => clearInterval(autoInterval);
  }, [autoPlay, slides.length]);

  // Keyboard navigation & Fullscreen shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentSlideIdx((prev) => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight" || e.key === " ") {
        setCurrentSlideIdx((prev) => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === "f" || e.key === "F") {
        setIsFullscreen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides.length]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Generate dynamic speaker notes based on slide content
  const getSpeakerNotes = (slide: PitchDeckSlide) => {
    switch (slide.slideNumber) {
      case 1:
        return `Open with conviction. State ${report.ideaInput.name}'s mission in one breath: "${report.executiveSummary.elevatorTagline}". Establish that this is a venture-scale opportunity targeting the ${report.marketMetrics.tamLabel} market.`;
      case 2:
        return `Emphasize the pain point: ${report.problemAnalysis.coreProblem}. Share a specific metric showing that the current workaround costs customers thousands of dollars in lost productivity each month.`;
      case 3:
        return `Introduce the solution. Walk through how our unique approach solves the problem 10x faster than legacy manual tools. Keep technical jargon minimal and focus on the user's "aha" moment.`;
      case 4:
        return `Anchor market sizing. Walk through TAM (${report.marketMetrics.tamLabel}), SAM (${report.marketMetrics.samLabel}), and SOM (${report.marketMetrics.somLabel}). Highlight the ${report.marketOpportunity.growthRateCAGR} CAGR growth rate.`;
      case 5:
        return `Competitive differentiation: Contrast directly with ${report.competitors[0]?.name || "incumbents"}. Show that while they are slow and enterprise-locked, our product-led velocity captures high-intent users immediately.`;
      default:
        return `Focus on traction milestones, capital efficiency, and clear ask. Remind the investor of the ${report.overallScore}/100 readiness score and why this team executes faster than anyone else.`;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`transition-all ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-slate-950 p-6 md:p-12 flex flex-col justify-between overflow-y-auto"
          : ""
      }`}
    >
      <GlassCard glow="primary" className={`space-y-6 ${isFullscreen ? "bg-slate-900/95 border-slate-800" : ""}`}>
        {/* Top Controls Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <Presentation className="w-4 h-4" />
              <span>10-Slide Investor Presentation Studio</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              VC Pitch Deck
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Stopwatch Timer */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span className="font-bold">{formatTimer(timerSeconds)}</span>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="hover:text-blue-500 p-0.5"
                title={isTimerRunning ? "Pause timer" : "Start timer"}
              >
                {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(0);
                }}
                className="hover:text-rose-500 p-0.5"
                title="Reset timer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Auto Play toggle */}
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                autoPlay
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{autoPlay ? "Auto-Play ON" : "Auto-Play"}</span>
            </button>

            {/* Speaker Notes Toggle */}
            <button
              onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                showSpeakerNotes
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Notes</span>
            </button>

            {/* PDF Export */}
            <button
              onClick={() => exportReportToPdf(report)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all"
            >
              <Download className="w-3.5 h-3.5 text-blue-500" />
              <span>PDF Deck</span>
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white text-xs font-semibold transition-all"
              title="Toggle Fullscreen (or press 'F')"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{isFullscreen ? "Exit" : "Present"}</span>
            </button>
          </div>
        </div>

        {/* Slide Visual Presentation Canvas */}
        <div className="relative aspect-[16/9] w-full rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white p-6 sm:p-10 md:p-12 shadow-2xl flex flex-col justify-between overflow-hidden border border-slate-800">
          {/* Ambient Lighting FX */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Slide Top Metadata */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                SLIDE {currentSlide.slideNumber} / {slides.length}
              </span>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                {report.ideaInput.stage} Tier Due Diligence
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                {report.ideaInput.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
          </div>

          {/* Slide Center Content */}
          <div className="relative z-10 space-y-4 my-auto">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {currentSlide.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-indigo-200/90 font-medium mt-1">
                {currentSlide.subtitle}
              </p>
            </div>

            <ul className="space-y-2.5 max-w-2xl pt-2">
              {currentSlide.bulletPoints.map((point, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0 shadow-sm shadow-blue-400/50" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Slide Bottom Bar */}
          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs">
            {currentSlide.keyMetricOrQuote ? (
              <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>{currentSlide.keyMetricOrQuote}</span>
              </div>
            ) : (
              <span className="text-slate-500 text-[11px]">Strictly Confidential • Investor Presentation</span>
            )}

            {/* In-slide Navigation controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentSlideIdx((prev) => Math.max(0, prev - 1))}
                disabled={currentSlideIdx === 0}
                className="p-2 rounded-xl bg-slate-800/90 hover:bg-blue-600 disabled:opacity-30 disabled:hover:bg-slate-800 text-white transition-all"
                title="Previous slide (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentSlideIdx((prev) => Math.min(slides.length - 1, prev + 1))}
                disabled={currentSlideIdx === slides.length - 1}
                className="p-2 rounded-xl bg-slate-800/90 hover:bg-blue-600 disabled:opacity-30 disabled:hover:bg-slate-800 text-white transition-all"
                title="Next slide (Right Arrow or Space)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Speaker Notes Drawer */}
        {showSpeakerNotes && (
          <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-300">
              <Volume2 className="w-4 h-4 text-indigo-500" />
              <span>Founder Speaker Notes & Verbal Delivery Guide:</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {getSpeakerNotes(currentSlide)}
            </p>
          </div>
        )}

        {/* Thumbnail Selector Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-thin">
          {slides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIdx(idx)}
              className={`flex-shrink-0 text-left p-2.5 rounded-xl border transition-all ${
                idx === currentSlideIdx
                  ? "bg-blue-600/10 border-blue-500 text-blue-600 dark:text-blue-400 font-bold shadow-sm"
                  : "bg-slate-100/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400"
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-slate-400">Slide {s.slideNumber}</div>
              <div className="text-xs truncate max-w-[120px] font-semibold">{s.title}</div>
            </button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
