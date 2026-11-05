"use client";

import React from "react";
import { Sparkles, Activity, ShieldCheck, Sun } from "lucide-react";

export const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 text-white p-5 shadow-lg shadow-emerald-950/20 border border-emerald-600/40 animate-fade-in">
      {/* Background Graphic Patterns & Glow */}
      <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-amber-400/15 blur-2xl pointer-events-none" />

      {/* Decorative Agricultural SVG Graphic */}
      <div className="absolute right-2 bottom-0 opacity-20 pointer-events-none select-none">
        <svg width="150" height="130" viewBox="0 0 200 180" fill="none">
          <path
            d="M20 180C20 110 80 40 180 20C180 90 120 160 20 180Z"
            fill="currentColor"
          />
          <path
            d="M70 180C70 130 110 80 180 60C180 110 140 160 70 180Z"
            fill="currentColor"
          />
          <circle cx="160" cy="40" r="25" fill="#FDD835" />
        </svg>
      </div>

      <div className="relative z-10 space-y-3">
        {/* Top Badges */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-100 text-xs font-bold font-bengali border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>ডিজিটাল উদ্ভিদ ক্লিনিক</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-200 text-xs font-bold font-bengali border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>তাৎক্ষণিক ফলাফল</span>
          </div>
        </div>

        {/* Main Heading */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-bengali leading-snug tracking-tight text-white">
            আপনার ফসলের কী সমস্যা?
          </h1>
          <p className="text-sm sm:text-base font-bengali text-emerald-100/90 leading-relaxed mt-1">
            আক্রান্ত পাতার ছবি তুলুন—কয়েক সেকেন্ডে সহজ বাংলায় রোগ নির্ণয় ও সমাধান পান।
          </p>
        </div>

        {/* Quick Highlights Bar */}
        <div className="pt-2 flex items-center gap-4 text-xs font-bengali text-emerald-100/90 border-t border-white/15">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-300" />
            <span>জৈব প্রতিকার প্রথমে</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>নিরাপদ কৃষি তথ্য</span>
          </div>
        </div>
      </div>
    </div>
  );
};
