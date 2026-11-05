import { z } from "zod";

export const DiagnosisSchema = z.preprocess(
  (val: any) => {
    if (val && typeof val === "object") {
      if (val.cropMatched === undefined) val.cropMatched = true;
      if (val.detectedCropBn === undefined) val.detectedCropBn = null;
    }
    return val;
  },
  z.object({
    isPlant: z.boolean(),
    cropMatched: z.boolean(),
    detectedCropBn: z.string().nullable(),
    imageQuality: z.enum(["good", "poor"]),
    retakeReason: z.string().nullable(),
    problemType: z.enum([
      "disease",
      "pest",
      "nutrient",
      "water_stress",
      "other",
      "healthy",
      "unknown",
    ]),
    problemNameBn: z.string().min(1),
    confidence: z.enum(["high", "medium", "low"]),
    severity: z.enum(["low", "medium", "high"]),
    whyBn: z.string().min(1),
    actionsBn: z.array(z.string()).min(1),
    avoidBn: z.array(z.string()).min(1),
    chemicalMentioned: z.boolean(),
    contactOfficer: z.boolean(),
    possibleAlternativesBn: z.array(z.string()),
  })
);

export type RawDiagnosisResponse = z.infer<typeof DiagnosisSchema>;

export const SeasonSchema = z.object({
  crop: z.string(),
  cropBn: z.string(),
  banglaMonth: z.string(),
  seasonNameBn: z.string(),
  risks: z
    .array(
      z.object({
        titleBn: z.string(),
        descBn: z.string(),
      })
    )
    .min(1)
    .max(5),
  tasks: z
    .array(
      z.object({
        titleBn: z.string(),
        descBn: z.string(),
      })
    )
    .min(1)
    .max(5),
});

export type RawSeasonResponse = z.infer<typeof SeasonSchema>;

export const DiagnoseRequestSchema = z.object({
  crop: z.string().min(1),
  imageBase64: z.string().min(1),
  mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]),
  note: z.string().optional(),
});

export const ChatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
    })
  ),
  diagnosisContext: z.string().optional(),
  imageBase64: z.string().optional(),
});

export const SeasonRequestSchema = z.object({
  crop: z.string().min(1),
  banglaMonth: z.string().min(1),
  gregorianMonth: z.string().optional(),
});
