import { NextRequest, NextResponse } from "next/server";
import { DiagnoseRequestSchema } from "@/lib/ai/schemas";
import { generateDiagnosis } from "@/lib/ai/client";
import { checkRateLimit } from "@/lib/rate-limit";
import { formatErrorResponse, RateLimitError, ValidationError } from "@/lib/errors";

export const maxDuration = 30; // 30-second timeout on Vercel

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  try {
    // 1. Rate limit check
    const rateLimit = checkRateLimit(clientIp, 20, 10 * 60 * 1000);
    if (!rateLimit.success) {
      throw new RateLimitError();
    }

    // 2. Parse & Validate request body
    const body = await req.json().catch(() => {
      throw new ValidationError("Invalid JSON payload");
    });

    const parsed = DiagnoseRequestSchema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.errors.map((e) => e.message).join(", "));
    }

    const { crop, imageBase64, mimeType, note } = parsed.data;

    // Check base64 size (must be under 1.5MB in base64 string length)
    const base64Length = imageBase64.length;
    if (base64Length > 2 * 1024 * 1024) {
      throw new ValidationError("Image payload exceeds maximum allowable size");
    }

    // Structured server log without logging user image data
    console.info(`[Diagnose] IP: ${clientIp} | Crop: ${crop} | PayloadSize: ${(base64Length / 1024).toFixed(1)}KB`);

    // 3. Call AI with 30s timeout
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out after 30 seconds")), 28000)
    );

    const diagnosisPromise = generateDiagnosis(crop, imageBase64, mimeType, note);

    const diagnosis = (await Promise.race([diagnosisPromise, timeoutPromise])) as Awaited<
      ReturnType<typeof generateDiagnosis>
    >;

    console.info(
      `[Diagnose Success] Crop: ${crop} | Problem: ${diagnosis.problemNameBn} | Duration: ${Date.now() - startTime}ms`
    );

    return NextResponse.json(diagnosis, { status: 200 });
  } catch (error) {
    const errorDetails = formatErrorResponse(error);
    console.error(`[Diagnose Error] IP: ${clientIp} | Status: ${errorDetails.statusCode} | Msg: ${errorDetails.error}`);
    return NextResponse.json(
      { error: errorDetails.error, messageBn: errorDetails.userMessageBn },
      { status: errorDetails.statusCode }
    );
  }
}
