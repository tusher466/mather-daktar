"use client";

import React, { useState } from "react";
import { CROPS, CropConfig } from "@/config/crops";
import { Check, Sprout } from "lucide-react";
import { STRINGS_BN } from "@/lib/strings.bn";

interface CropGridProps {
  selectedCropId: string;
  customCropName: string;
  onSelectCrop: (cropId: string) => void;
  onCustomCropNameChange: (name: string) => void;
}

export const CropGrid: React.FC<CropGridProps> = ({
  selectedCropId,
  customCropName,
  onSelectCrop,
  onCustomCropNameChange,
}) => {
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-3.5">
      {/* Responsive Grid: 3 cols on mobile, 4 cols on tablet, 6 cols on desktop website */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 sm:gap-3.5">
        {CROPS.map((crop: CropConfig) => {
          const isSelected = crop.id === selectedCropId;
          const hasImgError = imageErrorMap[crop.id];

          return (
            <button
              key={crop.id}
              type="button"
              onClick={() => onSelectCrop(crop.id)}
              className={`group relative flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border transition-all duration-200 min-h-[105px] active:scale-95 select-none focus:outline-none ${
                isSelected
                  ? "bg-gradient-to-br from-[#1C6837] via-[#16552C] to-[#0E3D1E] text-white border-emerald-500 shadow-md shadow-emerald-950/25 ring-2 ring-emerald-400/50 scale-[1.02]"
                  : "bg-white text-ink border-ground-border/90 hover:border-emerald-600/40 hover:bg-stone-50 hover:shadow-xs"
              }`}
            >
              {/* Selected check pill */}
              {isSelected && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-white text-emerald-800 flex items-center justify-center shadow-xs animate-fade-in z-10">
                  <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                </span>
              )}

              {/* Real Original Crop Photo */}
              <div
                className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden mb-1.5 border transition-transform duration-200 ${
                  isSelected
                    ? "border-white/50 shadow-sm scale-105"
                    : "border-stone-200/80 group-hover:scale-105"
                } bg-stone-100 flex items-center justify-center flex-shrink-0`}
              >
                {!hasImgError && crop.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={crop.imageUrl}
                    alt={crop.nameBn}
                    loading="lazy"
                    className="w-full h-full object-cover select-none"
                    onError={() =>
                      setImageErrorMap((prev) => ({ ...prev, [crop.id]: true }))
                    }
                  />
                ) : (
                  <Sprout className={`w-6 h-6 ${isSelected ? "text-white" : "text-primary"}`} />
                )}
              </div>

              {/* Bangla Crop Name */}
              <span className="text-sm sm:text-base font-bengali text-center leading-tight font-bold line-clamp-1">
                {crop.nameBn}
              </span>
            </button>
          );
        })}
      </div>

      {/* When "অন্য ফসল" is chosen, show a modern text field */}
      {selectedCropId === "other" && (
        <div className="pt-2 animate-fade-in">
          <label className="block text-sm sm:text-base font-bold font-bengali text-ink mb-1.5">
            ফসলের নাম লিখুন:
          </label>
          <input
            type="text"
            value={customCropName}
            onChange={(e) => onCustomCropNameChange(e.target.value)}
            placeholder={STRINGS_BN.diagnose.otherCropPlaceholder}
            className="w-full min-h-[56px] px-4 rounded-2xl border border-ground-border bg-white text-base sm:text-lg font-bengali text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-xs transition-all"
          />
        </div>
      )}
    </div>
  );
};
