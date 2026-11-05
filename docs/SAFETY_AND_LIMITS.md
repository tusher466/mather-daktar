# Safety Guidelines & System Limits: মাঠের ডাক্তার

"মাঠের ডাক্তার" (Mather Daktar) serves vulnerable smallholder farming communities. Erroneous chemical advice can destroy a farmer's crop, cause chemical poisoning, or contaminate groundwater. This document details the safety architecture, ethical boundaries, and escalation protocols embedded in the platform.

---

## 1. What the System Will Do

- Identify visible plant symptoms, fungal infections, common insect damages, and nutritional chlorosis/deficiencies from leaf/stem photos.
- Recommend practical, low-cost Integrated Pest Management (IPM) measures first (e.g., pruning infected leaves, yellow sticky traps, light traps, neem cake, balanced irrigation).
- Provide seasonal agricultural advisories keyed to the revised Bangladesh Bengali calendar (Boishakh through Chaitra).
- Offer spoken voice readout in Bangla for farmers with limited literacy.
- Escalate immediately to verified government extension channels when certainty is low or potential damage is critical.

---

## 2. What the System Will NOT Do

- **NO Exact Pesticide Dosages**: The app **strictly forbids** prescribing exact chemical dosages (e.g. "৫ মিলি প্রতি লিটার পানিতে গুলিয়ে স্প্রে করুন") or commercial retail brands (e.g. "মার্শাল", "ভার্টিমেক", "স্কোর").
  - *Why*: Chemical concentrations vary wildly by manufacturer, formulation (EC, WP, SC, WDG), shelf-life, and tank dilution. Recommending unverified milliliter doses over AI risks crop scorch, chemical toxicity, and legal liabilities.
- **NO Hallucinated Guesses on Poor Images**: If a photo is blurry, dark, shot from too far, or does not depict a plant, the AI will **never make up a disease**. It sets `isPlant: false` or `imageQuality: "poor"` and explicitly instructs the farmer to retake a clear photo.
- **NO Advice on Non-Farming Topics**: The chat engine is locked to agricultural, plant health, and soil topics. Extraneous topics (politics, general gossip) are politely deflected in a single spoken Bangla sentence.
- **NO Image Persistence**: User photos are **never stored on the server or logged into disk**. Images are received in memory, evaluated, and immediately garbage-collected.

---

## 3. Confidence Bar Design (Avoiding Raw Percentages)

Farmers and non-technical users can be misled by false precision (e.g., "83.7% sure"). The system normalizes confidence into three human-understandable visual bands:

| Level | Visual Indicator | Meaning in Spoken Bangla |
|---|---|---|
| **High** | Full green bar | **বেশি নিশ্চিত** - স্পষ্ট ও দৃশ্যমান লক্ষণ মিলেছে। |
| **Medium** | Two-thirds harvest bar | **মোটামুটি নিশ্চিত** - লক্ষণ মিলেছে, তবে আবহাওয়া বা পুষ্টির প্রভাব থাকতে পারে। |
| **Low** | One-third red bar | **কম নিশ্চিত** - লক্ষণ অস্পষ্ট; কৃষি কর্মকর্তার সরাসরি মতামত আবশ্যক। |

---

## 4. Upazila Agriculture Officer Escalation Protocol

Whenever:
1. `severity: "high"` (threat of devastating yield loss), or
2. `confidence: "low"` (uncertain diagnosis), or
3. `contactOfficer: true`

The app automatically surfaces the verified **Officer Contact Box** prominently above the action bar:
- **Hotline**: National Krishi Call Center (**১৬১২৩**) operated by Agricultural Information Service (AIS), Ministry of Agriculture, Bangladesh.
- **One-Tap Direct Dial**: Renders a prominent `<a href="tel:16123">` button allowing instant calling without needing to memorize digits.
- **Local Office Recommendation**: Advises visiting the nearest Union Agricultural Extension Service (উপ-সহকারী কৃষি কর্মকর্তা - SAAO) or Upazila Agriculture Office (DAE).
