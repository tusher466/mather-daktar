import { DiagnosisResult } from "@/types";

const HISTORY_STORAGE_KEY = "mather_daktar_history_v1";
const MAX_HISTORY_ITEMS = 30;

// High quality initial sample diagnoses if user visits history for the first time
export const INITIAL_SAMPLE_RECORDS: DiagnosisResult[] = [
  {
    id: "sample_rice_blast_01",
    timestamp: Date.now() - 3600000 * 5, // 5 hours ago
    crop: "rice",
    cropBn: "ধান",
    thumbnailBase64: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=300&auto=format&fit=crop&q=80",
    isPlant: true,
    imageQuality: "good",
    retakeReason: null,
    problemType: "disease",
    problemNameBn: "ধানের ব্লাস্ট বা বাদামী দাগ রোগ",
    confidence: "high",
    severity: "medium",
    whyBn: "স্যাঁতসেঁতে ভেজা আবহাওয়া এবং অতিরিক্ত ইউরিয়া সারের প্রয়োগের ফলে ছত্রাকের আক্রমণ ঘটেছে।",
    actionsBn: [
      "জমির অতিরিক্ত পানি নিষ্কাশন করে দিন এবং মাটি শুকিয়ে রোদ লাগতে দিন।",
      "ইউরিয়া প্রয়োগ বন্ধ রেখে বিঘা প্রতি ৫ কেজি পটাশ (MOP) সার উপরিপ্রয়োগ করুন।",
      "আক্রান্ত অংশের আশেপাশে ছাই ছিটিয়ে দিন অথবা অনুমোদিত ছত্রাকনাশক স্প্রে করুন।"
    ],
    avoidBn: [
      "আক্রান্ত অবস্থায় অতিরিক্ত ইউরিয়া প্রয়োগ করবেন না।",
      "রাতের বেলা জমিতে পানি জমিয়ে রাখবেন না।"
    ],
    chemicalMentioned: true,
    contactOfficer: false,
    possibleAlternativesBn: ["খোলপোড়া রোগ"]
  },
  {
    id: "sample_potato_blight_02",
    timestamp: Date.now() - 3600000 * 24, // 1 day ago
    crop: "potato",
    cropBn: "আলু",
    thumbnailBase64: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&auto=format&fit=crop&q=80",
    isPlant: true,
    imageQuality: "good",
    retakeReason: null,
    problemType: "disease",
    problemNameBn: "আলুর নাবি ধসা রোগ (Late Blight)",
    confidence: "high",
    severity: "high",
    whyBn: "টানা কুয়াশা ও মেঘলা আকাশের কারণে ছত্রাকের দ্রুত বিস্তার ঘটেছে।",
    actionsBn: [
      "আক্রান্ত গাছ বা পাতা তুলে দূরে মাটিতে পুঁতে ফেলুন।",
      "গাছের গোড়ায় যাতে পানি জমে না থাকে তা নিশ্চিত করুন।",
      "উপজেলা কৃষি কর্মকর্তার পরামর্শে অনুমোদিত ছত্রাকনাশক স্প্রে করুন।"
    ],
    avoidBn: [
      "কুয়াশার সকালে গাছে পানি ছিটাবেন না।",
      "আক্রান্ত পাতা জমিতে ফেলে রাখবেন না।"
    ],
    chemicalMentioned: true,
    contactOfficer: true,
    possibleAlternativesBn: ["আগাম ধসা রোগ"]
  }
];

export function getDiagnosisHistory(): DiagnosisResult[] {
  if (typeof window === "undefined") return INITIAL_SAMPLE_RECORDS;
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) {
      // Seed with initial realistic records so history is immediately functional
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_RECORDS));
      return INITIAL_SAMPLE_RECORDS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_SAMPLE_RECORDS;
  } catch (error) {
    console.warn("Failed to read diagnosis history from localStorage", error);
    return INITIAL_SAMPLE_RECORDS;
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

    // Check if item already exists
    const existingIndex = history.findIndex((h) => h.id === diagnosis.id);
    let updated: DiagnosisResult[];

    if (existingIndex !== -1) {
      updated = [...history];
      updated[existingIndex] = diagnosis;
    } else {
      updated = [diagnosis, ...history];
    }

    if (updated.length > MAX_HISTORY_ITEMS) {
      updated = updated.slice(0, MAX_HISTORY_ITEMS);
    }

    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      return true;
    } catch (quotaError) {
      console.warn("Storage quota exceeded. Trimming older items...", quotaError);
      // Strip thumbnails to save space
      const lightweight = updated.map((item) => ({ ...item, thumbnailBase64: "" }));
      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(lightweight.slice(0, 15)));
        return true;
      } catch {
        return false;
      }
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
