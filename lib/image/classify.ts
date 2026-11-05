/**
 * Client-Side & Server Crop Image Classifier
 * Identifies if the uploaded image matches the selected crop category,
 * preventing accidental diagnoses of wrong crops (e.g. uploading a tomato while rice is selected).
 */

export interface ImageCropAnalysis {
  detectedCropBn: string | null;
  detectedCropId: string | null;
  confidence: "high" | "medium" | "low";
  isPlant: boolean;
  isMismatch: boolean;
  reasonBn?: string;
}

const CROP_KEYWORD_MAP: Array<{ id: string; nameBn: string; keywords: string[] }> = [
  { id: "tomato", nameBn: "টমেটো", keywords: ["tomato", "tometo", "টমেটো"] },
  { id: "eggplant", nameBn: "বেগুন", keywords: ["eggplant", "brinjal", "aubergine", "begun", "বেগুন"] },
  { id: "potato", nameBn: "আলু", keywords: ["potato", "alu", "আলু"] },
  { id: "mustard", nameBn: "সরিষা", keywords: ["mustard", "sorisha", "shorisha", "সরিষা"] },
  { id: "rice", nameBn: "ধান", keywords: ["rice", "paddy", "dhan", "ধান"] },
  { id: "chili", nameBn: "মরিচ", keywords: ["chili", "chilli", "pepper", "morich", "মরিচ"] },
  { id: "jute", nameBn: "পাট", keywords: ["jute", "pat", "paat", "পাট"] },
  { id: "maize", nameBn: "ভুট্টা", keywords: ["maize", "corn", "vutta", "ভুট্টা"] },
  { id: "onion", nameBn: "পেঁয়াজ", keywords: ["onion", "peyaj", "পেঁয়াজ"] },
  { id: "cabbage", nameBn: "বাঁধাকপি/ফুলকপি", keywords: ["cabbage", "cauliflower", "kopi", "badhakopi", "fulkopi", "বাঁধাকপি", "ফুলকপি"] },
  { id: "gourd", nameBn: "লাউ/কুমড়া", keywords: ["gourd", "pumpkin", "lau", "kumra", "লাউ", "কুমড়া"] },
  { id: "non_plant", nameBn: "অ-উদ্ভিদ বা ভিন্ন ছবি", keywords: ["car", "cat", "dog", "screenshot", "selfie", "person", "food", "bibimbap", "room", "desk"] },
];

/**
 * 1. Fast detection from file name if user uploaded an image with an identifiable name
 */
export function detectCropFromFileName(fileName?: string): { id: string; nameBn: string } | null {
  if (!fileName) return null;
  const lower = fileName.toLowerCase();

  for (const item of CROP_KEYWORD_MAP) {
    for (const kw of item.keywords) {
      if (lower.includes(kw)) {
        return { id: item.id, nameBn: item.nameBn };
      }
    }
  }
  return null;
}

/**
 * 2. In-browser Canvas Color Signature Classifier
 * Runs in under 5ms on an offscreen canvas using thumbnail pixels.
 */
export function analyzeImagePixelsOnCanvas(
  img: HTMLImageElement | HTMLCanvasElement
): {
  detectedCropId: string | null;
  detectedCropBn: string | null;
  isPlant: boolean;
  greenPct: number;
  redPct: number;
  purplePct: number;
  yellowPct: number;
} {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return { detectedCropId: null, detectedCropBn: null, isPlant: true, greenPct: 50, redPct: 0, purplePct: 0, yellowPct: 0 };
    }

    const w = 64;
    const h = 64;
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(img, 0, 0, w, h);

    const imgData = ctx.getImageData(0, 0, w, h).data;
    const totalPixels = w * h;

    let greenCount = 0;
    let redCount = 0;
    let purpleCount = 0;
    let yellowCount = 0;

    for (let i = 0; i < imgData.length; i += 4) {
      const r = imgData[i];
      const g = imgData[i + 1];
      const b = imgData[i + 2];

      // Green foliage
      if (g > 65 && g > r * 1.15 && g > b * 1.15) {
        greenCount++;
      }
      // Bright red (tomato fruit, red chili)
      else if (r > 125 && r > g * 1.4 && r > b * 1.4) {
        redCount++;
      }
      // Deep purple / violet (eggplant)
      else if ((r > 40 && b > 40 && g < r * 0.8 && g < b * 0.8) || (r > 60 && b > 80 && g < 60)) {
        purpleCount++;
      }
      // Bright yellow (mustard flowers, ripe corn)
      else if (r > 140 && g > 120 && b < 100) {
        yellowCount++;
      }
    }

    const greenPct = (greenCount / totalPixels) * 100;
    const redPct = (redCount / totalPixels) * 100;
    const purplePct = (purpleCount / totalPixels) * 100;
    const yellowPct = (yellowCount / totalPixels) * 100;

    // Is it a plant image?
    const isPlant = greenPct > 5 || redPct > 8 || purplePct > 5 || yellowPct > 8;

    let detectedCropId: string | null = null;
    let detectedCropBn: string | null = null;

    if (purplePct >= 4) {
      detectedCropId = "eggplant";
      detectedCropBn = "বেগুন";
    } else if (redPct >= 10) {
      detectedCropId = "tomato";
      detectedCropBn = "টমেটো";
    } else if (yellowPct >= 12) {
      detectedCropId = "mustard";
      detectedCropBn = "সরিষা ফুল বা ভুট্টা";
    } else if (!isPlant && greenPct < 3) {
      detectedCropId = "non_plant";
      detectedCropBn = "অ-উদ্ভিদ বা ভিন্ন ছবি";
    }

    return {
      detectedCropId,
      detectedCropBn,
      isPlant,
      greenPct,
      redPct,
      purplePct,
      yellowPct,
    };
  } catch (err) {
    console.warn("Canvas pixel analysis skipped:", err);
    return { detectedCropId: null, detectedCropBn: null, isPlant: true, greenPct: 50, redPct: 0, purplePct: 0, yellowPct: 0 };
  }
}

