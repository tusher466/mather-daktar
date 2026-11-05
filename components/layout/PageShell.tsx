"use client";

import React from "react";
import { Navbar } from "./Navbar";
import { BottomTabs } from "./BottomTabs";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { WifiOff } from "lucide-react";
import { STRINGS_BN } from "@/lib/strings.bn";

interface PageShellProps {
  children: React.ReactNode;
  showTabs?: boolean;
}

export const PageShell: React.FC<PageShellProps> = ({ children, showTabs = true }) => {
  const isOnline = useOnlineStatus();

  return (
    <div className="min-h-screen bg-ground text-ink flex flex-col">
      {/* Top Navbar spans full width with max-w-5xl content */}
      <Navbar />

      {/* Offline Warning Banner */}
      {!isOnline && (
        <div className="bg-danger text-white px-4 py-2.5 flex items-center justify-center gap-2 text-center text-sm font-bengali font-bold sticky top-16 z-30 shadow-md">
          <WifiOff className="w-5 h-5 flex-shrink-0" />
          <span>{STRINGS_BN.errors.offline}</span>
        </div>
      )}

      {/* Main Responsive Content Area: expands for Website Desktop size */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 md:px-8 pt-4 pb-24 md:pb-8">
        {children}
      </main>

      {/* Navigation Tabs (Mobile bottom dock & Desktop responsive) */}
      {showTabs && <BottomTabs />}
    </div>
  );
};
