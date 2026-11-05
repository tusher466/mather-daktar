import React from "react";
import { PhoneCall, MapPin } from "lucide-react";
import { OFFICIAL_CONTACTS } from "@/config/contacts";
import { STRINGS_BN } from "@/lib/strings.bn";

export const OfficerBox: React.FC = () => {
  const { krishiCallCenter, dae } = OFFICIAL_CONTACTS;

  return (
    <div className="bg-white border-2 border-primary/40 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary flex-shrink-0">
          <MapPin className="w-6 h-6" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-bengali text-primary">
          {STRINGS_BN.result.officerTitle}
        </h3>
      </div>

      <p className="text-lg font-bengali text-ink-muted leading-relaxed">
        {STRINGS_BN.result.officerDescription}
      </p>

      {/* Krishi Call Center Direct Call Button */}
      <a
        href={krishiCallCenter.callUrl}
        className="flex items-center justify-between p-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-sm transition-transform active:scale-98 select-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <PhoneCall className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bengali text-primary-light leading-tight">
              {krishiCallCenter.nameBn}
            </p>
            <p className="text-2xl font-bold font-bengali leading-none">
              {krishiCallCenter.displayNumberBn}
            </p>
          </div>
        </div>

        <span className="text-base font-bold font-bengali px-3 py-1 bg-white text-primary rounded-lg">
          কল করুন
        </span>
      </a>

      <p className="text-sm font-bengali text-ink-muted text-center">
        {krishiCallCenter.operatingHoursBn}
      </p>
    </div>
  );
};
