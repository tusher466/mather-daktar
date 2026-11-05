"use client";

import React, { useState } from "react";
import { MapPin, Sparkles, Check, Info } from "lucide-react";

export interface MapDivisionMeta {
  id: string;
  nameBn: string;
  nameEn: string;
  shortCrop: string;
  cropEmoji: string;
  pinX: number;
  pinY: number;
  labelX: number;
  labelY: number;
  svgPath: string;
  colorTone: string;
}

export const MAP_DIVISIONS: MapDivisionMeta[] = [
  {
    id: "rangpur",
    nameBn: "রংপুর",
    nameEn: "Rangpur",
    shortCrop: "আলু ও ভুট্টা",
    cropEmoji: "🥔",
    pinX: 170,
    pinY: 85,
    labelX: 170,
    labelY: 112,
    svgPath:
      "M 160,20 C 190,40 220,65 235,95 C 230,125 228,145 225,160 C 195,165 160,165 135,160 C 115,130 100,100 105,75 C 120,45 145,25 160,20 Z",
    colorTone: "fill-emerald-100/90 hover:fill-emerald-200 stroke-emerald-700",
  },
  {
    id: "rajshahi",
    nameBn: "রাজশাহী",
    nameEn: "Rajshahi",
    shortCrop: "আম ও লিচু",
    cropEmoji: "🥭",
    pinX: 140,
    pinY: 205,
    labelX: 140,
    labelY: 232,
    svgPath:
      "M 135,160 C 165,165 195,165 225,160 C 220,195 215,230 205,260 C 170,265 130,265 95,260 C 75,240 60,225 65,205 C 80,185 110,170 135,160 Z",
    colorTone: "fill-amber-100/90 hover:fill-amber-200 stroke-amber-700",
  },
  {
    id: "mymensingh",
    nameBn: "ময়মনসিংহ",
    nameEn: "Mymensingh",
    shortCrop: "ধান ও বেগুন",
    cropEmoji: "🌾",
    pinX: 280,
    pinY: 135,
    labelX: 280,
    labelY: 162,
    svgPath:
      "M 235,95 C 270,90 300,90 330,95 C 335,125 335,155 330,185 C 295,190 265,190 235,185 C 230,155 230,125 235,95 Z",
    colorTone: "fill-teal-100/90 hover:fill-teal-200 stroke-teal-700",
  },
  {
    id: "sylhet",
    nameBn: "সিলেট",
    nameEn: "Sylhet",
    shortCrop: "চা ও সাতকড়া",
    cropEmoji: "🍵",
    pinX: 390,
    pinY: 165,
    labelX: 390,
    labelY: 192,
    svgPath:
      "M 330,95 C 365,100 395,105 425,115 C 445,135 460,155 455,175 C 440,210 415,235 390,240 C 370,225 350,205 330,185 C 335,155 335,125 330,95 Z",
    colorTone: "fill-lime-100/90 hover:fill-lime-200 stroke-lime-700",
  },
  {
    id: "dhaka",
    nameBn: "ঢাকা",
    nameEn: "Dhaka",
    shortCrop: "সবজি ও পাট",
    cropEmoji: "🥬",
    pinX: 265,
    pinY: 265,
    labelX: 265,
    labelY: 292,
    svgPath:
      "M 225,160 C 260,185 295,190 330,185 C 335,215 335,235 330,255 C 320,290 310,325 305,350 C 275,365 245,370 225,370 C 205,350 190,325 185,300 C 195,280 200,270 205,260 C 215,230 220,195 225,160 Z",
    colorTone: "fill-emerald-100/90 hover:fill-emerald-200 stroke-emerald-700",
  },
  {
    id: "khulna",
    nameBn: "খুলনা",
    nameEn: "Khulna",
    shortCrop: "নারিকেল ও ধান",
    cropEmoji: "🥥",
    pinX: 155,
    pinY: 385,
    labelX: 155,
    labelY: 412,
    svgPath:
      "M 95,260 C 130,265 160,285 185,300 C 205,325 215,350 225,370 C 228,420 228,470 225,520 C 185,525 150,515 125,500 C 95,450 85,380 90,320 C 92,295 94,275 95,260 Z",
    colorTone: "fill-sky-100/90 hover:fill-sky-200 stroke-sky-700",
  },
  {
    id: "barishal",
    nameBn: "বরিশাল",
    nameEn: "Barishal",
    shortCrop: "পেয়ারা ও ডাল",
    cropEmoji: "🍐",
    pinX: 275,
    pinY: 450,
    labelX: 275,
    labelY: 477,
    svgPath:
      "M 225,370 C 255,365 285,360 305,350 C 315,390 325,430 325,470 C 315,505 300,530 280,540 C 250,535 235,530 225,520 C 228,470 228,420 225,370 Z",
    colorTone: "fill-cyan-100/90 hover:fill-cyan-200 stroke-cyan-700",
  },
  {
    id: "chittagong",
    nameBn: "চট্টগ্রাম",
    nameEn: "Chittagong",
    shortCrop: "পাহাড়ি ফল ও মসলা",
    cropEmoji: "🍍",
    pinX: 375,
    pinY: 395,
    labelX: 375,
    labelY: 422,
    svgPath:
      "M 330,255 C 350,270 370,290 390,300 C 430,320 455,340 450,370 C 460,440 470,510 465,580 C 445,590 425,585 410,570 C 385,520 365,470 345,430 C 325,395 315,370 305,350 C 320,320 325,290 330,255 Z",
    colorTone: "fill-orange-100/90 hover:fill-orange-200 stroke-orange-700",
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
    MAP_DIVISIONS.find((d) => d.id === (hoveredDivisionId || selectedDivisionId)) ||
    MAP_DIVISIONS[0];

  return (
    <div className="flex flex-col items-center select-none">
      {/* Visual Interactive SVG Container */}
      <div className="relative w-full max-w-[420px] aspect-[520/620] bg-gradient-to-b from-sky-50/60 via-stone-50/40 to-teal-50/80 rounded-3xl border border-emerald-900/10 p-2 sm:p-4 shadow-inner overflow-hidden">
        {/* Subtle Water & Geography Context Labels */}
        <div className="absolute top-2 left-3 text-[10px] sm:text-xs font-bold font-bengali text-ink-muted/50 tracking-wider">
          উত্তরবঙ্গ (হিমালয় পাদদেশ)
        </div>
        <div className="absolute top-2 right-3 text-[10px] sm:text-xs font-bold font-bengali text-ink-muted/50 tracking-wider">
          মেঘালয় ও আসাম সীমান্ত
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-bold font-bengali text-teal-800/60 tracking-widest flex items-center gap-1.5">
          <span>〰️ বঙ্গোপসাগর (Bay of Bengal) 〰️</span>
        </div>

        {/* Hover/Tap Quick Tooltip Box */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="px-3 py-1.5 rounded-full bg-emerald-950/90 text-white backdrop-blur-md shadow-md text-xs font-bengali flex items-center gap-2 border border-white/20 animate-fade-in whitespace-nowrap">
            <span className="text-base">{activeDivision.cropEmoji}</span>
            <span className="font-bold text-emerald-200">{activeDivision.nameBn} বিভাগ:</span>
            <span className="text-white">{activeDivision.shortCrop}</span>
          </div>
        </div>

        <svg
          viewBox="0 0 520 620"
          className="w-full h-full drop-shadow-sm transition-transform duration-300"
          aria-label="বাংলাদেশের কৃষি মানচিত্র"
        >
          {/* Subtle Coastal Sea Waves Graphic */}
          <path
            d="M 50,560 Q 150,545 250,560 T 450,560"
            fill="none"
            stroke="#99f6e4"
            strokeWidth="3"
            strokeDasharray="6,6"
            opacity="0.7"
          />
          <path
            d="M 70,580 Q 170,565 270,580 T 470,580"
            fill="none"
            stroke="#5eead4"
            strokeWidth="2.5"
            strokeDasharray="8,6"
            opacity="0.6"
          />

          {/* Division Polygon Paths */}
          {MAP_DIVISIONS.map((division) => {
            const isSelected = division.id === selectedDivisionId;
            const isHovered = division.id === hoveredDivisionId;

            return (
              <g
                key={division.id}
                onClick={() => onSelectDivision(division.id)}
                onMouseEnter={() => setHoveredDivisionId(division.id)}
                onMouseLeave={() => setHoveredDivisionId(null)}
                className="cursor-pointer transition-all duration-200"
              >
                <path
                  d={division.svgPath}
                  className={`transition-all duration-200 ${
                    isSelected
                      ? "fill-emerald-600 stroke-emerald-900 filter drop-shadow-md"
                      : isHovered
                      ? "fill-emerald-300/90 stroke-emerald-800"
                      : division.colorTone
                  }`}
                  strokeWidth={isSelected ? "3.5" : "1.8"}
                  strokeLinejoin="round"
                />

                {/* Centroid Marker / Pin */}
                <circle
                  cx={division.pinX}
                  cy={division.pinY}
                  r={isSelected ? "15" : "12"}
                  className={`transition-all duration-200 ${
                    isSelected
                      ? "fill-white stroke-emerald-950 stroke-[3]"
                      : "fill-white/95 stroke-stone-400 stroke-[1.5] shadow-xs"
                  }`}
                />

                {/* Animated Ping Ring for Selected Division */}
                {isSelected && (
                  <circle
                    cx={division.pinX}
                    cy={division.pinY}
                    r="22"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    className="animate-ping opacity-75 pointer-events-none"
                  />
                )}

                {/* Crop Emoji inside Pin */}
                <text
                  x={division.pinX}
                  y={division.pinY + 4}
                  textAnchor="middle"
                  fontSize={isSelected ? "14" : "12"}
                  className="pointer-events-none select-none"
                >
                  {division.cropEmoji}
                </text>

                {/* Division Name Label */}
                <text
                  x={division.labelX}
                  y={division.labelY}
                  textAnchor="middle"
                  className={`text-[13px] font-bold font-bengali pointer-events-none select-none transition-all duration-150 ${
                    isSelected
                      ? "fill-emerald-950 font-black text-[14px]"
                      : "fill-stone-800"
                  }`}
                >
                  {division.nameBn}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Helpful Hint beneath visual map */}
      <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bengali text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
        <Info className="w-3.5 h-3.5 flex-shrink-0" />
        <span>মানচিত্রের যেকোনো বিভাগে স্পর্শ করুন এবং বিস্তারিত তথ্য জানুন</span>
      </div>
    </div>
  );
};
