"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { BuildathonSticker } from "./BuildathonSticker";
import { STRINGS_BN } from "@/lib/strings.bn";

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-ground-surface border-b border-ground-border shadow-sm">
      <div className="max-w-[480px] mx-auto px-4 h-16 flex items-center justify-between gap-2">
        {/* Left: App Logo & Name */}
        <div className="flex items-center gap-2 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
          >
            <span className="text-2xl" role="img" aria-label="পাতা">
              🌿
            </span>
            <span className="text-xl sm:text-2xl font-black font-bengali text-primary tracking-tight whitespace-nowrap">
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
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-ground hover:bg-ground-border/60 text-ink-muted hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary active:scale-95"
          >
            <HelpCircle className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </header>
  );
};
