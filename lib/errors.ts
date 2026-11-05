import { STRINGS_BN } from "./strings.bn";

export class AppError extends Error {
  public statusCode: number;
  public userMessageBn: string;

  constructor(message: string, statusCode: number = 500, userMessageBn?: string) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.userMessageBn = userMessageBn || STRINGS_BN.errors.serverError;
  }
}

export class RateLimitError extends AppError {
  constructor() {
    super("Rate limit exceeded", 429, STRINGS_BN.errors.rateLimit);
    this.name = "RateLimitError";
  }
}

export class ValidationError extends AppError {
  constructor(detail: string) {
    super(`Validation failed: ${detail}`, 400, STRINGS_BN.errors.invalidImage);
    this.name = "ValidationError";
  }
}

/**
 * Safely maps any server or AI error to an actionable user response
 */
export function formatErrorResponse(error: unknown): {
  error: string;
  userMessageBn: string;
  statusCode: number;
} {
  if (error instanceof AppError) {
    return {
      error: error.message,
      userMessageBn: error.userMessageBn,
      statusCode: error.statusCode,
    };
  }

  const errStr = String(error?.toString ? error.toString() : error);

  // Missing API Key
  if (errStr.includes("AI_API_KEY_MISSING") || errStr.includes("is not configured")) {
    return {
      error: "AI_API_KEY_MISSING",
      userMessageBn:
        "এআই এপিআই কি (AI_API_KEY) পাওয়া যায়নি। দয়া করে Vercel Settings -> Environment Variables-এ AI_API_KEY যোগ করুন (অথবা লোকাল ফাইলে .env.local তৈরি করুন)।",
      statusCode: 500,
    };
  }

  // Invalid API Key
  if (
    errStr.includes("AI_API_KEY_INVALID") ||
    errStr.includes("API key not valid") ||
    errStr.includes("API_KEY_INVALID") ||
    errStr.includes("403")
  ) {
    return {
      error: "AI_API_KEY_INVALID",
      userMessageBn:
        "এআই এপিআই কি-টি সঠিক নয় বা কাজ করছে না। দয়া করে aistudio.google.com থেকে নতুন এপিআই কি নিয়ে Vercel-এ আপডেট করুন।",
      statusCode: 401,
    };
  }

  // Quota Exceeded / Rate Limit
  if (
    errStr.includes("AI_QUOTA_EXCEEDED") ||
    errStr.includes("429") ||
    errStr.toLowerCase().includes("quota") ||
    errStr.toLowerCase().includes("resource_exhausted") ||
    errStr.toLowerCase().includes("resourceexhausted")
  ) {
    return {
      error: "Rate limit / quota exceeded",
      userMessageBn:
        "এআই সার্ভারের বিনামূল্যে রিকোয়েস্ট সীমা শেষ হয়েছে। অনুগ্রহ করে ২ মিনিট পর আবার চেষ্টা করুন।",
      statusCode: 429,
    };
  }

  // Timeout
  if (errStr.toLowerCase().includes("timed out") || errStr.toLowerCase().includes("timeout")) {
    return {
      error: "Request timed out",
      userMessageBn:
        "ইন্টারনেট বা এআই রেসপন্সে একটু বেশি সময় লাগছে। দয়া করে সংযোগ ঠিক রেখে আবার চেষ্টা করুন।",
      statusCode: 504,
    };
  }

  return {
    error: "Internal Server Error",
    userMessageBn:
      "সার্ভারে এআই প্রসেসিং করতে সাময়িক সমস্যা হচ্ছে। দয়া করে আবার চেষ্টা করুন।",
    statusCode: 500,
  };
}
