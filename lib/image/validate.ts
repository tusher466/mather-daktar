/**
 * Client-side image validation
 */

export interface ValidationResult {
  valid: boolean;
  errorKey?: string;
  errorMessageBn?: string;
}

export function validateImageFile(file: File): ValidationResult {
  if (!file) {
    return {
      valid: false,
      errorKey: "no_file",
      errorMessageBn: "কোনো ফাইল নির্বাচন করা হয়নি।",
    };
  }

  // Allow standard web image formats
  const validMimeTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!validMimeTypes.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      errorKey: "invalid_type",
      errorMessageBn: "অনুগ্রহ করে একটি সঠিক ছবির ফাইল দিন (JPEG, PNG বা WebP)।",
    };
  }

  // Reject files over 15MB before compression
  const maxRawBytes = 15 * 1024 * 1024;
  if (file.size > maxRawBytes) {
    return {
      valid: false,
      errorKey: "file_too_large",
      errorMessageBn: "ছবির সাইজ অনেক বেশি বড় (১৫ মেগাবাইটের বেশি)।",
    };
  }

  return { valid: true };
}
