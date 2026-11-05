import React from "react";
import { AlertTriangle, CheckCircle2, ShieldAlert, Sparkles } from "lucide-react";
import { SeasonRisk, SeasonTask } from "@/types";
import { STRINGS_BN } from "@/lib/strings.bn";

interface SeasonCardProps {
  risks: SeasonRisk[];
  tasks: SeasonTask[];
}

export const SeasonCard: React.FC<SeasonCardProps> = ({ risks, tasks }) => {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* 1. এই মাসে সাবধান (Risks) */}
      <section className="bg-gradient-to-br from-white via-white to-amber-50/40 rounded-3xl border border-amber-200/80 p-5 shadow-xs space-y-3.5">
        <div className="flex items-center gap-2.5 text-harvest">
          <div className="w-8 h-8 rounded-xl bg-amber-100/90 text-amber-800 flex items-center justify-center flex-shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-bengali text-amber-950">
              {STRINGS_BN.season.risksTitle}
            </h2>
            <p className="text-xs font-bengali text-ink-muted">চলতি আবহাওয়ায় সম্ভাব্য প্রধান ৩টি ঝুঁকি</p>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          {risks.map((risk, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white border border-amber-200/60 shadow-2xs space-y-1"
            >
              <h3 className="text-base sm:text-lg font-bold font-bengali text-ink flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-harvest" />
                <span>{risk.titleBn}</span>
              </h3>
              <p className="text-sm sm:text-base font-bengali text-ink-muted leading-relaxed pl-4">
                {risk.descBn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. এই মাসে করণীয় (Tasks) */}
      <section className="bg-gradient-to-br from-white via-white to-emerald-50/40 rounded-3xl border border-emerald-200/80 p-5 shadow-xs space-y-3.5">
        <div className="flex items-center gap-2.5 text-primary">
          <div className="w-8 h-8 rounded-xl bg-emerald-100/90 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-bengali text-emerald-950">
              {STRINGS_BN.season.tasksTitle}
            </h2>
            <p className="text-xs font-bengali text-ink-muted">ফলন ভালো রাখতে কৃষকের করণীয় কাজ</p>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          {tasks.map((task, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white border border-emerald-200/60 shadow-2xs space-y-1"
            >
              <h3 className="text-base sm:text-lg font-bold font-bengali text-ink flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>{task.titleBn}</span>
              </h3>
              <p className="text-sm sm:text-base font-bengali text-ink-muted leading-relaxed pl-4">
                {task.descBn}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
