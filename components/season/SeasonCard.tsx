import React from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { SeasonRisk, SeasonTask } from "@/types";
import { STRINGS_BN } from "@/lib/strings.bn";

interface SeasonCardProps {
  risks: SeasonRisk[];
  tasks: SeasonTask[];
}

export const SeasonCard: React.FC<SeasonCardProps> = ({ risks, tasks }) => {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* 1. এই মাসে সাবধান (Risks) */}
      <section className="bg-white rounded-2xl border border-ground-border p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-harvest">
          <AlertTriangle className="w-6 h-6 flex-shrink-0" />
          <h2 className="text-xl sm:text-2xl font-bold font-bengali text-ink">
            {STRINGS_BN.season.risksTitle}
          </h2>
        </div>

        <div className="space-y-3 pt-1">
          {risks.map((risk, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-harvest-light/60 border border-harvest-border/50"
            >
              <h3 className="text-lg font-bold font-bengali text-ink mb-1">
                {risk.titleBn}
              </h3>
              <p className="text-base font-bengali text-ink-muted leading-relaxed">
                {risk.descBn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. এই মাসে করণীয় (Tasks) */}
      <section className="bg-white rounded-2xl border border-ground-border p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-primary">
          <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
          <h2 className="text-xl sm:text-2xl font-bold font-bengali text-ink">
            {STRINGS_BN.season.tasksTitle}
          </h2>
        </div>

        <div className="space-y-3 pt-1">
          {tasks.map((task, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-primary-light/50 border border-primary/20"
            >
              <h3 className="text-lg font-bold font-bengali text-ink mb-1">
                {task.titleBn}
              </h3>
              <p className="text-base font-bengali text-ink-muted leading-relaxed">
                {task.descBn}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
