"use client";

import React from "react";
import { CROPS, CropConfig } from "@/config/crops";
import {
  Wheat,
  CircleDot,
  Apple,
  Egg,
  Flame,
  Sprout,
  Sun,
  Flower2,
  Disc,
  Shrub,
  Circle,
  PlusCircle,
  Check,
} from "lucide-react";
import { STRINGS_BN } from "@/lib/strings.bn";

interface CropGridProps {
  selectedCropId: string;
  customCropName: string;
  onSelectCrop: (cropId: string) => void;
  onCustomCropNameChange: (name: string) => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Wheat,
  CircleDot,
  Apple,
  Egg,
  Flame,
  Sprout,
  Sun,
  Flower2,
  Disc,
  Shrub,
  Circle,
  PlusCircle,
};

export const CropGrid: React.FC<CropGridProps> = ({
  selectedCropId,
  customCropName,
  onSelectCrop,
  onCustomCropNameChange,
}) => {
  return (
    <div className="space-y-3.5">
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {CROPS.map((crop: CropConfig) => {
          const isSelected = crop.id === selectedCropId;
          const IconComponent = ICON_MAP[crop.icon] || Sprout;

          return (
            <button
              key={crop.id}
              type="button"
              onClick={() => onSelectCrop(crop.id)}
              className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-200 min-h-[90px] active:scale-95 select-none focus:outline-none ${
                isSelected
                  ? "bg-gradient-to-b from-[#247541] to-[#17522D] text-white border-emerald-600 shadow-md shadow-emerald-900/20 ring-2 ring-emerald-500/40 scale-[1.02]"
                  : "bg-white/95 text-ink border-ground-border hover:border-emerald-700/40 hover:bg-stone-50 shadow-xs"
              }`}
            >
              {/* Selected check pill */}
              {isSelected && (
                <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-white text-primary flex items-center justify-center shadow-xs">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}

              {/* Icon Container */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 transition-transform ${
                  isSelected
                    ? "bg-white/20 text-white scale-105"
                    : "bg-ground text-primary group-hover:scale-105"
                }`}
              >
                <IconComponent className="w-5 h-5" />
              </div>

              {/* Bangla Crop Name */}
              <span className="text-base sm:text-lg font-bengali text-center leading-tight font-bold">
                {crop.nameBn}
              </span>
            </button>
          );
        })}
      </div>

      {/* When "অন্য ফসল" is chosen, show a modern text field */}
      {selectedCropId === "other" && (
        <div className="pt-2 animate-fade-in">
          <label className="block text-base font-bold font-bengali text-ink mb-1.5">
            ফসলের নাম লিখুন:
          </label>
          <input
            type="text"
            value={customCropName}
            onChange={(e) => onCustomCropNameChange(e.target.value)}
            placeholder={STRINGS_BN.diagnose.otherCropPlaceholder}
            className="w-full min-h-[56px] px-4 rounded-2xl border border-ground-border bg-white text-lg font-bengali text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-xs"
          />
        </div>
      )}
    </div>
  );
};
