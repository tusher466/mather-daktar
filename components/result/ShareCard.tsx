"use client";

import React from "react";
import { ShareResult } from "@/lib/share/share";
import { Check, Download } from "lucide-react";

interface ShareNotificationProps {
  shareResult: ShareResult | null;
  onClose: () => void;
}

export const ShareNotification: React.FC<ShareNotificationProps> = ({
  shareResult,
  onClose,
}) => {
  if (!shareResult) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-ink text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in max-w-xs"
    >
      {shareResult.downloaded ? (
        <>
          <Download className="w-5 h-5 text-harvest flex-shrink-0" />
          <span className="text-base font-bengali">
            রিপোর্ট কার্ড ডাউনলোড হয়েছে এবং হোয়াটসঅ্যাপ ওপেন করা হয়েছে।
          </span>
        </>
      ) : (
        <>
          <Check className="w-5 h-5 text-success flex-shrink-0" />
          <span className="text-base font-bengali">সফলভাবে শেয়ার করা হয়েছে।</span>
        </>
      )}
      <button
        onClick={onClose}
        className="ml-auto text-white/70 hover:text-white text-sm"
      >
        ✕
      </button>
    </div>
  );
};
