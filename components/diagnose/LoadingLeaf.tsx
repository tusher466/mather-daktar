"use client";

import React, { useState, useEffect } from "react";
import { STRINGS_BN } from "@/lib/strings.bn";

interface LoadingLeafProps {
  isSlow?: boolean;
}

export const LoadingLeaf: React.FC<LoadingLeafProps> = ({ isSlow = false }) => {
  const [stepIndex, setStepIndex] = useState<number>(0);

  const steps = [
    "আপনার ছবি দেখা হচ্ছে...",
    "পাতার প্রতিটি লক্ষণ বিশ্লেষণ করা হচ্ছে...",
    "রোগ ও ক্ষয়ক্ষতির ঝুঁকি নির্ণয় হচ্ছে...",
    "পরিবেশবান্ধব সঠিক সমাধান প্রস্তুত হচ্ছে...",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-ground/90 backdrop-blur-md animate-fade-in"
    >
      <div className="flex flex-col items-center max-w-sm text-center p-8 bg-white/95 rounded-3xl border border-ground-border shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

        {/* Animated Leaf with Ambient Pulse */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-50" />
          <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-emerald-50 to-emerald-100/90 border border-emerald-200 flex items-center justify-center shadow-lg shadow-emerald-900/10">
            <svg
              className="w-16 h-16 text-primary animate-bounce"
              style={{ animationDuration: "1.6s" }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </div>
        </div>

        {/* Primary Dynamic Text */}
        <h3 className="text-2xl sm:text-3xl font-black font-bengali text-ink mb-2 transition-all">
          {steps[stepIndex]}
        </h3>

        {/* Dynamic Animated Progress Bar */}
        <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden my-4 border border-ground-border/40">
          <div className="h-full bg-gradient-to-r from-emerald-600 via-primary to-emerald-500 rounded-full animate-pulse" />
        </div>

        {/* Slow Loading Subtitle (> 15 seconds) */}
        {isSlow ? (
          <p className="text-base font-bengali text-harvest font-bold animate-fade-in bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
            {STRINGS_BN.diagnose.loadingSlow}
          </p>
        ) : (
          <p className="text-sm font-bengali text-ink-muted">
            কৃষি বিশেষজ্ঞ এআই নিখুঁতভাবে রোগ ও প্রতিকার যাচাই করছে...
          </p>
        )}
      </div>
    </div>
  );
};
