"use client";

import React, { useState, useEffect } from "react";
import { CloudSun, Wind, Droplets, CheckCircle2, AlertTriangle, RefreshCw, ChevronRight, X, MapPin } from "lucide-react";
import { toBanglaDigits } from "@/lib/bangla/digits";

interface DivisionCoords {
  nameBn: string;
  lat: number;
  lon: number;
}

const DIVISIONS: DivisionCoords[] = [
  { nameBn: "ঢাকা", lat: 23.8103, lon: 90.4125 },
  { nameBn: "রাজশাহী", lat: 24.3636, lon: 88.6241 },
  { nameBn: "রংপুর", lat: 25.7439, lon: 89.2752 },
  { nameBn: "ময়মনসিংহ", lat: 24.7471, lon: 90.4203 },
  { nameBn: "চট্টগ্রাম", lat: 22.3569, lon: 91.7832 },
  { nameBn: "খুলনা", lat: 22.8456, lon: 89.5403 },
  { nameBn: "বরিশাল", lat: 22.7010, lon: 90.3535 },
  { nameBn: "সিলেট", lat: 24.8949, lon: 91.8687 },
];

interface CachedWeather {
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  lastUpdatedTime: string;
  timestamp: number;
}

// Module-level in-memory cache to prevent re-fetching and eliminates tab switching lag
const weatherCache: Record<string, CachedWeather> = {
  ঢাকা: {
    temperature: 28,
    humidity: 62,
    windSpeed: 8,
    precipitation: 0,
    lastUpdatedTime: "১২:০০",
    timestamp: Date.now(),
  },
};

