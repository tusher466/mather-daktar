"use client";

import React from "react";
import { Mic, MicOff } from "lucide-react";

interface MicButtonProps {
  isListening: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export const MicButton: React.FC<MicButtonProps> = ({
  isListening,
  onToggle,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-label={isListening ? "ভয়েস রেকর্ড বন্ধ করুন" : "মুখে বলুন"}
      className={`w-14 h-14 min-w-[56px] min-h-[56px] rounded-2xl flex items-center justify-center transition-all select-none active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary ${
        isListening
          ? "bg-danger text-white animate-pulse shadow-lg scale-105"
          : "bg-ground hover:bg-ground-border text-ink-muted hover:text-primary border border-ground-border"
      } disabled:opacity-40`}
    >
      {isListening ? (
        <MicOff className="w-6 h-6 animate-bounce" />
      ) : (
        <Mic className="w-6 h-6 text-primary" />
      )}
    </button>
  );
};
