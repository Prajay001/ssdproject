import { AnalysisReport } from "@/types";

export function exportReportToMarkdown(report: AnalysisReport): string {
  const { ideaInput, executiveSummary, problemAnalysis, marketOpportunity, competitors, swot, revenueModels, marketMetrics, investorReadiness, riskAnalysis, elevatorPitch, pitchDeck } = report;

  return `# ${ideaInput.name} - VentureIQ AI Strategic Report
**Generated Date:** ${new Date(report.createdAt).toLocaleDateString()}
**Overall Startup Score:** ${report.overallScore}/100
**Business Stage:** ${ideaInput.stage} | **Target Region:** ${ideaInput.country}

---

## Executive Summary
${executiveSummary.pitch}

- **Core Value Proposition:** ${executiveSummary.coreValueProp}
- **Key Differentiator:** ${executiveSummary.keyDifferentiator}
- **Mission Statement:** ${executiveSummary.missionStatement}
- **Tagline:** ${executiveSummary.elevatorTagline}

---

## Problem Analysis
**Core Problem:** ${problemAnalysis.coreProblem}
**Severity Score:** ${problemAnalysis.severityScore}/10
**Cost of Inaction:** ${problemAnalysis.costOfInaction}

### Affected Segments:
${problemAnalysis.affectedSegments.map((s) => `- ${s}`).join("\n")}

### Current Workarounds:
${problemAnalysis.currentWorkarounds.map((w) => `- ${w}`).join("\n")}

---

## Market Opportunity (TAM / SAM / SOM)
- **Industry:** ${marketOpportunity.industry}
- **Growth Rate (CAGR):** ${marketOpportunity.growthRateCAGR}
- **TAM:** ${marketMetrics.tamLabel}
- **SAM:** ${marketMetrics.samLabel}
- **SOM:** ${marketMetrics.somLabel}

### Demand Drivers:
${marketOpportunity.demandDrivers.map((d) => `- ${d}`).join("\n")}

---

## Competitor Matrix
${competitors
  .map(
    (c) => `### ${c.name} (${c.type} Competitor)
- **Strengths:** ${c.strengths.join(", ")}
- **Weaknesses:** ${c.weaknesses.join(", ")}
- **Pricing:** ${c.pricing}
- **Target Audience:** ${c.targetAudience}`
  )
  .join("\n\n")}

---

## SWOT Analysis
### Strengths
${swot.strengths.map((s) => `- ${s}`).join("\n")}

### Weaknesses
${swot.weaknesses.map((w) => `- ${w}`).join("\n")}

### Opportunities
${swot.opportunities.map((o) => `- ${o}`).join("\n")}

### Threats
${swot.threats.map((t) => `- ${t}`).join("\n")}

---

## Revenue Models (Ranked)
${revenueModels
  .map(
    (r) => `### #${r.rank} ${r.name} (${r.type})
- **Description:** ${r.description}
- **Estimated ARPU:** ${r.estimatedARPU}
- **Pros:** ${r.pros.join(", ")}
- **Cons:** ${r.cons.join(", ")}`
  )
  .join("\n\n")}

---

## Investor Readiness Score
**Score:** ${investorReadiness.score}/100 (${investorReadiness.tier})
${investorReadiness.summary}

### Deductions & Recommendations:
${investorReadiness.deductionReasons
  .map((d) => `- **${d.point}** (-${d.deduction} pts): ${d.recommendation}`)
  .join("\n")}

---

## Risk Analysis (Traffic Lights)
- **Technical Risk [${riskAnalysis.technicalRisk.level}]:** ${riskAnalysis.technicalRisk.description}
- **Financial Risk [${riskAnalysis.financialRisk.level}]:** ${riskAnalysis.financialRisk.description}
- **Legal Risk [${riskAnalysis.legalRisk.level}]:** ${riskAnalysis.legalRisk.description}
- **Market Risk [${riskAnalysis.marketRisk.level}]:** ${riskAnalysis.marketRisk.description}
- **Execution Risk [${riskAnalysis.executionRisk.level}]:** ${riskAnalysis.executionRisk.description}

---

## Elevator Pitch
### 30 Seconds
${elevatorPitch.thirtySeconds}

### 1 Minute
${elevatorPitch.oneMinute}

### 5 Minutes
${elevatorPitch.fiveMinutes}

---

## Investor Pitch Deck (10 Slides)
${pitchDeck
  .map(
    (slide) => `### Slide ${slide.slideNumber}: ${slide.title}
*${slide.subtitle}*
${slide.bulletPoints.map((b) => `- ${b}`).join("\n")}
> **Key Metric/Quote:** ${slide.keyMetricOrQuote}`
  )
  .join("\n\n")}
`;
}

export function downloadMarkdownFile(report: AnalysisReport) {
  const content = exportReportToMarkdown(report);
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${report.ideaInput.name.toLowerCase().replace(/\s+/g, "_")}_ventureiq.md`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
