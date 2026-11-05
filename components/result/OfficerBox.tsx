import React from "react";
import { PhoneCall, MapPin } from "lucide-react";
import { OFFICIAL_CONTACTS } from "@/config/contacts";
import { STRINGS_BN } from "@/lib/strings.bn";

export const OfficerBox: React.FC = () => {
  const { krishiCallCenter } = OFFICIAL_CONTACTS;

  return (
    <div className="bg-gradient-to-br from-white via-white to-emerald-50/70 border-2 border-emerald-600/40 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-emerald-100/80 text-primary flex items-center justify-center flex-shrink-0 shadow-2xs">
          <MapPin className="w-5 h-5" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-bengali text-emerald-950">
          {STRINGS_BN.result.officerTitle}
        </h3>
      </div>

      <p className="text-base sm:text-lg font-bengali text-ink-muted leading-relaxed">
        {STRINGS_BN.result.officerDescription}
      </p>

      {/* Krishi Call Center Direct Call Button */}
      <a
        href={krishiCallCenter.callUrl}
        className="flex items-center justify-between p-4 bg-gradient-to-r from-[#1E6B39] to-[#145328] hover:from-[#257E44] hover:to-[#175C2D] text-white rounded-2xl shadow-md shadow-emerald-950/20 transition-all active:scale-98 select-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
            <PhoneCall className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-bengali text-emerald-200 font-semibold leading-tight">
              {krishiCallCenter.nameBn}
            </p>
            <p className="text-2xl font-black font-bengali leading-none mt-0.5">
              {krishiCallCenter.displayNumberBn}
            </p>
          </div>
        </div>

        <span className="text-sm font-bold font-bengali px-3.5 py-1.5 bg-white text-emerald-800 rounded-xl shadow-xs">
          সরাসরি কল করুন
        </span>
      </a>

      <p className="text-xs font-bengali text-ink-muted text-center font-medium">
        {krishiCallCenter.operatingHoursBn}
      </p>
    </div>
  );
};
