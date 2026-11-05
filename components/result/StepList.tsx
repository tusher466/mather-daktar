import React from "react";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";
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
      <section className="bg-white rounded-2xl border border-ground-border p-4 sm:p-5 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold font-bengali text-ink mb-2">
          {STRINGS_BN.result.sections.why}
        </h2>
        <p className="text-lg font-bengali text-ink-muted leading-relaxed">
          {whyBn}
        </p>
      </section>

      {/* 3. এখনই কী করবেন (Action steps - organic/cheapest first) */}
      <section className="bg-white rounded-2xl border border-ground-border p-4 sm:p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
          <h2 className="text-xl sm:text-2xl font-bold font-bengali text-ink">
            {STRINGS_BN.result.sections.actions}
          </h2>
        </div>
        <ol className="space-y-3">
          {actionsBn.map((action, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-primary-light text-primary font-bold font-bengali flex items-center justify-center flex-shrink-0 text-base mt-0.5">
                {toBanglaDigits(idx + 1)}
              </span>
              <p className="text-lg font-bengali text-ink leading-relaxed flex-1">
                {action}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* 4. কী করবেন না (Avoid mistakes) */}
      <section className="bg-white rounded-2xl border border-ground-border p-4 sm:p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <XCircle className="w-6 h-6 text-danger flex-shrink-0" />
          <h2 className="text-xl sm:text-2xl font-bold font-bengali text-ink">
            {STRINGS_BN.result.sections.avoid}
          </h2>
        </div>
        <ul className="space-y-2.5">
          {avoidBn.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-danger flex-shrink-0 mt-2.5" />
              <p className="text-lg font-bengali text-ink-muted leading-relaxed flex-1">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Optional: অন্যান্য সম্ভাব্য কারণ */}
      {possibleAlternativesBn && possibleAlternativesBn.length > 0 && (
        <section className="bg-white rounded-2xl border border-ground-border p-4 sm:p-5 shadow-sm">
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
                className="text-base font-bengali px-3 py-1 rounded-lg bg-ground text-ink-muted border border-ground-border"
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
