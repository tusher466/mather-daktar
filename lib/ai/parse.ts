import { ZodType } from "zod";

/**
 * Extracts and parses JSON from raw LLM text output.
 * Strips markdown code blocks (```json ... ```) or conversational fluff.
 */
export function extractJsonFromText(rawText: string): unknown {
  if (!rawText || typeof rawText !== "string") {
    throw new Error("Empty AI response");
  }

  const trimmed = rawText.trim();

  // Try parsing direct JSON
  try {
    return JSON.parse(trimmed);
  } catch {
    // Continue to extract from markdown
  }

  // Regex to match JSON block within markdown ```json ... ```
  const markdownRegex = /```(?:json)?\s*([\s\S]*?)\s*```/i;
  const match = trimmed.match(markdownRegex);
  if (match && match[1]) {
    try {
      return JSON.parse(match[1].trim());
    } catch {
      // Continue to bracket search
    }
  }

  // Search for the outermost JSON object { ... }
  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const candidate = trimmed.substring(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(candidate);
    } catch {
      // Failed to parse
    }
  }

  throw new Error("Could not extract valid JSON from model response");
}

/**
 * Parses and validates raw LLM text against a Zod schema
 */
export function parseAndValidate<T>(rawText: string, schema: ZodType<T, any, any>): T {
  const parsed = extractJsonFromText(rawText);
  const result = schema.safeParse(parsed);
  if (!result.success) {
    const errors = result.error.errors
      .map((e) => `${e.path.join(".")}: ${e.message}`)
      .join(", ");
    throw new Error(`Schema validation failed: ${errors}`);
  }
  return result.data;
}
