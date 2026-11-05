const test = require('node:test');
const assert = require('node:assert/strict');
const { z } = require('zod');

const DiagnosisSchema = z.object({
  isPlant: z.boolean(),
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
});

test('DiagnosisSchema successfully validates complete valid diagnostic result', () => {
  const validData = {
    isPlant: true,
    imageQuality: "good",
    retakeReason: null,
    problemType: "disease",
    problemNameBn: "ব্লাস্ট রোগ",
    confidence: "high",
    severity: "medium",
    whyBn: "স্যাঁতসেঁতে আবহাওয়া এবং অতিরিক্ত নাইট্রোজেন সারের কারণে ছত্রাকের আক্রমণ হয়েছে।",
    actionsBn: [
      "আক্রান্ত পাতা সংগ্রহ করে পুড়িয়ে ফেলুন।",
      "জমির অতিরিক্ত পানি নিষ্কাশন করুন।",
      "প্রয়োজনে অনুমোদিত ছত্রাকনাশক স্প্রে করুন।"
    ],
    avoidBn: [
      "ইউরিয়া সারের অতিরিক্ত প্রয়োগ করবেন না।",
      "রাতে গাছে পানি ছিটাবেন না।"
    ],
    chemicalMentioned: true,
    contactOfficer: false,
    possibleAlternativesBn: ["বাদামী দাগ রোগ"]
  };

  const parsed = DiagnosisSchema.safeParse(validData);
  assert.equal(parsed.success, true);
});

test('DiagnosisSchema correctly validates retake condition for non-plant or blurry image', () => {
  const retakeData = {
    isPlant: false,
    imageQuality: "poor",
    retakeReason: "ছবিটি কোনো গাছের নয়। দয়া করে আক্রান্ত ফসলের পাতা বা ডালের ছবি দিন।",
    problemType: "unknown",
    problemNameBn: "অজানা",
    confidence: "low",
    severity: "low",
    whyBn: "গাছের পাতা চিহ্নিত করা যায়নি।",
    actionsBn: ["নতুন করে স্পষ্ট ছবি তুলুন।"],
    avoidBn: ["অস্পষ্ট ছবি দেবেন না।"],
    chemicalMentioned: false,
    contactOfficer: false,
    possibleAlternativesBn: []
  };

  const parsed = DiagnosisSchema.safeParse(retakeData);
  assert.equal(parsed.success, true);
  assert.equal(parsed.data.isPlant, false);
  assert.equal(parsed.data.imageQuality, "poor");
});

test('DiagnosisSchema rejects invalid missing required fields', () => {
  const invalidData = {
    isPlant: true,
    // missing problemNameBn and actionsBn
  };

  const parsed = DiagnosisSchema.safeParse(invalidData);
  assert.equal(parsed.success, false);
});
