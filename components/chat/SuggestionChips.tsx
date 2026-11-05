"use client";

import React from "react";
import { Sparkles, MessageCircleQuestion } from "lucide-react";

interface SuggestionChipsProps {
  suggestions: string[];
  onSelectSuggestion: (question: string) => void;
}

export const SuggestionChips: React.FC<SuggestionChipsProps> = ({
  suggestions,
  onSelectSuggestion,
}) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="py-2.5 space-y-2">
      <div className="flex items-center gap-1.5 text-xs font-bold font-bengali text-emerald-900">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>প্রস্তাবিত সাধারণ প্রশ্নসমূহ (ট্যাপ করুন):</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectSuggestion(suggestion)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-emerald-50 border border-stone-200/90 hover:border-emerald-400 text-ink hover:text-emerald-900 text-xs sm:text-sm font-bengali transition-all shadow-2xs hover:shadow-xs active:scale-95 text-left"
          >
            <MessageCircleQuestion className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
            <span>{suggestion}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
