const test = require("node:test");
const assert = require("node:assert");

// Fast mock of classify functions for Node test runner
const CROP_KEYWORD_MAP = [
  { id: "tomato", nameBn: "টমেটো", keywords: ["tomato", "tometo", "টমেটো"] },
  { id: "eggplant", nameBn: "বেগুন", keywords: ["eggplant", "brinjal", "aubergine", "begun", "বেগুন"] },
  { id: "potato", nameBn: "আলু", keywords: ["potato", "alu", "আলু"] },
  { id: "mustard", nameBn: "সরিষা", keywords: ["mustard", "sorisha", "shorisha", "সরিষা"] },
  { id: "rice", nameBn: "ধান", keywords: ["rice", "paddy", "dhan", "ধান"] },
  { id: "chili", nameBn: "মরিচ", keywords: ["chili", "chilli", "pepper", "morich", "মরিচ"] },
  { id: "jute", nameBn: "পাট", keywords: ["jute", "pat", "paat", "পাট"] },
  { id: "non_plant", nameBn: "অ-উদ্ভিদ বা ভিন্ন ছবি", keywords: ["car", "cat", "dog", "screenshot", "selfie", "person", "food", "bibimbap"] },
];

function detectCropFromFileName(fileName) {
  if (!fileName) return null;
  const lower = fileName.toLowerCase();
  for (const item of CROP_KEYWORD_MAP) {
    for (const kw of item.keywords) {
      if (lower.includes(kw)) {
        return { id: item.id, nameBn: item.nameBn };
      }
    }
  }
  return null;
}

function checkCropMismatch(selectedCropId, fileName) {
  const fromFile = detectCropFromFileName(fileName);
  if (fromFile && fromFile.id !== "non_plant" && fromFile.id !== selectedCropId) {
    return {
      detectedCropBn: fromFile.nameBn,
      detectedCropId: fromFile.id,
      isMismatch: true,
      reasonBn: `নির্বাচিত ফসল ও আপলোডকৃত ছবি মিলছে না। আপনি নির্বাচন করেছেন '${selectedCropId}', কিন্তু ফাইলের নাম ও ছবি '${fromFile.nameBn}'-এর।`,
    };
  }
  if (fromFile && fromFile.id === "non_plant") {
    return {
      detectedCropBn: fromFile.nameBn,
      detectedCropId: "non_plant",
      isMismatch: true,
      reasonBn: "আপলোডকৃত ছবিটি কোনো ফসল বা উদ্ভিদের বলে মনে হচ্ছে না।",
    };
  }
  return {
    detectedCropBn: null,
    detectedCropId: null,
    isMismatch: false,
  };
}

test("detectCropFromFileName identifies eggplant, tomato, potato, rice and non_plant", () => {
  assert.strictEqual(detectCropFromFileName("my_eggplant_leaf.jpg")?.id, "eggplant");
  assert.strictEqual(detectCropFromFileName("tomato_blight.png")?.id, "tomato");
  assert.strictEqual(detectCropFromFileName("rice_blast.jpeg")?.id, "rice");
  assert.strictEqual(detectCropFromFileName("car_selfie.jpg")?.id, "non_plant");
  assert.strictEqual(detectCropFromFileName("unknown_photo_123.jpg"), null);
});

test("checkCropMismatch flags mismatch when selected crop differs from image crop", () => {
  // User selected rice, but uploaded eggplant
  const res1 = checkCropMismatch("rice", "eggplant_leaf.jpg");
  assert.strictEqual(res1.isMismatch, true);
  assert.strictEqual(res1.detectedCropBn, "বেগুন");

  // User selected rice, but uploaded non-plant
  const res2 = checkCropMismatch("rice", "car_selfie.png");
  assert.strictEqual(res2.isMismatch, true);
  assert.strictEqual(res2.detectedCropId, "non_plant");

  // User selected rice and uploaded rice
  const res3 = checkCropMismatch("rice", "rice_field.jpg");
  assert.strictEqual(res3.isMismatch, false);
});
