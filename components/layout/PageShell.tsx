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
    <div className="min-h-screen bg-ground text-ink flex flex-col items-center">
      <div className="w-full max-w-[480px] min-h-screen flex flex-col bg-ground shadow-sm relative">
        <Navbar />

        {/* Offline Warning Banner */}
        {!isOnline && (
          <div className="bg-danger text-white px-4 py-2.5 flex items-center justify-center gap-2 text-center text-sm font-bengali font-bold sticky top-16 z-30 shadow-md">
            <WifiOff className="w-5 h-5 flex-shrink-0" />
            <span>{STRINGS_BN.errors.offline}</span>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 w-full px-4 pt-4 pb-24">{children}</main>

        {showTabs && <BottomTabs />}
      </div>
    </div>
  );
};
