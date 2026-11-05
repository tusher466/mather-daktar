"use client";

import React from "react";
import { ConfidenceLevel, SeverityLevel } from "@/types";
import { STRINGS_BN } from "@/lib/strings.bn";
import { ShieldCheck, Sparkles } from "lucide-react";

interface VerdictCardProps {
  cropBn: string;
  problemNameBn: string;
  confidence: ConfidenceLevel;
  severity: SeverityLevel;
  thumbnailBase64?: string;
}

export const VerdictCard: React.FC<VerdictCardProps> = ({
  cropBn,
  problemNameBn,
  confidence,
  severity,
  thumbnailBase64,
}) => {
  const confidenceMeta = {
    high: {
      label: STRINGS_BN.result.confidenceLevels.high,
      color: "bg-emerald-600",
      textColor: "text-emerald-700",
      width: "w-full",
    },
    medium: {
      label: STRINGS_BN.result.confidenceLevels.medium,
      color: "bg-harvest",
      textColor: "text-harvest",
      width: "w-2/3",
    },
    low: {
      label: STRINGS_BN.result.confidenceLevels.low,
      color: "bg-danger",
      textColor: "text-danger",
      width: "w-1/3",
    },
  }[confidence];

  const severityMeta = {
    high: {
      label: STRINGS_BN.result.severityLevels.high,
      badgeClass: "bg-red-50 text-red-700 border-red-200",
    },
    medium: {
      label: STRINGS_BN.result.severityLevels.medium,
      badgeClass: "bg-amber-50 text-amber-800 border-amber-200",
    },
    low: {
      label: STRINGS_BN.result.severityLevels.low,
      badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
    },
  }[severity];

  return (
    <div className="bg-gradient-to-b from-white to-stone-50/50 rounded-3xl border border-ground-border p-5 shadow-sm space-y-4 animate-fade-in">
      {/* Photo and Problem Info */}
      <div className="flex items-center gap-4">
        {thumbnailBase64 && (
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-stone-900 border border-ground-border shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailBase64}
              alt={problemNameBn}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs sm:text-sm font-bold font-bengali text-emerald-800 px-3 py-0.5 rounded-full bg-emerald-100/80 border border-emerald-200">
              {cropBn}
            </span>
            <span
              className={`text-xs sm:text-sm font-bold font-bengali px-3 py-0.5 rounded-full border ${severityMeta.badgeClass}`}
            >
              {severityMeta.label}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-bengali text-ink leading-tight">
            {problemNameBn}
          </h1>
        </div>
      </div>

      {/* Confidence Level Bar - Colored Bar, NOT a raw percentage */}
      <div className="pt-3 border-t border-ground-border/70">
        <div className="flex items-center justify-between text-base font-bengali mb-2">
          <span className="text-ink-muted flex items-center gap-1.5 text-sm font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>রোগ নির্ণয়ের নিশ্চয়তা:</span>
          </span>
          <span className={`font-bold text-base ${confidenceMeta.textColor}`}>
            {confidenceMeta.label}
          </span>
        </div>

        {/* Visual Bar Indicator */}
        <div className="w-full h-3 bg-stone-200/70 rounded-full overflow-hidden p-0.5 border border-stone-200">
          <div
            className={`h-full ${confidenceMeta.color} ${confidenceMeta.width} rounded-full transition-all duration-700 shadow-xs`}
          />
        </div>
      </div>
    </div>
  );
};
