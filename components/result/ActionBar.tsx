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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-ground-border/90 shadow-2xl pb-safe">
      <div className="max-w-[480px] mx-auto px-4 py-3 flex items-center justify-between gap-2.5">
        {/* Button 1: শুনুন (Read aloud) - ONLY shown when Bangla voice is supported */}
        {canSpeak && (
          <button
            type="button"
            onClick={onToggleSpeak}
            className={`flex-1 flex flex-col items-center justify-center min-h-[56px] px-2 py-1.5 rounded-2xl border transition-all active:scale-95 select-none focus:outline-none ${
              isSpeaking
                ? "bg-primary text-white border-primary animate-pulse"
                : "bg-white hover:bg-stone-50 text-ink border-ground-border shadow-2xs"
            }`}
          >
            {isSpeaking ? (
              <VolumeX className="w-5 h-5 mb-0.5" />
            ) : (
              <Volume2 className="w-5 h-5 mb-0.5 text-primary" />
            )}
            <span className="text-xs sm:text-sm font-bold font-bengali leading-none">
              {isSpeaking ? STRINGS_BN.actions.stopListening : STRINGS_BN.actions.listen}
            </span>
          </button>
        )}

        {/* Button 2: শেয়ার করুন (Share card) */}
        <button
          type="button"
          onClick={onShare}
          disabled={isSharing}
          className="flex-1 flex flex-col items-center justify-center min-h-[56px] px-2 py-1.5 rounded-2xl bg-white hover:bg-stone-50 text-ink border border-ground-border shadow-2xs transition-all active:scale-95 select-none focus:outline-none disabled:opacity-50"
        >
          <Share2 className="w-5 h-5 mb-0.5 text-harvest" />
          <span className="text-xs sm:text-sm font-bold font-bengali leading-none">
            {isSharing ? "তৈরি হচ্ছে..." : STRINGS_BN.actions.share}
          </span>
        </button>

        {/* Button 3: প্রশ্ন করুন (Go to /ask with context) */}
        <button
          type="button"
          onClick={onAsk}
          className="flex-[1.4] flex flex-col items-center justify-center min-h-[56px] px-3 py-1.5 rounded-2xl bg-gradient-to-r from-[#1C6938] to-[#124C24] hover:from-[#247B43] hover:to-[#175C2D] text-white font-bold transition-all active:scale-95 shadow-md shadow-emerald-950/20 select-none focus:outline-none"
        >
          <MessageSquare className="w-5 h-5 mb-0.5 text-white" />
          <span className="text-xs sm:text-sm font-bold font-bengali leading-none">
            {STRINGS_BN.actions.askQuestion}
          </span>
        </button>
      </div>
    </div>
  );
};
