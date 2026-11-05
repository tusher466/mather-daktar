"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  isSpeechRecognitionSupported,
  BanglaSpeechRecognizer,
} from "@/lib/voice/speech-recognition";
import {
  isSpeechSynthesisSupported,
  hasBanglaVoice,
  speakBangla,
  stopSpeech,
} from "@/lib/voice/speech-synthesis";

export function useSpeech(onTranscript?: (transcript: string) => void) {
  const [canListen, setCanListen] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [micPermissionDenied, setMicPermissionDenied] = useState<boolean>(false);

  const [canSpeak, setCanSpeak] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const recognizerRef = useRef<BanglaSpeechRecognizer | null>(null);

  useEffect(() => {
    // Feature detect recognition
    setCanListen(isSpeechRecognitionSupported());

    // Feature detect synthesis + check Bangla voice presence
    const checkVoice = () => {
      const supported = isSpeechSynthesisSupported() && hasBanglaVoice();
      setCanSpeak(supported);
    };

    checkVoice();

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = checkVoice;
    }

    return () => {
      stopSpeech();
      recognizerRef.current?.stop();
    };
  }, []);

  const startListening = useCallback(() => {
    if (!canListen) return;
    setMicPermissionDenied(false);

    recognizerRef.current = new BanglaSpeechRecognizer({
      onStart: () => setIsListening(true),
      onResult: (text) => {
        setIsListening(false);
        onTranscript?.(text);
      },
      onError: (err) => {
        setIsListening(false);
        if (err.includes("not-allowed") || err.includes("permission")) {
          setMicPermissionDenied(true);
        }
      },
      onEnd: () => setIsListening(false),
    });

    recognizerRef.current.start();
  }, [canListen, onTranscript]);

  const stopListening = useCallback(() => {
    recognizerRef.current?.stop();
    setIsListening(false);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!canSpeak) return;
      setIsSpeaking(true);
      speakBangla(
        text,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
    },
    [canSpeak]
  );

  const stopSpeaking = useCallback(() => {
    stopSpeech();
    setIsSpeaking(false);
  }, []);

  return {
    canListen,
    isListening,
    micPermissionDenied,
    startListening,
    stopListening,
    canSpeak,
    isSpeaking,
    speak,
    stopSpeaking,
  };
}
