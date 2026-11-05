"use client";

import React, { useRef } from "react";
import { Camera, Image as ImageIcon, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { STRINGS_BN } from "@/lib/strings.bn";

interface PhotoPickerProps {
  onPhotoSelected: (file: File) => void;
  onCameraDenied?: () => void;
}

export const PhotoPicker: React.FC<PhotoPickerProps> = ({
  onPhotoSelected,
  onCameraDenied,
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
      {/* Photo taking tip */}
      <div className="flex items-center gap-2.5 p-3.5 bg-ground border border-ground-border rounded-xl text-ink-muted">
        <Info className="w-5 h-5 text-primary flex-shrink-0" />
        <p className="text-base font-bengali leading-snug">
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

      {/* Two large buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <Button
          type="button"
          variant="primary"
          size="large"
          icon={<Camera className="w-6 h-6" />}
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
          icon={<ImageIcon className="w-6 h-6 text-primary" />}
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
  );
};
