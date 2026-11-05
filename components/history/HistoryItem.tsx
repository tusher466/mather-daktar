"use client";

import React from "react";
import Link from "next/link";
import { Trash2, ChevronRight, Calendar } from "lucide-react";
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
    <div className="flex items-center gap-3.5 p-3.5 bg-white/95 rounded-2xl border border-ground-border shadow-xs hover:shadow-md hover:border-emerald-600/40 transition-all">
      {/* Thumbnail */}
      <Link
        href={`/result/${diagnosis.id}`}
        className="w-16 h-16 rounded-2xl overflow-hidden bg-stone-900 flex-shrink-0 border border-ground-border shadow-2xs"
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
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-xs font-bold font-bengali text-emerald-800 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
            {diagnosis.cropBn || diagnosis.crop}
          </span>
          <span className="text-xs font-bengali text-ink-muted flex items-center gap-1">
            <Calendar className="w-3 h-3 text-ink-muted" />
            <span>{formattedDate}</span>
          </span>
        </div>
        <h4 className="text-base sm:text-lg font-bold font-bengali text-ink truncate leading-snug">
          {diagnosis.problemNameBn}
        </h4>
      </Link>

      {/* Actions: Delete icon + Reopen arrow */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteRequest(diagnosis);
          }}
          aria-label="মুছে ফেলুন"
          className="w-9 h-9 flex items-center justify-center rounded-xl text-ink-muted hover:text-danger hover:bg-red-50 transition-colors active:scale-95"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <Link
          href={`/result/${diagnosis.id}`}
          className="w-8 h-8 flex items-center justify-center text-ink-muted hover:text-primary transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};
