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
 * Safely maps any server or AI error to a sanitized user response
 */
export function formatErrorResponse(error: unknown): {
  error: string;
  userMessageBn: string;
  statusCode: number;
} {
  // Never leak internal stack traces or API keys
  if (error instanceof AppError) {
    return {
      error: error.message,
      userMessageBn: error.userMessageBn,
      statusCode: error.statusCode,
    };
  }

  const errStr = String(error);

  if (errStr.includes("429") || errStr.toLowerCase().includes("quota") || errStr.toLowerCase().includes("resource_exhausted")) {
    return {
      error: "Rate limit / quota exceeded",
      userMessageBn: STRINGS_BN.errors.rateLimit,
      statusCode: 429,
    };
  }

  if (errStr.includes("AI_API_KEY")) {
    return {
      error: "AI Provider Configuration Missing",
      userMessageBn: "সার্ভারে এআই কনফিগারেশন পাওয়া যায়নি। অনুগ্রহ করে অ্যাডমিনকে জানান।",
      statusCode: 500,
    };
  }

  return {
    error: "Internal Server Error",
    userMessageBn: STRINGS_BN.errors.serverError,
    statusCode: 500,
  };
}
