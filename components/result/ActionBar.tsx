"use client";

import React from "react";
import { Volume2, VolumeX, Share2, MessageSquare } from "lucide-react";
import { STRINGS_BN } from "@/lib/strings.bn";

interface ActionBarProps {
  canSpeak: boolean;
  isSpeaking: boolean;
  onToggleSpeak: () => void;
  onShare: () => void;
  isSharing?: boolean;
  onAsk: () => void;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  canSpeak,
  isSpeaking,
  onToggleSpeak,
  onShare,
  isSharing = false,
  onAsk,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-ground-border shadow-2xl pb-safe">
      <div className="max-w-[480px] mx-auto px-4 py-3 flex items-center justify-between gap-2 sm:gap-3">
        {/* Button 1: শুনুন (Read aloud) - ONLY shown when Bangla voice is supported */}
        {canSpeak && (
          <button
            type="button"
            onClick={onToggleSpeak}
            className={`flex-1 flex flex-col items-center justify-center min-h-[56px] px-2 py-1.5 rounded-xl border transition-all active:scale-95 select-none focus:outline-none ${
              isSpeaking
                ? "bg-primary text-white border-primary animate-pulse"
                : "bg-ground hover:bg-ground-border/60 text-ink border-ground-border"
            }`}
          >
            {isSpeaking ? (
              <VolumeX className="w-5 h-5 mb-0.5" />
            ) : (
              <Volume2 className="w-5 h-5 mb-0.5 text-primary" />
            )}
            <span className="text-sm font-bold font-bengali leading-none">
              {isSpeaking ? STRINGS_BN.actions.stopListening : STRINGS_BN.actions.listen}
            </span>
          </button>
        )}

        {/* Button 2: শেয়ার করুন (Share card) */}
        <button
          type="button"
          onClick={onShare}
          disabled={isSharing}
          className="flex-1 flex flex-col items-center justify-center min-h-[56px] px-2 py-1.5 rounded-xl bg-ground hover:bg-ground-border/60 text-ink border border-ground-border transition-all active:scale-95 select-none focus:outline-none disabled:opacity-50"
        >
          <Share2 className="w-5 h-5 mb-0.5 text-harvest" />
          <span className="text-sm font-bold font-bengali leading-none">
            {isSharing ? "শেয়ার হচ্ছে..." : STRINGS_BN.actions.share}
          </span>
        </button>

        {/* Button 3: প্রশ্ন করুন (Go to /ask with context) */}
        <button
          type="button"
          onClick={onAsk}
          className="flex-[1.3] flex flex-col items-center justify-center min-h-[56px] px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold transition-all active:scale-95 shadow-md select-none focus:outline-none"
        >
          <MessageSquare className="w-5 h-5 mb-0.5 text-white" />
          <span className="text-sm font-bold font-bengali leading-none">
            {STRINGS_BN.actions.askQuestion}
          </span>
        </button>
      </div>
    </div>
  );
};
