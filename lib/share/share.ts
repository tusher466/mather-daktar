import { DiagnosisResult } from "@/types";
import { generateDiagnosisCardBlob } from "./make-card";

export interface ShareResult {
  sharedViaWebShare: boolean;
  downloaded: boolean;
}

export async function shareDiagnosis(diagnosis: DiagnosisResult): Promise<ShareResult> {
  const blob = await generateDiagnosisCardBlob(diagnosis);
  const file = new File([blob], `mather-daktar-${diagnosis.crop}-${Date.now()}.png`, {
    type: "image/png",
  });

  const shareText = `মাঠের ডাক্তার রিপোর্ট: ${diagnosis.cropBn} ফসলের সমস্যা "${diagnosis.problemNameBn}"। বিস্তারিত ফলাফল দেখতে ও কৃষি পরামর্শ পেতে ১৬১২৩ এ কল করতে পারেন।`;

  // 1. Try Native Web Share API with file support
  if (
    typeof navigator !== "undefined" &&
    navigator.canShare &&
    navigator.canShare({ files: [file] })
  ) {
    try {
      await navigator.share({
        title: "মাঠের ডাক্তার রিপোর্ট",
        text: shareText,
        files: [file],
      });
      return { sharedViaWebShare: true, downloaded: false };
    } catch (e: any) {
      if (e.name === "AbortError") {
        return { sharedViaWebShare: false, downloaded: false };
      }
      // If user cancelled or failed, continue to fallback
    }
  }

  // 2. Fallback: Trigger download of PNG image card
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `mather-daktar-report-${diagnosis.id}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 4000);

  // Also offer WhatsApp web link
  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${shareText}\n\n(ছবিটি ডাউনলোড হয়েছে, হোয়াটসঅ্যাপে বন্ধুদের সাথে শেয়ার করুন)`
  )}`;
  window.open(waUrl, "_blank", "noopener,noreferrer");

  return { sharedViaWebShare: false, downloaded: true };
}
