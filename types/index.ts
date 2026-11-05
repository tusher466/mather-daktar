export type ConfidenceLevel = "high" | "medium" | "low";
export type SeverityLevel = "low" | "medium" | "high";
export type ImageQuality = "good" | "poor";
export type ProblemType =
  | "disease"
  | "pest"
  | "nutrient"
  | "water_stress"
  | "other"
  | "healthy"
  | "unknown";

export interface DiagnosisResult {
  id: string; // Unique diagnosis ID (timestamp + random)
  timestamp: number;
  crop: string;
  cropBn: string;
  thumbnailBase64: string; // Small size thumbnail (max 320px) for history
  isPlant: boolean;
  imageQuality: ImageQuality;
  retakeReason: string | null;
  problemType: ProblemType;
  problemNameBn: string;
  confidence: ConfidenceLevel;
  severity: SeverityLevel;
  whyBn: string;
  actionsBn: string[];
  avoidBn: string[];
  chemicalMentioned: boolean;
  contactOfficer: boolean;
  possibleAlternativesBn: string[];
  userNote?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  imageBase64?: string;
  diagnosisIdContext?: string;
}

export interface SeasonRisk {
  titleBn: string;
  descBn: string;
}

export interface SeasonTask {
  titleBn: string;
  descBn: string;
}

export interface SeasonAdvice {
  crop: string;
  cropBn: string;
  banglaMonth: string;
  seasonNameBn: string;
  risks: SeasonRisk[];
  tasks: SeasonTask[];
  cachedAt: number;
}
