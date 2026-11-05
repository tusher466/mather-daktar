"use client";

import React, { useState } from "react";
import { CROPS, CropConfig } from "@/config/crops";
import { Check, Sprout, Sparkles } from "lucide-react";
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
    <div className="space-y-4">
      {/* Responsive Grid: 3 cols on mobile, 4 cols on tablet, 6 cols on desktop website */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {CROPS.map((crop: CropConfig) => {
          const isSelected = crop.id === selectedCropId;
          const hasImgError = imageErrorMap[crop.id];

          return (
            <button
              key={crop.id}
              type="button"
              onClick={() => onSelectCrop(crop.id)}
              className={`group relative flex flex-col p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl border transition-all duration-200 active:scale-95 select-none focus:outline-none text-left overflow-hidden ${
                isSelected
                  ? "bg-white text-emerald-950 border-emerald-600 shadow-md ring-2 ring-emerald-500/50 scale-[1.02]"
                  : "bg-white text-ink border-stone-200/90 hover:border-emerald-500/50 hover:shadow-sm hover:bg-stone-50/50"
              }`}
            >
              {/* Selected check pill */}
              {isSelected && (
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-emerald-800 text-white px-2 py-0.5 rounded-full text-[10px] font-bold font-bengali shadow-md animate-fade-in">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span className="hidden sm:inline">নির্বাচিত</span>
                </div>
              )}

              {/* Real Authentic Original Crop Photo with Zoom on Hover */}
              <div className="relative w-full h-24 sm:h-28 rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 mb-2 border border-black/5 flex items-center justify-center flex-shrink-0">
                {!hasImgError && crop.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={crop.imageUrl}
                    alt={crop.nameBn}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover select-none transition-transform duration-300 group-hover:scale-105"
                    onError={() =>
                      setImageErrorMap((prev) => ({ ...prev, [crop.id]: true }))
                    }
                  />
                ) : (
                  <Sprout className={`w-8 h-8 ${isSelected ? "text-emerald-700" : "text-stone-400"}`} />
                )}

                {/* Subtle soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Bangla Crop Name & English Tag */}
              <div className="px-1 pb-1">
                <span className="text-sm sm:text-base font-bold font-bengali leading-snug line-clamp-1 block text-ink">
                  {crop.nameBn}
                </span>
                <span className="text-[10px] sm:text-xs text-ink-muted/80 truncate block mt-0.5">
                  {crop.nameEn}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* When "অন্য ফসল" is chosen, show a modern text field */}
      {selectedCropId === "other" && (
        <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl animate-fade-in space-y-2">
          <label className="block text-sm font-bold font-bengali text-emerald-950">
            আপনার ফসলের নাম বাংলায় লিখুন:
          </label>
          <input
            type="text"
            value={customCropName}
            onChange={(e) => onCustomCropNameChange(e.target.value)}
            placeholder="যেমন: আম, লিচু, কমলা, লেবু, গম বা ড্রাগন ফল..."
            className="w-full min-h-[50px] px-4 rounded-xl border border-emerald-300 bg-white text-base font-bengali text-ink placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent shadow-xs transition-all"
          />
        </div>
      )}
    </div>
  );
};
