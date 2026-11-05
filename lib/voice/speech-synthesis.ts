/**
 * Browser Web Speech API - Speech Synthesis (Text to Speech in Bangla)
 * Feature detects specifically for Bangla voice availability.
 */

let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return [];
  }
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    cachedVoices = voices;
  }
  return cachedVoices;
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    loadVoices();
  };
}

export function isSpeechSynthesisSupported(): boolean {
  if (typeof window === "undefined") return false;
  return "speechSynthesis" in window;
}

/**
 * Checks if a Bangla voice is available in the browser/device
 */
export function hasBanglaVoice(): boolean {
  if (!isSpeechSynthesisSupported()) return false;
  const voices = cachedVoices.length > 0 ? cachedVoices : loadVoices();
  return voices.some(
    (v) =>
      v.lang.toLowerCase().startsWith("bn") ||
      v.lang.toLowerCase().includes("bengali") ||
      v.name.toLowerCase().includes("bangla") ||
      v.name.toLowerCase().includes("bengali")
  );
}

export function getBanglaVoice(): SpeechSynthesisVoice | null {
  if (!isSpeechSynthesisSupported()) return null;
  const voices = cachedVoices.length > 0 ? cachedVoices : loadVoices();
  // Prefer bn-BD, fallback to any bn
  const bnBD = voices.find(
    (v) => v.lang.toLowerCase() === "bn-bd" || v.lang.toLowerCase() === "bn_bd"
  );
  if (bnBD) return bnBD;

  return (
    voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith("bn") ||
        v.lang.toLowerCase().includes("bengali") ||
        v.name.toLowerCase().includes("bangla")
    ) || null
  );
}

export function speakBangla(
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): boolean {
  if (!isSpeechSynthesisSupported()) return false;

  try {
    window.speechSynthesis.cancel(); // Stop any active speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "bn-BD";

    const voice = getBanglaVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.rate = 0.95; // Slightly slower, clear cadence for accessibility
    utterance.pitch = 1.0;

    utterance.onstart = () => onStart?.();
    utterance.onend = () => onEnd?.();
    utterance.onerror = (e) => onError?.(e);

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (error) {
    console.warn("Speech synthesis error:", error);
    onError?.(error);
    return false;
  }
}

export function stopSpeech(): void {
  if (isSpeechSynthesisSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      console.warn("Could not cancel speech synthesis:", e);
    }
  }
}
