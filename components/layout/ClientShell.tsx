"use client";

import React from "react";
import { Navbar } from "./Navbar";
import { BottomTabs } from "./BottomTabs";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { WifiOff } from "lucide-react";
import { STRINGS_BN } from "@/lib/strings.bn";

export const ClientShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isOnline = useOnlineStatus();

  return (
    <div className="min-h-screen bg-ground text-ink flex flex-col antialiased">
      {/* Persistent Top Navbar across all pages: NEVER unmounts, ZERO switching flicker */}
      <Navbar />

      {/* Offline Warning Banner */}
      {!isOnline && (
        <div className="bg-danger text-white px-4 py-2 flex items-center justify-center gap-2 text-center text-sm font-bengali font-bold sticky top-16 z-30 shadow-md">
          <WifiOff className="w-4 h-4 flex-shrink-0" />
          <span>{STRINGS_BN.errors.offline}</span>
        </div>
      )}

      {/* Main Responsive Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 md:px-8 pt-3 pb-24 md:pb-12">
        {children}
      </main>

      {/* Persistent Bottom Tabs for mobile: NEVER unmounts, hides smoothly on /result/[id] */}
      <BottomTabs />
    </div>
  );
};
