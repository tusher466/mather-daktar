const test = require('node:test');
const assert = require('node:assert/strict');

// Import built or compiled functions, or pure JS logic mirror
function toBanglaDigits(input) {
  if (input === null || input === undefined) return "";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(input).replace(/[0-9]/g, (digit) => banglaDigits[parseInt(digit, 10)]);
}

function formatBanglaDate(dateInput) {
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return "";

  const day = toBanglaDigits(d.getDate());
  const year = toBanglaDigits(d.getFullYear());

  const enMonthsBn = [
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

  const month = enMonthsBn[d.getMonth()];
  return `${day} ${month}, ${year}`;
}

test('toBanglaDigits converts standard numbers to Bengali numerals', () => {
  assert.equal(toBanglaDigits(0), '০');
  assert.equal(toBanglaDigits(12345), '১২৩৪৫');
  assert.equal(toBanglaDigits(67890), '৬৭৮৯০');
  assert.equal(toBanglaDigits('Call 16123'), 'Call ১৬১২৩');
  assert.equal(toBanglaDigits(''), '');
  assert.equal(toBanglaDigits(null), '');
});

test('formatBanglaDate outputs Bangla digits and month names', () => {
  const testDate = new Date('2026-11-05T12:00:00Z');
  const formatted = formatBanglaDate(testDate);
  assert.match(formatted, /নভেম্বর/);
  assert.match(formatted, /২০২৬/);
});