/**
 * 3. Master Category Match Checker
 * Evaluates whether the selected crop matches the uploaded image features.
 */
export function checkCropMismatch(
  selectedCropId: string,
  fileName?: string,
  canvasAnalysis?: ReturnType<typeof analyzeImagePixelsOnCanvas>
): ImageCropAnalysis {
  const fromFile = detectCropFromFileName(fileName);

  // If filename clearly indicates a different crop:
  if (fromFile && fromFile.id !== "non_plant" && fromFile.id !== selectedCropId) {
    return {
      detectedCropBn: fromFile.nameBn,
      detectedCropId: fromFile.id,
      confidence: "high",
      isPlant: true,
      isMismatch: true,
      reasonBn: `নির্বাচিত ফসল ও আপলোডকৃত ছবি মিলছে না। আপনি নির্বাচন করেছেন '${selectedCropId}', কিন্তু ফাইলের নাম ও ছবি '${fromFile.nameBn}'-এর।`,
    };
  }

  // If filename is non-plant (e.g. car, cat, selfie, screenshot):
  if (fromFile && fromFile.id === "non_plant") {
    return {
      detectedCropBn: fromFile.nameBn,
      detectedCropId: "non_plant",
      confidence: "high",
      isPlant: false,
      isMismatch: true,
      reasonBn: "আপলোডকৃত ছবিটি কোনো ফসল বা উদ্ভিদের বলে মনে হচ্ছে না। অনুগ্রহ করে আক্রান্ত ফসলের পাতা বা ডালের ছবি দিন।",
    };
  }

  // If canvas pixel analysis indicates a strong color mismatch (e.g. Rice selected, but image is purple eggplant or bright red tomato):
  if (canvasAnalysis && canvasAnalysis.detectedCropId) {
    if (canvasAnalysis.detectedCropId === "non_plant") {
      return {
        detectedCropBn: "অ-উদ্ভিদ বস্তু",
        detectedCropId: "non_plant",
        confidence: "medium",
        isPlant: false,
        isMismatch: true,
        reasonBn: "আপলোডকৃত ছবিতে কোনো উদ্ভিদের সবুজ পাতা বা কান্ড শনাক্ত করা যায়নি। অনুগ্রহ করে ফসলের স্পষ্ট ছবি তুলুন।",
      };
    }

    // High confidence color mismatch:
    if (
      canvasAnalysis.detectedCropId !== selectedCropId &&
      // Exception: tomato vs chili might both have red; but rice, jute, potato do NOT have purple or red fruit!
      (selectedCropId === "rice" || selectedCropId === "jute" || selectedCropId === "potato") &&
      (canvasAnalysis.detectedCropId === "eggplant" || canvasAnalysis.detectedCropId === "tomato")
    ) {
      return {
        detectedCropBn: canvasAnalysis.detectedCropBn,
        detectedCropId: canvasAnalysis.detectedCropId,
        confidence: "high",
        isPlant: true,
        isMismatch: true,
        reasonBn: `নির্বাচিত ফসলের সাথে ছবির মিল নেই। আপনি নির্বাচন করেছেন '${selectedCropId}', কিন্তু ছবিতে '${canvasAnalysis.detectedCropBn}'-এর বৈশিষ্ট্য দেখা যাচ্ছে।`,
      };
    }
  }

  return {
    detectedCropBn: null,
    detectedCropId: null,
    confidence: "low",
    isPlant: true,
    isMismatch: false,
  };
}
