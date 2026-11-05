"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Sparkles, Check, Info, ZoomIn, Compass } from "lucide-react";

export interface OriginalMapDivision {
  id: string;
  nameBn: string;
  shortCrop: string;
  cropEmoji: string;
  topPct: number; // Y position in %
  leftPct: number; // X position in %
  districts: string;
}

export const ORIGINAL_MAP_DIVISIONS: OriginalMapDivision[] = [
  {
    id: "rangpur",
    nameBn: "রংপুর",
    shortCrop: "আলু ও ভুট্টা",
    cropEmoji: "🥔",
    topPct: 16,
    leftPct: 32,
    districts: "দিনাজপুর, রংপুর, কুড়িগ্রাম, গাইবান্ধা, নীলফামারী, পঞ্চগড়",
  },
  {
    id: "rajshahi",
    nameBn: "রাজশাহী",
    shortCrop: "আম ও লিচু",
    cropEmoji: "🥭",
    topPct: 36,
    leftPct: 26,
    districts: "রাজশাহী, চাঁপাইনবাবগঞ্জ, বগুড়া, পাবনা, নাটোর, নওগাঁ",
  },
  {
    id: "mymensingh",
    nameBn: "ময়মনসিংহ",
    shortCrop: "বোরো ধান ও বেগুন",
    cropEmoji: "🌾",
    topPct: 30,
    leftPct: 52,
    districts: "ময়মনসিংহ, জামালপুর, শেরপুর, নেত্রকোণা",
  },
  {
    id: "sylhet",
    nameBn: "সিলেট",
    shortCrop: "চা ও সাতকড়া",
    cropEmoji: "🍵",
    topPct: 31,
    leftPct: 73,
    districts: "সিলেট, মৌলভীবাজার, সুনামগঞ্জ, হবিগঞ্জ",
  },
  {
    id: "dhaka",
    nameBn: "ঢাকা",
    shortCrop: "শাকসবজি ও পাট",
    cropEmoji: "🥬",
    topPct: 49,
    leftPct: 50,
    districts: "ঢাকা, মানিকগঞ্জ, মুন্সীগঞ্জ, গাজীপুর, ফরিদপুর, টাঙ্গাইল",
  },
  {
    id: "khulna",
    nameBn: "খুলনা",
    shortCrop: "নারিকেল ও লবণাক্ত ধান",
    cropEmoji: "🥥",
    topPct: 62,
    leftPct: 32,
    districts: "খুলনা, যশোর, সাতক্ষীরা, বাগেরহাট, কুষ্টিয়া, চুয়াডাঙ্গা",
  },
  {
    id: "barishal",
    nameBn: "বরিশাল",
    shortCrop: "পেয়ারা ও ডাল",
    cropEmoji: "🍐",
    topPct: 69,
    leftPct: 51,
    districts: "বরিশাল, পটুয়াখালী, ঝালকাঠি, পিরোজপুর, বরগুনা, ভোলা",
  },
  {
    id: "chittagong",
    nameBn: "চট্টগ্রাম",
    shortCrop: "পাহাড়ি ফল ও মসলা",
    cropEmoji: "🍍",
    topPct: 66,
    leftPct: 74,
    districts: "চট্টগ্রাম, কক্সবাজার, কুমিল্লা, নোয়াখালী, পার্বত্য চট্টগ্রাম",
  },
];

interface BangladeshVisualMapProps {
  selectedDivisionId: string;
  onSelectDivision: (id: string) => void;
}

export const BangladeshVisualMap: React.FC<BangladeshVisualMapProps> = ({
  selectedDivisionId,
  onSelectDivision,
}) => {
  const [hoveredDivisionId, setHoveredDivisionId] = useState<string | null>(null);

  const activeDivision =
    ORIGINAL_MAP_DIVISIONS.find((d) => d.id === (hoveredDivisionId || selectedDivisionId)) ||
    ORIGINAL_MAP_DIVISIONS[0];

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Map Card Container matching original cream backdrop */}
      <div className="relative w-full max-w-[460px] bg-[#FAF8F5] rounded-3xl border border-emerald-900/15 p-2 sm:p-4 shadow-sm overflow-hidden flex flex-col items-center">
        {/* Top Floating Badge showing selected Division */}
        <div className="w-full flex items-center justify-between gap-2 mb-2 px-1">
          <div className="flex items-center gap-1.5 text-xs font-bold font-bengali text-emerald-950 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-emerald-800" />
            <span>বাংলাদেশ আসল মানচিত্র</span>
          </div>

          <span className="text-2xs font-bengali text-ink-muted">
            বিভাগে স্পর্শ করুন
          </span>
        </div>

        {/* Real Original Bangladesh Map Container with Image and Interactive Division Pins */}
        <div className="relative w-full max-w-[420px] aspect-[594/720] rounded-2xl overflow-hidden bg-[#FAF8F5] flex items-center justify-center border border-emerald-900/10 shadow-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bangladesh-map-original.jpg"
            alt="বাংলাদেশ আসল মানচিত্র"
            className="w-full h-full object-contain pointer-events-none select-none"
            loading="eager"
            decoding="async"
          />

          {/* Interactive Division Centroid Hotspots & Pins */}
          {ORIGINAL_MAP_DIVISIONS.map((div) => {
            const isSelected = div.id === selectedDivisionId;
            const isHovered = div.id === hoveredDivisionId;

            return (
              <button
                key={div.id}
                type="button"
                onClick={() => onSelectDivision(div.id)}
                onMouseEnter={() => setHoveredDivisionId(div.id)}
                onMouseLeave={() => setHoveredDivisionId(null)}
                style={{ top: `${div.topPct}%`, left: `${div.leftPct}%` }}
                className={`group absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center transition-all duration-200 focus:outline-none ${
                  isSelected ? "scale-110 z-20" : "hover:scale-110"
                }`}
                title={`${div.nameBn} বিভাগ: ${div.shortCrop}`}
              >
                {/* Ping Pulse for Selected Division */}
                {isSelected && (
                  <span className="absolute w-10 h-10 -top-1 rounded-full bg-emerald-400/50 animate-ping pointer-events-none" />
                )}

                {/* Pin Circle with Crop Icon */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-md transition-all ${
                    isSelected
                      ? "bg-emerald-800 text-white ring-3 ring-amber-400 scale-105"
                      : "bg-white text-emerald-950 border border-emerald-900/30 hover:bg-emerald-50"
                  }`}
                >
                  <span>{div.cropEmoji}</span>
                </div>

                {/* Division Name Pill */}
                <div
                  className={`mt-0.5 px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-bold font-bengali shadow-xs transition-all whitespace-nowrap ${
                    isSelected
                      ? "bg-emerald-950 text-white ring-1 ring-white/60"
                      : "bg-white/95 text-ink-muted border border-stone-200 group-hover:text-emerald-900 group-hover:bg-white"
                  }`}
                >
                  {div.nameBn}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Division Live Status Bar */}
        <div className="w-full mt-3 p-2.5 bg-white rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl">{activeDivision.cropEmoji}</span>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold font-bengali text-emerald-950 leading-tight">
                {activeDivision.nameBn} বিভাগ নির্বাচিত
              </p>
              <p className="text-[11px] sm:text-xs font-bengali text-ink-muted truncate">
                প্রধান ফসল: <strong className="text-emerald-800">{activeDivision.shortCrop}</strong>
              </p>
            </div>
          </div>

          <span className="text-2xs font-bold font-bengali px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 whitespace-nowrap flex-shrink-0">
            নিচে বিস্তারিত দেখুন
          </span>
        </div>
      </div>
    </div>
  );
};
