"use client";

import React from "react";
import { PageShell } from "@/components/layout/PageShell";
import { CropGrid } from "@/components/diagnose/CropGrid";
import { PhotoPicker } from "@/components/diagnose/PhotoPicker";
import { PhotoPreview } from "@/components/diagnose/PhotoPreview";
import { LoadingLeaf } from "@/components/diagnose/LoadingLeaf";
import { ErrorState } from "@/components/ui/ErrorState";
import { useDiagnose } from "@/hooks/useDiagnose";
import { STRINGS_BN } from "@/lib/strings.bn";

export default function DoctorPage() {
  const {
    selectedCropId,
    customCropName,
    setCustomCropName,
    handleSelectCrop,
    imagePreviewUrl,
    handleImageSelected,
    handleResetPhoto,
    showNoteField,
    setShowNoteField,
    userNote,
    setUserNote,
    isLoading,
    isSlowLoading,
    errorMessage,
    cameraDenied,
    handleSubmitDiagnosis,
  } = useDiagnose();

  return (
    <PageShell>
      {/* Calm full-screen loading state */}
      {isLoading && <LoadingLeaf isSlow={isSlowLoading} />}

      <div className="space-y-6">
        {/* Main Heading */}
        <div className="pt-2">
          <h1 className="text-2xl sm:text-3xl font-black font-bengali text-ink leading-tight">
            {STRINGS_BN.diagnose.heading}
          </h1>
          <p className="text-base font-bengali text-ink-muted mt-1">
            প্রথমে ফসল বেছে নিন, তারপর আক্রান্ত পাতার ছবি তুলুন।
          </p>
        </div>

        {/* Error Message if any */}
        {errorMessage && (
          <ErrorState
            message={errorMessage}
            onRetry={imagePreviewUrl ? handleSubmitDiagnosis : undefined}
          />
        )}

        {/* Camera Permission Denied Warning */}
        {cameraDenied && (
          <div className="p-4 bg-harvest-light border border-harvest-border rounded-2xl text-ink font-bengali text-base">
            <p className="font-bold mb-1">ক্যামেরা ব্যবহারের অনুমতি দেওয়া হয়নি</p>
            <p className="text-ink-muted leading-relaxed">
              {STRINGS_BN.errors.cameraDenied}
            </p>
          </div>
        )}

        {/* 1. Crop Selection Grid */}
        <section aria-label="ফসল নির্বাচন">
          <CropGrid
            selectedCropId={selectedCropId}
            customCropName={customCropName}
            onSelectCrop={handleSelectCrop}
            onCustomCropNameChange={setCustomCropName}
          />
        </section>

        {/* 2. Photo Capture / Gallery or Photo Preview */}
        <section aria-label="পাতার ছবি">
          {!imagePreviewUrl ? (
            <PhotoPicker onPhotoSelected={handleImageSelected} />
          ) : (
            <PhotoPreview
              previewUrl={imagePreviewUrl}
              onRetake={handleResetPhoto}
              onSubmit={handleSubmitDiagnosis}
              isLoading={isLoading}
              showNoteField={showNoteField}
              onToggleNoteField={() => setShowNoteField(!showNoteField)}
              userNote={userNote}
              onUserNoteChange={setUserNote}
            />
          )}
        </section>
      </div>
    </PageShell>
  );
}
