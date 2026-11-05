"use client";

import React, { useState } from "react";
import {
  AlertOctagon,
  ChevronDown,
  Sparkles,
  ShieldAlert,
  Droplets,
  Sun,
  Bug,
  HeartPulse,
} from "lucide-react";

interface EmergencyCase {
  id: string;
  titleBn: string;
  tagBn: string;
  tagColor: string;
  icon: any;
  symptomsBn: string;
  immediateActionBn: string;
  organicRemedyBn: string;
}

const EMERGENCY_CASES: EmergencyCase[] = [
  {
    id: "wilt",
    titleBn: "হঠাৎ গাছ বা পাতা ঢলে পড়া (উইল্ট)",
    tagBn: "জরুরি সতর্কতা",
    tagColor: "bg-red-100 text-red-900 border-red-200",
    icon: AlertOctagon,
    symptomsBn: "রোদে গাছ শুকিয়ে মরে যাওয়ার মতো নিস্তেজ হয়ে পড়ে, কিন্তু পাতা ঝরে না। গোড়ায় ভেজা বা কালো দাগ হতে পারে।",
    immediateActionBn: "গাছের গোড়ায় অতিরিক্ত পানি দেওয়া বন্ধ করুন। আক্রান্ত মারাত্মক গাছ তুলে দূরে মাটির নিচে পুঁতে ফেলুন যাতে জীবাণু না ছড়ায়।",
    organicRemedyBn: "গোড়ার মাটি আলগা করে ছাই ছিটিয়ে দিন। ট্রাইকোডার্মা জৈব ছত্রাকনাশক অথবা কপার অক্সিক্লোরাইড (প্রতি লিটার পানিতে ৪ গ্রাম) গোড়ায় ঢেলে দিন।",
  },
  {
    id: "blossom_drop",
    titleBn: "ফুল ও কচি ফল হলুদ হয়ে ঝরে পড়া",
    tagBn: "সাধারণ সমস্যা",
    tagColor: "bg-amber-100 text-amber-900 border-amber-200",
    icon: HeartPulse,
    symptomsBn: "মরিচ, টমেটো বা বেগুনের ফুল ফোটার পরপরই বোঁটা হলুদ হয়ে মাটিতে ঝরে পড়ে, ফল বসে না।",
    immediateActionBn: "মাটিতে খরা বা জলাবদ্ধতা—উভয় চরম অবস্থা এড়িয়ে চলুন। নিয়মিত পরিমিত সেচ বজায় রাখুন।",
    organicRemedyBn: "প্রতি লিটার পানিতে ১ গ্রাম সলোবর বোরন ও ২ গ্রাম চিলেটেড জিংক গুলে ফুল আসার শুরুতে ভোরে বা বিকেলে স্প্রে করুন।",
  },
  {
    id: "aphids_whitefly",
    titleBn: "সাদা মাছি ও জাবপোকার হঠাৎ আক্রমণ",
    tagBn: "পোকা দমন",
    tagColor: "bg-teal-100 text-teal-900 border-teal-200",
    icon: Bug,
    symptomsBn: "পাতার নিচে অসংখ্য সাদা বা সবুজ ক্ষুদ্র পোকা কিলবিল করে। পাতা কোকড়ানো এবং আঠালো রসে কালো চিটা পড়ে।",
    immediateActionBn: "হ্যান্ড স্প্রেয়ার দিয়ে দ্রুত পানির তীব্র ধারায় পাতার নিচে ধুয়ে দিন। জমিতে হলুদ আঠালো ফাঁদ (Yellow Sticky Trap) টাঙান।",
    organicRemedyBn: "প্রতি লিটার পানিতে ৫ মিলি নিম তেল এবং ২ মিলি লিকুইড সাবান গুলে ঝাঁকিয়ে বিকেলে পাতার নিচে ভালোভাবে স্প্রে করুন।",
  },
  {
    id: "leaf_yellowing",
    titleBn: "পাতা হলুদ হয়ে শুকিয়ে যাওয়া (ক্লোরোসিস)",
    tagBn: "পুষ্টিহীনতা",
    tagColor: "bg-emerald-100 text-emerald-900 border-emerald-200",
    icon: Sun,
    symptomsBn: "নিচের দিকের পুরনো পাতা সম্পূর্ণ ফ্যাকাশে হলুদ হয়ে যায়, উদ্ভিদের বৃদ্ধি থমকে যায়।",
    immediateActionBn: "টব বা জমির ড্রেনেজ চেক করুন। স্যাঁতসেঁতে মাটিতে শিকড় অক্সিজেন পায় না বলে পাতা হলুদ হয়।",
    organicRemedyBn: "ভার্মিকম্পোস্ট (কেঁচো সার) বা ভালোভাবে পচানো গোবর সার গাছের গোড়ায় দিন। ম্যাগনেসিয়াম সালফেট (১ গ্রাম/লিটার) পাতায় স্প্রে করুন।",
  },
];

export const CropFirstAidDrawer: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-white rounded-3xl border border-stone-200 shadow-2xs p-4 sm:p-5 space-y-3.5">
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-stone-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-100/90 text-amber-900 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <ShieldAlert className="w-5 h-5 text-amber-800" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold font-bengali text-emerald-950 leading-tight">
              জরুরি ফসলের প্রাথমিক চিকিৎসা গাইড
            </h3>
            <p className="text-xs font-bengali text-ink-muted mt-0.5">
              গাছের হঠাৎ জরুরি সমস্যায় তাৎক্ষণিক করণীয় ও প্রাকৃতিক সমাধান
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold font-bengali px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
          ৪টি সাধারণ সংকট
        </span>
      </div>

      <div className="space-y-2.5">
        {EMERGENCY_CASES.map((item) => {
          const isOpen = openId === item.id;
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? "bg-stone-50/90 border-emerald-300 shadow-xs"
                  : "bg-white border-stone-200 hover:border-emerald-200 hover:bg-stone-50/50"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between p-3 sm:p-3.5 text-left focus:outline-none"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isOpen ? "bg-emerald-800 text-white" : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold font-bengali text-emerald-950 leading-snug">
                      {item.titleBn}
                    </p>
                    <span
                      className={`inline-block text-[10px] font-bold font-bengali px-2 py-0.2 rounded-md border mt-0.5 ${item.tagColor}`}
                    >
                      {item.tagBn}
                    </span>
                  </div>
                </div>

                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-ink-muted transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? "rotate-180 bg-stone-200" : "bg-stone-100"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-3 sm:px-4 pb-4 pt-1 space-y-3 text-xs sm:text-sm font-bengali border-t border-stone-200/80 animate-fade-in">
                  <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-ink-muted">
                    <strong className="text-ink font-bold block mb-0.5">🔍 লক্ষণসমূহ:</strong>
                    <p className="leading-relaxed">{item.symptomsBn}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-red-50/80 border border-red-200/80 text-red-950">
                    <strong className="text-red-900 font-bold block mb-0.5">⚡ তাৎক্ষণিক করণীয়:</strong>
                    <p className="leading-relaxed">{item.immediateActionBn}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-950">
                    <strong className="text-emerald-900 font-bold block mb-0.5">🌿 ঘরোয়া ও জৈব প্রতিকার:</strong>
                    <p className="leading-relaxed">{item.organicRemedyBn}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
