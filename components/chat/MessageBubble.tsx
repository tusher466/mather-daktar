"use client";

import React from "react";
import { Volume2 } from "lucide-react";
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
      className={`flex flex-col ${
        isUser ? "items-end" : "items-start"
      } mb-3.5 animate-fade-in`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[80%] rounded-3xl px-4 py-3 shadow-xs ${
          isUser
            ? "bg-gradient-to-br from-[#1E6B39] to-[#145328] text-white rounded-br-xs shadow-md shadow-emerald-950/10"
            : "bg-white text-ink border border-ground-border rounded-bl-xs shadow-xs"
        }`}
      >
        {/* Attached image if any */}
        {message.imageBase64 && (
          <div className="mb-2 rounded-2xl overflow-hidden max-h-48 border border-black/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={message.imageBase64}
              alt="সংযুক্ত ছবি"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Message Content */}
        <p className="text-base sm:text-lg font-bengali leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>

        {/* Assistant Read Aloud Button */}
        {!isUser && canSpeak && onSpeak && (
          <div className="mt-2.5 pt-2 border-t border-ground-border/70 flex items-center justify-between">
            <button
              type="button"
              onClick={() => onSpeak(message.content)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold font-bengali text-primary hover:text-emerald-800 select-none transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>পড়ে শোনান</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
