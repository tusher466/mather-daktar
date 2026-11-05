import { DiagnosisResult } from "@/types";
import { toBanglaDigits } from "@/lib/bangla/digits";

/**
 * Renders a crisp, branded Bangla diagnosis share card onto an HTML Canvas and exports as PNG data URL / Blob
 */
export async function generateDiagnosisCardBlob(
  diagnosis: DiagnosisResult
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  const width = 800;
  const height = 1000;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context is not available");

  // Background
  ctx.fillStyle = "#F6F3EA";
  ctx.fillRect(0, 0, width, height);

  // Top header bar
  ctx.fillStyle = "#1F6B3A";
  ctx.fillRect(0, 0, width, 120);

  // Header Title
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 34px sans-serif";
  ctx.fillText("মাঠের ডাক্তার (Mather Daktar)", 40, 60);

  ctx.font = "20px sans-serif";
  ctx.fillStyle = "#E8F5E9";
  ctx.fillText("ফসলের সঠিক রোগ নির্ণয় ও সমাধান", 40, 95);

  // Buildathon badge on right of header
  ctx.fillStyle = "#FFF4DC";
  ctx.fillRect(520, 30, 240, 60);
  ctx.fillStyle = "#154D2A";
  ctx.font = "bold 14px sans-serif";
  ctx.fillText("YUNet AIgnite 2026", 560, 65);

  let currentY = 160;

  // Main Card Area
  ctx.fillStyle = "#FFFFFF";
  ctx.strokeStyle = "#E3DDCB";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(40, currentY, 720, 760, 20);
  ctx.fill();
  ctx.stroke();

  currentY += 40;

  // Crop & Problem Verdict
  ctx.fillStyle = "#1A1A1A";
  ctx.font = "bold 26px sans-serif";
  ctx.fillText(`ফসল: ${diagnosis.cropBn || diagnosis.crop}`, 70, currentY);

  currentY += 45;
  ctx.fillStyle = "#1F6B3A";
  ctx.font = "bold 36px sans-serif";
  ctx.fillText(diagnosis.problemNameBn, 70, currentY);

  // Confidence & Severity Pill
  currentY += 40;
  ctx.fillStyle = "#FFF4DC";
  ctx.beginPath();
  ctx.roundRect(70, currentY, 260, 40, 8);
  ctx.fill();

  ctx.fillStyle = "#C9892B";
  ctx.font = "bold 18px sans-serif";
  const confText =
    diagnosis.confidence === "high"
      ? "বেশি নিশ্চিত"
      : diagnosis.confidence === "medium"
      ? "মোটামুটি নিশ্চিত"
      : "কম নিশ্চিত";
  ctx.fillText(`নিশ্চয়তা: ${confText}`, 85, currentY + 26);

  // Section: কেন হয়েছে
  currentY += 70;
  ctx.fillStyle = "#1A1A1A";
  ctx.font = "bold 24px sans-serif";
  ctx.fillText("কেন হয়েছে:", 70, currentY);

  currentY += 30;
  ctx.fillStyle = "#4D4D45";
  ctx.font = "20px sans-serif";
  wrapCanvasText(ctx, diagnosis.whyBn, 70, currentY, 660, 28);

  // Section: এখনই কী করবেন (First 3 steps)
  currentY += 80;
  ctx.fillStyle = "#1A1A1A";
  ctx.font = "bold 24px sans-serif";
  ctx.fillText("করণীয় পদক্ষেপ:", 70, currentY);

  currentY += 35;
  ctx.font = "19px sans-serif";
  const stepsToShow = diagnosis.actionsBn.slice(0, 3);
  stepsToShow.forEach((step, idx) => {
    ctx.fillStyle = "#1F6B3A";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(`${toBanglaDigits(idx + 1)}.`, 70, currentY);

    ctx.fillStyle = "#1A1A1A";
    ctx.font = "19px sans-serif";
    wrapCanvasText(ctx, step, 100, currentY, 630, 26);
    currentY += 45;
  });

  // Footer inside card: Krishi Call Center Hotline
  currentY = 860;
  ctx.fillStyle = "#FFF4DC";
  ctx.beginPath();
  ctx.roundRect(70, currentY, 660, 50, 10);
  ctx.fill();

  ctx.fillStyle = "#1F6B3A";
  ctx.font = "bold 18px sans-serif";
  ctx.fillText(
    "জরুরি কৃষি পরামর্শের জন্য কল করুন: ১৬১২৩ (জাতীয় কৃষি কল সেন্টার)",
    95,
    currentY + 32
  );

  // Outer Footer
  ctx.fillStyle = "#777";
  ctx.font = "16px sans-serif";
  ctx.fillText("মাঠের ডাক্তার - পরিবেশবান্ধব ও নিরাপদ কৃষি সেবা", 240, 960);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Failed to create blob from card canvas"));
    }, "image/png");
  });
}

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + " ";
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}
