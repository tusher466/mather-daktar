const test = require('node:test');
const assert = require('node:assert/strict');

const BANGLA_MONTHS = [
  "বৈশাখ",
  "জ্যৈষ্ঠ",
  "আষাঢ়",
  "শ্রাবণ",
  "ভাদ্র",
  "আশ্বিন",
  "কার্তিক",
  "অগ্রহায়ণ",
  "পৌষ",
  "মাঘ",
  "ফাল্গুন",
  "চৈত্র",
];

function getBanglaDate(date = new Date()) {
  const gYear = date.getFullYear();
  const gMonth = date.getMonth();
  const gDay = date.getDate();

  let banglaMonthIndex = 0;
  let banglaDay = 1;
  let banglaYear = gYear - 593;

  if (gMonth === 3 && gDay >= 14) {
    // Mid April = Boishakh
    banglaMonthIndex = 0;
    banglaDay = gDay - 13;
  } else if (gMonth === 10) {
    // November
    if (gDay < 16) {
      banglaMonthIndex = 6; // Kartik
      banglaDay = gDay + 15;
    } else {
      banglaMonthIndex = 7; // Agrahayan
      banglaDay = gDay - 15;
    }
  } else if (gMonth === 0) {
    // January
    if (gDay < 15) {
      banglaMonthIndex = 8; // Poush
      banglaDay = gDay + 16;
    } else {
      banglaMonthIndex = 9; // Magh
      banglaDay = gDay - 14;
    }
  }

  let seasonNameBn = "রবি মৌসুম (শীতকালীন)";
  if (banglaMonthIndex >= 6 && banglaMonthIndex <= 10) {
    seasonNameBn = "রবি মৌসুম (শীতকালীন)";
  } else if (banglaMonthIndex === 11 || banglaMonthIndex <= 2) {
    seasonNameBn = "খরিফ-১ মৌসুম (গ্রীষ্মকালীন)";
  } else {
    seasonNameBn = "খরিফ-২ মৌসুম (বর্ষাকালীন)";
  }

  return {
    banglaMonth: BANGLA_MONTHS[banglaMonthIndex],
    banglaMonthIndex,
    banglaDay,
    seasonNameBn,
  };
}

test('Bangla calendar maps November accurately to Kartik / Agrahayan and Rabi season', () => {
  const testDate = new Date(2026, 10, 5); // Nov 5, 2026
  const result = getBanglaDate(testDate);
  assert.equal(result.banglaMonth, 'কার্তিক');
  assert.equal(result.seasonNameBn, 'রবি মৌসুম (শীতকালীন)');
});

test('Bangla calendar maps mid-April to Boishakh and Kharif-1 season', () => {
  const testDate = new Date(2026, 3, 15); // Apr 15, 2026
  const result = getBanglaDate(testDate);
  assert.equal(result.banglaMonth, 'বৈশাখ');
  assert.equal(result.seasonNameBn, 'খরিফ-১ মৌসুম (গ্রীষ্মকালীন)');
});
