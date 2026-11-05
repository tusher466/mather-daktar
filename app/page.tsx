"use client";

import React from "react";
import { PageShell } from "@/components/layout/PageShell";
import { HeroIllustration } from "@/components/home/HeroIllustration";
import { WeatherSprayWidget } from "@/components/home/WeatherSprayWidget";
import { CropGrid } from "@/components/diagnose/CropGrid";
import { PhotoPicker } from "@/components/diagnose/PhotoPicker";
import { PhotoPreview } from "@/components/diagnose/PhotoPreview";
import { LoadingLeaf } from "@/components/diagnose/LoadingLeaf";
import { ErrorState } from "@/components/ui/ErrorState";
import { BangladeshCropMap } from "@/components/map/BangladeshCropMap";
import { CropFirstAidDrawer } from "@/components/home/CropFirstAidDrawer";
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
    clientMismatchInfo,
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

      <div className="space-y-4 pb-4">
        {/* Modern Graphic Hero Banner */}
        <HeroIllustration />

        {/* Live Weather & Smart Spray Suitability Widget with Popup Calculator */}
        <WeatherSprayWidget />

        {/* Error Message if any */}
        {errorMessage && (
          <ErrorState
            message={errorMessage}
            onRetry={imagePreviewUrl ? handleSubmitDiagnosis : undefined}
          />
        )}

        {/* Camera Permission Denied Warning */}
        {cameraDenied && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-ink font-bengali text-base shadow-xs animate-fade-in">
            <p className="font-bold mb-1 text-harvest">ক্যামেরা ব্যবহারের অনুমতি দেওয়া হয়নি</p>
            <p className="text-ink-muted leading-relaxed">
              {STRINGS_BN.errors.cameraDenied}
            </p>
          </div>
        )}

        {/* 1. Crop Selection Grid */}
        <section aria-label="ফসল নির্বাচন" className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-bold font-bengali text-ink-muted uppercase tracking-wider px-1">
            <span>ধাপ ১: আক্রান্ত ফসল নির্বাচন করুন</span>
          </div>
          <CropGrid
            selectedCropId={selectedCropId}
            customCropName={customCropName}
            onSelectCrop={handleSelectCrop}
            onCustomCropNameChange={setCustomCropName}
          />
        </section>

        {/* 2. Photo Capture / Gallery or Photo Preview */}
        <section aria-label="পাতার ছবি" className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-bold font-bengali text-ink-muted uppercase tracking-wider px-1">
            <span>ধাপ ২: আক্রান্ত অংশের ছবি দিন</span>
          </div>
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
              mismatchWarning={clientMismatchInfo?.reasonBn}
              detectedCropName={clientMismatchInfo?.detectedCropBn}
              detectedCropId={clientMismatchInfo?.detectedCropId}
              onSwitchCrop={handleSelectCrop}
            />
          )}
        </section>

        {/* 3. Bangladesh Crop Cultivation Map & Gardening Guide */}
        <section aria-label="বাংলাদেশ কৃষি মানচিত্র" className="pt-2">
          <BangladeshCropMap />
        </section>

        {/* 4. Plant Emergency First-Aid Guide */}
        <CropFirstAidDrawer />
      </div>
    </PageShell>
  );
}
