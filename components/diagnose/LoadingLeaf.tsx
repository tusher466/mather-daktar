"use client";

import React from "react";
import { STRINGS_BN } from "@/lib/strings.bn";

interface LoadingLeafProps {
  isSlow?: boolean;
}

export const LoadingLeaf: React.FC<LoadingLeafProps> = ({ isSlow = false }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-ground/95 backdrop-blur-sm animate-fade-in"
    >
      <div className="flex flex-col items-center max-w-sm text-center">
        {/* Animated Leaf SVG */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
            <svg
              className="w-14 h-14 text-primary animate-bounce"
              style={{ animationDuration: "1.8s" }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </div>
        </div>

        {/* Primary Calm Text */}
        <h3 className="text-2xl sm:text-3xl font-bold font-bengali text-ink mb-3">
          {STRINGS_BN.diagnose.loadingPrimary}
        </h3>

        {/* Slow Loading Subtitle (> 15 seconds) */}
        {isSlow ? (
          <p className="text-lg font-bengali text-harvest font-semibold animate-fade-in">
            {STRINGS_BN.diagnose.loadingSlow}
          </p>
        ) : (
          <p className="text-base font-bengali text-ink-muted">
            কৃষি বিশেষজ্ঞ এআই আপনার পাতার প্রতিটি লক্ষণ পুঙ্খানুপুঙ্খভাবে পরীক্ষা করছে...
          </p>
        )}
      </div>
    </div>
  );
};
