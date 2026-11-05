/**
 * Converts English digits (0-9) to Bangla digits (০-৯)
 */
export function toBanglaDigits(input: string | number): string {
  if (input === null || input === undefined) return "";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(input).replace(/[0-9]/g, (digit) => banglaDigits[parseInt(digit, 10)]);
}

/**
 * Converts a Date object or timestamp to a friendly Bangla formatted date string
 * Example: ১৫ কার্তিক, ২০২৬
 */
export function formatBanglaDate(dateInput: Date | number | string): string {
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
