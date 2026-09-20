import { AnalysisReport } from "@/types";

export function downloadJsonFile(report: AnalysisReport) {
  const content = JSON.stringify(report, null, 2);
  const blob = new Blob([content], { type: "application/json;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${report.ideaInput.name.toLowerCase().replace(/\s+/g, "_")}_ventureiq.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
