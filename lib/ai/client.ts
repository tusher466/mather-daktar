import { GoogleGenerativeAI } from "@google/generative-ai";
import Anthropic from "@anthropic-ai/sdk";
import {
  DIAGNOSIS_SYSTEM_PROMPT,
  CHAT_SYSTEM_PROMPT,
  SEASON_SYSTEM_PROMPT,
} from "./prompts";
import {
  DiagnosisSchema,
  SeasonSchema,
  RawDiagnosisResponse,
  RawSeasonResponse,
} from "./schemas";
import { parseAndValidate } from "./parse";

/**
 * Robust API Key discovery supporting all common environment variable names
 * (including Mather_Daktar from Vercel config, GEMINI_API_KEY, and AI_API_KEY)
 */
function getApiKey(): string {
  const key =
    process.env.AI_API_KEY ||
    process.env.Mather_Daktar ||
    process.env.MATHER_DAKTAR ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.ANTHROPIC_API_KEY ||
    "";
  return key.trim();
}

function getProvider(): "gemini" | "anthropic" {
  const forced = process.env.AI_PROVIDER?.toLowerCase();
  if (forced === "anthropic" || forced === "claude") return "anthropic";
  if (forced === "gemini") return "gemini";

  const key = getApiKey();
  if (key.startsWith("sk-ant-")) return "anthropic";
  return "gemini";
}

// Stable official Gemini models in Google AI Studio
const GEMINI_MODELS = [
  process.env.AI_MODEL || "gemini-1.5-flash",
  "gemini-1.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-pro",
];

const ANTHROPIC_DEFAULT_MODEL =
  process.env.AI_MODEL || "claude-3-5-sonnet-20241022";

function assertApiKey(): string {
  const key = getApiKey();
  if (!key) {
    throw new Error(
      "AI_API_KEY_MISSING: এআই এপিআই কি সেট করা নেই। দয়া করে Vercel বা .env.local ফাইলে AI_API_KEY বসান।"
    );
  }
  return key;
}

/**
 * Clean base64 string if it contains data URL prefix
 */
function cleanBase64(base64: string): string {
  const commaIndex = base64.indexOf(",");
  return commaIndex !== -1 ? base64.substring(commaIndex + 1) : base64;
}

/**
 * Execute Gemini call with automatic fallback across available models
 */
async function callGeminiWithFallback<T>(
  apiKey: string,
  systemInstruction: string,
  userParts: Array<any>,
  validator: (rawText: string) => T
): Promise<T> {
  const genAI = new GoogleGenerativeAI(apiKey);
  let lastError: any = null;

  // Deduplicate model list
  const modelsToTry = Array.from(new Set(GEMINI_MODELS));

  for (const modelName of modelsToTry) {
    try {
      console.info(`[Gemini] Attempting call with model: ${modelName}`);
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction,
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const result = await model.generateContent(userParts);
      const text = result.response.text();
      return validator(text);
    } catch (err: any) {
      lastError = err;
      const errMsg = String(err?.message || err);
      console.warn(`[Gemini] Model ${modelName} failed:`, errMsg);

      // If invalid API key (400, 403, API_KEY_INVALID), no point retrying other models
      if (
        errMsg.includes("API_KEY_INVALID") ||
        errMsg.includes("API key not valid") ||
        errMsg.includes("403")
      ) {
        throw new Error(
          `AI_API_KEY_INVALID: এআই এপিআই কি সঠিক নয়। Google AI Studio থেকে নতুন কি তৈরি করে বসান। (${errMsg})`
        );
      }

      // If rate limit / quota, throw directly
      if (
        errMsg.includes("429") ||
        errMsg.includes("quota") ||
        errMsg.includes("ResourceExhausted")
      ) {
        throw new Error(
          "AI_QUOTA_EXCEEDED: এআই রিকোয়েস্ট লিমিট অতিক্রম করেছে। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।"
        );
      }

      // Otherwise continue to next model in fallback list
    }
  }

  throw lastError || new Error("All Gemini models failed to respond.");
}

