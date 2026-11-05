"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PhoneCall,
  Stethoscope,
  MessageSquare,
  Calendar,
  History,
  HelpCircle,
} from "lucide-react";
import { STRINGS_BN } from "@/lib/strings.bn";
import { OFFICIAL_CONTACTS } from "@/config/contacts";

const NAV_ITEMS = [
  { href: "/", label: STRINGS_BN.tabs.doctor, icon: Stethoscope },
  { href: "/ask", label: STRINGS_BN.tabs.ask, icon: MessageSquare },
  { href: "/season", label: STRINGS_BN.tabs.season, icon: Calendar },
  { href: "/history", label: STRINGS_BN.tabs.history, icon: History },
  { href: "/help", label: "সহায়িকা", icon: HelpCircle },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-ground-border/80 shadow-xs">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 md:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left: App Logo & Name (Clean, modern typography) */}
        <div className="flex items-center min-w-0 flex-shrink-0">
          <Link
            href="/"
            prefetch={true}
            className="flex items-center gap-2 focus:outline-none rounded-xl py-1 select-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100/90 flex items-center justify-center p-1 border border-emerald-300 shadow-2xs flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icon.svg"
                alt="মাঠের ডাক্তার লোগো"
                className="w-full h-full object-contain"
              />
            </div>
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

        {/* Center: Desktop Navigation Bar with Instant Switching & Zero Lag */}
        <nav
          aria-label="ডেস্কটপ নেভিগেশন"
          className="hidden md:flex items-center gap-1 bg-stone-100/90 p-1 rounded-2xl border border-stone-200/80 shadow-2xs"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs lg:text-sm font-bold font-bengali transition-all duration-150 select-none ${
                  isActive
                    ? "bg-emerald-800 text-white shadow-xs"
                    : "text-ink-muted hover:text-ink hover:bg-white/80"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Krishi Call Center Direct Hotline */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={OFFICIAL_CONTACTS.krishiCallCenter.callUrl}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs sm:text-sm font-bold font-bengali transition-all shadow-2xs"
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
