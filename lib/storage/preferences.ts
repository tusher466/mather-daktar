const LAST_CROP_KEY = "mather_daktar_last_crop";

export function getSavedCrop(): string {
  if (typeof window === "undefined") return "rice";
  try {
    return localStorage.getItem(LAST_CROP_KEY) || "rice";
  } catch {
    return "rice";
  }
}

export function saveCropPreference(cropId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LAST_CROP_KEY, cropId);
  } catch (e) {
    console.warn("Could not save crop preference:", e);
  }
}
