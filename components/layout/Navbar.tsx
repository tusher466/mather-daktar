"use client";

import React from "react";
import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { STRINGS_BN } from "@/lib/strings.bn";
import { OFFICIAL_CONTACTS } from "@/config/contacts";

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-ground-border/80 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: App Logo & Name (Clean, modern typography, zero awkward boxes) */}
        <div className="flex items-center min-w-0">
          <Link
            href="/"
            className="flex items-center gap-2 focus:outline-none rounded-xl py-1 select-none"
          >
            <span className="text-2xl sm:text-3xl" role="img" aria-label="পাতা">
              🌿
            </span>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black font-bengali text-emerald-950 tracking-tight whitespace-nowrap leading-tight">
                {STRINGS_BN.appName}
              </span>
              <span className="text-[10px] sm:text-xs font-bold font-bengali text-emerald-700 tracking-wide">
                ডিজিটাল উদ্ভিদ হাসপাতাল
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Krishi Call Center Direct Hotline (Clean, practical, helpful) */}
        <div className="flex items-center gap-3">
          <a
            href={OFFICIAL_CONTACTS.krishiCallCenter.callUrl}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs sm:text-sm font-bold font-bengali transition-all shadow-2xs"
            title="কৃষি কল সেন্টার ১৬১২৩"
          >
            <PhoneCall className="w-3.5 h-3.5 text-primary" />
            <span className="hidden sm:inline">কৃষি কল সেন্টার:</span>
            <span>১৬১২৩</span>
          </a>
        </div>
      </div>
    </header>
  );
};
