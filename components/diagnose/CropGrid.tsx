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
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {CROPS.map((crop: CropConfig) => {
          const isSelected = crop.id === selectedCropId;
          const IconComponent = ICON_MAP[crop.icon] || Sprout;

          return (
            <button
              key={crop.id}
              type="button"
              onClick={() => onSelectCrop(crop.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-150 min-h-[84px] active:scale-95 select-none focus:outline-none ${
                isSelected
                  ? "bg-primary text-white border-primary shadow-md font-bold scale-[1.02]"
                  : "bg-white text-ink border-ground-border hover:border-primary/50 shadow-sm"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center mb-1.5 ${
                  isSelected ? "bg-white/20 text-white" : "bg-ground text-primary"
                }`}
              >
                <IconComponent className="w-5 h-5" />
              </div>
              <span className="text-base sm:text-lg font-bengali text-center leading-tight">
                {crop.nameBn}
              </span>
            </button>
          );
        })}
      </div>

      {/* When "অন্য ফসল" is chosen, show a text field */}
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
            className="w-full min-h-[56px] px-4 rounded-xl border border-ground-border bg-white text-lg font-bengali text-ink placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      )}
    </div>
  );
};
