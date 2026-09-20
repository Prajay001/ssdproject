import { AnalysisReport } from "@/types";

export function exportReportToPdf(report: AnalysisReport) {
  // Uses browser print engine formatted specifically for reports and pitch decks
  if (typeof window !== "undefined") {
    const originalTitle = document.title;
    document.title = `${report.ideaInput.name}_VentureIQ_Report.pdf`;
    window.print();
    document.title = originalTitle;
  }
}
