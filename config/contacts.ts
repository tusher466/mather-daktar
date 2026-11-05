/**
 * Official verified agricultural contacts in Bangladesh
 * Source: Agricultural Information Service (AIS), Ministry of Agriculture, Bangladesh
 */
export const OFFICIAL_CONTACTS = {
  krishiCallCenter: {
    nameBn: "জাতীয় কৃষি কল সেন্টার",
    shortNumber: "16123",
    displayNumberBn: "১৬১২৩",
    operatingHoursBn: "সকাল ৯টা হতে বিকাল ৫টা (সরকারি ছুটির দিন ব্যতীত)",
    descriptionBn: "যেকোনো মোবাইল অপারেটর থেকে সরাসরি বিনামূল্যে/স্বল্পমূল্যে কৃষি বিশেষজ্ঞের পরামর্শ নিন",
    callUrl: "tel:16123",
  },
  dae: {
    nameBn: "কৃষি সম্প্রসারণ অধিদপ্তর (DAE)",
    descriptionBn: "আপনার স্থানীয় ইউনিয়ন বা উপজেলা কৃষি কর্মকর্তার কার্যালয়",
    website: "https://dae.gov.bd",
  },
  ais: {
    nameBn: "কৃষি তথ্য সার্ভিস (AIS)",
    website: "https://ais.gov.bd",
  },
} as const;
