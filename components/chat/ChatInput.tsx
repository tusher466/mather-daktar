"use client";

import React, { useRef } from "react";
import { Send, ImagePlus, X } from "lucide-react";
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
    <div className="fixed bottom-16 left-0 right-0 z-30 bg-white/95 backdrop-blur-xl border-t border-ground-border/80 pb-safe">
      <div className="max-w-[480px] mx-auto p-3">
        {/* Attached image preview */}
        {attachedImageBase64 && (
          <div className="relative inline-block mb-2 rounded-2xl overflow-hidden border border-ground-border shadow-xs">
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

        <div className="flex items-center gap-2">
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
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-ink-muted hover:text-primary bg-white hover:bg-stone-50 transition-colors border border-ground-border shadow-2xs flex-shrink-0 active:scale-95"
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
              placeholder={
                isListening
                  ? STRINGS_BN.chat.listening
                  : STRINGS_BN.chat.inputPlaceholder
              }
              className="w-full min-h-[56px] px-4 rounded-2xl border border-ground-border bg-white text-base sm:text-lg font-bengali text-ink focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-ink-muted/50 shadow-2xs transition-all"
            />
          </div>

          {/* Mic Button */}
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
            aria-label="পাঠান"
            className="w-14 h-14 min-w-[56px] min-h-[56px] rounded-2xl bg-gradient-to-r from-[#1E6B39] to-[#145328] hover:from-[#257E44] hover:to-[#175C2D] text-white flex items-center justify-center shadow-md shadow-emerald-950/20 active:scale-95 transition-all disabled:opacity-40 select-none flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