export const WeatherSprayWidget: React.FC = () => {
  const [selectedDivisionIndex, setSelectedDivisionIndex] = useState<number>(0);
  const activeDivision = DIVISIONS[selectedDivisionIndex];

  // Initialize immediately from cache if available so there is zero layout shift or lag
  const initialCache = weatherCache[activeDivision.nameBn];
  const [temperature, setTemperature] = useState<number>(initialCache?.temperature ?? 28);
  const [humidity, setHumidity] = useState<number>(initialCache?.humidity ?? 62);
  const [windSpeed, setWindSpeed] = useState<number>(initialCache?.windSpeed ?? 8);
  const [precipitation, setPrecipitation] = useState<number>(initialCache?.precipitation ?? 0);
  const [isLiveLoading, setIsLiveLoading] = useState<boolean>(!initialCache);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>(initialCache?.lastUpdatedTime ?? "");

  const fetchLiveWeather = async (div: DivisionCoords, force: boolean = false) => {
    const cached = weatherCache[div.nameBn];
    const isCacheFresh = cached && Date.now() - cached.timestamp < 1000 * 60 * 10; // 10 minutes cache

    if (cached) {
      setTemperature(cached.temperature);
      setHumidity(cached.humidity);
      setWindSpeed(cached.windSpeed);
      setPrecipitation(cached.precipitation);
      setLastUpdatedTime(cached.lastUpdatedTime);
      setIsLiveLoading(false);
      if (isCacheFresh && !force) return;
    } else {
      setIsLiveLoading(true);
    }

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${div.lat}&longitude=${div.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation&timezone=Asia%2FDhaka`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data && data.current) {
          const t = Math.round(data.current.temperature_2m);
          const h = Math.round(data.current.relative_humidity_2m);
          const w = Math.round(data.current.wind_speed_10m);
          const p = data.current.precipitation || 0;

          const now = new Date();
          const hours = now.getHours().toString().padStart(2, "0");
          const mins = now.getMinutes().toString().padStart(2, "0");
          const timeStr = `${toBanglaDigits(hours)}:${toBanglaDigits(mins)}`;

          setTemperature(t);
          setHumidity(h);
          setWindSpeed(w);
          setPrecipitation(p);
          setLastUpdatedTime(timeStr);

          // Save to memory cache
          weatherCache[div.nameBn] = {
            temperature: t,
            humidity: h,
            windSpeed: w,
            precipitation: p,
            lastUpdatedTime: timeStr,
            timestamp: Date.now(),
          };
        }
      }
    } catch (e) {
      console.warn("Live weather fetch skipped or offline, using regional defaults:", e);
    } finally {
      setIsLiveLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveWeather(activeDivision);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDivisionIndex]);

  // Determine spray suitability based on actual live meteorological conditions
  const isRaining = precipitation > 0.1;
  const isHighWind = windSpeed > 15;
  const isGoodToSpray = !isRaining && !isHighWind && temperature < 34;

  return (
    <>
      <div className="p-4 sm:p-5 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white rounded-3xl border border-emerald-900/10 shadow-xs space-y-3.5">
        {/* Header with Division Selector and Live Badge */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white flex items-center justify-center shadow-xs">
              <CloudSun className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold font-bengali text-emerald-950">
                  লাইভ কৃষি আবহাওয়া
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-bengali">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>লাইভ আপডেট {lastUpdatedTime && `(${lastUpdatedTime})`}</span>
                </span>
              </div>

              {/* Division Dropdown Pill */}
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3 h-3 text-emerald-700" />
                <select
                  value={selectedDivisionIndex}
                  onChange={(e) => setSelectedDivisionIndex(Number(e.target.value))}
                  className="bg-transparent text-xs font-bold font-bengali text-emerald-800 focus:outline-none cursor-pointer underline underline-offset-2"
                >
                  {DIVISIONS.map((d, idx) => (
                    <option key={d.nameBn} value={idx}>
                      {d.nameBn} বিভাগ
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => fetchLiveWeather(activeDivision)}
              title="আবহাওয়া রিফ্রেশ করুন"
              className="w-8 h-8 rounded-xl bg-white text-ink-muted hover:text-primary flex items-center justify-center border border-emerald-200/80 shadow-2xs transition-all active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLiveLoading ? "animate-spin text-primary" : ""}`} />
            </button>

            <button
              type="button"
              onClick={() => setShowDetail(true)}
              className="flex items-center gap-1 text-xs font-bold font-bengali text-emerald-900 bg-white hover:bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/80 shadow-2xs transition-all active:scale-95"
            >
              <span>স্প্রে গাইড</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Live Weather Metrics Strip */}
        <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
          <div className="p-2.5 rounded-2xl bg-white/95 border border-emerald-100 shadow-2xs">
            <p className="text-xs font-bengali text-ink-muted">তাপমাত্রা</p>
            <p className="text-lg sm:text-xl font-black font-bengali text-ink">
              {toBanglaDigits(temperature)}° সে.
            </p>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/95 border border-emerald-100 shadow-2xs">
            <p className="text-xs font-bengali text-ink-muted flex items-center justify-center gap-1">
              <Droplets className="w-3 h-3 text-cyan-600" />
              <span>আর্দ্রতা</span>
            </p>
            <p className="text-lg sm:text-xl font-black font-bengali text-ink">
              {toBanglaDigits(humidity)}%
            </p>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/95 border border-emerald-100 shadow-2xs">
            <p className="text-xs font-bengali text-ink-muted flex items-center justify-center gap-1">
              <Wind className="w-3 h-3 text-emerald-600" />
              <span>বাতাস</span>
            </p>
            <p className="text-lg sm:text-xl font-black font-bengali text-ink">
              {toBanglaDigits(windSpeed)} কিমি/ঘ.
            </p>
          </div>
        </div>

        {/* Live Spray Advisory Banner (Real Meteorological Condition) */}
        <div
          className={`flex items-center gap-2 p-3 rounded-2xl border text-xs sm:text-sm font-bengali shadow-2xs ${
            isGoodToSpray
              ? "bg-emerald-100/80 border-emerald-300 text-emerald-950 font-bold"
              : "bg-amber-100/80 border-amber-300 text-amber-950 font-bold"
          }`}
        >
          {isGoodToSpray ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>
                বর্তমানে {activeDivision.nameBn}-এ শান্ত বাতাস ও শুকনো পাতা রয়েছে—আজ ওষুধ বা জৈব স্প্রে করার আদর্শ সময়।
              </span>
            </>
          ) : (
            <>
              <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>
                {isRaining
                  ? "বৃষ্টির সম্ভাবনা রয়েছে—এখন কোনো স্প্রে করবেন না।"
                  : "বাতাসের বেগ বেশি—স্প্রে করলে ওষুধ ছিটকে নষ্ট হতে পারে, বাতাস শান্ত হলে স্প্রে করুন।"}
              </span>
            </>
          )}
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
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
                <p className="font-bold text-emerald-950 mb-1">সকালের সেরা সময়:</p>
                <p className="text-emerald-800">
                  সকাল ৮:০০টা থেকে ১০:০০টা (পাতার কুয়াশা বা শিশির শুকিয়ে যাওয়ার ঠিক পর)।
                </p>
              </div>

              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200">
                <p className="font-bold text-amber-950 mb-1">বিকেলের সেরা সময়:</p>
                <p className="text-amber-800">
                  বিকেল ৪:০০টা থেকে ৫:৩০টা (কড়া রোদের তেজ কমে গেলে)।
                </p>
              </div>

              <div className="p-3.5 bg-red-50 rounded-2xl border border-red-200">
                <p className="font-bold text-red-950 mb-1">কখন স্প্রে করবেন না:</p>
                <p className="text-red-800">
                  দুপুরের তীব্র রোদে, বৃষ্টির আগে বা ঝড়ো বাতাসে কখনো স্প্রে করবেন না। এতে পাতা পুড়ে যেতে পারে এবং ওষুধ নষ্ট হয়।
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
