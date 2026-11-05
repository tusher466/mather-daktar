# System Architecture: মাঠের ডাক্তার (Mather Daktar)

This document describes the software architecture, component relationships, state persistence, routing strategy, and AI provider interchangeability for **মাঠের ডাক্তার**.

---

## 1. Application Layering & Design Principles

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Runtime                         │
│  Pages (Next.js App Router) -> Components -> Custom Hooks   │
│       │                              │                      │
│       ▼                              ▼                      │
│  Typed Storage (localStorage)   Web Speech API (bn-BD)      │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP JSON (Strict Zod Payloads)
┌──────────────────────────────▼──────────────────────────────┐
│                    Next.js API Handlers                     │
│    POST /api/diagnose  │  POST /api/chat  │  POST /api/season │
│       │                       │                  │          │
│  IP Rate Limiter         IP Rate Limiter    IP Rate Limiter │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                   Unified AI Provider Abstraction            │
│                       lib/ai/client.ts                       │
│           ┌──────────────────┴──────────────────┐           │
│           ▼                                     ▼           │
│    Google Gemini API                    Anthropic Claude    │
│  (Multimodal / Vision)                 (Claude 3.5 Sonnet)  │
└─────────────────────────────────────────────────────────────┘
```

### Architectural Principles
- **Single Feature Ownership**: As specified in Section 4 of the product prompt, each screen owns exactly one capability. No duplicate features exist across views.
- **Server-Side Credentials**: Zero client-side API keys. The `AI_API_KEY` is referenced solely within Node.js runtime Route Handlers.
- **Zero Database / Zero Sign-up**: History, crop preferences, and conversations are safely stored in browser `localStorage` using small, typed wrappers with quota guards.
- **Bangla-First Localization**: All user strings are centrally declared in `lib/strings.bn.ts` for rapid editorial auditing and zero string scatter.

---

## 2. Routes & Screen Responsibilities

| Route | Responsibility | State Sources |
|---|---|---|
| `/` | Doctor Tab: Crop grid, photo capture, preview, trigger diagnosis | `useDiagnose`, `preferences.ts` |
| `/result/[id]` | Diagnosis result, read-aloud audio, share PNG card, "ask about this" | `history.ts` (cached item), `useSpeech` |
| `/ask` | Follow-up conversation with text & speech recognition | `useChat`, `chat.ts`, `useSpeech` |
| `/season` | Current Bengali month & agricultural season, risks & tasks | `/api/season`, 30-day cache in `localStorage` |
| `/history` | Past diagnostic results list, deletion with confirmation dialog | `history.ts` |
| `/help` | 3-step farmer guide, privacy commitment, Krishi Call Center 16123 | Static / `contacts.ts` |

---

## 3. Component Hierarchy & Composition

```
components/
├── layout/
│   ├── PageShell.tsx          # 480px responsive max container + offline detector
│   ├── Navbar.tsx             # Title + BuildathonSticker + Help (?) button
│   ├── BottomTabs.tsx         # 4 primary tabs (Doctor, Ask, Season, Records)
│   └── BuildathonSticker.tsx  # Ostad x YUNet Buildathon sticker with fallback
├── diagnose/
│   ├── CropGrid.tsx           # 12 crop choices (icon + Bangla label)
│   ├── PhotoPicker.tsx        # Camera input & gallery picker with tips
│   ├── PhotoPreview.tsx       # Image preview, optional note toggle, submit
│   └── LoadingLeaf.tsx        # Calm leaf animation with 15s slow message
├── result/
│   ├── VerdictCard.tsx        # Diagnosis name & colored confidence bar
│   ├── StepList.tsx           # Why, Action steps, Avoid mistakes
│   ├── SafetyBox.tsx          # Amber safety alert for chemical handling
│   ├── OfficerBox.tsx         # DAE / AIS Krishi Call Center 16123
│   ├── ActionBar.tsx          # 3 sticky actions: Listen, Share, Ask
│   └── ShareCard.tsx          # Download / WhatsApp share notification
├── chat/
│   ├── MessageBubble.tsx      # Chat bubbles with read-aloud buttons
│   ├── ChatInput.tsx          # Text field, mic button, send, attach image
│   ├── MicButton.tsx          # Large voice recording toggle
│   └── SuggestionChips.tsx    # Tappable suggested questions
├── season/
│   └── SeasonCard.tsx         # Top 3 risks & Top 3 tasks
├── history/
│   └── HistoryItem.tsx        # Item row with thumbnail, date in Bangla, delete
└── ui/
    ├── Button.tsx             # Minimum 56px touch target buttons
    ├── Card.tsx               # Card wrapper with ground border tokens
    ├── Badge.tsx              # Colored badge components
    ├── Dialog.tsx             # Accessible confirmation dialogs
    ├── ErrorState.tsx         # Plain Bangla error with retry
    └── EmptyState.tsx         # Friendly empty state
```

---

## 4. State Management & Offline Persistence

All client-side state is persisted via typed helpers:
- `lib/storage/preferences.ts`: Stores the last selected crop (`rice` by default).
- `lib/storage/history.ts`: Stores an array of up to 30 `DiagnosisResult` items. When adding the 31st item, the oldest item is evicted. If a browser throws a `QuotaExceededError`, older records are gracefully trimmed.
- `lib/storage/chat.ts`: Maintains the active conversational thread up to 20 messages.
- `lib/bangla/calendar.ts`: Computes Bengali calendar months (Boishakh to Chaitra) and crop seasons (Rabi, Kharif-1, Kharif-2) entirely on-device without remote network calls.

---

## 5. How to Swap the AI Provider

All AI integrations are encapsulated in a single file: `lib/ai/client.ts`.

### Switching between Gemini and Claude
By default, the client inspects `process.env.AI_PROVIDER` and the format of `process.env.AI_API_KEY`:

```bash
# To run on Google Gemini (Default):
AI_PROVIDER=gemini
AI_MODEL=gemini-2.5-flash
AI_API_KEY=AIzaSy...

# To switch to Anthropic Claude:
AI_PROVIDER=anthropic
AI_MODEL=claude-3-5-sonnet-20241022
AI_API_KEY=sk-ant-...
```

Both models adhere to the exact same Zod schema definitions (`DiagnosisSchema` and `SeasonSchema`). If a provider produces malformed JSON, `lib/ai/client.ts` automatically runs a repair pass with schema feedback before bubbling an error.
