"use client";

import React from "react";
import Link from "next/link";
import {
  PhoneCall,
  ShieldCheck,
  HeartHandshake,
  Sprout,
  ExternalLink,
  Award,
  Leaf,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import { STRINGS_BN } from "@/lib/strings.bn";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0A2E1D] text-white/90 border-t border-emerald-950/40 mt-12 pb-24 md:pb-8 pt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 space-y-10">
        {/* Top Grid: Brand, Hotlines, Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Col 1: Brand & Identity (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 p-1 flex items-center justify-center border border-emerald-400/30 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icon.svg"
                  alt="মাঠের ডাক্তার লোগো"
                  className="w-10 h-10 object-contain drop-shadow"
                />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black font-bengali text-white tracking-wide">
                  {STRINGS_BN.appName}
                </h3>
                <p className="text-xs font-bengali text-emerald-300">
                  {STRINGS_BN.appTagline}
                </p>
              </div>
            </div>

            <p className="text-sm font-bengali text-white/80 leading-relaxed">
              বাংলাদেশের প্রান্তিক কৃষক ও নগর ছাদবাগানীদের জন্য সহজ বাংলায় কৃত্রিম বুদ্ধিমত্তাভিত্তিক ডিজিটাল কৃষি পরামর্শক। পাতার এক ক্লিকেই ফসলের রোগবালাই শনাক্ত করুন ও জৈব প্রতিকার জানুন।
            </p>

            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-xs font-bengali text-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AIgnite Buildathon 2026</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-xs font-bengali text-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>১০০% নিরাপদ ও বিষমুক্ত পরামর্শ</span>
              </span>
            </div>
          </div>

          {/* Col 2: Emergency Hotlines for Farmers (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold font-bengali text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>জরুরি সরকারি কৃষি হেল্পলাইন</span>
            </h4>

            <div className="space-y-2">
              {/* Hotline 1 */}
              <a
                href="tel:16123"
                className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
              >
                <div>
                  <p className="text-xs font-bengali text-white/70">কৃষি কল সেন্টার (টোল-ফ্রি)</p>
                  <p className="text-lg font-black font-bengali text-amber-400 tracking-wider">
                    ১৬১২৩
                  </p>
                </div>
                <span className="text-xs font-bengali px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 group-hover:bg-amber-500 group-hover:text-black transition-all">
                  কল করুন
                </span>
              </a>

              {/* Hotline 2 */}
              <a
                href="tel:333"
                className="flex items-center justify-between p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
              >
                <div>
                  <p className="text-xs font-bengali text-white/70">জাতীয় তথ্য ও সেবা বাতায়ন</p>
                  <p className="text-base font-bold font-bengali text-white tracking-wider">
                    ৩৩৩ (ডায়াল করে ৮)
                  </p>
                </div>
                <span className="text-2xs font-bengali px-2 py-0.5 rounded-lg bg-white/10 text-white/80">
                  ২৪/৭ লাইভ
                </span>
              </a>

              {/* Hotline 3 */}
              <a
                href="tel:1090"
                className="flex items-center justify-between p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
              >
                <div>
                  <p className="text-xs font-bengali text-white/70">আবহাওয়া ও দুর্যোগ পূর্বাভাস</p>
                  <p className="text-base font-bold font-bengali text-white tracking-wider">
                    ১০৯০
                  </p>
                </div>
                <span className="text-2xs font-bengali px-2 py-0.5 rounded-lg bg-white/10 text-white/80">
                  লাইভ
                </span>
              </a>
            </div>
          </div>

          {/* Col 3: Navigation & Research Partners (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold font-bengali text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-emerald-400" />
              <span>প্রয়োজনীয় লিংক</span>
            </h4>

            <ul className="space-y-2 text-xs font-bengali text-white/80">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>• ফসলের রোগ নির্ণয় (ডাক্তার)</span>
                </Link>
              </li>
              <li>
                <Link href="/ask" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>• এআই কৃষি বিশেষজ্ঞ জিজ্ঞাসা</span>
                </Link>
              </li>
              <li>
                <Link href="/season" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>• ১২ ফসলের মৌসুম ও আবহাওয়া পঞ্জিকা</span>
                </Link>
              </li>
              <li>
                <a
                  href="http://www.dae.gov.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>• কৃষি সম্প্রসারণ অধিদপ্তর (DAE)</span>
                  <ExternalLink className="w-3 h-3 text-white/50" />
                </a>
              </li>
              <li>
                <a
                  href="http://www.bari.gov.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>• বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI)</span>
                  <ExternalLink className="w-3 h-3 text-white/50" />
                </a>
              </li>
              <li>
                <a
                  href="http://www.brri.gov.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>• বাংলাদেশ ধান গবেষণা ইনস্টিটিউট (BRRI)</span>
                  <ExternalLink className="w-3 h-3 text-white/50" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-emerald-900/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bengali text-white/60">
          <p className="text-center sm:text-left">
            © ২০২৬ <strong className="text-white">মাঠের ডাক্তার</strong> — বাংলাদেশের কৃষির সমৃদ্ধির জন্য উৎসর্গীকৃত।
          </p>

          <p className="flex items-center gap-1 text-center sm:text-right">
            <span>নির্মিত হয়েছে</span>
            <span className="text-amber-400 font-bold">Ostad x YUNet AIgnite Buildathon 2026</span>
            <span>এর জন্য</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
