"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { HistoryItem } from "@/components/history/HistoryItem";
import { EmptyState } from "@/components/ui/EmptyState";
import { Dialog } from "@/components/ui/Dialog";
import { getDiagnosisHistory, deleteDiagnosis } from "@/lib/storage/history";
import { DiagnosisResult } from "@/types";
import { STRINGS_BN } from "@/lib/strings.bn";
import { Sprout } from "lucide-react";

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

  return (
    <PageShell>
      <div className="space-y-4 animate-fade-in pb-12">
        {/* Title */}
        <div className="pt-1">
          <h1 className="text-2xl sm:text-3xl font-black font-bengali text-ink">
            {STRINGS_BN.history.title}
          </h1>
          <p className="text-base font-bengali text-ink-muted">
            {STRINGS_BN.history.subtitle}
          </p>
        </div>

        {/* Empty State */}
        {isLoaded && history.length === 0 && (
          <EmptyState
            title={STRINGS_BN.history.emptyTitle}
            description={STRINGS_BN.history.emptySubtitle}
            actionLabel={STRINGS_BN.history.startDiagnose}
            icon={<Sprout className="w-8 h-8 text-primary" />}
            onAction={() => router.push("/")}
          />
        )}

        {/* List of past diagnoses */}
        {history.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-bengali text-ink-muted">
              {STRINGS_BN.history.maxLimitNotice}
            </p>
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
