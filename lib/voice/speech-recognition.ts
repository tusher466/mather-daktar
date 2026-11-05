/**
 * Browser Web Speech API - Speech Recognition (bn-BD)
 * Safely feature detects and manages voice-to-text.
 */

// Extend window interface for WebkitSpeechRecognition
interface IWindow extends Window {
  webkitSpeechRecognition?: any;
  SpeechRecognition?: any;
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === "undefined") return false;
  const win = window as unknown as IWindow;
  return !!(win.SpeechRecognition || win.webkitSpeechRecognition);
}

export interface SpeechRecognitionHandlers {
  onStart?: () => void;
  onResult: (transcript: string) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

export class BanglaSpeechRecognizer {
  private recognition: any = null;
  private isListening: boolean = false;

  constructor(private handlers: SpeechRecognitionHandlers) {
    if (!isSpeechRecognitionSupported()) return;

    const win = window as unknown as IWindow;
    const SpeechClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    this.recognition = new SpeechClass();
    this.recognition.lang = "bn-BD";
    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    this.recognition.onstart = () => {
      this.isListening = true;
      this.handlers.onStart?.();
    };

    this.recognition.onresult = (event: any) => {
      const results = event.results;
      if (results && results.length > 0) {
        const transcript = results[0][0].transcript;
        this.handlers.onResult(transcript);
      }
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      this.handlers.onError?.(event.error || "Speech recognition error");
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.handlers.onEnd?.();
    };
  }

  public start(): void {
    if (!this.recognition || this.isListening) return;
    try {
      this.recognition.start();
    } catch (e) {
      console.warn("Could not start speech recognition:", e);
    }
  }

  public stop(): void {
    if (!this.recognition || !this.isListening) return;
    try {
      this.recognition.stop();
    } catch (e) {
      console.warn("Could not stop speech recognition:", e);
    }
  }

  public get listening(): boolean {
    return this.isListening;
  }
}
