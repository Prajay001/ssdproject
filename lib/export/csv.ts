import { AnalysisReport } from "@/types";

export function exportReportToCsv(report: AnalysisReport): void {
  const rows = [
    ["Metric", "Value", "Notes"],
    ["Startup Name", report.ideaInput.name, ""],
    ["One Sentence Idea", report.ideaInput.oneSentenceIdea, ""],
    ["Business Stage", report.ideaInput.stage, ""],
    ["Target Region", report.ideaInput.country, ""],
    ["Target Audience", report.ideaInput.targetAudience, ""],
    ["Overall Idea Score", `${report.overallScore}/100`, "VC Readiness Metric"],
    ["Problem Severity", `${report.problemAnalysis.severityScore}/10`, ""],
    ["TAM (Total Addressable)", report.marketMetrics.tamLabel, report.marketMetrics.currency],
    ["SAM (Serviceable)", report.marketMetrics.samLabel, report.marketMetrics.currency],
    ["SOM (Obtainable)", report.marketMetrics.somLabel, report.marketMetrics.currency],
    ["CAGR Growth Rate", report.marketOpportunity.growthRateCAGR, ""],
    ["Investor Readiness Tier", report.investorReadiness.tier, ""],
    ["Primary Revenue Model", report.revenueModels[0]?.name || "N/A", ""],
    ["Estimated ARPU", report.revenueModels[0]?.estimatedARPU || "N/A", ""],
  ];

  // Competitor rows
  rows.push(["--- COMPETITORS ---", "", ""]);
  report.competitors.forEach((c) => {
    rows.push([c.name, c.type, `Pricing: ${c.pricing}`]);
  });

  const csvContent =
    "data:text/csv;charset=utf-8," +
    rows.map((row) => row.map((cell) => `"${(cell || "").replace(/"/g, '""')}"`).join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `${report.ideaInput.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-due-diligence.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
