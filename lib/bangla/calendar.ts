import { toBanglaDigits } from "./digits";

export interface BanglaDateInfo {
  banglaMonth: string;
  banglaMonthIndex: number; // 0-indexed (0: বৈশাখ ... 11: চৈত্র)
  banglaDay: number;
  banglaDayBn: string;
  banglaYear: number;
  banglaYearBn: string;
  gregorianMonthNameBn: string;
  seasonNameBn: string; // e.g. "রবি মৌসুম", "খরিফ-১", "খরিফ-২"
  seasonDescriptionBn: string;
  riceSeasonBn: string; // "আউশ", "আমন", or "বোরো"
}

export const BANGLA_MONTHS = [
  "বৈশাখ", // 0 (Starts ~Apr 14)
  "জ্যৈষ্ঠ", // 1 (Starts ~May 15)
  "আষাঢ়", // 2 (Starts ~Jun 15)
  "শ্রাবণ", // 3 (Starts ~Jul 16)
  "ভাদ্র", // 4 (Starts ~Aug 16)
  "আশ্বিন", // 5 (Starts ~Sep 16)
  "কার্তিক", // 6 (Starts ~Oct 17)
  "অগ্রহায়ণ", // 7 (Starts ~Nov 16)
  "পৌষ", // 8 (Starts ~Dec 16)
  "মাঘ", // 9 (Starts ~Jan 15)
  "ফাল্গুন", // 10 (Starts ~Feb 14)
  "চৈত্র", // 11 (Starts ~Mar 15)
];

const GREGORIAN_MONTHS_BN = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

/**
 * Calculates official Bangladesh Bangla calendar date from Gregorian date
 * Uses Bangladesh revised rules (Bangla Academy 2019):
 * Boishakh to Ashwin: 31 days each (first 6 months)
 * Kartik to Magh: 30 days each (4 months)
 * Falgun: 29 or 30 (leap year)
 * Chaitra: 30 days
 */
