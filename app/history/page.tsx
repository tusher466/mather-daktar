"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { HistoryItem } from "@/components/history/HistoryItem";
import { EmptyState } from "@/components/ui/EmptyState";
import { Dialog } from "@/components/ui/Dialog";
import { getDiagnosisHistory, deleteDiagnosis, saveDiagnosis, INITIAL_SAMPLE_RECORDS } from "@/lib/storage/history";
import { DiagnosisResult } from "@/types";
import { STRINGS_BN } from "@/lib/strings.bn";
import { Sprout, RotateCcw, PlusCircle } from "lucide-react";

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<DiagnosisResult[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<DiagnosisResult | null>(null);

  useEffect(() => {
    const list = getDiagnosisHistory();
    setHistory(list);
    setIsLoaded(true);
  }, []);

  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;
    deleteDiagnosis(itemToDelete.id);
    setHistory((prev) => prev.filter((item) => item.id !== itemToDelete.id));
    setItemToDelete(null);
  };

  const handleRestoreSamples = () => {
    INITIAL_SAMPLE_RECORDS.forEach((rec) => saveDiagnosis(rec));
    setHistory(getDiagnosisHistory());
  };

  return (
    <PageShell>
      <div className="space-y-4 animate-fade-in pb-12">
        {/* Header */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-bengali text-ink">
              {STRINGS_BN.history.title}
            </h1>
            <p className="text-sm sm:text-base font-bengali text-ink-muted">
              পূর্বের সংরক্ষিত উদ্ভিদ স্বাস্থ্য পরীক্ষার তালিকা
            </p>
          </div>

          {history.length > 0 && (
            <button
              type="button"
              onClick={handleRestoreSamples}
              title="নমুনা রেকর্ড রিলোড করুন"
              className="flex items-center gap-1.5 text-xs font-bold font-bengali text-primary hover:text-emerald-800 bg-white px-3 py-1.5 rounded-xl border border-ground-border shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>নমুনা রেকর্ড</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {isLoaded && history.length === 0 && (
          <div className="space-y-3">
            <EmptyState
              title={STRINGS_BN.history.emptyTitle}
              description={STRINGS_BN.history.emptySubtitle}
              actionLabel={STRINGS_BN.history.startDiagnose}
              icon={<Sprout className="w-8 h-8 text-primary" />}
              onAction={() => router.push("/")}
            />
            <button
              type="button"
              onClick={handleRestoreSamples}
              className="w-full py-3 bg-white border border-dashed border-primary text-primary font-bold font-bengali rounded-2xl hover:bg-emerald-50 text-sm"
            >
              নমুনা রেকর্ড লোড করুন
            </button>
          </div>
        )}

        {/* List of past diagnoses */}
        {history.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bengali text-ink-muted px-1">
              <span>মোট সংরক্ষিত রেকর্ড: {history.length} টি (সর্বোচ্চ ৩০টি)</span>
            </div>
            {history.map((diag) => (
              <HistoryItem
                key={diag.id}
                diagnosis={diag}
                onDeleteRequest={(item) => setItemToDelete(item)}
              />
            ))}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          isOpen={!!itemToDelete}
          title={STRINGS_BN.history.deleteConfirmTitle}
          description={`আপনি কি নিশ্চিতভাবে "${itemToDelete?.cropBn || itemToDelete?.crop}" ফসলের "${itemToDelete?.problemNameBn}" রেকর্ডটি মুছে ফেলতে চান?`}
          confirmLabel={STRINGS_BN.actions.delete}
          cancelLabel={STRINGS_BN.actions.cancel}
          isDestructive={true}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setItemToDelete(null)}
        />
      </div>
    </PageShell>
  );
}
