import React from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { STRINGS_BN } from "@/lib/strings.bn";

interface SafetyBoxProps {
  chemicalMentioned: boolean;
}

export const SafetyBox: React.FC<SafetyBoxProps> = ({ chemicalMentioned }) => {
  return (
    <div className="bg-gradient-to-br from-amber-50/90 to-amber-100/50 border border-amber-200/80 rounded-3xl p-5 shadow-xs space-y-3">
      <div className="flex items-center gap-2.5 text-[#945B00]">
        <div className="w-8 h-8 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-4 h-4 text-harvest" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-bengali text-amber-900">
          {STRINGS_BN.result.safetyBoxTitle}
        </h3>
      </div>

      {chemicalMentioned && (
        <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/60 border border-amber-200/50">
          <ShieldCheck className="w-5 h-5 flex-shrink-0 text-harvest mt-0.5" />
          <p className="text-base sm:text-lg font-bengali text-ink leading-relaxed">
            {STRINGS_BN.result.safetyGearWarning}
          </p>
        </div>
      )}

      {/* Mandatory safety line */}
      <div className="p-3.5 bg-white rounded-2xl border border-amber-200 shadow-2xs">
        <p className="text-base sm:text-lg font-bold font-bengali text-ink leading-snug">
          {STRINGS_BN.result.safetyBoxPesticideAdvice}
        </p>
      </div>
    </div>
  );
};
