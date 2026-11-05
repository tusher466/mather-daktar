"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { VerdictCard } from "@/components/result/VerdictCard";
import { StepList } from "@/components/result/StepList";
import { SafetyBox } from "@/components/result/SafetyBox";
import { OfficerBox } from "@/components/result/OfficerBox";
import { ActionBar } from "@/components/result/ActionBar";
import { ShareNotification } from "@/components/result/ShareCard";
import { Button } from "@/components/ui/Button";
import { getDiagnosisById } from "@/lib/storage/history";
import { shareDiagnosis, ShareResult } from "@/lib/share/share";
import { useSpeech } from "@/hooks/useSpeech";
import { DiagnosisResult } from "@/types";
import { STRINGS_BN } from "@/lib/strings.bn";
import { AlertCircle, Camera, ChevronLeft, AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const [shareResult, setShareResult] = useState<ShareResult | null>(null);

  const { canSpeak, isSpeaking, speak, stopSpeaking } = useSpeech();

  useEffect(() => {
    if (!id) return;
    const found = getDiagnosisById(id);
    setDiagnosis(found);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <PageShell showTabs={false}>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-xl font-bold font-bengali text-ink-muted">লোড হচ্ছে...</p>
        </div>
      </PageShell>
    );
  }

  // Not found in localStorage
  if (!diagnosis) {
    return (
      <PageShell showTabs={false}>
        <div className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-2xl border border-ground-border mt-8">
          <p className="text-xl font-bold font-bengali text-ink mb-2">
            ফলাফল পাওয়া যায়নি
          </p>
          <p className="text-base font-bengali text-ink-muted mb-6">
            হয়তো রেকর্ডটি মুছে ফেলা হয়েছে অথবা ব্রাউজারের হিস্ট্রি পরিবর্তন হয়েছে।
          </p>
          <Link href="/">
            <Button variant="primary" fullWidth={false} className="px-8">
              নতুন ছবি তুলুন
            </Button>
          </Link>
        </div>
      </PageShell>
    );
  }

  // 1. Crop Category Mismatch State (Selected crop does not match the image)
  const isMismatch = diagnosis.cropMatched === false;
  if (isMismatch) {
    return (
      <PageShell showTabs={false}>
        <div className="space-y-6 pt-4 animate-fade-in max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 text-center space-y-5 shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center shadow-inner">
              <AlertTriangle className="w-9 h-9 text-amber-700" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-900 border border-red-200 text-xs font-bold font-bengali mb-2">
                ক্যাটাগরি ও ছবির অমিল
              </span>
              <h1 className="text-2xl sm:text-3xl font-black font-bengali text-emerald-950">
                নির্বাচিত ফসল ও আপলোডকৃত ছবি মিলছে না!
              </h1>
            </div>

            {/* Comparison Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left font-bengali">
              <div className="p-3.5 bg-red-50/80 rounded-2xl border border-red-200">
                <span className="text-[11px] font-bold text-red-700 block uppercase tracking-wide">
                  ধাপ ১ এ আপনার নির্বাচিত ফসল:
                </span>
                <p className="text-base sm:text-lg font-black text-red-950 mt-1">
                  {diagnosis.cropBn || diagnosis.crop}
                </p>
              </div>

              <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200">
                <span className="text-[11px] font-bold text-amber-800 block uppercase tracking-wide">
                  ছবিতে শনাক্তকৃত আসল উদ্ভিদ:
                </span>
                <p className="text-base sm:text-lg font-black text-amber-950 mt-1">
                  {diagnosis.detectedCropBn || "ভিন্ন কোনো ফসল / অজানা"}
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base font-bengali text-ink leading-relaxed">
              {diagnosis.retakeReason ||
                "আপনি যে ফসলটি নির্বাচন করেছেন এবং যে ছবি আপলোড করেছেন তাদের মধ্যে স্পষ্ট অমিল রয়েছে। ভুল চিকিৎসা বা রাসায়নিকের অপপ্রয়োগ রোধে অনুগ্রহ করে সঠিক ফসল বেছে নিন অথবা নির্বাচিত ফসলের ছবি তুলুন।"}
            </p>

            {diagnosis.thumbnailBase64 && (
              <div className="w-32 h-32 rounded-2xl overflow-hidden mx-auto border-2 border-amber-200 shadow-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={diagnosis.thumbnailBase64}
                  alt="আপলোডকৃত ছবি"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                size="large"
                icon={<Camera className="w-5 h-5" />}
                onClick={() => router.push("/")}
              >
                সঠিক ছবি আপলোড করুন
              </Button>
              <Button
                variant="secondary"
                size="large"
                icon={<RefreshCw className="w-4 h-4" />}
                onClick={() => router.push("/")}
              >
                ফসল পরিবর্তন করুন
              </Button>
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  // 2. Retake State: Image is not a plant, blurry, or poor quality (Section 7.3)
  const isRetake = !diagnosis.isPlant || diagnosis.imageQuality === "poor";
  if (isRetake) {
    return (
      <PageShell showTabs={false}>
        <div className="space-y-6 pt-4 animate-fade-in">
          <div className="bg-white rounded-2xl border-2 border-harvest-border p-6 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-harvest-light text-harvest mx-auto flex items-center justify-center">
              <AlertCircle className="w-9 h-9" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-bengali text-ink">
              {STRINGS_BN.result.retakeTitle}
            </h1>

            <p className="text-lg font-bengali text-ink leading-relaxed">
              {diagnosis.retakeReason || STRINGS_BN.result.retakeSubtitle}
            </p>

            {diagnosis.thumbnailBase64 && (
              <div className="w-32 h-32 rounded-xl overflow-hidden mx-auto border border-ground-border opacity-75">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={diagnosis.thumbnailBase64}
                  alt="অস্পষ্ট ছবি"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="pt-2">
              <Button
                variant="primary"
                size="large"
                icon={<Camera className="w-6 h-6" />}
                onClick={() => router.push("/")}
              >
                {STRINGS_BN.actions.retake}
              </Button>
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  // Handle read-aloud toggle
  const handleToggleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const speechText = `${diagnosis.cropBn} ফসলের সমস্যা: ${
        diagnosis.problemNameBn
      }। কারণ: ${diagnosis.whyBn}। প্রধান করণীয় কাজ: ${diagnosis.actionsBn
        .slice(0, 3)
        .join("। ")}। ${
        diagnosis.chemicalMentioned
          ? STRINGS_BN.result.safetyBoxPesticideAdvice
          : ""
      }`;
      speak(speechText);
    }
  };

  // Handle Share Card
  const handleShare = async () => {
    setIsSharing(true);
    try {
      const result = await shareDiagnosis(diagnosis);
      setShareResult(result);
    } catch (e) {
      console.error("Failed to share diagnosis:", e);
    } finally {
      setIsSharing(false);
    }
  };

  // Handle ask about this (Navigate to /ask with context)
  const handleAsk = () => {
    router.push(`/ask?from=${diagnosis.id}`);
  };

  const shouldShowOfficerBox =
    diagnosis.severity === "high" ||
    diagnosis.confidence === "low" ||
    diagnosis.contactOfficer;

  return (
    <PageShell showTabs={false}>
      <div className="space-y-4 pb-20 animate-fade-in">
        {/* Back Link to Home */}
        <div className="pt-1">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-base font-bold font-bengali text-primary hover:text-primary-dark"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>হোমে ফিরে যান</span>
          </Link>
        </div>

        {/* 1. Verdict Card (Photo, problem name, colored confidence bar) */}
        <VerdictCard
          cropBn={diagnosis.cropBn || diagnosis.crop}
          problemNameBn={diagnosis.problemNameBn}
          confidence={diagnosis.confidence}
          severity={diagnosis.severity}
          thumbnailBase64={diagnosis.thumbnailBase64}
        />

        {/* 2, 3, 4. কেন হয়েছে, এখনই কী করবেন, কী করবেন না */}
        <StepList
          whyBn={diagnosis.whyBn}
          actionsBn={diagnosis.actionsBn}
          avoidBn={diagnosis.avoidBn}
          possibleAlternativesBn={diagnosis.possibleAlternativesBn}
        />

        {/* 5. Safety box (amber) */}
        <SafetyBox chemicalMentioned={diagnosis.chemicalMentioned} />

        {/* 6. Officer box (when severity is high or confidence low) */}
        {shouldShowOfficerBox && <OfficerBox />}
      </div>

      {/* Share Toast/Notification */}
      <ShareNotification
        shareResult={shareResult}
        onClose={() => setShareResult(null)}
      />

      {/* 7. Sticky Bottom Action Bar (3 buttons: শুনুন, শেয়ার করুন, প্রশ্ন করুন) */}
      <ActionBar
        canSpeak={canSpeak}
        isSpeaking={isSpeaking}
        onToggleSpeak={handleToggleSpeak}
        onShare={handleShare}
        isSharing={isSharing}
        onAsk={handleAsk}
      />
    </PageShell>
  );
}
