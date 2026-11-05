"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stethoscope, MessageSquare, Calendar, History, HelpCircle } from "lucide-react";
import { STRINGS_BN } from "@/lib/strings.bn";

interface TabItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: TabItem[] = [
  {
    id: "doctor",
    label: STRINGS_BN.tabs.doctor,
    href: "/",
    icon: Stethoscope,
  },
  {
    id: "ask",
    label: STRINGS_BN.tabs.ask,
    href: "/ask",
    icon: MessageSquare,
  },
  {
    id: "season",
    label: STRINGS_BN.tabs.season,
    href: "/season",
    icon: Calendar,
  },
  {
    id: "history",
    label: STRINGS_BN.tabs.history,
    href: "/history",
    icon: History,
  },
  {
    id: "help",
    label: "সহায়িকা",
    href: "/help",
    icon: HelpCircle,
  },
];

export const BottomTabs: React.FC = () => {
  const pathname = usePathname();

  // Hide bottom tabs during result viewing to keep full focus on diagnosis actions
  const isResultPage = pathname.startsWith("/result/");
  if (isResultPage) {
    return null;
  }

  return (
    <nav
      aria-label="প্রধান মেনু"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-ground-border/80 shadow-xl pb-safe"
    >
      <div className="max-w-xl mx-auto h-16 flex items-center justify-around px-3">
        {TABS.map((tab) => {
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);

          const IconComponent = tab.icon;

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex-1 flex flex-col items-center justify-center py-1 h-full min-h-[56px] transition-all duration-200 active:scale-95 select-none focus:outline-none ${
                isActive
                  ? "text-primary font-bold"
                  : "text-ink-muted hover:text-ink font-medium"
              }`}
            >
              <div
                className={`px-3 py-1 rounded-full transition-all duration-200 flex items-center justify-center ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-700 to-emerald-800 text-white shadow-sm shadow-emerald-900/20 scale-105"
                    : "text-ink-muted"
                }`}
              >
                <IconComponent className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-[11px] sm:text-xs font-bengali mt-0.5 tracking-tight font-semibold">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
