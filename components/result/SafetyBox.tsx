import React from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { STRINGS_BN } from "@/lib/strings.bn";

interface SafetyBoxProps {
  chemicalMentioned: boolean;
}

export const SafetyBox: React.FC<SafetyBoxProps> = ({ chemicalMentioned }) => {
  return (
    <div className="bg-harvest-light border border-harvest-border rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
      <div className="flex items-center gap-2.5 text-[#945B00]">
        <AlertTriangle className="w-6 h-6 flex-shrink-0 text-harvest" />
        <h3 className="text-xl sm:text-2xl font-bold font-bengali">
          {STRINGS_BN.result.safetyBoxTitle}
        </h3>
      </div>

      {chemicalMentioned && (
        <div className="flex items-start gap-2.5 pt-1">
          <ShieldCheck className="w-5 h-5 flex-shrink-0 text-harvest mt-1" />
          <p className="text-lg font-bengali text-ink leading-relaxed">
            {STRINGS_BN.result.safetyGearWarning}
          </p>
        </div>
      )}

      {/* Mandatory safety line */}
      <div className="p-3 bg-white/70 rounded-xl border border-harvest-border/60">
        <p className="text-lg font-bold font-bengali text-ink leading-snug">
          {STRINGS_BN.result.safetyBoxPesticideAdvice}
        </p>
      </div>
    </div>
  );
};
