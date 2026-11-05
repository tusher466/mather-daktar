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
              className={`group relative flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-200 min-h-[92px] active:scale-95 select-none focus:outline-none ${
                isSelected
                  ? "bg-gradient-to-br from-[#1C6837] via-[#16552C] to-[#0E3D1E] text-white border-emerald-500/80 shadow-lg shadow-emerald-950/25 ring-2 ring-emerald-400/50 scale-[1.02]"
                  : "bg-white/95 text-ink border-ground-border/90 hover:border-emerald-600/40 hover:bg-stone-50 hover:shadow-sm"
              }`}
            >
              {/* Active selection badge */}
              {isSelected && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-white text-emerald-800 flex items-center justify-center shadow-xs animate-fade-in">
                  <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                </span>
              )}

              {/* Icon Container */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 transition-transform duration-200 ${
                  isSelected
                    ? "bg-white/20 text-white shadow-inner scale-105"
                    : "bg-stone-100 text-emerald-800 group-hover:scale-105 group-hover:bg-emerald-50"
                }`}
              >
                <IconComponent className="w-5 h-5 stroke-[2.2]" />
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
            className="w-full min-h-[56px] px-4 rounded-2xl border border-ground-border bg-white text-lg font-bengali text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-xs transition-all"
          />
        </div>
      )}
    </div>
  );
};
