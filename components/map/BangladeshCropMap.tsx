"use client";

import React, { useState } from "react";
import {
  MapPin,
  Sparkles,
  Search,
  Droplets,
  Layers,
  Calendar,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Sprout,
  Sun,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { BangladeshVisualMap } from "./BangladeshVisualMap";
import { toBanglaDigits } from "@/lib/bangla/digits";

export interface DivisionCropData {
  id: string;
  nameBn: string;
  nameEn: string;
  zone: string;
  soilType: string;
  soilDescription: string;
  climateFeature: string;
  primaryCrops: {
    name: string;
    variety?: string;
    season: string;
    suitability: "উচ্চ ফলনশীল" | "সেরা মান" | "ঐতিহ্যবাহী";
    notes: string;
    badgeColor: string;
  }[];
  regionalTips: string;
  soilPh: string;
}

export const BANGLADESH_DIVISIONS: DivisionCropData[] = [
  {
    id: "rangpur",
    nameBn: "রংপুর বিভাগ",
    nameEn: "Rangpur",
    zone: "উত্তরবঙ্গ (তিস্তা ও ধরলা অববাহিকা)",
    soilType: "উর্বর বেলে দোআঁশ ও পলি মাটি",
    soilDescription: "পানি নিষ্কাশন ক্ষমতা চমৎকার এবং মাটির স্তর নরম ও ঝুরঝুরে। মূল জাতীয় ফসলের বৃদ্ধির জন্য দেশের সেরা।",
    climateFeature: "শীতকালে তীব্র ঠান্ডা ও কুয়াশা, গ্রীষ্মে পরিমিত রোদ।",
    soilPh: "৫.৫ - ৬.৮ (হালকা অম্লীয় থেকে নিরপেক্ষ)",
    primaryCrops: [
      {
        name: "আলু (Potato)",
        variety: "ডায়মন্ড, কার্ডিনাল, গ্র্যানোলা",
        season: "কার্তিক - ফাল্গুন (নভেম্বর - ফেব্রুয়ারি)",
        suitability: "উচ্চ ফলনশীল",
        notes: "বাংলাদেশের মোট উৎপাদিত আলুর সিংহভাগ রংপুর ও বগুড়া অঞ্চলে হয়।",
        badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      },
      {
        name: "ভুট্টা (Maize)",
        variety: "হাইব্রিড সুপার শাইন, এনকে-৪০",
        season: "রবি ও খরিফ মৌসুম",
        suitability: "উচ্চ ফলনশীল",
        notes: "তিস্তার চরাঞ্চল ও সমতল জমিতে ভুট্টার রেকর্ড ফলন হয়।",
        badgeColor: "bg-yellow-100 text-yellow-900 border-yellow-300",
      },
      {
        name: "তামাক ও পাট (Tobacco & Jute)",
        variety: "দেশি ও তোষা পাট",
        season: "চৈত্র - আষাঢ়",
        suitability: "সেরা মান",
        notes: "রংপুর ও নীলফামারী তামাক এবং উন্নত মানের পাটের জন্য বিখ্যাত।",
        badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      },
      {
        name: "সরিষা ও গম",
        variety: "বারি সরিষা-১৪/১৭",
        season: "অগ্রহায়ণ - মাঘ",
        suitability: "ঐতিহ্যবাহী",
        notes: "ধান কাটার পর স্বল্পমেয়াদী সরিষা চাষে সর্বোচ্চ লাভ হয়।",
        badgeColor: "bg-lime-100 text-lime-900 border-lime-300",
      },
    ],
    regionalTips: "শীতকালে ঘন কুয়াশায় আলুর নাবি ধসা (Late Blight) রোগের ঝুঁকি থাকে। আবহাওয়া মেঘলা থাকলে আগে থেকেই ম্যানকোজেব জাতীয় ছত্রাকনাশক স্প্রে করুন।",
  },
  {
    id: "rajshahi",
    nameBn: "রাজশাহী বিভাগ",
    nameEn: "Rajshahi",
    zone: "উত্তর-পশ্চিমাঞ্চল (বরেন্দ্র অঞ্চল ও পদ্মা অববাহিকা)",
    soilType: "বরেন্দ্র লাল এঁটেল ও পদ্মা বিধৌত পলি দোআঁশ",
    soilDescription: "খনিজ উপাদানে সমৃদ্ধ, পানি ধারণ ক্ষমতা ভালো এবং ফলমূল ও ডাল চাষে অসাধারণ উৎপাদন দেয়।",
    climateFeature: "উচ্চ তাপমাত্রা, শুষ্ক খরা প্রবণ আবহাওয়া এবং নাতিশীতোষ্ণ শীত।",
    soilPh: "৬.০ - ৭.২ (নিরপেক্ষ)",
    primaryCrops: [
      {
        name: "আম (Mango)",
        variety: "হিমসাগর, ল্যাংড়া, ফজলি, আম্রপালি, আশ্বিনা",
        season: "ফাল্গুন - আষাঢ় (পাকনকাল: মে - জুলাই)",
        suitability: "সেরা মান",
        notes: "চাঁপাইনবাবগঞ্জ ও রাজশাহী বাংলাদেশের আম রাজধানী হিসেবে খ্যাত।",
        badgeColor: "bg-orange-100 text-orange-900 border-orange-300",
      },
      {
        name: "লিচু (Litchi)",
        variety: "বোম্বাই, চায়না-৩, বেদানা",
        season: "চৈত্র - জ্যৈষ্ঠ",
        suitability: "সেরা মান",
        notes: "ঈশ্বরদী ও নাটোরে দেশের সবচেয়ে মিষ্টি লিচু উৎপন্ন হয়।",
        badgeColor: "bg-rose-100 text-rose-900 border-rose-300",
      },
      {
        name: "পেঁয়াজ ও রসুন",
        variety: "তাহেরপুরী, বারি পেঁয়াজ-১, নাটোরের রসুন",
        season: "শীতকালীন রবি",
        suitability: "উচ্চ ফলনশীল",
        notes: "পাবনার সাঁথিয়া ও নাটোরের চলনবিল এলাকা পেঁয়াজ-রসুনের মূল ভাণ্ডার।",
        badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
      },
      {
        name: "টমেটো ও গম",
        variety: "বারি টমেটো-৮, শতাব্দী গম",
        season: "রবি মৌসুম",
        suitability: "উচ্চ ফলনশীল",
        notes: "রাজশাহীর গোদাগাড়ীতে গ্রীষ্ম ও শীত উভয় মৌসুমে প্রচুর টমেটো হয়।",
        badgeColor: "bg-red-100 text-red-900 border-red-300",
      },
    ],
    regionalTips: "মুকুল আসার সময় হপার পোকা ও অ্যানথ্রাকনোজের আক্রমণ থেকে বাঁচতে ২ বার অনুমোদিত স্প্রে করুন। খরায় ড্রিপ সেচ ব্যবহার করলে ফলন দ্বিগুণ হয়।",
  },
  {
    id: "mymensingh",
    nameBn: "ময়মনসিংহ বিভাগ",
    nameEn: "Mymensingh",
    zone: "উত্তর-মধ্যাঞ্চল (ব্রহ্মপুত্র অববাহিকা ও গারো পাহাড় পাদদেশ)",
    soilType: "উর্বর পুরাতন ব্রহ্মপুত্র পলল দোআঁশ ও এঁটেল দোআঁশ",
    soilDescription: "জৈব পদার্থ সমৃদ্ধ নরম পলিমাটি, সারা বছর সবজি ও ধান চাষের জন্য অত্যন্ত উপযোগী।",
    climateFeature: "পর্যাপ্ত বৃষ্টিপাত, আর্দ্র আবহাওয়া এবং মৃদু শীত।",
    soilPh: "৫.৮ - ৬.৫",
    primaryCrops: [
      {
        name: "বোরো ও আমন ধান",
        variety: "ব্রি ধান-২৮, ব্রি ধান-২৯, কাটারিভোগ",
        season: "সারা বছর (আউশ, আমন, বোরো)",
        suitability: "উচ্চ ফলনশীল",
        notes: "ময়মনসিংহের হালুয়াঘাট ও শেরপুরে সুগন্ধি চাল ও তুলশীমালা প্রচুর চাষ হয়।",
        badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      },
      {
        name: "বেগুন (Eggplant)",
        variety: "ইসলামপুরী বেগুন, লাফা বেগুন",
        season: "বছরব্যাপী",
        suitability: "ঐতিহ্যবাহী",
        notes: "জামালপুরের ইসলামপুরী গোল বেগুন সারা দেশে স্বাদে অদ্বিতীয়।",
        badgeColor: "bg-violet-100 text-violet-900 border-violet-300",
      },
      {
        name: "সরিষা ও ডাল",
        variety: "টোরি-৭, বারি সরিষা",
        season: "কার্তিক - মাঘ",
        suitability: "উচ্চ ফলনশীল",
        notes: "ব্রহ্মপুত্রের চরে সরিষা ও মাসকলাই ডালের ব্যাপক ফলন হয়।",
        badgeColor: "bg-yellow-100 text-yellow-900 border-yellow-300",
      },
      {
        name: "কলা ও পেঁপে",
        variety: "অমৃতসাগর, সবরি কলা",
        season: "বারোমাসি",
        suitability: "উচ্চ ফলনশীল",
        notes: "মধুপুর গড়ের লাল মাটিতে আনারস ও কলার মিষ্টি স্বাদ অতুলনীয়।",
        badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      },
    ],
    regionalTips: "বেগুনের ডগা ও ফল ছিদ্রকারী পোকা দমনে সেক্স ফেরোমন ট্র্যাপ ব্যবহার করুন। রাসায়নিক কীটনাশক ঘন ঘন না দিয়ে জৈব বালাইনাশক ব্যবহার করুন।",
  },
  {
    id: "dhaka",
    nameBn: "ঢাকা বিভাগ",
    nameEn: "Dhaka",
    zone: "মধ্যাঞ্চল (পদ্মা-মেঘনা-যমুনা সংলগ্ন বদ্বীপ)",
    soilType: "উর্বর পলি দোআঁশ ও মধ্যম বদ্বীপীয় মাটি",
    soilDescription: "নদীর পলি মিশ্রিত উর্বর ভূমি, শাকসবজি ও বাণিজ্যিক বাণিজ্যিক উদ্যান ফসলের জন্য সর্বশ্রেষ্ঠ।",
    climateFeature: "নাতিশীতোষ্ণ, মৌসুমি বৃষ্টিপাত ও উপযোগী তাপমাত্রা।",
    soilPh: "৬.০ - ৭.০",
    primaryCrops: [
      {
        name: "ফুলকপি ও বাঁধাকপি",
        variety: "স্নোবল, গ্রিন এক্সপ্রেস",
        season: "আশ্বিন - মাঘ (শীতকালীন)",
        suitability: "উচ্চ ফলনশীল",
        notes: "মুন্সীগঞ্জ, সাভার ও মানিকগঞ্জে শীতকালীন সবজির সবচেয়ে বড় যোগান তৈরি হয়।",
        badgeColor: "bg-teal-100 text-teal-900 border-teal-300",
      },
      {
        name: "পাট (Golden Fiber Jute)",
        variety: "তোষা পাট ও মেস্তা",
        season: "চৈত্র - শ্রাবণ",
        suitability: "ঐতিহ্যবাহী",
        notes: "ফরিদপুর ও রাজবাড়ী বিশ্বের অন্যতম সেরা মানের সোনালী আঁশ পাটের জন্য বিশ্বখ্যাত।",
        badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      },
      {
        name: "মরিচ ও পেঁয়াজ",
        variety: "বিন্দু মরিচ, মানিকগঞ্জী মরিচ",
        season: "রবি ও খরিফ",
        suitability: "উচ্চ ফলনশীল",
        notes: "মানিকগঞ্জ ও মুন্সীগঞ্জের চরে লাল মরিচ শুকিয়ে বাজারজাত করা হয়।",
        badgeColor: "bg-red-100 text-red-900 border-red-300",
      },
      {
        name: "ছাদবাগানের ফলমূল ও শাকসবজি",
        variety: "বারোমাসি আম, ড্রাগন, মাল্টা, কলমি শাক",
        season: "সারা বছর",
        suitability: "সেরা মান",
        notes: "ঢাকা মেট্রো ও পার্শ্ববর্তী এলাকায় আধুনিক ছাদবাগান দ্রুত জনপ্রিয় হচ্ছে।",
        badgeColor: "bg-green-100 text-green-900 border-green-300",
      },
    ],
    regionalTips: "শহরের ছাদবাগানে টবের ড্রেনেজ ব্যবস্থা পরিষ্কার রাখুন। নিয়মিত নিম তেলের মিশ্রণ স্প্রে করলে জাবপোকা ও মাকড় সহজেই নিয়ন্ত্রণে থাকে।",
  },
  {
    id: "sylhet",
    nameBn: "সিলেট বিভাগ",
    nameEn: "Sylhet",
    zone: "উত্তর-পূর্বাঞ্চল (সুরমা উপত্যকা ও পাহাড়ি টিলা)",
    soilType: "অম্লীয় পাহাড়ি লাল মাটি ও উপত্যকা পলি",
    soilDescription: "উঁচু পাহাড়ি টিলা, প্রচুর জৈব পদার্থ ও অ্যাসিডিক পিএইচ যা চা ও সাইট্রাস লেবু জাতীয় ফসলের জন্য আদর্শ।",
    climateFeature: "দেশের সর্বোচ্চ বৃষ্টিপাত, সতেজ আর্দ্রতা ও পাহাড়ি স্নিগ্ধ আবহাওয়া।",
    soilPh: "৪.৫ - ৫.৫ (অম্লীয়)",
    primaryCrops: [
      {
        name: "চা (Tea)",
        variety: "বিটি-২, ক্লোন চা",
        season: "চৈত্র - অগ্রহায়ণ (মার্চ - ডিসেম্বর)",
        suitability: "সেরা মান",
        notes: "শ্রীমঙ্গল ও মৌলভীবাজারকে দুটি পাতা একটি কুঁড়ির দেশ ও চায়ের রাজধানী বলা হয়।",
        badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      },
      {
        name: "সাতকড়া ও জারা লেবু",
        variety: "স্থানীয় সিলেট জাত",
        season: "আষাঢ় - আশ্বিন",
        suitability: "ঐতিহ্যবাহী",
        notes: "সিলেটের নিজস্ব জিআই পণ্য সাতকড়া দেশ ও বিদেশে রান্নার মসলা হিসেবে অনন্য।",
        badgeColor: "bg-lime-100 text-lime-900 border-lime-300",
      },
      {
        name: "কমলা ও মাল্টা",
        variety: "খাসিয়া কমলা, বারি মাল্টা-১",
        season: "ভাদ্র - অগ্রহায়ণ",
        suitability: "সেরা মান",
        notes: "বিয়ানীবাজার ও ছাতকের পাহাড়ি পাদদেশে সুস্বাদু মিষ্টি কমলা উৎপন্ন হয়।",
        badgeColor: "bg-orange-100 text-orange-900 border-orange-300",
      },
      {
        name: "আনারস",
        variety: "হানি কুইন, জায়ান্ট কিউ",
        season: "জ্যৈষ্ঠ - শ্রাবণ",
        suitability: "উচ্চ ফলনশীল",
        notes: "শ্রীমঙ্গলের টিলায় উৎপাদিত মধুপুরের মতো মিষ্টি সুস্বাদু রসালো আনারস।",
        badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      },
    ],
    regionalTips: "লেবু জাতীয় গাছে ক্যাংকার ও ডাই-ব্যাক রোগ প্রতিরোধে বর্ষার আগে কপার অক্সিক্লোরাইড স্প্রে করুন। টিলার ঢালে পানি জমতে দেবেন না।",
  },
  {
    id: "chittagong",
    nameBn: "চট্টগ্রাম বিভাগ",
    nameEn: "Chittagong",
    zone: "দক্ষিণ-পূর্বাঞ্চল (পাহাড়, সমতল ও উপকূলীয় মোহনা)",
    soilType: "পাহাড়ি দোআঁশ, লাল কঙ্করময় মাটি ও উপকূলীয় পলি",
    soilDescription: "ঢালু পাহাড়ি জমি ও খনিজ সমৃদ্ধ মাটি। পাহাড়ি ফলমূল, মসলা ও অর্থকরী ফসলে সেরা।",
    climateFeature: "ভারী মৌসুমি বৃষ্টিপাত, নাতিশীতোষ্ণ আর্দ্র সামুদ্রিক বাতাস।",
    soilPh: "৫.২ - ৬.৪",
    primaryCrops: [
      {
        name: "পাহাড়ি ফল ও কাজুবাদাম",
        variety: "কাজুবাদাম, ড্রাগন, পেঁপে, রাম্বুটান",
        season: "বারোমাসি",
        suitability: "সেরা মান",
        notes: "বান্দরবান, খাগড়াছড়ি ও রাঙ্গামাটি এখন কাজুবাদাম ও ড্রাগন ফলের প্রধান কেন্দ্র।",
        badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      },
      {
        name: "আদা ও হলুদ (Spices)",
        variety: "পাহাড়ি আদা, বারি হলুদ-৪",
        season: "বৈশাখ - পৌষ",
        suitability: "উচ্চ ফলনশীল",
        notes: "পাহাড়ের ঢালে জুম চাষে এবং আধুনিক পদ্ধতিতে রেকর্ড পরিমাণ মসলা উৎপাদিত হয়।",
        badgeColor: "bg-yellow-100 text-yellow-900 border-yellow-300",
      },
      {
        name: "তরমুজ ও মিষ্টি আলু",
        variety: "ড্রাগন ব্ল্যাক, গ্লোরি তরমুজ",
        season: "মাঘ - বৈশাখ",
        suitability: "উচ্চ ফলনশীল",
        notes: "কক্সবাজার ও নোয়াখালীর চরাঞ্চলে মিষ্টি রসালো আগাম তরমুজের বিপুল ফলন হয়।",
        badgeColor: "bg-red-100 text-red-900 border-red-300",
      },
      {
        name: "পান ও সুপারি",
        variety: "মহেশখালীর মিষ্টি পান",
        season: "সারা বছর",
        suitability: "ঐতিহ্যবাহী",
        notes: "মহেশখালীর পাহাড়ের মিষ্টি পান ভৌগোলিক নির্দেশক (GI) স্বীকৃতিপ্রাপ্ত অনন্য ফসল।",
        badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      },
    ],
    regionalTips: "পাহাড়ে বৃষ্টির সময় মাটি ক্ষয় রোধে মালচিং ও ভেটিভার ঘাস লাগান। আদা-হলুদে কন্দ পচা রোগ থেকে বাঁচতে বীজ শোধন অপরিহার্য।",
  },
  {
    id: "khulna",
    nameBn: "খুলনা বিভাগ",
    nameEn: "Khulna",
    zone: "দক্ষিণ-পশ্চিমাঞ্চল (উপকূলীয় সুন্দরবন ও গড়াই অববাহিকা)",
    soilType: "উপকূলীয় পলি ও মধ্যম লবণাক্ত এঁটেল দোআঁশ",
    soilDescription: "উপকূলীয় পলল সমৃদ্ধ মাটি। লবণাক্ততা সহনশীল জাত এবং ঘেরপাড়ের সবজি চাষে চমৎকার উপযোগী।",
    climateFeature: "সামুদ্রিক প্রভাবযুক্ত নাতিশীতোষ্ণ ও আর্দ্র আবহাওয়া।",
    soilPh: "৬.৮ - ৮.২",
    primaryCrops: [
      {
        name: "লবণাক্ততা সহনশীল ধান",
        variety: "ব্রি ধান-৪৭, ব্রি ধান-৬৭, বিনা ধান-১০",
        season: "বোরো ও আমন",
        suitability: "উচ্চ ফলনশীল",
        notes: "উপকূলের লবণাক্ত জমি ও আইলে এ জাতের ধান ৮-১০ ডিএস/মি. লবণাক্ততা সহ্য করে।",
        badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      },
      {
        name: "নারিকেল ও খেজুরের গুড়",
        variety: "যশোরের খেজুর গুড়, ভিয়েতনামী খাটো নারিকেল",
        season: "কার্তিক - ফাল্গুন (গুড়)",
        suitability: "সেরা মান",
        notes: "যশোরের খেজুরের নলেন গুড় ও পাটালির ঘ্রাণ সারা বাংলাদেশে সমাদৃত।",
        badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      },
      {
        name: "কুল ও বরই (Jujube)",
        variety: "বাউকুল, থাই আপেল কুল, বলসুন্দরী",
        season: "পৌষ - ফাল্গুন",
        suitability: "উচ্চ ফলনশীল",
        notes: "ঝিনাইদহ, চুয়াডাঙ্গা ও মেহেরপুরে বাণিজ্যিকভাবে হাজার কোটি টাকার কুল উৎপাদিত হয়।",
        badgeColor: "bg-lime-100 text-lime-900 border-lime-300",
      },
      {
        name: "ঘেরের আইলে সবজি ও ড্রাগন",
        variety: "লাউ, শসা, চিচিঙ্গা, করলা",
        season: "সারা বছর",
        suitability: "উচ্চ ফলনশীল",
        notes: "চিংড়ি ঘেরের পাড়ে মাচা পদ্ধতিতে বিষমুক্ত সবজি চাষের অনন্য দৃষ্টান্ত।",
        badgeColor: "bg-teal-100 text-teal-900 border-teal-300",
      },
    ],
    regionalTips: "লবণাক্ত অঞ্চলে উঁচু বেড ও মালচিং পেপার ব্যবহার করলে বাষ্পীভবন কমে এবং মাটির লবণাক্ততা গাছের শিকড়ে ক্ষতি করতে পারে না।",
  },
  {
    id: "barishal",
    nameBn: "বরিশাল বিভাগ",
    nameEn: "Barishal",
    zone: "দক্ষিণাঞ্চল (নদীমাতৃক উপকূলীয় পলল বদ্বীপ)",
    soilType: "জোয়ার-ভাটা বিধৌত উর্বর পলি দোআঁশ ও এঁটেল মাটি",
    soilDescription: "নদীর জোয়ারের সাথে আসা প্রচুর পুষ্টিকর পলি জমা হওয়ায় সার প্রয়োগ ছাড়াই জমির উর্বরতা সর্বোচ্চ থাকে।",
    climateFeature: "উচ্চ আর্দ্রতা, মৃদু বাতাস ও উপকূলীয় নাতিশীতোষ্ণ জলবায়ু।",
    soilPh: "৬.২ - ৭.৪",
    primaryCrops: [
      {
        name: "পেয়ারা (Guava)",
        variety: "স্বরূপকাঠির কাঁচামিঠা পেয়ারা",
        season: "আষাঢ় - ভাদ্র (ভাসমান হাট: জুলাই - আগস্ট)",
        suitability: "ঐতিহ্যবাহী",
        notes: "ঝালকাঠি ও পিরোজপুরের আটঘর-কুড়িয়ানার ভাসমান পেয়ারা বাজার এশিয়ার বৃহত্তম।",
        badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      },
      {
        name: "আমন ধান ও ডাল (Mungbean)",
        variety: "বারি মুগ-৬, বিআর-১১, ব্রি ধান-৭৩",
        season: "খরিফ ও রবি",
        suitability: "উচ্চ ফলনশীল",
        notes: "পটুয়াখালী ও বরগুনায় দেশের প্রায় ৬০% মুগডাল ও খেসারি ডাল উৎপন্ন হয়।",
        badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      },
      {
        name: "সুপারি ও নারিকেল",
        variety: "স্থানীয় উন্নত জাত",
        season: "ভাদ্র - অগ্রহায়ণ",
        suitability: "উচ্চ ফলনশীল",
        notes: "পিরোজপুর, ভোলা ও বরিশালের সুপারি বাগান থেকে দেশের প্রধান চাহিদা মেটে।",
        badgeColor: "bg-teal-100 text-teal-900 border-teal-300",
      },
      {
        name: "তরমুজ ও পান",
        variety: "পাকরিজা, এশিয়ান ২",
        season: "মাঘ - চৈত্র",
        suitability: "উচ্চ ফলনশীল",
        notes: "পটুয়াখালীর রাঙ্গাবালী ও গলাচিপা থেকে চৈত্র মাসে হাজার হাজার ট্রাক মিষ্টি তরমুজ সরবরাহ হয়।",
        badgeColor: "bg-rose-100 text-rose-900 border-rose-300",
      },
    ],
    regionalTips: "পেয়ারা গাছের ফল মাছি পোকা দমনে ক্ষতিকারক স্প্রে না করে ফেরোমন ফাঁদ ও ফ্রুট ব্যাগিং পদ্ধতি ব্যবহার করুন; এতে ফল রপ্তানিযোগ্য হয়।",
  },
];

export const BangladeshCropMap: React.FC = () => {
  const [selectedDivisionId, setSelectedDivisionId] = useState<string>("rangpur");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"map" | "gardenGuide">("map");
  const [viewMode, setViewMode] = useState<"visual" | "grid">("visual");

  const selectedDivision =
    BANGLADESH_DIVISIONS.find((d) => d.id === selectedDivisionId) || BANGLADESH_DIVISIONS[0];

  // Filter divisions based on search query for crop or division name
  const filteredDivisions = searchQuery.trim()
    ? BANGLADESH_DIVISIONS.filter(
        (div) =>
          div.nameBn.includes(searchQuery) ||
          div.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          div.primaryCrops.some((crop) =>
            crop.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : BANGLADESH_DIVISIONS;

  return (
    <section className="bg-white rounded-3xl border border-ground-border shadow-xs overflow-hidden">
      {/* Top Banner / Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 p-4 sm:p-5 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-emerald-300 flex-shrink-0">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xs uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  কৃষি মানচিত্র ও অঞ্চল গাইড
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-bengali leading-tight mt-0.5">
                কোন এলাকায় কোন ফসল সবচেয়ে ভালো হয়?
              </h2>
            </div>
          </div>

          {/* Toggle between Agriculture Map & Rooftop Guide */}
          <div className="flex items-center bg-black/20 p-1 rounded-2xl border border-white/10 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab("map")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-bengali transition-all ${
                activeTab === "map"
                  ? "bg-white text-emerald-950 shadow-xs"
                  : "text-emerald-100 hover:text-white"
              }`}
            >
              বিভাগভিত্তিক ফসল
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("gardenGuide")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-bengali transition-all ${
                activeTab === "gardenGuide"
                  ? "bg-white text-emerald-950 shadow-xs"
                  : "text-emerald-100 hover:text-white"
              }`}
            >
              ছাদবাগান ও ঘরোয়া গাইড
            </button>
          </div>
        </div>

        {/* Search Bar for Crops */}
        {activeTab === "map" && (
          <div className="mt-4 relative">
            <Search className="w-4 h-4 text-emerald-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ফসল বা এলাকা লিখে খুঁজুন (যেমন: আলু, আম, ধান, চা, পেয়ারা, রংপুর)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/10 text-white placeholder-emerald-200/70 text-sm font-bengali border border-white/20 focus:outline-hidden focus:bg-white/20 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-200 font-bengali bg-white/10 px-2 py-0.5 rounded-lg"
              >
                মুছুন
              </button>
            )}
          </div>
        )}
      </div>

      {activeTab === "map" ? (
        <div className="p-4 sm:p-6 space-y-5">
          {/* Visual Map Mode vs Grid Selector Toggle */}
          <div className="flex items-center justify-between flex-wrap gap-2 pb-1">
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-2xl border border-stone-200/80">
              <button
                type="button"
                onClick={() => setViewMode("visual")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-bengali transition-all ${
                  viewMode === "visual"
                    ? "bg-emerald-800 text-white shadow-xs"
                    : "text-ink-muted hover:text-ink hover:bg-stone-200/60"
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>ভিজ্যুয়াল মানচিত্র দৃশ্য</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-bengali transition-all ${
                  viewMode === "grid"
                    ? "bg-emerald-800 text-white shadow-xs"
                    : "text-ink-muted hover:text-ink hover:bg-stone-200/60"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>তালিকা গ্রিড দৃশ্য</span>
              </button>
            </div>

            <span className="text-2xs font-bengali text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
              নির্বাচিত: <strong className="font-bold">{selectedDivision.nameBn}</strong>
            </span>
          </div>

          {/* When ViewMode is "visual", show the Visual Map */}
          {viewMode === "visual" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Left Column: Visual SVG Bangladesh Map */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <BangladeshVisualMap
                  selectedDivisionId={selectedDivisionId}
                  onSelectDivision={(id) => setSelectedDivisionId(id)}
                />
              </div>

              {/* Right Column: Active Division Information Card */}
              <div className="lg:col-span-7 space-y-4">
                {/* Division Quick Selector Pills for Mobile/Tablet */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {filteredDivisions.map((div) => (
                    <button
                      key={div.id}
                      type="button"
                      onClick={() => setSelectedDivisionId(div.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold font-bengali whitespace-nowrap transition-all ${
                        div.id === selectedDivisionId
                          ? "bg-emerald-800 text-white shadow-xs"
                          : "bg-stone-100 text-ink-muted hover:bg-stone-200"
                      }`}
                    >
                      {div.nameBn}
                    </button>
                  ))}
                </div>

                {/* Active Division Card */}
                <div
                  id="division-detail"
                  className="bg-stone-50/90 rounded-2xl p-4 sm:p-5 border border-emerald-100/90 space-y-4 shadow-2xs scroll-mt-24"
                >
                  {/* Clean, spacious header with zero overlap */}
                  <div className="flex flex-col gap-2 pb-3 border-b border-ground-border">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-black font-bengali text-emerald-950">
                        {selectedDivision.nameBn}
                      </h3>
                      <span className="text-xs px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold font-bengali border border-emerald-200">
                        {selectedDivision.zone}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-bengali text-ink-muted leading-relaxed">
                      {selectedDivision.climateFeature}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap pt-1">
                      <div className="px-3 py-1 rounded-xl bg-white border border-stone-200 text-ink shadow-2xs text-xs font-bengali">
                        <span className="text-ink-muted">মাটি: </span>
                        <span className="font-bold text-emerald-800">{selectedDivision.soilType}</span>
                      </div>
                      <div className="px-3 py-1 rounded-xl bg-white border border-stone-200 text-ink shadow-2xs text-xs font-bengali">
                        <span className="text-ink-muted">পিএইচ (pH): </span>
                        <span className="font-bold text-amber-800">{selectedDivision.soilPh}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-stone-200/80 text-xs sm:text-sm font-bengali text-ink-muted">
                    <Layers className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong className="text-ink font-bold">মাটির বৈশিষ্ট্য: </strong>
                      {selectedDivision.soilDescription}
                    </p>
                  </div>

                  {/* Primary crops with spacious cards and no text cut-off */}
                  <div>
                    <h4 className="text-xs font-bold font-bengali text-ink-muted uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Sprout className="w-4 h-4 text-emerald-700" />
                      <span>শীর্ষ উৎপাদিত সেরা ফসলসমূহ:</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedDivision.primaryCrops.map((crop, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-emerald-300 transition-all shadow-2xs flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 mb-2">
                              <h5 className="font-bold font-bengali text-ink text-sm sm:text-base leading-snug">
                                {crop.name}
                              </h5>
                              <span
                                className={`self-start text-xs font-bold font-bengali px-2.5 py-0.5 rounded-full border whitespace-nowrap ${crop.badgeColor}`}
                              >
                                {crop.suitability}
                              </span>
                            </div>
                            {crop.variety && (
                              <p className="text-xs font-bengali text-ink-muted mb-1.5">
                                <strong className="text-ink">জাত: </strong> {crop.variety}
                              </p>
                            )}
                            <p className="text-xs sm:text-sm font-bengali text-ink-muted leading-relaxed">
                              {crop.notes}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Advisory */}
                  <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-4 text-xs sm:text-sm font-bengali text-amber-950 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-amber-900 mb-0.5">স্থানীয় কৃষি বিশেষজ্ঞের পরামর্শ:</p>
                      <p className="text-amber-900/90 leading-relaxed">
                        {selectedDivision.regionalTips}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* When ViewMode is "grid", show the Full 8-Division Grid Selector */}
          {viewMode === "grid" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {filteredDivisions.map((division) => {
                  const isSelected = division.id === selectedDivisionId;
                  return (
                    <button
                      key={division.id}
                      type="button"
                      onClick={() => {
                        setSelectedDivisionId(division.id);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all active:scale-[0.98] ${
                        isSelected
                          ? "bg-emerald-800 text-white border-emerald-800 shadow-md ring-2 ring-emerald-600/30"
                          : "bg-stone-50 hover:bg-emerald-50/60 text-ink border-ground-border"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-bold font-bengali text-sm sm:text-base leading-tight">
                          {division.nameBn}
                        </p>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                      </div>
                      <p
                        className={`text-2xs font-bengali mt-0.5 truncate ${
                          isSelected ? "text-emerald-200" : "text-ink-muted"
                        }`}
                      >
                        {division.primaryCrops[0]?.name.split(" ")[0]} ও{" "}
                        {division.primaryCrops[1]?.name.split(" ")[0]}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Active Division Card in Grid view */}
              <div className="bg-stone-50/90 rounded-2xl p-4 sm:p-5 border border-emerald-100/90 space-y-4">
                <div className="flex flex-col gap-2 pb-3 border-b border-ground-border">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-black font-bengali text-emerald-950">
                      {selectedDivision.nameBn}
                    </h3>
                    <span className="text-xs px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold font-bengali border border-emerald-200">
                      {selectedDivision.zone}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bengali text-ink-muted leading-relaxed">
                    {selectedDivision.climateFeature}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    <div className="px-3 py-1 rounded-xl bg-white border border-stone-200 text-ink shadow-2xs text-xs font-bengali">
                      <span className="text-ink-muted">মাটি: </span>
                      <span className="font-bold text-emerald-800">{selectedDivision.soilType}</span>
                    </div>
                    <div className="px-3 py-1 rounded-xl bg-white border border-stone-200 text-ink shadow-2xs text-xs font-bengali">
                      <span className="text-ink-muted">পিএইচ (pH): </span>
                      <span className="font-bold text-amber-800">{selectedDivision.soilPh}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedDivision.primaryCrops.map((crop, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-emerald-300 transition-all shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 mb-2">
                          <h5 className="font-bold font-bengali text-ink text-sm sm:text-base leading-snug">
                            {crop.name}
                          </h5>
                          <span
                            className={`self-start text-xs font-bold font-bengali px-2.5 py-0.5 rounded-full border whitespace-nowrap ${crop.badgeColor}`}
                          >
                            {crop.suitability}
                          </span>
                        </div>
                        {crop.variety && (
                          <p className="text-xs font-bengali text-ink-muted mb-1.5">
                            <strong className="text-ink">জাত: </strong> {crop.variety}
                          </p>
                        )}
                        <p className="text-xs sm:text-sm font-bengali text-ink-muted leading-relaxed">
                          {crop.notes}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Rooftop & Kitchen Gardening Toolkit Tab */
        <div className="p-4 sm:p-6 space-y-5">
          <div className="border-b border-ground-border pb-3">
            <h3 className="text-lg font-bold font-bengali text-emerald-950">
              ছাদবাগান ও কিচেন গার্ডেনিং গাইড
            </h3>
            <p className="text-xs sm:text-sm font-bengali text-ink-muted mt-1">
              বাড়ির ছাদ বা বারান্দায় অল্প খরচে বিষমুক্ত সবজি ও ফল উৎপাদনের সহজ নিয়ম
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Guide 1: Soil Mix Ratio */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold font-bengali text-sm">
                <Layers className="w-4 h-4" />
                <span>টবের আদর্শ মাটি তৈরি</span>
              </div>
              <p className="text-xs font-bengali text-ink-muted leading-relaxed">
                <strong className="text-ink">অনুপাত:</strong> ৫০% দোআঁশ মাটি + ৩০% গোবর সার বা ভার্মিকম্পোস্ট + ২০% কোকোপিট বা ছাই। সাথে ১ মুঠো হাড়ের গুঁড়া ও নিম খৈল মেশালে শিকড় পচা রোগ হয় না।
              </p>
            </div>

            {/* Guide 2: Organic Pest Spray */}
            <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-teal-800 font-bold font-bengali text-sm">
                <Droplets className="w-4 h-4" />
                <span>ঘরোয়া নিম পাতা স্প্রে</span>
              </div>
              <p className="text-xs font-bengali text-ink-muted leading-relaxed">
                ১ লিটার পানিতে ৫ মিলি খাঁটি নিম তেল এবং ১ চা চামচ লিকুইড সাবান গুলে ঝাঁকিয়ে নিন। সপ্তাহে ১ দিন বিকেলে স্প্রে করলে সাদা মাছি, জাবপোকা ও মাকড় থাকবে না।
              </p>
            </div>

            {/* Guide 3: Sunlight & Watering */}
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-800 font-bold font-bengali text-sm">
                <Sun className="w-4 h-4" />
                <span>রোদ ও পানি ব্যবস্থাপনা</span>
              </div>
              <p className="text-xs font-bengali text-ink-muted leading-relaxed">
                সবজি ও ফল গাছে প্রতিদিন কমপক্ষে ৫-৬ ঘণ্টা সরাসরি রোদ জরুরি। টবের ওপরের মাটি ১ ইঞ্চি শুকালে তবেই পানি দিন; গোড়ায় অতিরিক্ত পানি জমলে গাছ হলুদ হয়ে যায়।
              </p>
            </div>
          </div>

          {/* Quick list of best container plants */}
          <div className="p-4 bg-white rounded-2xl border border-ground-border space-y-2">
            <h4 className="text-xs font-bold font-bengali text-ink-muted uppercase tracking-wider">
              টব ও গ্রো-ব্যাগে সবচেয়ে সহজে ফলানো যায়:
            </h4>
            <div className="flex flex-wrap gap-2 text-xs font-bengali">
              {[
                "কাঁচা মরিচ (১০-১২ ইঞ্চি টব)",
                "টমেটো (১২-১৪ ইঞ্চি গ্রো-ব্যাগ)",
                "ধনেপাতা ও পুদিনা (গামলা টব)",
                "বেগুন (১৪ ইঞ্চি টব)",
                "কলমি ও লাল শাক (ট্রে পদ্ধতি)",
                "লেবু ও বারোমাসি মাল্টা (হাফ ড্রাম)",
                "ড্রাগন ফল (২০ লিটার ড্রাম)",
              ].map((item, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-stone-100 text-ink rounded-xl border border-stone-200 font-medium"
                >
                  🌱 {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
