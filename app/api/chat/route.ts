import { NextRequest, NextResponse } from "next/server";
import { ChatRequestSchema } from "@/lib/ai/schemas";
import { generateChat } from "@/lib/ai/client";
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
    const rateLimit = checkRateLimit(clientIp, 25, 10 * 60 * 1000);
    if (!rateLimit.success) {
      throw new RateLimitError();
    }

    const body = await req.json().catch(() => {
      throw new ValidationError("Invalid JSON payload");
    });

    const parsed = ChatRequestSchema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError(parsed.error.errors.map((e) => e.message).join(", "));
    }

    const { messages, diagnosisContext, imageBase64 } = parsed.data;

    // Take at most the last 10 messages for context
    const recentMessages = messages.slice(-10);

    console.info(`[Chat] IP: ${clientIp} | MsgCount: ${recentMessages.length} | HasContext: ${!!diagnosisContext}`);

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out after 30 seconds")), 28000)
    );

    const chatPromise = generateChat(recentMessages, diagnosisContext, imageBase64);

    const reply = (await Promise.race([chatPromise, timeoutPromise])) as string;

    console.info(`[Chat Success] Duration: ${Date.now() - startTime}ms`);

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    const errorDetails = formatErrorResponse(error);
    console.error(`[Chat Error] IP: ${clientIp} | Status: ${errorDetails.statusCode} | Msg: ${errorDetails.error}`);
    return NextResponse.json(
      { error: errorDetails.error, messageBn: errorDetails.userMessageBn },
      { status: errorDetails.statusCode }
    );
  }
}
