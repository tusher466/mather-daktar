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
import { Calendar, Sprout, RefreshCw } from "lucide-react";

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
      return `mather_daktar_season_${cropId}_${month}`;
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
      <div className="space-y-5 animate-fade-in pb-12">
        {/* Title */}
        <div className="pt-1">
          <h1 className="text-2xl sm:text-3xl font-black font-bengali text-ink">
            {STRINGS_BN.season.title}
          </h1>
          <p className="text-base font-bengali text-ink-muted">
            বাংলা মাস ও চলতি কৃষি মৌসুম অনুযায়ী সঠিক সময়ে সঠিক প্রস্তুতি নিন।
          </p>
        </div>

        {/* Current Month & Agricultural Season Context Banner */}
        <div className="bg-primary-light border border-primary/20 rounded-2xl p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-base font-bold font-bengali text-ink">
                {STRINGS_BN.season.monthLabel}{" "}
                <strong className="text-primary text-lg">
                  {banglaDateInfo.banglaMonth}
                </strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-xs sm:text-sm font-bold font-bengali text-primary border border-primary/20">
              <Sprout className="w-4 h-4 text-primary" />
              <span>{banglaDateInfo.seasonNameBn}</span>
            </div>
          </div>

          <p className="text-sm font-bengali text-ink-muted leading-relaxed">
            {banglaDateInfo.seasonDescriptionBn}{" "}
            {selectedCropId === "rice" && (
              <strong>(বর্তমানে {banglaDateInfo.riceSeasonBn} এর সময়)</strong>
            )}
          </p>
        </div>

        {/* Crop Selector Horizontal Tabs */}
        <div>
          <label className="block text-base font-bold font-bengali text-ink mb-2">
            ফসল পরিবর্তন করুন:
          </label>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {CROPS.map((crop) => {
              const isSelected = crop.id === selectedCropId;
              return (
                <button
                  key={crop.id}
                  type="button"
                  onClick={() => handleSelectCrop(crop.id)}
                  className={`px-3.5 py-2 rounded-xl text-base font-bengali whitespace-nowrap transition-all select-none border min-h-[44px] ${
                    isSelected
                      ? "bg-primary text-white border-primary font-bold shadow-sm"
                      : "bg-white text-ink border-ground-border hover:border-primary/40"
                  }`}
                >
                  {crop.nameBn}
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
          <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-2xl border border-ground-border">
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
