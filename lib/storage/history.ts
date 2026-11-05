import { DiagnosisResult } from "@/types";

const HISTORY_STORAGE_KEY = "mather_daktar_history_v1";
const MAX_HISTORY_ITEMS = 30;

export function getDiagnosisHistory(): DiagnosisResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Failed to read diagnosis history from localStorage", error);
    return [];
  }
}

export function getDiagnosisById(id: string): DiagnosisResult | null {
  const history = getDiagnosisHistory();
  return history.find((item) => item.id === id) || null;
}

export function saveDiagnosis(diagnosis: DiagnosisResult): boolean {
  if (typeof window === "undefined") return false;

  try {
    const history = getDiagnosisHistory();

    // Check if item already exists (update if so)
    const existingIndex = history.findIndex((h) => h.id === diagnosis.id);
    let updated: DiagnosisResult[];

    if (existingIndex !== -1) {
      updated = [...history];
      updated[existingIndex] = diagnosis;
    } else {
      // Prepend newest first
      updated = [diagnosis, ...history];
    }

    // Limit to MAX_HISTORY_ITEMS (drop oldest)
    if (updated.length > MAX_HISTORY_ITEMS) {
      updated = updated.slice(0, MAX_HISTORY_ITEMS);
    }

    // Try saving
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      return true;
    } catch (quotaError) {
      // If quota exceeded, progressively drop older items until it fits
      console.warn("Storage quota exceeded. Trimming older items...", quotaError);
      while (updated.length > 5) {
        updated.pop(); // Drop oldest
        try {
          localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
          return true;
        } catch {
          // Keep popping
        }
      }
      return false;
    }
  } catch (err) {
    console.error("Failed to save diagnosis", err);
    return false;
  }
}

export function deleteDiagnosis(id: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const history = getDiagnosisHistory();
    const filtered = history.filter((h) => h.id !== id);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error("Failed to delete diagnosis", error);
    return false;
  }
}
