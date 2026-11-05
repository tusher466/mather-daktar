import React from "react";
import { CheckCircle2, XCircle, HelpCircle, Lightbulb } from "lucide-react";
import { toBanglaDigits } from "@/lib/bangla/digits";
import { STRINGS_BN } from "@/lib/strings.bn";

interface StepListProps {
  whyBn: string;
  actionsBn: string[];
  avoidBn: string[];
  possibleAlternativesBn?: string[];
}

export const StepList: React.FC<StepListProps> = ({
  whyBn,
  actionsBn,
  avoidBn,
  possibleAlternativesBn,
}) => {
  return (
    <div className="space-y-4">
      {/* 2. কেন হয়েছে (Why) */}
      <section className="bg-white rounded-3xl border border-ground-border p-5 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-harvest">
          <Lightbulb className="w-5 h-5 flex-shrink-0" />
          <h2 className="text-xl sm:text-2xl font-bold font-bengali text-ink">
            {STRINGS_BN.result.sections.why}
          </h2>
        </div>
        <p className="text-base sm:text-lg font-bengali text-ink-muted leading-relaxed">
          {whyBn}
        </p>
      </section>

      {/* 3. এখনই কী করবেন (Action steps - organic/cheapest first) */}
      <section className="bg-white rounded-3xl border border-ground-border p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-primary">
          <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
          <h2 className="text-xl sm:text-2xl font-bold font-bengali text-ink">
            {STRINGS_BN.result.sections.actions}
          </h2>
        </div>
        <ol className="space-y-3 pt-1">
          {actionsBn.map((action, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50/40 border border-emerald-100/60"
            >
              <span className="w-7 h-7 rounded-xl bg-primary text-white font-bold font-bengali flex items-center justify-center flex-shrink-0 text-sm mt-0.5 shadow-2xs">
                {toBanglaDigits(idx + 1)}
              </span>
              <p className="text-base sm:text-lg font-bengali text-ink leading-relaxed flex-1">
                {action}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* 4. কী করবেন না (Avoid mistakes) */}
      <section className="bg-white rounded-3xl border border-ground-border p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-danger">
          <XCircle className="w-6 h-6 flex-shrink-0" />
          <h2 className="text-xl sm:text-2xl font-bold font-bengali text-ink">
            {STRINGS_BN.result.sections.avoid}
          </h2>
        </div>
        <ul className="space-y-2.5 pt-1">
          {avoidBn.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 p-3 rounded-2xl bg-red-50/30 border border-red-100/60"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-danger flex-shrink-0 mt-2" />
              <p className="text-base sm:text-lg font-bengali text-ink-muted leading-relaxed flex-1">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Optional: অন্যান্য সম্ভাব্য কারণ */}
      {possibleAlternativesBn && possibleAlternativesBn.length > 0 && (
        <section className="bg-white rounded-3xl border border-ground-border p-5 shadow-xs space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-5 h-5 text-ink-muted flex-shrink-0" />
            <h3 className="text-lg sm:text-xl font-bold font-bengali text-ink">
              {STRINGS_BN.result.sections.alternatives}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {possibleAlternativesBn.map((alt, idx) => (
              <span
                key={idx}
                className="text-sm sm:text-base font-bengali px-3 py-1 rounded-xl bg-ground text-ink-muted border border-ground-border"
              >
                {alt}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
