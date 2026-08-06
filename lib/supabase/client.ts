import { createClient } from "@supabase/supabase-js";
import { AnalysisReport, UserProfile, HistoryItem } from "@/types";
export type { HistoryItem };

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const LOCAL_STORAGE_KEY_REPORTS = "ventureiq_saved_reports_v1";
const LOCAL_STORAGE_KEY_USER = "ventureiq_user_profile_v1";
const LOCAL_STORAGE_KEY_HISTORY = "ventureiq_history_v1";

export function getSavedReports(): AnalysisReport[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_REPORTS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveReport(report: AnalysisReport): void {
  if (typeof window === "undefined") return;
  const reports = getSavedReports();
  const existingIdx = reports.findIndex((r) => r.id === report.id);
  if (existingIdx >= 0) {
    reports[existingIdx] = report;
  } else {
    reports.unshift(report);
  }
  localStorage.setItem(LOCAL_STORAGE_KEY_REPORTS, JSON.stringify(reports));

  // Log history action
  logHistoryAction({
    actionType: existingIdx >= 0 ? "Updated" : "Created",
    description: `${existingIdx >= 0 ? "Updated" : "Generated"} analysis for ${report.ideaInput.name}`,
    reportId: report.id,
  });
}

export function deleteReport(reportId: string): void {
  if (typeof window === "undefined") return;
  const reports = getSavedReports().filter((r) => r.id !== reportId);
  localStorage.setItem(LOCAL_STORAGE_KEY_REPORTS, JSON.stringify(reports));
  logHistoryAction({
    actionType: "Deleted",
    description: `Deleted analysis report ID: ${reportId}`,
  });
}

export function duplicateReport(reportId: string): AnalysisReport | null {
  const reports = getSavedReports();
  const original = reports.find((r) => r.id === reportId);
  if (!original) return null;

  const copy: AnalysisReport = JSON.parse(JSON.stringify(original));
  copy.id = "rep_" + Math.random().toString(36).substr(2, 9);
  copy.createdAt = new Date().toISOString();
  copy.updatedAt = new Date().toISOString();
  copy.ideaInput.name = `${original.ideaInput.name} (Copy)`;

  saveReport(copy);
  logHistoryAction({
    actionType: "Duplicated",
    description: `Duplicated report ${original.ideaInput.name} -> ${copy.ideaInput.name}`,
    reportId: copy.id,
  });
  return copy;
}

export function getUserProfile(): UserProfile {
  const defaultUser: UserProfile = {
    id: "usr_" + Math.random().toString(36).substr(2, 9),
    name: "Founder",
    email: "user@ventureiq.ai",
    theme: "dark",
    aiCredits: 500,
    notificationsEnabled: true,
    plan: "Pro",
  };
  if (typeof window === "undefined") return defaultUser;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(defaultUser));
      return defaultUser;
    }
    return JSON.parse(raw);
  } catch {
    return defaultUser;
  }
}

export function updateUserProfile(updates: Partial<UserProfile>): UserProfile {
  const current = getUserProfile();
  const updated = { ...current, ...updates };
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(updated));
  }
  return updated;
}

export function consumeAiCredits(amount: number = 20): boolean {
  const user = getUserProfile();
  if (user.aiCredits < amount) return false;
  updateUserProfile({ aiCredits: user.aiCredits - amount });
  return true;
}

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_HISTORY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function logHistoryAction(item: Omit<HistoryItem, "id" | "createdAt">): void {
  if (typeof window === "undefined") return;
  const history = getHistory();
  const newItem: HistoryItem = {
    id: "hist_" + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    ...item,
  };
  history.unshift(newItem);
  localStorage.setItem(LOCAL_STORAGE_KEY_HISTORY, JSON.stringify(history));
}
