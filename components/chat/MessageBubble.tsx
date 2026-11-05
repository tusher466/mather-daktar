"use client";

import React from "react";
import { Volume2, Bot, User, Sparkles } from "lucide-react";
import { ChatMessage } from "@/types";

interface MessageBubbleProps {
  message: ChatMessage;
  canSpeak: boolean;
  onSpeak?: (text: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  canSpeak,
  onSpeak,
}) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-start gap-2.5 sm:gap-3.5 mb-4 animate-fade-in ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar Icon */}
      <div
        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xs ${
          isUser
            ? "bg-emerald-800 text-white"
            : "bg-gradient-to-br from-emerald-600 to-teal-800 text-white"
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Bubble Content */}
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-3.5 sm:p-4 transition-all ${
          isUser
            ? "bg-gradient-to-br from-emerald-800 to-emerald-900 text-white rounded-tr-xs shadow-md shadow-emerald-950/15"
            : "bg-white text-ink border border-stone-200/90 rounded-tl-xs shadow-2xs hover:shadow-xs"
        }`}
      >
        {/* Assistant Header Tag */}
        {!isUser && (
          <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold font-bengali text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>মাঠের ডাক্তার এআই</span>
          </div>
        )}

        {/* Attached image if any */}
        {message.imageBase64 && (
          <div className="mb-2.5 rounded-2xl overflow-hidden max-h-56 border border-black/10 bg-black/5 shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={message.imageBase64}
              alt="সংযুক্ত ছবি"
              className="w-full h-full object-cover select-none"
            />
          </div>
        )}

        {/* Message Text */}
        <p className="text-sm sm:text-base font-bengali leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>

        {/* Assistant Read Aloud Button */}
        {!isUser && canSpeak && onSpeak && (
          <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => onSpeak(message.content)}
              className="inline-flex items-center gap-1.5 text-xs font-bold font-bengali text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-200 transition-colors select-none"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>পড়ে শোনান</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
