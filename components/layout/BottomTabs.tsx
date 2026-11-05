"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stethoscope, MessageSquare, Calendar, History } from "lucide-react";
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
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-ground-border shadow-lg pb-safe"
    >
      <div className="max-w-[480px] mx-auto h-16 flex items-center justify-around px-2">
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
              className={`flex-1 flex flex-col items-center justify-center py-1 h-full min-h-[56px] transition-colors active:scale-95 select-none focus:outline-none ${
                isActive
                  ? "text-primary font-bold"
                  : "text-ink-muted hover:text-primary font-medium"
              }`}
            >
              <div
                className={`p-1 rounded-full transition-transform ${
                  isActive ? "bg-primary-light scale-110" : ""
                }`}
              >
                <IconComponent className={`w-6 h-6 ${isActive ? "text-primary" : "text-ink-muted"}`} />
              </div>
              <span className="text-xs sm:text-sm font-bengali mt-0.5 tracking-tight">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
