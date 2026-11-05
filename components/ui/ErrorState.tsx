"use client";

import React, { useState } from "react";
import { AlertCircle, RefreshCw, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./Button";
import { STRINGS_BN } from "@/lib/strings.bn";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  icon?: React.ReactNode;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = STRINGS_BN.errors.serverError,
  onRetry,
  retryLabel = STRINGS_BN.actions.retry,
  icon,
}) => {
  const [showTroubleshoot, setShowTroubleshoot] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center text-center p-6 sm:p-7 bg-gradient-to-b from-white via-white to-red-50/30 rounded-3xl border border-red-200/70 my-5 shadow-lg shadow-red-900/5 animate-fade-in">
      {/* Icon with soft ambient aura */}
      <div className="relative mb-4">
        <div className="absolute inset-0 rounded-full bg-red-400/20 animate-ping opacity-60" />
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-red-50 to-red-100/80 border border-red-200 flex items-center justify-center text-danger shadow-inner">
          {icon || <AlertCircle className="w-8 h-8" />}
        </div>
      </div>

      <h3 className="text-2xl font-bold font-bengali text-ink mb-2">
        সমস্যা দেখা দিয়েছে
      </h3>

      <p className="text-base sm:text-lg font-bengali text-ink-muted mb-6 max-w-md leading-relaxed">
        {message}
      </p>

      {/* Action Button */}
      {onRetry && (
        <div className="w-full max-w-xs mb-3">
          <Button
            variant="primary"
            onClick={onRetry}
            size="default"
            icon={<RefreshCw className="w-5 h-5" />}
          >
            {retryLabel}
          </Button>
        </div>
      )}

      {/* Troubleshooting guide toggle for developer / admin setup */}
      <div className="w-full max-w-sm mt-3 pt-3 border-t border-red-100">
        <button
          type="button"
          onClick={() => setShowTroubleshoot(!showTroubleshoot)}
          className="inline-flex items-center gap-1.5 text-xs font-bold font-bengali text-ink-muted hover:text-ink transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5 text-harvest" />
          <span>কীভাবে ঠিক করবেন?</span>
          {showTroubleshoot ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>

        {showTroubleshoot && (
          <div className="mt-2.5 p-3.5 rounded-xl bg-white/90 border border-ground-border text-left text-xs sm:text-sm font-bengali text-ink-muted space-y-1.5 animate-fade-in">
            <p className="font-bold text-ink">দ্রুত সমাধান পরামর্শ:</p>
            <p>
              • <strong>Vercel-এ:</strong> Settings → Environment Variables-এ কি-এর নাম দিন <code className="bg-stone-100 px-1 py-0.5 rounded text-primary font-mono font-bold">AI_API_KEY</code> এবং Value-তে আপনার Gemini কি পেস্ট করে <em>Redeploy</em> করুন।
            </p>
            <p>
              • <strong>লোকালে:</strong> প্রজেক্টের রুট ফোল্ডারে <code className="bg-stone-100 px-1 py-0.5 rounded text-primary font-mono">.env.local</code> তৈরি করে <code className="bg-stone-100 px-1 py-0.5 rounded font-mono">AI_API_KEY=your_key</code> দিন।
            </p>
            <p>
              • <strong>ফ্রি কি:</strong> aistudio.google.com থেকে একদম বিনামূল্যে নতুন জেমিনি এপিআই কি নিন।
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
