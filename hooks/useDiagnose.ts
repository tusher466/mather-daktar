"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getSavedCrop, saveCropPreference } from "@/lib/storage/preferences";
import { compressImageForUpload, createThumbnail } from "@/lib/image/compress";
import { validateImageFile } from "@/lib/image/validate";
import { saveDiagnosis } from "@/lib/storage/history";
import { CROPS, getCropById } from "@/config/crops";
import { DiagnosisResult } from "@/types";
import { STRINGS_BN } from "@/lib/strings.bn";

export function useDiagnose() {
  const router = useRouter();

  // Selected crop ID and custom name for "other"
  const [selectedCropId, setSelectedCropId] = useState<string>("rice");
  const [customCropName, setCustomCropName] = useState<string>("");

  // Photo state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [compressedBase64, setCompressedBase64] = useState<string | null>(null);

  // Optional note
  const [showNoteField, setShowNoteField] = useState<boolean>(false);
  const [userNote, setUserNote] = useState<string>("");

  // Loading & Slow states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSlowLoading, setIsSlowLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Permission denied state for camera
  const [cameraDenied, setCameraDenied] = useState<boolean>(false);

  const slowTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load saved crop from localStorage on mount
  useEffect(() => {
    const saved = getSavedCrop();
    setSelectedCropId(saved);
  }, []);

  const handleSelectCrop = (cropId: string) => {
    setSelectedCropId(cropId);
    saveCropPreference(cropId);
  };

  const handleImageSelected = async (file: File) => {
    setErrorMessage(null);
    setCameraDenied(false);

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setErrorMessage(validation.errorMessageBn || STRINGS_BN.errors.invalidImage);
      return;
    }

    try {
      setImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreviewUrl(objectUrl);

      // Compress client side
      const compressed = await compressImageForUpload(file, 1024, 0.8);
      setCompressedBase64(compressed.base64);
    } catch (e) {
      console.error("Compression error:", e);
      setErrorMessage("ছবি প্রসেসিং করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  const handleResetPhoto = () => {
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    setImageFile(null);
    setImagePreviewUrl(null);
    setCompressedBase64(null);
    setErrorMessage(null);
  };

  const handleSubmitDiagnosis = async () => {
    if (!compressedBase64) {
      setErrorMessage("অনুগ্রহ করে প্রথমে একটি স্পষ্ট পাতার ছবি তুলুন।");
      return;
    }

    setIsLoading(true);
    setIsSlowLoading(false);
    setErrorMessage(null);

    // If loading takes more than 15 seconds, show slow message
    slowTimerRef.current = setTimeout(() => {
      setIsSlowLoading(true);
    }, 15000);

    try {
      const activeCrop = getCropById(selectedCropId);
      const cropNameBn =
        selectedCropId === "other" && customCropName.trim()
          ? customCropName.trim()
          : activeCrop.nameBn;

      const response = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop: cropNameBn,
          imageBase64: compressedBase64,
          mimeType: "image/jpeg",
          note: userNote.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        throw new Error(errorJson.messageBn || STRINGS_BN.errors.serverError);
      }

      const diagnosisData = await response.json();

      // Create thumbnail for local storage
      const thumbnailBase64 = await createThumbnail(compressedBase64, 320);

      // Build complete DiagnosisResult object
      const fullDiagnosis: DiagnosisResult = {
        ...diagnosisData,
        id: `diag_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        timestamp: Date.now(),
        crop: selectedCropId,
        cropBn: cropNameBn,
        thumbnailBase64,
        userNote: userNote.trim() || undefined,
      };

      // Save to localStorage history
      saveDiagnosis(fullDiagnosis);

      // Clean up slow timer
      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);

      // Navigate to /result/[id]
      router.push(`/result/${fullDiagnosis.id}`);
    } catch (err: any) {
      console.error("Diagnosis request failed:", err);
      setErrorMessage(err.message || STRINGS_BN.errors.serverError);
    } finally {
      setIsLoading(false);
      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    }
  };

  return {
    selectedCropId,
    customCropName,
    setCustomCropName,
    handleSelectCrop,
    imageFile,
    imagePreviewUrl,
    compressedBase64,
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
    setCameraDenied,
    handleSubmitDiagnosis,
  };
}
