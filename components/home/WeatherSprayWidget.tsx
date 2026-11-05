"use client";

import React, { useState } from "react";
import { CloudSun, Wind, Droplets, CheckCircle2, ChevronRight, X } from "lucide-react";
import { getBanglaDate } from "@/lib/bangla/calendar";

export const WeatherSprayWidget: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const banglaDate = getBanglaDate();

  return (
    <>
      <div className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50/60 to-white rounded-3xl border border-emerald-900/10 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-2xs">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold font-bengali text-emerald-800 leading-tight">
                আজকের কৃষি আবহাওয়া
              </p>
              <p className="text-sm font-bengali text-ink-muted">
                {banglaDate.banglaMonth} • {banglaDate.seasonNameBn}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowDetail(true)}
            className="flex items-center gap-1 text-xs font-bold font-bengali text-primary hover:text-emerald-800 transition-colors bg-white px-2.5 py-1 rounded-xl border border-emerald-200/80 shadow-2xs"
          >
            <span>স্প্রে পরামর্শ</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Weather Metrics Strip */}
        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-emerald-100/80 text-center">
          <div className="p-2 rounded-2xl bg-white/80 border border-emerald-100/50">
            <p className="text-xs font-bengali text-ink-muted">তাপমাত্রা</p>
            <p className="text-base font-bold font-bengali text-ink">২৮° সে.</p>
          </div>
          <div className="p-2 rounded-2xl bg-white/80 border border-emerald-100/50">
            <p className="text-xs font-bengali text-ink-muted flex items-center justify-center gap-1">
              <Droplets className="w-3 h-3 text-cyan-600" />
              <span>আর্দ্রতা</span>
            </p>
            <p className="text-base font-bold font-bengali text-ink">৬২%</p>
          </div>
          <div className="p-2 rounded-2xl bg-white/80 border border-emerald-100/50">
            <p className="text-xs font-bengali text-ink-muted flex items-center justify-center gap-1">
              <Wind className="w-3 h-3 text-emerald-600" />
              <span>বাতাস</span>
            </p>
            <p className="text-base font-bold font-bengali text-ink">৮ কিমি/ঘ.</p>
          </div>
        </div>

        {/* Suitability Verdict Banner */}
        <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-emerald-100/70 border border-emerald-200/80 text-emerald-900 text-xs sm:text-sm font-bengali">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <span className="font-bold">
            আজ সকালে রোদ ও শান্ত বাতাস আছে—স্প্রে করার আদর্শ সময়।
          </span>
        </div>
      </div>

      {/* Spray Detail Modal */}
      {showDetail && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
        >
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-ground-border space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-ground-border">
              <div className="flex items-center gap-2">
                <CloudSun className="w-6 h-6 text-harvest" />
                <h3 className="text-xl font-bold font-bengali text-ink">
                  স্প্রে করার সেরা সময়
                </h3>
              </div>
              <button
                onClick={() => setShowDetail(false)}
                className="w-8 h-8 rounded-full bg-stone-100 text-ink-muted hover:text-ink flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-sm font-bengali text-ink leading-relaxed">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <p className="font-bold text-emerald-900 mb-1">সকালের উপযুক্ত সময়:</p>
                <p className="text-emerald-800">
                  সকাল ৮:০০টা থেকে ১০:০০টা (পাতার কুয়াশা শুকিয়ে যাওয়ার ঠিক পর)।
                </p>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                <p className="font-bold text-amber-900 mb-1">বিকেলের উপযুক্ত সময়:</p>
                <p className="text-amber-800">
                  বিকেল ৪:০০টা থেকে ৫:৩০টা (কড়া রোদ কমে গেলে)।
                </p>
              </div>

              <div className="p-3 bg-red-50 rounded-2xl border border-red-200">
                <p className="font-bold text-red-900 mb-1">কখন স্প্রে করবেন না:</p>
                <p className="text-red-800">
                  দুপুরের তীব্র রোদে বা ঝড়ো বাতাসে কখনো স্প্রে করবেন না, এতে গাছের পাতা পুড়ে যেতে পারে এবং ওষুধ উড়ে যায়।
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowDetail(false)}
              className="w-full py-3 bg-primary text-white font-bold font-bengali rounded-2xl shadow-sm hover:bg-primary-dark transition-all"
            >
              বুঝেছি
            </button>
          </div>
        </div>
      )}
    </>
  );
};
