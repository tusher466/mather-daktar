"use client";

import React from "react";
import { MessageSquare } from "lucide-react";

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
    <div className="py-2 space-y-2">
      <p className="text-sm font-bold font-bengali text-ink-muted">
        প্রস্তাবিত প্রশ্ন:
      </p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectSuggestion(suggestion)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-primary-light border border-ground-border hover:border-primary/40 text-ink hover:text-primary text-base font-bengali transition-colors shadow-xs active:scale-95 text-left"
          >
            <MessageSquare className="w-4 h-4 text-primary flex-shrink-0" />
            <span>{suggestion}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
