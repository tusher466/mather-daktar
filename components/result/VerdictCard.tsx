"use client";

import React from "react";
import { ConfidenceLevel, SeverityLevel } from "@/types";
import { STRINGS_BN } from "@/lib/strings.bn";

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
  // Confidence label and colored bar properties (NOT raw percentage)
  const confidenceMeta = {
    high: {
      label: STRINGS_BN.result.confidenceLevels.high,
      color: "bg-success",
      textColor: "text-success",
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
      badgeClass: "bg-danger-light text-danger border-danger/30",
    },
    medium: {
      label: STRINGS_BN.result.severityLevels.medium,
      badgeClass: "bg-harvest-light text-[#8A5200] border-harvest-border",
    },
    low: {
      label: STRINGS_BN.result.severityLevels.low,
      badgeClass: "bg-success-light text-success border-success/30",
    },
  }[severity];

  return (
    <div className="bg-white rounded-2xl border border-ground-border p-4 sm:p-5 shadow-sm space-y-4">
      {/* Photo and Basic Info Row */}
      <div className="flex items-center gap-4">
        {thumbnailBase64 && (
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-ground border border-ground-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailBase64}
              alt={problemNameBn}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-sm sm:text-base font-bold font-bengali text-primary px-2.5 py-0.5 rounded-full bg-primary-light">
              {cropBn}
            </span>
            <span
              className={`text-xs sm:text-sm font-bold font-bengali px-2.5 py-0.5 rounded-full border ${severityMeta.badgeClass}`}
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
      <div className="pt-2 border-t border-ground-border/60">
        <div className="flex items-center justify-between text-base font-bengali mb-1.5">
          <span className="text-ink-muted">রোগ নির্ণয়ের নিশ্চয়তা:</span>
          <span className={`font-bold ${confidenceMeta.textColor}`}>
            {confidenceMeta.label}
          </span>
        </div>

        {/* Visual Bar Indicator */}
        <div className="w-full h-3 bg-ground rounded-full overflow-hidden border border-ground-border/50">
          <div
            className={`h-full ${confidenceMeta.color} ${confidenceMeta.width} rounded-full transition-all duration-500`}
          />
        </div>
      </div>
    </div>
  );
};
