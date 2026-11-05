"use client";

import React, { useState } from "react";
import Image from "next/image";
import { STRINGS_BN } from "@/lib/strings.bn";

export const BuildathonSticker: React.FC = () => {
  const [hasError, setHasError] = useState<boolean>(false);

  if (hasError) {
    return (
      <div
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FFF4DC] border border-[#EAD4AA] text-[#154D2A] text-xs font-bold font-bengali shadow-sm select-none"
        title="Ostad x YUNet AIgnite Buildathon 2026"
      >
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="whitespace-nowrap">YUNet AIgnite 2026</span>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center flex-shrink-0">
      <div className="h-9 min-h-[36px] min-w-[90px] max-w-[150px] relative flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sticker.png"
          alt={STRINGS_BN.sticker.alt}
          className="h-9 min-h-[36px] w-auto object-contain drop-shadow-sm select-none"
          onError={() => setHasError(true)}
        />
      </div>
    </div>
  );
};
