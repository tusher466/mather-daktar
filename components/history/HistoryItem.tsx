"use client";

import React from "react";
import Link from "next/link";
import { Trash2, ChevronRight } from "lucide-react";
import { DiagnosisResult } from "@/types";
import { formatBanglaDate } from "@/lib/bangla/digits";

interface HistoryItemProps {
  diagnosis: DiagnosisResult;
  onDeleteRequest: (diagnosis: DiagnosisResult) => void;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({
  diagnosis,
  onDeleteRequest,
}) => {
  const formattedDate = formatBanglaDate(diagnosis.timestamp);

  return (
    <div className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-ground-border shadow-sm hover:border-primary/40 transition-colors">
      {/* Thumbnail */}
      <Link
        href={`/result/${diagnosis.id}`}
        className="w-16 h-16 rounded-xl overflow-hidden bg-ground flex-shrink-0 border border-ground-border"
      >
        {diagnosis.thumbnailBase64 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={diagnosis.thumbnailBase64}
            alt={diagnosis.problemNameBn}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary text-xl">
            🌿
          </div>
        )}
      </Link>

      {/* Title & Metadata */}
      <Link
        href={`/result/${diagnosis.id}`}
        className="flex-1 min-w-0 py-0.5 focus:outline-none"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold font-bengali text-primary px-2 py-0.5 rounded-md bg-primary-light">
            {diagnosis.cropBn || diagnosis.crop}
          </span>
          <span className="text-xs font-bengali text-ink-muted">
            {formattedDate}
          </span>
        </div>
        <h4 className="text-lg font-bold font-bengali text-ink truncate leading-snug">
          {diagnosis.problemNameBn}
        </h4>
      </Link>

      {/* Actions: Reopen arrow + Delete icon */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteRequest(diagnosis);
          }}
          aria-label="মুছে ফেলুন"
          className="w-10 h-10 flex items-center justify-center rounded-xl text-ink-muted hover:text-danger hover:bg-danger-light transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>

        <Link
          href={`/result/${diagnosis.id}`}
          className="w-8 h-8 flex items-center justify-center text-ink-muted hover:text-primary"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};
