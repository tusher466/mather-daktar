"use client";

import React from "react";
import { RotateCcw, ScanLine, MessageSquarePlus, Sparkles, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { STRINGS_BN } from "@/lib/strings.bn";

interface PhotoPreviewProps {
  previewUrl: string;
  onRetake: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  showNoteField: boolean;
  onToggleNoteField: () => void;
  userNote: string;
  onUserNoteChange: (note: string) => void;
  mismatchWarning?: string | null;
  detectedCropName?: string | null;
  detectedCropId?: string | null;
  onSwitchCrop?: (cropId: string) => void;
}

export const PhotoPreview: React.FC<PhotoPreviewProps> = ({
  previewUrl,
  onRetake,
  onSubmit,
  isLoading,
  showNoteField,
  onToggleNoteField,
  userNote,
  onUserNoteChange,
  mismatchWarning,
  detectedCropName,
  detectedCropId,
  onSwitchCrop,
}) => {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Modern Preview Image Card */}
      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-stone-900 border-2 border-primary/20 shadow-lg shadow-emerald-950/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewUrl}
          alt="নির্বাচিত পাতার ছবি"
          className="w-full h-full object-cover"
        />

        {/* Floating "প্রস্তুত" Status Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold font-bengali shadow-sm border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>ছবি পরীক্ষার জন্য প্রস্তুত</span>
        </div>
      </div>

      {/* Immediate Client-Side Category Mismatch Warning */}
      {mismatchWarning && (
        <div className="p-4 bg-amber-50/95 border-2 border-amber-300 rounded-2xl text-amber-950 font-bengali space-y-2.5 animate-fade-in shadow-xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <h4 className="text-sm font-black text-amber-900">
              ক্যাটাগরি ও ছবির অমিল
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            {mismatchWarning}
          </p>
          {detectedCropId && onSwitchCrop && (
            <div className="pt-1 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onSwitchCrop(detectedCropId)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>{`ফসল পরিবর্তন করে '${detectedCropName}' করুন`}</span>
              </button>
              <button
                type="button"
                onClick={onRetake}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 text-ink border border-amber-300 text-xs font-bold transition-all"
              >
                <span>নতুন ছবি দিন</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Optional Note (Collapsed by default into a small text button) */}
      <div>
        {!showNoteField ? (
          <button
            type="button"
            onClick={onToggleNoteField}
            className="flex items-center gap-2 text-primary hover:text-primary-dark font-bengali font-semibold text-base py-1.5 select-none focus:outline-none transition-colors"
          >
            <MessageSquarePlus className="w-5 h-5 text-harvest" />
            <span>{STRINGS_BN.diagnose.optionalNoteToggle}</span>
          </button>
        ) : (
          <div className="space-y-1.5 animate-fade-in bg-white p-3.5 rounded-2xl border border-ground-border shadow-xs">
            <label className="block text-base font-bold font-bengali text-ink">
              {STRINGS_BN.diagnose.optionalNoteToggle}
            </label>
            <input
              type="text"
              value={userNote}
              onChange={(e) => onUserNoteChange(e.target.value)}
              placeholder={STRINGS_BN.diagnose.optionalNotePlaceholder}
              className="w-full min-h-[50px] px-3.5 rounded-xl border border-ground-border bg-stone-50 text-base font-bengali text-ink focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
            />
          </div>
        )}
      </div>

      {/* Two Action Buttons: "পরীক্ষা করুন" (primary) and "আবার তুলুন" */}
      <div className="flex flex-col gap-3 pt-2">
        <Button
          type="button"
          variant="primary"
          size="large"
          isLoading={isLoading}
          icon={<ScanLine className="w-6 h-6 stroke-[2.2]" />}
          onClick={onSubmit}
        >
          {STRINGS_BN.actions.examine}
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="default"
          disabled={isLoading}
          icon={<RotateCcw className="w-5 h-5 text-ink-muted" />}
          onClick={onRetake}
        >
          {STRINGS_BN.diagnose.retakePrompt}
        </Button>
      </div>
    </div>
  );
};
