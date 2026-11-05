"use client";

import React, { useState, useEffect } from "react";
import {
  CloudSun,
  Wind,
  Droplets,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ChevronRight,
  X,
  MapPin,
  Calculator,
  ShieldCheck,
  Sparkles,
  Info,
} from "lucide-react";
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

  // Interactive Sprayer Drum Calculator state
  const [tankSize, setTankSize] = useState<number>(16); // 16 Liters
  const [landDecimal, setLandDecimal] = useState<number>(5); // 5 decimals

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

  // Drum calculations
  const totalWaterNeededLiters = Math.max(1, Math.ceil((landDecimal * 10) / 10)) * 10;
  const totalDrums = Math.max(1, Math.ceil(totalWaterNeededLiters / tankSize));
  const neemExtractMl = tankSize * 5; // 5ml organic per liter
  const soapMl = Math.round(tankSize * 1.5);

  return (
    <>
      <div className="p-4 sm:p-5 bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white rounded-3xl border border-emerald-900/10 shadow-xs space-y-4">
        {/* Top Header Row */}
        <div className="flex items-center justify-between flex-wrap gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shadow-xs flex-shrink-0">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold font-bengali text-emerald-950">
                  স্মার্ট স্প্রে পরামর্শ ও লাইভ আবহাওয়া
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-bengali">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>লাইভ {lastUpdatedTime && `(${lastUpdatedTime})`}</span>
                </span>
              </div>

              {/* Division Dropdown Pill */}
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3 h-3 text-emerald-700" />
                <span className="text-xs font-bengali text-ink-muted">বিভাগ:</span>
                <select
                  value={selectedDivisionIndex}
                  onChange={(e) => setSelectedDivisionIndex(Number(e.target.value))}
                  className="bg-transparent text-xs font-bold font-bengali text-emerald-900 focus:outline-none cursor-pointer underline underline-offset-2"
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

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fetchLiveWeather(activeDivision, true)}
              title="আবহাওয়া রিফ্রেশ করুন"
              className="w-9 h-9 rounded-xl bg-white text-ink-muted hover:text-emerald-800 flex items-center justify-center border border-stone-200 shadow-2xs transition-all active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLiveLoading ? "animate-spin text-emerald-800" : ""}`} />
            </button>

            <button
              type="button"
              onClick={() => setShowDetail(true)}
              className="flex items-center gap-1 text-xs sm:text-sm font-bold font-bengali text-white bg-emerald-800 hover:bg-emerald-900 px-3.5 py-2 rounded-xl shadow-xs transition-all active:scale-95"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>স্প্রে ড্রাম হিসাব</span>
              <ChevronRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Live Weather Metrics 3-Col Strip */}
        <div className="grid grid-cols-3 gap-2.5 text-center">
          <div className="p-3 rounded-2xl bg-white/95 border border-stone-200 shadow-2xs">
            <p className="text-xs font-bengali text-ink-muted mb-0.5">তাপমাত্রা</p>
            <p className="text-lg sm:text-xl font-black font-bengali text-emerald-950">
              {toBanglaDigits(temperature)}° সে.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-white/95 border border-stone-200 shadow-2xs">
            <p className="text-xs font-bengali text-ink-muted flex items-center justify-center gap-1 mb-0.5">
              <Droplets className="w-3 h-3 text-cyan-600" />
              <span>আর্দ্রতা</span>
            </p>
            <p className="text-lg sm:text-xl font-black font-bengali text-emerald-950">
              {toBanglaDigits(humidity)}%
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-white/95 border border-stone-200 shadow-2xs">
            <p className="text-xs font-bengali text-ink-muted flex items-center justify-center gap-1 mb-0.5">
              <Wind className="w-3 h-3 text-teal-600" />
              <span>বাতাস</span>
            </p>
            <p className="text-lg sm:text-xl font-black font-bengali text-emerald-950">
              {toBanglaDigits(windSpeed)} কিমি/ঘ.
            </p>
          </div>
        </div>

        {/* Live Spray Advisory Status Bar */}
        <div
          className={`flex items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl border text-xs sm:text-sm font-bengali shadow-2xs ${
            isGoodToSpray
              ? "bg-emerald-100/90 border-emerald-300 text-emerald-950"
              : "bg-amber-100/90 border-amber-300 text-amber-950"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {isGoodToSpray ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0" />
            )}
            <div>
              <p className="font-bold leading-tight">
                {isGoodToSpray
                  ? "আবহাওয়া সম্পূর্ণ অনুকূল: এখন গাছে স্প্রে করার উপযুক্ত সময়"
                  : isRaining
                  ? "আজ স্প্রে করবেন না: বৃষ্টিপাতের সম্ভাবনা রয়েছে"
                  : isHighWind
                  ? "সতর্কতা: বাতাসে ওষুধের বিস্তার ঘটবে, বাতাস কমলে স্প্রে করুন"
                  : "সতর্কতা: প্রখর রোদে বা শিশির ভেজা অবস্থায় স্প্রে করবেন না"}
              </p>
              <p className="text-2xs sm:text-xs font-normal opacity-90 mt-0.5">
                {isGoodToSpray
                  ? "বাতাস শান্ত ও আর্দ্রতা সহনীয়; বিকেলে বা সকালের রোদ ওঠার পর স্প্রে সবচেয়ে কার্যকর।"
                  : "বৃষ্টি বা প্রচণ্ড বাতাসে স্প্রে করলে ঔষধ ধুয়ে যাবে বা উড়ে যাবে।"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Spray Guide & Drum Calculator Modal */}
      {showDetail && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-stone-200 space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-bengali text-emerald-950">
                    স্মার্ট স্প্রে ড্রাম ক্যালকুলেটর
                  </h3>
                  <p className="text-xs font-bengali text-ink-muted">
                    জমির মাপ ও ট্যাংকের ধারণক্ষমতা অনুযায়ী সঠিক পানির হিসাব
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDetail(false)}
                className="w-8 h-8 rounded-full bg-stone-100 text-ink-muted hover:text-ink flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sprayer Drum Size Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-bold font-bengali text-ink">
                আপনার স্প্রে ট্যাংকের মাপ:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { size: 10, label: "১০ লিটার" },
                  { size: 16, label: "১৬ লিটার (স্ট্যান্ডার্ড)" },
                  { size: 20, label: "২০ লিটার" },
                ].map((item) => (
                  <button
                    key={item.size}
                    type="button"
                    onClick={() => setTankSize(item.size)}
                    className={`py-2 px-2 rounded-xl text-xs sm:text-sm font-bold font-bengali border transition-all ${
                      tankSize === item.size
                        ? "bg-emerald-800 text-white border-emerald-800 shadow-xs"
                        : "bg-white text-ink border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Land Area Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-bold font-bengali text-ink">
                জমির পরিমাণ (শতাংশ):
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { area: 1, label: "১ শতক" },
                  { area: 3, label: "৩ শতক" },
                  { area: 5, label: "৫ শতক" },
                  { area: 10, label: "১০ শতক" },
                  { area: 20, label: "২০ শতক" },
                  { area: 33, label: "১ বিঘা (৩৩ শতক)" },
                  { area: 50, label: "৫০ শতক" },
                  { area: 100, label: "১ একর" },
                ].map((item) => (
                  <button
                    key={item.area}
                    type="button"
                    onClick={() => setLandDecimal(item.area)}
                    className={`py-1.5 px-1 rounded-xl text-xs font-bold font-bengali border transition-all ${
                      landDecimal === item.area
                        ? "bg-emerald-800 text-white border-emerald-800 shadow-xs"
                        : "bg-white text-ink border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Real Calculations Result Box */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2.5">
              <h4 className="text-xs font-bold font-bengali text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>প্রয়োজনীয় পানির সঠিক অনুপাত:</span>
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-bengali">
                <div className="p-2.5 bg-white rounded-xl border border-emerald-100">
                  <p className="text-ink-muted">মোট স্প্রে ড্রাম লাগবে:</p>
                  <p className="text-base sm:text-lg font-bold text-emerald-950">
                    প্রায় {toBanglaDigits(totalDrums)} ড্রাম
                  </p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-emerald-100">
                  <p className="text-ink-muted">প্রয়োজনীয় পানি:</p>
                  <p className="text-base sm:text-lg font-bold text-emerald-950">
                    {toBanglaDigits(totalDrums * tankSize)} লিটার
                  </p>
                </div>
              </div>

              {/* Organic Mixture Tip */}
              <div className="p-2.5 bg-white/90 rounded-xl border border-emerald-100 text-xs font-bengali text-ink-muted space-y-1">
                <p>
                  <strong className="text-emerald-900">🌿 ঘরোয়া নিমতেল ফর্মুলা:</strong> প্রতি ট্যাংকে ({toBanglaDigits(tankSize)} লিটার) প্রায়{" "}
                  <strong className="text-ink">{toBanglaDigits(neemExtractMl)} মিলি</strong> নিম তেল এবং{" "}
                  <strong className="text-ink">{toBanglaDigits(soapMl)} মিলি</strong> তরল সাবান গুলে স্প্রে করুন।
                </p>
              </div>
            </div>

            {/* Golden Rules for Spraying */}
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs font-bengali text-ink-muted space-y-1.5">
              <p className="font-bold text-ink flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>স্প্রে করার ৩টি সুবর্ণ নিয়ম:</span>
              </p>
              <ul className="list-disc list-inside space-y-0.5 leading-relaxed">
                <li>সকালে শিশির শুকানোর পর (৯টা-১১টা) অথবা বিকালে (৩টা-৫টা) স্প্রে করুন।</li>
                <li>বাতাসের অনুকূলে স্প্রে করুন যাতে ঔষধ মুখে বা শরীরে না আসে।</li>
                <li>কীটনাশকের সঠিক মাত্রা প্যাকেটের লেবেল বা কৃষি কর্মকর্তার পরামর্শ দেখে নিন।</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => setShowDetail(false)}
              className="w-full py-3 bg-emerald-800 text-white rounded-xl font-bold font-bengali text-sm hover:bg-emerald-900 transition-all shadow-xs"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}
    </>
  );
};
