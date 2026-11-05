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

// Environment configuration
const API_KEY = process.env.AI_API_KEY || "";
const DETECTED_PROVIDER =
  process.env.AI_PROVIDER ||
  (API_KEY.startsWith("sk-ant-") ? "anthropic" : "gemini");

const GEMINI_DEFAULT_MODEL =
  process.env.AI_MODEL || "gemini-2.5-flash";
const ANTHROPIC_DEFAULT_MODEL =
  process.env.AI_MODEL || "claude-3-5-sonnet-20241022";

function assertApiKey() {
  if (!API_KEY) {
    throw new Error(
      "AI_API_KEY is not configured. Please add AI_API_KEY to your .env.local or Vercel environment variables."
    );
  }
}

/**
 * Clean base64 string if it contains data URL prefix
 */
function cleanBase64(base64: string): string {
  const commaIndex = base64.indexOf(",");
  return commaIndex !== -1 ? base64.substring(commaIndex + 1) : base64;
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
  assertApiKey();

  const userPrompt = `
ফসলের নাম: ${crop}
${note ? `কৃষকের মন্তব্য / লক্ষণ দেখা দেয়ার বিবরণ: "${note}"` : ""}

দয়া করে এই উদ্ভিদের ছবিটি সতর্কভাবে বিশ্লেষণ করুন এবং রোগ, পোকা বা পুষ্টিজনিত সমস্যা চিহ্নিত করে নির্দেশিত JSON ফরম্যাটে উত্তর দিন।
`.trim();

  const rawBase64 = cleanBase64(imageBase64);

  let rawOutput = "";

  if (DETECTED_PROVIDER === "anthropic") {
    const anthropic = new Anthropic({ apiKey: API_KEY });
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
                media_type: (mimeType as "image/jpeg" | "image/png" | "image/webp") || "image/jpeg",
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
    rawOutput = textBlock && "text" in textBlock ? textBlock.text : "";
  } else {
    // Default: Gemini
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: GEMINI_DEFAULT_MODEL,
      systemInstruction: DIAGNOSIS_SYSTEM_PROMPT,
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: mimeType || "image/jpeg",
          data: rawBase64,
        },
      },
      { text: userPrompt },
    ]);

    rawOutput = result.response.text();
  }

  // Parse and validate with Zod
  try {
    return parseAndValidate(rawOutput, DiagnosisSchema);
  } catch (initialError) {
    // Retry once with repair instruction as per section 6.2
    console.warn("Initial diagnosis JSON validation failed, retrying once...", initialError);

    const repairPrompt = `
পূর্বের উত্তরটি সঠিক JSON স্কিমা অনুসরণ করেনি।
অনুগ্রহ করে শুধুমাত্র নিচের স্কিমা অনুযায়ী হুবহু নির্ভুল JSON প্রদান করুন:
{
  "isPlant": boolean,
  "imageQuality": "good" | "poor",
  "retakeReason": string | null,
  "problemType": "disease" | "pest" | "nutrient" | "water_stress" | "other" | "healthy" | "unknown",
  "problemNameBn": string,
  "confidence": "high" | "medium" | "low",
  "severity": "low" | "medium" | "high",
  "whyBn": string,
  "actionsBn": string[],
  "avoidBn": string[],
  "chemicalMentioned": boolean,
  "contactOfficer": boolean,
  "possibleAlternativesBn": string[]
}

পূর্বের আউটপুট:
${rawOutput}
`.trim();

    if (DETECTED_PROVIDER === "anthropic") {
      const anthropic = new Anthropic({ apiKey: API_KEY });
      const repairResponse = await anthropic.messages.create({
        model: ANTHROPIC_DEFAULT_MODEL,
        max_tokens: 1500,
        messages: [{ role: "user", content: repairPrompt }],
      });
      const textBlock = repairResponse.content.find((block) => block.type === "text");
      const repairedText = textBlock && "text" in textBlock ? textBlock.text : "";
      return parseAndValidate(repairedText, DiagnosisSchema);
    } else {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: GEMINI_DEFAULT_MODEL,
        generationConfig: { responseMimeType: "application/json", temperature: 0.1 },
      });
      const repairResult = await model.generateContent([{ text: repairPrompt }]);
      return parseAndValidate(repairResult.response.text(), DiagnosisSchema);
    }
  }
}

// -------------------------------------------------------------
// 2. CHAT
// -------------------------------------------------------------
export async function generateChat(
  messages: Array<{ role: "user" | "assistant"; content: string }>,
  diagnosisContext?: string,
  imageBase64?: string
): Promise<string> {
  assertApiKey();

  // Combine system prompt with diagnosis context if present
  let systemText = CHAT_SYSTEM_PROMPT;
  if (diagnosisContext) {
    systemText += `\n\nবর্তমান আলোচনার প্রসঙ্গ (কৃষকের পূর্বের রোগ নির্ণয়): ${diagnosisContext}`;
  }

  if (DETECTED_PROVIDER === "anthropic") {
    const anthropic = new Anthropic({ apiKey: API_KEY });

    // Format messages for Claude
    const claudeMessages = messages.map((m, idx) => {
      // If this is the last message and an image is attached
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
  } else {
    // Gemini
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: GEMINI_DEFAULT_MODEL,
      systemInstruction: systemText,
      generationConfig: { temperature: 0.3 },
    });

    // Construct contents
    // Convert previous messages to chat history
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

    const result = await model.generateContent({ contents });
    return result.response.text();
  }
}

// -------------------------------------------------------------
// 3. SEASON ADVISORY
// -------------------------------------------------------------
export async function generateSeason(
  crop: string,
  banglaMonth: string,
  gregorianMonth?: string
): Promise<RawSeasonResponse> {
  assertApiKey();

  const prompt = `
ফসল: ${crop}
বাংলা মাস: ${banglaMonth}
${gregorianMonth ? `ইংরেজি মাস: ${gregorianMonth}` : ""}

এই ফসলের জন্য এই নির্দিষ্ট মাসে বাংলাদেশের বাস্তব আবহাওয়ায় সবচেয়ে গুরুত্বপূর্ণ ৩টি সম্ভাব্য ঝুঁকি (risks) এবং ৩টি প্রধান করণীয় কাজ (tasks) প্রস্তুত করে JSON আকারে দাও।
`.trim();

  let rawOutput = "";

  if (DETECTED_PROVIDER === "anthropic") {
    const anthropic = new Anthropic({ apiKey: API_KEY });
    const response = await anthropic.messages.create({
      model: ANTHROPIC_DEFAULT_MODEL,
      max_tokens: 1000,
      system: SEASON_SYSTEM_PROMPT,
      messages: [{ role: "user", content: prompt }],
    });
    const block = response.content.find((b) => b.type === "text");
    rawOutput = block && "text" in block ? block.text : "";
  } else {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: GEMINI_DEFAULT_MODEL,
      systemInstruction: SEASON_SYSTEM_PROMPT,
      generationConfig: { responseMimeType: "application/json", temperature: 0.2 },
    });
    const result = await model.generateContent([{ text: prompt }]);
    rawOutput = result.response.text();
  }

  return parseAndValidate(rawOutput, SeasonSchema);
}
