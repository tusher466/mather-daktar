import { NextRequest, NextResponse } from "next/server";
import { SeasonRequestSchema } from "@/lib/ai/schemas";
import { generateSeason } from "@/lib/ai/client";
import { checkRateLimit } from "@/lib/rate-limit";
import { formatErrorResponse, RateLimitError, ValidationError } from "@/lib/errors";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  try {
    const rateLimit = checkRateLimit(clientIp, 30, 10 * 60 * 1000);
    if (!rateLimit.success) {
      throw new RateLimitError();
    }

    const body = await req.json().catch(() => {
      throw new ValidationError("Invalid JSON payload");
    });

    const parsed = SeasonRequestSchema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.errors.map((e) => e.message).join(", "));
    }

    const { crop, banglaMonth, gregorianMonth } = parsed.data;

    console.info(`[Season] IP: ${clientIp} | Crop: ${crop} | Month: ${banglaMonth}`);

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out after 30 seconds")), 28000)
    );

    const seasonPromise = generateSeason(crop, banglaMonth, gregorianMonth);

    const seasonData = (await Promise.race([seasonPromise, timeoutPromise])) as Awaited<
      ReturnType<typeof generateSeason>
    >;

    console.info(`[Season Success] Crop: ${crop} | Month: ${banglaMonth} | Duration: ${Date.now() - startTime}ms`);

    return NextResponse.json(seasonData, { status: 200 });
  } catch (error) {
    const errorDetails = formatErrorResponse(error);
    console.error(`[Season Error] IP: ${clientIp} | Status: ${errorDetails.statusCode} | Msg: ${errorDetails.error}`);
    return NextResponse.json(
      { error: errorDetails.error, messageBn: errorDetails.userMessageBn },
      { status: errorDetails.statusCode }
    );
  }
}
