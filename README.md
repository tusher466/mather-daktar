# মাঠের ডাক্তার (Mather Daktar) 🌾🌿

**মাঠের ডাক্তার (Mather Daktar)** হলো বাংলাদেশের প্রান্তিক কৃষক, তাদের সন্তান, কৃষিশিক্ষার্থী এবং ছাদবাগানীদের জন্য একটি সম্পূর্ণ বাংলা মোবাইল ওয়েব অ্যাপ্লিকেশন। এটি ব্যবহার করে যে কেউ আক্রান্ত গাছের পাতার ছবি তুলে কয়েক সেকেন্ডের মধ্যে সহজ কথ্য বাংলায় রোগের সঠিক কারণ, ক্ষয়ক্ষতির মাত্রা, প্রতিকার এবং পরিবেশবান্ধব ও সমন্বিত বালাই দমন (IPM) পরামর্শ পেতে পারেন।

*Official submission for Ostad Presents YUNet AIgnite Buildathon 2026.*

---

## 🚀 প্রধান বৈশিষ্ট্যসমূহ (Key Features)

1. **ফসল ও পাতা নির্ণয় (Doctor Tab `/`)**:
   - বাংলাদেশের প্রধান ১২টি ফসল (ধান, আলু, টমেটো, বেগুন, মরিচ, পাট, ভুট্টা, সরিষা, পেঁয়াজ, বাঁধাকপি/ফুলকপি, লাউ/কুমড়া এবং অন্যান্য ফসল)।
   - সরাসরি ক্যামেরা বা গ্যালারি থেকে ছবি আপলোড।
   - ব্রাউজারে স্বয়ংক্রিয় ইমেজ কম্প্রেশন (< 400KB, max 1024px)।
   - ছবি ঘোলা বা অন্য কিছুর হলে আন্দাজে রোগ না বলে পুনরায় ছবি তোলার দিকনির্দেশনা (Retake State)।

2. **সম্পূর্ণ ফলাফল ও দিকনির্দেশনা (`/result/[id]`)**:
   - বাংলা নাম, ক্ষয়ক্ষতির ঝুঁকি এবং রঙিন আত্মবিশ্বাস বার (বেশি নিশ্চিত / মোটামুটি নিশ্চিত / কম নিশ্চিত)।
   - কেন হয়েছে (Why), এখনই কী করবেন (জৈব ও সাশ্রয়ী পদ্ধতি প্রথমে), এবং কী করবেন না (Avoid)।
   - রাসায়নিক ওষুধ থাকলে নিরাপত্তা সতর্কতা (মাস্ক, গ্লাভস পরা এবং ফসল তোলার নির্দিষ্ট বিরতি)।
   - সরকারি জাতীয় কৃষি কল সেন্টার **১৬১২৩** হটলাইন ইন্টিগ্রেশন।
   - বাংলা টেক্সট-টু-স্পিচ (পড়ে শোনানো), শেয়ার কার্ড (WhatsApp ও ছবি ডাউনলোড), এবং এই বিষয়ে সরাসরি প্রশ্ন করার সুবিধা।

3. **কৃষি প্রশ্ন-উত্তর চ্যাট (`/ask`)**:
   - বাংলা কথ্য ভাষায় টেক্সট ও ভয়েস ইনপুট (`bn-BD` স্পিচ রিকগনিশন)।
   - নির্ণয়কৃত রোগের প্রেক্ষাপট মনে রেখে প্রাসঙ্গিক পরামর্শ।
   - প্রস্তাবিত দ্রুত প্রশ্ন এবং নতুন কথোপকথন শুরুর সুবিধা।

4. **মৌসুমি সতর্কতা ও প্রস্তুতি (`/season`)**:
   - বাংলাদেশের সংশোধিত বাংলা বর্ষপঞ্জি (বাংলা একাডেমি নিয়ম) অনুযায়ী চলতি বাংলা মাস ও কৃষি মৌসুম (রবি, খরিফ-১, খরিফ-২; আউশ/আমন/বোরো)।
   - প্রতি ফসলের জন্য চলতি মাসের ৩টি প্রধান ঝুঁকি ও ৩টি প্রধান করণীয়।
   - ৩০ দিনের লোকাল ক্যাশিং—একবার লোড হলে ইন্টারনেট ছাড়াই তৎক্ষণাৎ দেখা যায়।

5. **আমার রেকর্ড হিস্ট্রি (`/history`)**:
   - কোনো ডাটাবেজ বা লগইন ছাড়া প্রতি ডিভাইসের লোকাল স্টোরেজে ৩০টি পর্যন্ত পূর্ববর্তী ফলাফল সংরক্ষিত।
   - তারিখ বাংলা সংখ্যায় (`১৫ কার্তিক, ২০২৬`), থাম্বনেইল ভিউ ও স্থায়ী মুছে ফেলার সুযোগ।

6. **সহজ নির্দেশিকা (`/help`)**:
   - ৩টি ধাপে ব্যবহারের নিয়ম এবং "আপনার ছবি আমরা সংরক্ষণ করি না" গোপনীয়তা নিশ্চয়তা।

