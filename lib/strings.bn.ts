/**
 * মাঠের ডাক্তার (Mather Daktar) - Centralized Bangla UI Strings
 * All user-facing text is kept in plain spoken Bangla for accessibility and ease of maintenance.
 */

export const STRINGS_BN = {
  appName: "মাঠের ডাক্তার",
  appTagline: "ফসলের ডাক্তার আপনার হাতের মুঠোয়",

  // Navigation tabs
  tabs: {
    doctor: "ডাক্তার",
    ask: "প্রশ্ন",
    season: "মৌসুম",
    history: "আমার রেকর্ড",
  },

  // Common actions
  actions: {
    back: "ফিরে যান",
    retry: "আবার চেষ্টা করুন",
    cancel: "বাতিল",
    confirm: "নিশ্চিত করুন",
    delete: "মুছে ফেলুন",
    close: "বন্ধ করুন",
    save: "সংরক্ষণ",
    share: "শেয়ার করুন",
    listen: "শুনুন",
    stopListening: "থামুন",
    askQuestion: "প্রশ্ন করুন",
    askAboutThis: "এই বিষয়ে প্রশ্ন করুন",
    retake: "আবার ছবি তুলুন",
    examine: "পরীক্ষা করুন",
    choosePhoto: "গ্যালারি থেকে নিন",
    takePhoto: "ছবি তুলুন",
    newChat: "নতুন কথোপকথন",
    send: "পাঠান",
  },

  // Diagnose flow (Doctor tab)
  diagnose: {
    heading: "আপনার ফসলের কী সমস্যা?",
    selectCropPrompt: "ফসল নির্বাচন করুন",
    photoTip: "দিনের আলোতে, আক্রান্ত পাতার কাছ থেকে ছবি তুলুন।",
    retakePrompt: "আবার তুলুন",
    optionalNoteToggle: "কিছু বলতে চান?",
    optionalNotePlaceholder: "যেমন: কতদিন ধরে সমস্যা দেখা যাচ্ছে...",
    otherCropPlaceholder: "ফসলের নাম লিখুন",
    loadingPrimary: "আপনার ছবি দেখা হচ্ছে...",
    loadingSlow: "একটু সময় লাগছে, অপেক্ষা করুন।",
    dropPhotoHere: "এখানে ছবি দিন অথবা নির্বাচন করুন",
  },

  // Result screen
  result: {
    title: "রোগ নির্ণয়ের ফলাফল",
    confidenceLevels: {
      high: "বেশি নিশ্চিত",
      medium: "মোটামুটি নিশ্চিত",
      low: "কম নিশ্চিত",
    },
    severityLevels: {
      high: "মারাত্মক ক্ষতি হতে পারে",
      medium: "মাঝারি ক্ষতি",
      low: "কম ক্ষতি",
    },
    sections: {
      why: "কেন হয়েছে",
      actions: "এখনই কী করবেন",
      avoid: "কী করবেন না",
      alternatives: "অন্য আর কী হতে পারে",
    },
    safetyBoxTitle: "সতর্কতা ও নিরাপত্তা",
    safetyBoxPesticideAdvice:
      "কীটনাশকের মাত্রা প্যাকেটের লেবেল দেখে বা কৃষি অফিসারের কাছ থেকে জেনে নিন।",
    safetyGearWarning:
      "ওষুধ ছিটানোর সময় মাস্ক, গ্লাভস ব্যবহার করুন এবং ছিটানোর পর সাবান দিয়ে ভালো করে হাত-মুখ ধুয়ে নিন।",
    officerTitle: "উপজেলা কৃষি অফিসারের সাথে যোগাযোগ করুন",
    officerDescription:
      "সমস্যাটি জটিল হতে পারে। নিকটস্থ কৃষি অফিসে যান অথবা জাতীয় কৃষি কল সেন্টারে সরাসরি বিনামূল্যে পরামর্শ নিন।",
    callCenterLabel: "কৃষি কল সেন্টার",
    callCenterNumber: "১৬১২৩",
    retakeTitle: "ছবিটি স্পষ্ট বোঝা যাচ্ছে না",
    retakeSubtitle:
      "গাছের সমস্যাটি সঠিকভাবে বোঝার জন্য অনুগ্রহ করে স্পষ্ট ও কাছে থেকে আরেকটি ছবি তুলুন।",
  },

  // Ask / Chat screen
  chat: {
    title: "কৃষি প্রশ্ন-উত্তর",
    subtitle: "ফসল নিয়ে আপনার যেকোনো প্রশ্ন লিখুন বা মুখে বলুন",
    inputPlaceholder: "আপনার প্রশ্ন লিখুন বা মাইকে বলুন...",
    listening: "শুনছি, বলুন...",
    stopRecording: "বলা শেষ",
    speaking: "পড়ে শোনানো হচ্ছে...",
    attachPhoto: "ছবি যোগ করুন",
    emptyGreeting:
      "নমস্কার / আসসালামু আলাইকুম! আপনার ফসল বা গাছপালায় কী সমস্যা হচ্ছে? আমাকে প্রশ্ন করতে পারেন।",
    contextBannerPrefix: "আলোচনা হচ্ছে:",
    suggestedQuestionsTitle: "প্রস্তাবিত প্রশ্নসমূহ:",
    defaultSuggestions: [
      "পোকা দমনে ঘরোয়া বা জৈব উপায় কী?",
      "এই মৌসুমে মাটিতে কী সার দেওয়া ভালো?",
      "পাতায় দাগ পড়লে কী করতে হয়?",
    ],
    resultSuggestions: [
      "কতদিনে ভালো হবে?",
      "জৈব উপায়ে কী করা যায়?",
      "অন্য গাছে ছড়াবে কি?",
    ],
  },

  // Season screen
  season: {
    title: "মৌসুমি সতর্কতা ও পরামর্শ",
    monthLabel: "বর্তমান বাংলা মাস:",
    seasonLabel: "কৃষি মৌসুম:",
    risksTitle: "এই মাসে সাবধান",
    tasksTitle: "এই মাসে করণীয়",
    selectCropTip: "অন্য ফসলের পরামর্শ দেখতে ওপরে ফসল পরিবর্তন করুন",
    loading: "মৌসুমি পরামর্শ লোড হচ্ছে...",
  },

  // History screen
  history: {
    title: "আমার রেকর্ড",
    subtitle: "আগের পরীক্ষার তালিকা",
    emptyTitle: "কোনো পূর্বের রেকর্ড নেই",
    emptySubtitle:
      "আপনার ফসলের কোনো পাতার ছবি তুলে রোগ নির্ণয় করুন। আপনার পরীক্ষার ইতিহাস এখানে সংরক্ষিত থাকবে।",
    startDiagnose: "প্রথম পরীক্ষা করুন",
    deleteConfirmTitle: "মুছে ফেলবেন?",
    deleteConfirmBody: "এই রেকর্ডটি তালিকা থেকে চিরতরে মুছে ফেলা হবে।",
    maxLimitNotice: "সর্বোচ্চ ৩০টি রেকর্ড রাখা যায়। নতুন যোগ হলে পুরনোটি সরে যাবে।",
  },

  // Help screen
  help: {
    title: "কীভাবে ব্যবহার করবেন",
    step1Title: "১. ফসল বাছুন",
    step1Desc: "আপনার ফসলের নাম নির্বাচন করুন। তালিকা না থাকলে 'অন্য ফসল' লিখুন।",
    step2Title: "২. ছবি তুলুন",
    step2Desc: "দিনের আলোতে আক্রান্ত পাতা বা ডালের স্পষ্ট ছবি তুলুন।",
    step3Title: "৩. উত্তর পড়ুন বা শুনুন",
    step3Desc: "কেন হয়েছে এবং কী করণীয় তা জেনে নিন, অথবা 'শুনুন' চেপে শুনুন।",
    officerGuidanceTitle: "কখন কৃষি অফিসারের কাছে যাবেন?",
    officerGuidanceDesc:
      "যদি ফলাফল 'কম নিশ্চিত' হয়, আক্রমণ দ্রুত ছড়িয়ে পড়ে, কিংবা মারাত্মক ক্ষতি হওয়ার শঙ্কা থাকে—দেরি না করে সরাসরি উপজেলা কৃষি অফিসে যোগাযোগ করুন।",
    privacyBadge: "আপনার ছবি আমরা সংরক্ষণ করি না। এটি সম্পূর্ণ ব্যক্তিগত।",
    contactTitle: "জাতীয় কৃষি সহায়তা",
  },

  // Errors & States
  errors: {
    offline: "ইন্টারনেট সংযোগ নেই। সংযোগ ঠিক হলে আবার চেষ্টা করুন।",
    rateLimit:
      "অল্প সময়ে অনেক অনুরোধ এসেছে। দয়া করে কিছুক্ষণ অপেক্ষা করে আবার চেষ্টা করুন।",
    serverError:
      "সার্ভারে সাময়িক সমস্যা হচ্ছে। একটু পর আবার চেষ্টা করুন।",
    invalidImage: "অনুগ্রহ করে একটি সঠিক ছবির ফাইল নির্বাচন করুন (JPEG, PNG বা WebP)।",
    imageTooLarge: "ছবির সাইজ অনেক বড়। ছোট ছবি বেছে নিন।",
    cameraDenied:
      "ক্যামেরা ব্যবহারের অনুমতি দেওয়া হয়নি। ব্রাউজারের সেটিংসে গিয়ে ক্যামেরার অনুমতি দিন অথবা গ্যালারি থেকে ছবি নির্বাচন করুন।",
    micDenied:
      "মাইক্রোফোন ব্যবহারের অনুমতি দেওয়া হয়নি। সেটিংসে মাইক্রোফোনের অনুমতি দিন অথবা টাইপ করে লিখুন।",
    speechNotSupported:
      "আপনার ডিভাইসে বাংলা কণ্ঠস্বর বা ভয়েস ফিচার সমর্থিত নয়।",
  },

  // Buildathon sticker
  sticker: {
    alt: "Built For Ostad Presents YUNet AIgnite Buildathon 2026",
    fallbackText: "YUNet AIgnite 2026",
  },
} as const;
