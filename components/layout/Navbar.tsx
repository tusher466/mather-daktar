"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { BuildathonSticker } from "./BuildathonSticker";
import { STRINGS_BN } from "@/lib/strings.bn";

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-ground-border/70 shadow-xs">
      <div className="max-w-[480px] mx-auto px-4 h-16 flex items-center justify-between gap-2">
        {/* Left: App Logo & Name (Clean, elegant, NO BOX beside it) */}
        <div className="flex items-center min-w-0">
          <Link
            href="/"
            className="flex items-center gap-1.5 focus:outline-none rounded-lg py-1 select-none"
          >
            <span className="text-2xl" role="img" aria-label="পাতা">
              🌿
            </span>
            <span className="text-xl sm:text-2xl font-black font-bengali text-emerald-950 tracking-tight whitespace-nowrap">
              {STRINGS_BN.appName}
            </span>
          </Link>
        </div>

        {/* Center: Buildathon Sticker (prominently visible on every page) */}
        <div className="flex items-center justify-center">
          <BuildathonSticker />
        </div>

        {/* Right: Help Button only */}
        <div className="flex items-center">
          <Link
            href="/help"
            aria-label="সাহায্য ও নির্দেশিকা"
            className="w-10 h-10 flex items-center justify-center rounded-2xl bg-stone-100 hover:bg-stone-200/80 text-ink-muted hover:text-primary transition-all active:scale-95 shadow-2xs border border-ground-border/60"
          >
            <HelpCircle className="w-5 h-5 stroke-[2.2]" />
          </Link>
        </div>
      </div>
    </header>
  );
};
