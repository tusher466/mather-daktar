"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { BuildathonSticker } from "./BuildathonSticker";
import { STRINGS_BN } from "@/lib/strings.bn";

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-ground-border/80 shadow-xs">
      <div className="max-w-[480px] mx-auto px-4 h-16 flex items-center justify-between gap-2">
        {/* Left: App Logo & Name */}
        <div className="flex items-center gap-2 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-xl p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-xs text-lg">
              🌿
            </div>
            <span className="text-xl sm:text-2xl font-black font-bengali text-ink tracking-tight whitespace-nowrap">
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
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-ground hover:bg-stone-200/60 text-ink-muted hover:text-primary transition-all active:scale-95 shadow-xs border border-ground-border/60"
          >
            <HelpCircle className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};
