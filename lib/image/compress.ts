/**
 * Client-side image compression using HTML5 Canvas
 * Targets: max 1024px on longest side, JPEG 0.8, target under 400 KB
 * Thumbnail generator: max 320px
 */

export interface CompressedImageResult {
  base64: string;
  mimeType: string;
  sizeBytes: number;
  width: number;
  height: number;
}

/**
 * Loads a File or Blob into an HTMLImageElement
 */
function loadImage(file: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Failed to decode image"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

/**
 * Loads an image from a data URL or URL string
 */
function loadImageFromSrc(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to decode image from source"));
    img.src = src;
  });
}

/**
 * Compresses an image for upload: max 1024px, JPEG 0.8, under 400KB
 */
export async function compressImageForUpload(
  file: File | Blob,
  maxDimension: number = 1024,
  initialQuality: number = 0.8
): Promise<CompressedImageResult> {
  const img = await loadImage(file);

  let { width, height } = img;
  if (width > maxDimension || height > maxDimension) {
    if (width > height) {
      height = Math.round((height * maxDimension) / width);
      width = maxDimension;
    } else {
      width = Math.round((width * maxDimension) / height);
      height = maxDimension;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context is not available");
  }

  // Draw with white background for transparency support
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);

  let quality = initialQuality;
  let base64 = canvas.toDataURL("image/jpeg", quality);

  // Approximate byte size: base64 length * (3/4)
  let approxBytes = Math.round((base64.length - 23) * 0.75);

  // If over 400KB, reduce quality iteratively
  if (approxBytes > 400 * 1024 && quality > 0.5) {
    quality = 0.65;
    base64 = canvas.toDataURL("image/jpeg", quality);
    approxBytes = Math.round((base64.length - 23) * 0.75);
  }

  return {
    base64,
    mimeType: "image/jpeg",
    sizeBytes: approxBytes,
    width,
    height,
  };
}

/**
 * Generates a small thumbnail (max 320px) for lightweight localStorage history
 */
export async function createThumbnail(
  source: File | Blob | string,
  maxDimension: number = 320
): Promise<string> {
  const img =
    typeof source === "string" ? await loadImageFromSrc(source) : await loadImage(source);

  let { width, height } = img;
  if (width > maxDimension || height > maxDimension) {
    if (width > height) {
      height = Math.round((height * maxDimension) / width);
      width = maxDimension;
    } else {
      width = Math.round((width * maxDimension) / height);
      height = maxDimension;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL("image/jpeg", 0.6);
}
