"use client";

import React, { useRef } from "react";
import { Send, ImagePlus, X, Sparkles } from "lucide-react";
import { MicButton } from "./MicButton";
import { compressImageForUpload } from "@/lib/image/compress";
import { STRINGS_BN } from "@/lib/strings.bn";

interface ChatInputProps {
  inputText: string;
  onChangeInputText: (text: string) => void;
  onSend: () => void;
  isLoading: boolean;
  canListen: boolean;
  isListening: boolean;
  onToggleListening: () => void;
  attachedImageBase64: string | null;
  onAttachImage: (base64: string | null) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  inputText,
  onChangeInputText,
  onSend,
  isLoading,
  canListen,
  isListening,
  onToggleListening,
  attachedImageBase64,
  onAttachImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImageForUpload(file, 800, 0.7);
      onAttachImage(compressed.base64);
    } catch (err) {
      console.warn("Could not compress attached image", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && (inputText.trim() || attachedImageBase64)) {
        onSend();
      }
    }
  };

  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-xl border-t border-stone-200/80 shadow-lg pb-safe">
      <div className="max-w-4xl mx-auto p-3 sm:p-4">
        {/* Attached image preview */}
        {attachedImageBase64 && (
          <div className="relative inline-block mb-2 rounded-2xl overflow-hidden border border-emerald-300 shadow-xs animate-fade-in">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={attachedImageBase64}
              alt="সংযুক্ত ছবি"
              className="h-16 w-16 object-cover"
            />
            <button
              type="button"
              onClick={() => onAttachImage(null)}
              className="absolute top-1 right-1 bg-black/70 hover:bg-black text-white rounded-full p-1 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Attach photo button */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="ছবি সংযুক্ত করুন"
            title="ছবি সংযুক্ত করুন"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-ink-muted hover:text-emerald-800 bg-stone-100/80 hover:bg-emerald-50 transition-colors border border-stone-200 shadow-2xs flex-shrink-0 active:scale-95"
          >
            <ImagePlus className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Text Input Field */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => onChangeInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="রোগ বা ফসল নিয়ে আপনার প্রশ্ন লিখুন (বা মাইকে বলুন)..."
              className="w-full h-11 sm:h-12 pl-4 pr-10 rounded-2xl border border-stone-300 bg-stone-50/70 text-sm sm:text-base font-bengali text-ink placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:border-transparent transition-all shadow-inner"
            />
          </div>

          {/* Large Voice Microphone Button */}
          {canListen && (
            <MicButton
              isListening={isListening}
              onToggle={onToggleListening}
              disabled={isLoading}
            />
          )}

          {/* Send Button */}
          <button
            type="button"
            onClick={onSend}
            disabled={isLoading || (!inputText.trim() && !attachedImageBase64)}
            aria-label="বার্তা পাঠান"
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-white transition-all flex-shrink-0 shadow-md ${
              isLoading || (!inputText.trim() && !attachedImageBase64)
                ? "bg-stone-300 text-stone-500 cursor-not-allowed shadow-none"
                : "bg-emerald-800 hover:bg-emerald-900 active:scale-95 shadow-emerald-900/20"
            }`}
          >
            <Send className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>
      </div>
    </div>
  );
};