// -------------------------------------------------------------
// 1. DIAGNOSIS (Vision + Multimodal)
// -------------------------------------------------------------
export async function generateDiagnosis(
  crop: string,
  imageBase64: string,
  mimeType: string,
  note?: string
): Promise<RawDiagnosisResponse> {
  const apiKey = assertApiKey();
  const provider = getProvider();

  const userPrompt = `
ফসলের নাম: ${crop}
${note ? `কৃষকের মন্তব্য / লক্ষণ দেখা দেয়ার বিবরণ: "${note}"` : ""}

দয়া করে এই উদ্ভিদের ছবিটি সতর্কভাবে বিশ্লেষণ করুন এবং রোগ, পোকা বা পুষ্টিজনিত সমস্যা চিহ্নিত করে নির্দেশিত JSON ফরম্যাটে উত্তর দিন।
`.trim();

  const rawBase64 = cleanBase64(imageBase64);

  if (provider === "anthropic") {
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: ANTHROPIC_DEFAULT_MODEL,
      max_tokens: 1500,
      system: DIAGNOSIS_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type:
                  (mimeType as "image/jpeg" | "image/png" | "image/webp") ||
                  "image/jpeg",
                data: rawBase64,
              },
            },
            {
              type: "text",
              text: userPrompt,
            },
          ],
        },
      ],
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const rawOutput = textBlock && "text" in textBlock ? textBlock.text : "";
    return parseAndValidate(rawOutput, DiagnosisSchema);
  }

  // Gemini with multi-model fallback & JSON validation
  return callGeminiWithFallback(
    apiKey,
    DIAGNOSIS_SYSTEM_PROMPT,
    [
      {
        inlineData: {
          mimeType: mimeType || "image/jpeg",
          data: rawBase64,
        },
      },
      { text: userPrompt },
    ],
    (rawText) => {
      try {
        return parseAndValidate(rawText, DiagnosisSchema);
      } catch (err) {
        console.warn("Initial JSON parse failed, retrying extraction...", err);
        return parseAndValidate(rawText, DiagnosisSchema);
      }
    }
  );
}

// -------------------------------------------------------------
// 2. CHAT
// -------------------------------------------------------------
export async function generateChat(
  messages: Array<{ role: "user" | "assistant"; content: string }>,
  diagnosisContext?: string,
  imageBase64?: string
): Promise<string> {
  const apiKey = assertApiKey();
  const provider = getProvider();

  let systemText = CHAT_SYSTEM_PROMPT;
  if (diagnosisContext) {
    systemText += `\n\nবর্তমান আলোচনার প্রসঙ্গ (কৃষকের পূর্বের রোগ নির্ণয়): ${diagnosisContext}`;
  }

  if (provider === "anthropic") {
    const anthropic = new Anthropic({ apiKey });
    const claudeMessages = messages.map((m, idx) => {
      if (idx === messages.length - 1 && imageBase64 && m.role === "user") {
        return {
          role: "user" as const,
          content: [
            {
              type: "image" as const,
              source: {
                type: "base64" as const,
                media_type: "image/jpeg" as const,
                data: cleanBase64(imageBase64),
              },
            },
            { type: "text" as const, text: m.content },
          ],
        };
      }
      return {
        role: m.role,
        content: m.content,
      };
    });

    const response = await anthropic.messages.create({
      model: ANTHROPIC_DEFAULT_MODEL,
      max_tokens: 1000,
      system: systemText,
      messages: claudeMessages,
    });

    const block = response.content.find((b) => b.type === "text");
    return block && "text" in block ? block.text : "";
  }

  // Gemini Chat
  const genAI = new GoogleGenerativeAI(apiKey);
  const modelsToTry = Array.from(new Set(GEMINI_MODELS));

  const contents = messages.map((m, idx) => {
    if (idx === messages.length - 1 && imageBase64 && m.role === "user") {
      return {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: cleanBase64(imageBase64),
            },
          },
          { text: m.content },
        ],
      };
    }
    return {
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    };
  });

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: systemText,
        generationConfig: { temperature: 0.3 },
      });

      const result = await model.generateContent({ contents });
      return result.response.text();
    } catch (err: any) {
      console.warn(`[Gemini Chat] Model ${modelName} failed:`, err?.message);
    }
  }

  throw new Error("Chat request could not be processed.");
}

// -------------------------------------------------------------
// 3. SEASON ADVISORY
// -------------------------------------------------------------
export async function generateSeason(
  crop: string,
  banglaMonth: string,
  gregorianMonth?: string
): Promise<RawSeasonResponse> {
  const apiKey = assertApiKey();
  const provider = getProvider();

  const prompt = `
ফসল: ${crop}
বাংলা মাস: ${banglaMonth}
${gregorianMonth ? `ইংরেজি মাস: ${gregorianMonth}` : ""}

এই ফসলের জন্য এই নির্দিষ্ট মাসে বাংলাদেশের বাস্তব আবহাওয়ায় সবচেয়ে গুরুত্বপূর্ণ ৩টি সম্ভাব্য ঝুঁকি (risks) এবং ৩টি প্রধান করণীয় কাজ (tasks) প্রস্তুত করে JSON আকারে দাও।
`.trim();

  if (provider === "anthropic") {
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: ANTHROPIC_DEFAULT_MODEL,
      max_tokens: 1000,
      system: SEASON_SYSTEM_PROMPT,
      messages: [{ role: "user", content: prompt }],
    });
    const block = response.content.find((b) => b.type === "text");
    const rawOutput = block && "text" in block ? block.text : "";
    return parseAndValidate(rawOutput, SeasonSchema);
  }

  // Gemini Season
  return callGeminiWithFallback(
    apiKey,
    SEASON_SYSTEM_PROMPT,
    [{ text: prompt }],
    (rawText) => parseAndValidate(rawText, SeasonSchema)
  );
}
