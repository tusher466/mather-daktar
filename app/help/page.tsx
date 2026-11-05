"use client";

import React from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { ChevronLeft, Sprout, Camera, Volume2, ShieldCheck, PhoneCall } from "lucide-react";
import { OFFICIAL_CONTACTS } from "@/config/contacts";
import { STRINGS_BN } from "@/lib/strings.bn";

export default function HelpPage() {
  const steps = [
    {
      numBn: "১",
      title: STRINGS_BN.help.step1Title,
      desc: STRINGS_BN.help.step1Desc,
      icon: Sprout,
    },
    {
      numBn: "২",
      title: STRINGS_BN.help.step2Title,
      desc: STRINGS_BN.help.step2Desc,
      icon: Camera,
    },
    {
      numBn: "৩",
      title: STRINGS_BN.help.step3Title,
      desc: STRINGS_BN.help.step3Desc,
      icon: Volume2,
    },
  ];

  return (
    <PageShell showTabs={true}>
      <div className="space-y-6 pb-12 animate-fade-in">
        {/* Back navigation */}
        <div className="pt-1">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-base font-bold font-bengali text-primary hover:text-primary-dark"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>হোমে ফিরে যান</span>
          </Link>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-bengali text-ink">
            {STRINGS_BN.help.title}
          </h1>
          <p className="text-base font-bengali text-ink-muted mt-1">
            সহজ ৩টি ধাপে আপনার ফসলের রোগ নির্ণয় করুন
          </p>
        </div>

        {/* 3 Big Numbered Steps with Line-Art Icons */}
        <div className="space-y-4">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.numBn}
                className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-ground-border shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold font-bengali text-ink mb-1">
                    {step.title}
                  </h3>
                  <p className="text-base font-bengali text-ink-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Privacy Note */}
        <div className="flex items-center gap-3 p-4 bg-ground-surface border border-ground-border rounded-2xl text-ink">
          <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0" />
          <p className="text-base font-bengali font-semibold leading-relaxed">
            {STRINGS_BN.help.privacyBadge}
          </p>
        </div>

        {/* কখন অফিসারের কাছে যাবেন Note */}
        <div className="p-5 bg-harvest-light border border-harvest-border rounded-2xl space-y-2">
          <h3 className="text-xl font-bold font-bengali text-ink">
            {STRINGS_BN.help.officerGuidanceTitle}
          </h3>
          <p className="text-base font-bengali text-ink-muted leading-relaxed">
            {STRINGS_BN.help.officerGuidanceDesc}
          </p>
        </div>

        {/* Emergency Call Center */}
        <div className="p-4 bg-white rounded-2xl border border-ground-border shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bengali text-ink-muted">
                {OFFICIAL_CONTACTS.krishiCallCenter.nameBn}
              </p>
              <p className="text-xl font-bold font-bengali text-primary leading-tight">
                {OFFICIAL_CONTACTS.krishiCallCenter.displayNumberBn}
              </p>
            </div>
          </div>
          <a
            href={OFFICIAL_CONTACTS.krishiCallCenter.callUrl}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold font-bengali text-sm shadow-sm"
          >
            কল করুন
          </a>
        </div>
      </div>
    </PageShell>
  );
}
