"use client";

import React, { useRef } from "react";
import { Camera, Image as ImageIcon, Sparkles, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { STRINGS_BN } from "@/lib/strings.bn";

interface PhotoPickerProps {
  onPhotoSelected: (file: File) => void;
  onCameraDenied?: () => void;
}

export const PhotoPicker: React.FC<PhotoPickerProps> = ({
  onPhotoSelected,
}) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoSelected(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* Modern photo tip banner */}
      <div className="flex items-center gap-3 p-3.5 bg-gradient-to-r from-amber-50/90 via-stone-50 to-emerald-50/50 border border-amber-200/70 rounded-2xl text-ink shadow-2xs">
        <div className="w-8 h-8 rounded-xl bg-harvest-light text-harvest flex items-center justify-center flex-shrink-0 shadow-2xs">
          <Sparkles className="w-4 h-4" />
        </div>
        <p className="text-base font-bengali leading-snug font-medium text-ink">
          {STRINGS_BN.diagnose.photoTip}
        </p>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Modern Capture Box with high-contrast dual buttons */}
      <div className="p-4 bg-white/90 border border-ground-border rounded-3xl shadow-sm space-y-3">
        <div className="flex items-center justify-center py-2 text-ink-muted">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-primary flex items-center justify-center mb-1">
              <UploadCloud className="w-6 h-6 stroke-[2]" />
            </div>
            <p className="text-xs font-bengali text-ink-muted font-semibold">
              ক্যামেরা দিয়ে ছবি তুলুন অথবা গ্যালারি থেকে সিলেক্ট করুন
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <Button
            type="button"
            variant="primary"
            size="large"
            icon={<Camera className="w-6 h-6 stroke-[2.2]" />}
            onClick={() => {
              if (cameraInputRef.current) {
                cameraInputRef.current.click();
              }
            }}
          >
            {STRINGS_BN.actions.takePhoto}
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="large"
            icon={<ImageIcon className="w-6 h-6 text-primary stroke-[2.2]" />}
            onClick={() => {
              if (galleryInputRef.current) {
                galleryInputRef.current.click();
              }
            }}
          >
            {STRINGS_BN.actions.choosePhoto}
          </Button>
        </div>
      </div>
    </div>
  );
};