export function getBanglaDate(date: Date = new Date()): BanglaDateInfo {
  const gYear = date.getFullYear();
  const gMonth = date.getMonth(); // 0-11
  const gDay = date.getDate(); // 1-31

  // Start days of Bengali months in Gregorian calendar (non-leap year)
  // [MonthIndex, GregMonth, GregDay]
  // Boishakh: Apr 14
  // Jaishtha: May 15
  // Ashar: Jun 15
  // Sraban: Jul 16
  // Bhadra: Aug 16
  // Ashwin: Sep 16
  // Kartik: Oct 17
  // Agrahayan: Nov 16
  // Poush: Dec 16
  // Magh: Jan 15
  // Falgun: Feb 14
  // Chaitra: Mar 15

  let banglaMonthIndex = 0;
  let banglaDay = 1;
  let banglaYear = gYear - 593;

  if (gMonth === 0) {
    // January
    if (gDay < 15) {
      banglaMonthIndex = 8; // পৌষ
      banglaDay = gDay + 16;
    } else {
      banglaMonthIndex = 9; // মাঘ
      banglaDay = gDay - 14;
    }
    banglaYear = gYear - 594;
  } else if (gMonth === 1) {
    // February
    if (gDay < 14) {
      banglaMonthIndex = 9; // মাঘ
      banglaDay = gDay + 17;
    } else {
      banglaMonthIndex = 10; // ফাল্গুন
      banglaDay = gDay - 13;
    }
    banglaYear = gYear - 594;
  } else if (gMonth === 2) {
    // March
    if (gDay < 15) {
      banglaMonthIndex = 10; // ফাল্গুন
      banglaDay = gDay + 15;
    } else {
      banglaMonthIndex = 11; // চৈত্র
      banglaDay = gDay - 14;
    }
    banglaYear = gYear - 594;
  } else if (gMonth === 3) {
    // April
    if (gDay < 14) {
      banglaMonthIndex = 11; // চৈত্র
      banglaDay = gDay + 17;
      banglaYear = gYear - 594;
    } else {
      banglaMonthIndex = 0; // বৈশাখ
      banglaDay = gDay - 13;
      banglaYear = gYear - 593;
    }
  } else if (gMonth === 4) {
    // May
    if (gDay < 15) {
      banglaMonthIndex = 0; // বৈশাখ
      banglaDay = gDay + 17;
    } else {
      banglaMonthIndex = 1; // জ্যৈষ্ঠ
      banglaDay = gDay - 14;
    }
  } else if (gMonth === 5) {
    // June
    if (gDay < 15) {
      banglaMonthIndex = 1; // জ্যৈষ্ঠ
      banglaDay = gDay + 17;
    } else {
      banglaMonthIndex = 2; // আষাঢ়
      banglaDay = gDay - 14;
    }
  } else if (gMonth === 6) {
    // July
    if (gDay < 16) {
      banglaMonthIndex = 2; // আষাঢ়
      banglaDay = gDay + 16;
    } else {
      banglaMonthIndex = 3; // শ্রাবণ
      banglaDay = gDay - 15;
    }
  } else if (gMonth === 7) {
    // August
    if (gDay < 16) {
      banglaMonthIndex = 3; // শ্রাবণ
      banglaDay = gDay + 16;
    } else {
      banglaMonthIndex = 4; // ভাদ্র
      banglaDay = gDay - 15;
    }
  } else if (gMonth === 8) {
    // September
    if (gDay < 16) {
      banglaMonthIndex = 4; // ভাদ্র
      banglaDay = gDay + 16;
    } else {
      banglaMonthIndex = 5; // আশ্বিন
      banglaDay = gDay - 15;
    }
  } else if (gMonth === 9) {
    // October
    if (gDay < 17) {
      banglaMonthIndex = 5; // আশ্বিন
      banglaDay = gDay + 15;
    } else {
      banglaMonthIndex = 6; // কার্তিক
      banglaDay = gDay - 16;
    }
  } else if (gMonth === 10) {
    // November
    if (gDay < 16) {
      banglaMonthIndex = 6; // কার্তিক
      banglaDay = gDay + 15;
    } else {
      banglaMonthIndex = 7; // অগ্রহায়ণ
      banglaDay = gDay - 15;
    }
  } else if (gMonth === 11) {
    // December
    if (gDay < 16) {
      banglaMonthIndex = 7; // অগ্রহায়ণ
      banglaDay = gDay + 15;
    } else {
      banglaMonthIndex = 8; // পৌষ
      banglaDay = gDay - 15;
    }
  }

  // Determine Bangladesh Agricultural Seasons:
  // রবি (Rabi): Kartik, Agrahayan, Poush, Magh, Falgun (Mid Oct to Mid Mar)
  // খরিফ-১ (Kharif-1): Chaitra, Boishakh, Jaishtha, Ashar (Mid Mar to Mid Jul)
  // খরিফ-২ (Kharif-2): Sraban, Bhadra, Ashwin (Mid Jul to Mid Oct)
  let seasonNameBn = "রবি মৌসুম (শীতকালীন)";
  let seasonDescriptionBn = "শীতকালীন শাকসবজি, সরিষা, আলু ও বোরো ধানের চারা তৈরির উপযুক্ত সময়।";
  let riceSeasonBn = "বোরো ধান";

  if (banglaMonthIndex >= 6 && banglaMonthIndex <= 10) {
    seasonNameBn = "রবি মৌসুম (শীতকালীন)";
    seasonDescriptionBn = "শীতকালীন ফসল, ডাল, তেলবীজ, আলু, গম এবং বোরো ধানের মৌসুম।";
    riceSeasonBn = "বোরো ধান";
  } else if (banglaMonthIndex === 11 || banglaMonthIndex <= 2) {
    seasonNameBn = "খরিফ-১ মৌসুম (গ্রীষ্মকালীন)";
    seasonDescriptionBn = "গ্রীষ্মকালীন শাকসবজি, পাট, ভুট্টা এবং আউশ ধানের মৌসুম।";
    riceSeasonBn = "আউশ ধান";
  } else {
    seasonNameBn = "খরিফ-২ মৌসুম (বর্ষাকালীন)";
    seasonDescriptionBn = "বর্ষাকালীন আর্দ্র আবহাওয়া এবং রোপা আমন ধানের মূল মৌসুম।";
    riceSeasonBn = "রোপা আমন ধান";
  }

  return {
    banglaMonth: BANGLA_MONTHS[banglaMonthIndex],
    banglaMonthIndex,
    banglaDay,
    banglaDayBn: toBanglaDigits(banglaDay),
    banglaYear,
    banglaYearBn: toBanglaDigits(banglaYear),
    gregorianMonthNameBn: GREGORIAN_MONTHS_BN[gMonth],
    seasonNameBn,
    seasonDescriptionBn,
    riceSeasonBn,
  };
}
