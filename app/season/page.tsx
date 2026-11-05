"use client";

import React, { useState, useEffect, useCallback } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { SeasonCard } from "@/components/season/SeasonCard";
import { ErrorState } from "@/components/ui/ErrorState";
import { CROPS, getCropById } from "@/config/crops";
import { getSavedCrop, saveCropPreference } from "@/lib/storage/preferences";
import { getBanglaDate } from "@/lib/bangla/calendar";
import { SeasonAdvice } from "@/types";
import { STRINGS_BN } from "@/lib/strings.bn";
import { Calendar, Sprout, RefreshCw, Sparkles, Sun } from "lucide-react";

export default function SeasonPage() {
  const [selectedCropId, setSelectedCropId] = useState<string>("rice");
  const [advice, setAdvice] = useState<SeasonAdvice | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const banglaDateInfo = getBanglaDate();

  // Load saved crop preference on mount
  useEffect(() => {
    const saved = getSavedCrop();
    setSelectedCropId(saved);
  }, []);

  const getStorageKey = useCallback(
    (cropId: string, month: string) => {
      return `mather_daktar_season_v2_${cropId}_${month}`;
    },
    []
  );

  const loadSeasonAdvice = useCallback(
    async (cropId: string, forceRefresh = false) => {
      setIsLoading(true);
      setErrorMessage(null);

      const cacheKey = getStorageKey(cropId, banglaDateInfo.banglaMonth);

      // Check localStorage 30-day cache if not forcing refresh
      if (!forceRefresh && typeof window !== "undefined") {
        try {
          const cachedRaw = localStorage.getItem(cacheKey);
          if (cachedRaw) {
            const cached: SeasonAdvice = JSON.parse(cachedRaw);
            const now = Date.now();
            const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
            if (now - cached.cachedAt < thirtyDaysMs && cached.banglaMonth === banglaDateInfo.banglaMonth) {
              setAdvice(cached);
              setIsLoading(false);
              return;
            }
          }
        } catch (e) {
          console.warn("Failed to parse cached seasonal advice:", e);
        }
      }

      try {
        const cropObj = getCropById(cropId);
        const res = await fetch("/api/season", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            crop: cropObj.nameBn,
            banglaMonth: banglaDateInfo.banglaMonth,
            gregorianMonth: banglaDateInfo.gregorianMonthNameBn,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.messageBn || STRINGS_BN.errors.serverError);
        }

        const data = await res.json();
        const fullAdvice: SeasonAdvice = {
          ...data,
          cachedAt: Date.now(),
        };

        setAdvice(fullAdvice);

        // Cache in localStorage
        try {
          localStorage.setItem(cacheKey, JSON.stringify(fullAdvice));
        } catch (cacheErr) {
          console.warn("Could not cache season advice:", cacheErr);
        }
      } catch (err: any) {
        console.error("Failed to load season advice:", err);
        setErrorMessage(err.message || STRINGS_BN.errors.serverError);
      } finally {
        setIsLoading(false);
      }
    },
    [banglaDateInfo, getStorageKey]
  );

  useEffect(() => {
    loadSeasonAdvice(selectedCropId);
  }, [selectedCropId, loadSeasonAdvice]);

  const handleSelectCrop = (cropId: string) => {
    setSelectedCropId(cropId);
    saveCropPreference(cropId);
  };

  return (
    <PageShell>
      <div className="space-y-4 animate-fade-in pb-12">
        {/* Modern Season Hero Header */}
        <div className="p-5 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 text-white rounded-3xl shadow-sm space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-100 text-xs font-bold font-bengali">
              <Calendar className="w-3.5 h-3.5" />
              <span>চলতি বাংলা মাস: {banglaDateInfo.banglaMonth}</span>
            </div>
            <div className="px-2.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-200 text-xs font-bold font-bengali border border-emerald-500/30">
              {banglaDateInfo.seasonNameBn}
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-bengali text-white">
            {STRINGS_BN.season.title}
          </h1>

          <p className="text-xs sm:text-sm font-bengali text-emerald-100/90 leading-relaxed">
            {banglaDateInfo.seasonDescriptionBn}{" "}
            {selectedCropId === "rice" && (
              <strong className="text-amber-300">(বর্তমানে {banglaDateInfo.riceSeasonBn} এর মৌসুম)</strong>
            )}
          </p>
        </div>

        {/* Crop Selector Horizontal Tabs */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <label className="text-xs font-bold font-bengali text-ink-muted uppercase tracking-wider">
              ফসল নির্বাচন করুন (আলাদা আলাদা পরামর্শ দেখুন):
            </label>
            <span className="text-2xs font-bengali text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              ১২টি ফসল
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {CROPS.map((crop) => {
              const isSelected = crop.id === selectedCropId;
              return (
                <button
                  key={crop.id}
                  type="button"
                  onClick={() => handleSelectCrop(crop.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-sm sm:text-base font-bengali whitespace-nowrap transition-all select-none border min-h-[46px] active:scale-95 ${
                    isSelected
                      ? "bg-emerald-800 text-white border-emerald-800 font-bold shadow-md shadow-emerald-950/20 ring-2 ring-emerald-500/30"
                      : "bg-white text-ink border-stone-200 hover:bg-stone-50 shadow-2xs"
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg overflow-hidden flex-shrink-0 bg-stone-100 border border-black/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={crop.imageUrl}
                      alt={crop.nameBn}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span>{crop.nameBn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Error State with retry */}
        {errorMessage && (
          <ErrorState
            message={errorMessage}
            onRetry={() => loadSeasonAdvice(selectedCropId, true)}
          />
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-3xl border border-ground-border shadow-xs">
            <RefreshCw className="w-8 h-8 text-primary animate-spin mb-3" />
            <p className="text-lg font-bold font-bengali text-ink">
              {STRINGS_BN.season.loading}
            </p>
          </div>
        )}

        {/* Advice Content (Top 3 Risks + Top 3 Tasks) */}
        {!isLoading && advice && (
          <SeasonCard risks={advice.risks} tasks={advice.tasks} />
        )}
      </div>
    </PageShell>
  );
}
