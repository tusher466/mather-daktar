"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
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
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-2xl border border-danger/20 my-4 shadow-sm">
      <div className="w-14 h-14 rounded-full bg-danger-light flex items-center justify-center text-danger mb-4">
        {icon || <AlertCircle className="w-8 h-8" />}
      </div>
      <p className="text-xl font-bold font-bengali text-ink mb-2">সমস্যা দেখা দিয়েছে</p>
      <p className="text-lg font-bengali text-ink-muted mb-6 max-w-md leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry} fullWidth={false} className="px-8">
          {retryLabel}
        </Button>
      )}
    </div>
  );
};