---

## 🛠️ প্রযুক্তি স্ট্যাক (Tech Stack)

- **Framework**: Next.js 14+ (App Router, React 18, Server Components & Server Actions)
- **Language**: TypeScript (Strict mode, zero `any`)
- **Styling**: Tailwind CSS (Human-designed warm palette: `#1F6B3A`, `#F6F3EA`, `#C9892B`)
- **Validation**: Zod (100% type-safe request/response validation)
- **AI Abstraction**: `lib/ai/client.ts` (Google Gemini API & Anthropic Claude API)
- **Voice**: Web Speech API (`SpeechRecognition` bn-BD & `speechSynthesis`)
- **Storage**: Typed localStorage helpers (no backend database, zero tracking)
- **Deployment**: Vercel (Edge-ready, free tier compatible)

---

## ⚙️ ইনস্টলেশন ও লোকাল সেটআপ (Local Setup)

### ১. ক্লোন ও নির্ভরতা ইনস্টল করুন
```bash
cd "e:\Ostad Hackathon"
npm install
```

### ২. এনভায়রনমেন্ট ভেরিয়েবল সেট করুন
প্রজেক্টের রুট ডিরেক্টরিতে `.env.local` তৈরি করুন (অথবা `.env.example` কপি করুন):
```bash
cp .env.example .env.local
```

`.env.local` ফাইলের ভেতরে আপনার এআই কি যোগ করুন:
```env
AI_API_KEY=your_gemini_or_claude_api_key_here
AI_PROVIDER=gemini
AI_MODEL=gemini-2.5-flash
```

### ৩. ডেভেলপমেন্ট সার্ভার চালু করুন
```bash
npm run dev
```
ব্রাউজারে খুলুন: `http://localhost:3000`

---

## 🧪 টেস্ট ও কোয়ালিটি চেক

```bash
# ইউনিট টেস্ট চালান (Bangla digits, calendar, Zod schemas, rate limiter)
npm test

# টাইপচেক চালান (Strict TypeScript)
npx tsc --noEmit

# ESLint লিন্ট চেক
npm run lint

# প্রোডাকশন বিল্ড যাচাই
npm run build
```

---

## 📂 ফোল্ডার ওভারভিউ (Directory Overview)

```
mather-daktar/
├─ app/                  # Next.js App Router পেজ ও API রুট
│  ├─ layout.tsx         # গ্লোবাল লেআউট, Noto Sans Bengali ফন্ট ও PWA মেটা
│  ├─ page.tsx           # ডাক্তার ট্যাব (/)
│  ├─ ask/page.tsx       # প্রশ্ন চ্যাট ট্যাব (/ask)
│  ├─ season/page.tsx    # মৌসুম সতর্কতা ট্যাব (/season)
│  ├─ history/page.tsx   # রেকর্ড হিস্ট্রি ট্যাব (/history)
│  ├─ help/page.tsx      # সাহায্য নির্দেশিকা (/help)
│  ├─ result/[id]/       # রোগ নির্ণয় ফলাফল স্ক্রিন
│  └─ api/               # /diagnose, /chat, /season ব্যাকএন্ড রুট
├─ components/
│  ├─ layout/            # Navbar, BottomTabs, BuildathonSticker, PageShell
│  ├─ diagnose/          # CropGrid, PhotoPicker, PhotoPreview, LoadingLeaf
│  ├─ result/            # VerdictCard, StepList, SafetyBox, OfficerBox, ActionBar
│  ├─ chat/              # MessageBubble, ChatInput, MicButton, SuggestionChips
│  ├─ season/            # SeasonCard
│  ├─ history/           # HistoryItem
│  └─ ui/                # Button, Card, Badge, Dialog, ErrorState, EmptyState
├─ lib/
│  ├─ ai/                # client.ts (AI Abstraction), prompts.ts, schemas.ts, parse.ts
│  ├─ image/             # compress.ts, validate.ts
│  ├─ storage/           # history.ts, chat.ts, preferences.ts
│  ├─ voice/             # speech-recognition.ts, speech-synthesis.ts
│  ├─ share/             # make-card.ts, share.ts
│  ├─ bangla/            # digits.ts, calendar.ts
│  ├─ rate-limit.ts      # per-IP sliding rate limiter
│  └─ strings.bn.ts      # সব বাংলা টেক্সট ও লেবেলের কেন্দ্রীয় ডিকশনারি
├─ config/               # crops.ts, contacts.ts
├─ docs/                 # পূর্ণাঙ্গ ডকুমেন্টেশন
└─ public/               # sticker.png, icons, manifest.json
```

---

## 🏆 Ostad x YUNet AIgnite Buildathon 2026
নির্মিত: **মাঠের ডাক্তার (Mather Daktar)**  
টিম লক্ষ্য: বাংলাদেশের প্রান্তিক কৃষকদের হাতে প্রযুক্তির শক্তি পৌঁছে দেওয়া।
