export type BusinessStage = "Idea" | "MVP" | "Early Users" | "Growing";

export interface StartupIdeaInput {
  name: string;
  oneSentenceIdea: string;
  problem: string;
  targetAudience: string;
  country: string;
  stage: BusinessStage;
}

export interface ExecutiveSummary {
  pitch: string;
  coreValueProp: string;
  keyDifferentiator: string;
  missionStatement: string;
  elevatorTagline: string;
}

export interface ProblemAnalysis {
  coreProblem: string;
  affectedSegments: string[];
  severityScore: number; // 1-10
  currentWorkarounds: string[];
  costOfInaction: string;
}

export interface MarketOpportunity {
  industry: string;
  marketSizeSummary: string;
  growthRateCAGR: string;
  demandDrivers: string[];
  industryChallenges: string[];
  futureOutlook: string;
}

export interface Competitor {
  id: string;
  name: string;
  type: "Direct" | "Indirect";
  strengths: string[];
  weaknesses: string[];
  pricing: string;
  targetAudience: string;
  marketShareEstimate: string;
}

export interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface RevenueModel {
  name: string;
  type: "Subscription" | "Marketplace" | "Ads" | "Enterprise" | "Commission" | "Freemium";
  rank: number;
  description: string;
  pros: string[];
  cons: string[];
  estimatedARPU: string;
}

export interface MarketMetrics {
  tam: number; // e.g. 50000000000 ($50B)
  tamLabel: string;
  sam: number; // e.g. 8000000000 ($8B)
  samLabel: string;
  som: number; // e.g. 250000000 ($250M)
  somLabel: string;
  currency: string;
  methodology: string;
}

export interface CustomerPersona {
  name: string;
  avatarUrl?: string;
  age: number;
  occupation: string;
  role: string;
  painPoints: string[];
  goals: string[];
  buyingBehaviour: string;
  quote: string;
}

export interface BusinessModelCanvas {
  keyPartners: string[];
  keyActivities: string[];
  keyResources: string[];
  valuePropositions: string[];
  customerRelationships: string[];
  channels: string[];
  customerSegments: string[];
  costStructure: string[];
  revenueStreams: string[];
}

export interface GoToMarketStrategy {
  launchPlan: string[];
  marketingChannels: { channel: string; description: string; expectedROI: string }[];
  salesStrategy: string[];
  pricingStrategy: string;
  growthStrategy: string[];
}

export interface InvestorReadiness {
  score: number; // 0-100
  tier: "High Interest" | "Moderate Interest" | "Needs Refinement" | "Early Concept";
  summary: string;
  deductionReasons: { point: string; deduction: number; recommendation: string }[];
  keyStrengths: string[];
}

export interface RiskAnalysis {
  technicalRisk: { level: "Green" | "Amber" | "Red"; score: number; description: string; mitigation: string };
  financialRisk: { level: "Green" | "Amber" | "Red"; score: number; description: string; mitigation: string };
  legalRisk: { level: "Green" | "Amber" | "Red"; score: number; description: string; mitigation: string };
  marketRisk: { level: "Green" | "Amber" | "Red"; score: number; description: string; mitigation: string };
  executionRisk: { level: "Green" | "Amber" | "Red"; score: number; description: string; mitigation: string };
}

export interface RoadmapPhase {
  phase: string; // e.g., "Phase 1: MVP Launch"
  duration: string; // e.g., "Months 1-3"
  milestones: string[];
}

export interface FeatureRoadmap {
  phases: RoadmapPhase[];
}

export interface ElevatorPitch {
  thirtySeconds: string;
  oneMinute: string;
  fiveMinutes: string;
}

export interface PitchDeckSlide {
  slideNumber: number;
  title: string;
  subtitle: string;
  bulletPoints: string[];
  keyMetricOrQuote?: string;
  visualSuggestion?: string;
}

export interface AnalysisReport {
  id: string;
  createdAt: string;
  updatedAt: string;
  ideaInput: StartupIdeaInput;
  executiveSummary: ExecutiveSummary;
  problemAnalysis: ProblemAnalysis;
  marketOpportunity: MarketOpportunity;
  competitors: Competitor[];
  swot: SWOTAnalysis;
  revenueModels: RevenueModel[];
  marketMetrics: MarketMetrics;
  customerPersonas: CustomerPersona[];
  businessCanvas: BusinessModelCanvas;
  goToMarket: GoToMarketStrategy;
  investorReadiness: InvestorReadiness;
  riskAnalysis: RiskAnalysis;
  featureRoadmap: FeatureRoadmap;
  elevatorPitch: ElevatorPitch;
  pitchDeck: PitchDeckSlide[];
  overallScore: number;
  status: "completed" | "processing" | "failed";
}

export interface HistoryItem {
  id: string;
  createdAt: string;
  actionType: "Created" | "Updated" | "Deleted" | "Duplicated" | "Exported" | string;
  description: string;
  reportId?: string;
}

export interface FinancialSimulation {
  cac: number;
  arpu: number;
  churnRate: number; // monthly % e.g. 0.03
  fixedMonthlyOpex: number;
  projectedMonths: {
    month: string;
    subscribers: number;
    revenue: number;
    marketingExpense: number;
    opex: number;
    netCashFlow: number;
  }[];
  ltv: number;
  ltvToCacRatio: number;
  paybackMonths: number;
  breakevenMonth: number | null;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  theme: "dark" | "light" | "system";
  aiCredits: number;
  customOpenAiKey?: string;
  notificationsEnabled: boolean;
  plan: "Free" | "Pro" | "Enterprise";
}
