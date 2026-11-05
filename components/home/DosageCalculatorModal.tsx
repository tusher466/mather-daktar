"use client";

import React, { useState } from "react";
import { Calculator, X, Droplets, Check, Sparkles } from "lucide-react";
import { toBanglaDigits } from "@/lib/bangla/digits";

export const DosageCalculatorModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tankSize, setTankSize] = useState<number>(16); // 16 Liters standard drum
  const [areaDecimal, setAreaDecimal] = useState<number>(5); // 5 decimals

  // Calculations for organic neem mixture / balanced spray (standard: 5ml per liter)
  const neemVolumeMl = tankSize * 5;
  const liquidSoapMl = Math.round(tankSize * 1.5);
  const estimatedTanks = Math.max(1, Math.ceil(areaDecimal / 5));

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-teal-50 via-emerald-50 to-white rounded-2xl border border-teal-200/80 shadow-2xs hover:shadow-sm transition-all active:scale-[0.99] text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-100/80 text-teal-800 flex items-center justify-center flex-shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm sm:text-base font-bold font-bengali text-teal-950 leading-tight">
              স্মার্ট স্প্রে ড্রাম ও পানির হিসাব
            </p>
            <p className="text-xs font-bengali text-ink-muted mt-0.5">
              ড্রামের মাপ অনুযায়ী সঠিক পানির ও জৈব মিশ্রণের অনুপাত জানুন
            </p>
          </div>
        </div>

        <span className="text-xs font-bold font-bengali px-3 py-1 bg-white text-teal-800 rounded-xl border border-teal-200/80 shadow-2xs">
          হিসাব করুন
        </span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
        >
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-ground-border space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-ground-border">
              <div className="flex items-center gap-2">
                <Calculator className="w-6 h-6 text-teal-700" />
                <h3 className="text-xl font-bold font-bengali text-ink">
                  স্প্রে ড্রাম ক্যালকুলেটর
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 text-ink-muted hover:text-ink flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sprayer Drum Size Selection */}
            <div>
              <label className="block text-sm font-bold font-bengali text-ink mb-1.5">
                আপনার স্প্রে ট্যাংকের মাপ:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { size: 10, label: "১০ লিটার" },
                  { size: 16, label: "১৬ লিটার" },
                  { size: 20, label: "২০ লিটার" },
                ].map((item) => (
                  <button
                    key={item.size}
                    type="button"
                    onClick={() => setTankSize(item.size)}
                    className={`py-2 px-2 rounded-xl text-sm font-bold font-bengali border transition-all ${
                      tankSize === item.size
                        ? "bg-teal-700 text-white border-teal-700 shadow-xs"
                        : "bg-white text-ink border-ground-border hover:bg-stone-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Land Area Selection */}
            <div>
              <label className="block text-sm font-bold font-bengali text-ink mb-1.5">
                জমির পরিমাণ:
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { area: 1, label: "১ শতাংশ" },
                  { area: 5, label: "৫ শতাংশ" },
                  { area: 10, label: "১০ শতাংশ" },
                  { area: 33, label: "১ বিঘা" },
                ].map((item) => (
                  <button
                    key={item.area}
                    type="button"
                    onClick={() => setAreaDecimal(item.area)}
                    className={`py-2 px-1 text-xs font-bold font-bengali rounded-xl border transition-all ${
                      areaDecimal === item.area
                        ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                        : "bg-white text-ink border-ground-border hover:bg-stone-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Result Breakdown Card */}
            <div className="p-4 bg-gradient-to-br from-teal-50/80 to-emerald-50/60 rounded-2xl border border-teal-200/80 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold font-bengali text-teal-800">
                <Droplets className="w-4 h-4 text-teal-600" />
                <span>প্রয়োজনীয় পরিমাপের হিসাব:</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 bg-white rounded-xl border border-teal-100">
                  <p className="text-xs font-bengali text-ink-muted">প্রয়োজনীয় ড্রাম</p>
                  <p className="text-xl font-bold font-bengali text-teal-900">
                    প্রায় {toBanglaDigits(estimatedTanks)} ড্রাম
                  </p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-teal-100">
                  <p className="text-xs font-bengali text-ink-muted">প্রতি ড্রামে পানি</p>
                  <p className="text-xl font-bold font-bengali text-teal-900">
                    {toBanglaDigits(tankSize)} লিটার
                  </p>
                </div>
              </div>

              {/* Organic Solution Recommendation */}
              <div className="pt-2 border-t border-teal-200/60 text-xs font-bengali text-ink space-y-1">
                <p className="font-bold text-teal-950 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>জৈব নিম তেলের মিশ্রণ অনুপাত:</span>
                </p>
                <p>
                  • প্রতি ড্রামে নিম তেল: <strong>{toBanglaDigits(neemVolumeMl)} মিলি</strong> (প্রতি লিটারে ৫ মিলি)
                </p>
                <p>
                  • তরল সাবান / ডিটারজেন্ট: <strong>{toBanglaDigits(liquidSoapMl)} মিলি</strong> (তেল পানিতে মেশানোর জন্য)
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold font-bengali rounded-2xl shadow-sm transition-all"
            >
              হিসাব বুঝেছি
            </button>
          </div>
        </div>
      )}
    </>
  );
};
