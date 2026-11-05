"use client";

import React, { useRef, useEffect, Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { ChatInput } from "@/components/chat/ChatInput";
import { SuggestionChips } from "@/components/chat/SuggestionChips";
import { ErrorState } from "@/components/ui/ErrorState";
import { useChat } from "@/hooks/useChat";
import { useSpeech } from "@/hooks/useSpeech";
import { STRINGS_BN } from "@/lib/strings.bn";
import { RotateCcw, Bot, Sparkles, MessageSquare } from "lucide-react";

function ChatContent() {
  const {
    messages,
    inputText,
    setInputText,
    isLoading,
    errorMessage,
    attachedImageBase64,
    setAttachedImageBase64,
    diagnosisContextString,
    handleSendMessage,
    handleClearChat,
  } = useChat();

  const {
    canListen,
    isListening,
    micPermissionDenied,
    startListening,
    stopListening,
    canSpeak,
    speak,
  } = useSpeech((transcript) => {
    setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const suggestions = diagnosisContextString
    ? [...STRINGS_BN.chat.resultSuggestions]
    : [...STRINGS_BN.chat.defaultSuggestions];

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)] pb-28">
      {/* Top Header Card */}
      <div className="p-4 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-900 text-white rounded-3xl shadow-sm mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-emerald-200">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg sm:text-xl font-bold font-bengali leading-none">
                  {STRINGS_BN.chat.title}
                </h1>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs font-bengali text-emerald-100/80 mt-1">
                {diagnosisContextString
                  ? STRINGS_BN.chat.contextBannerPrefix + " পূর্বের রোগ নির্ণয়"
                  : "সহজ বাংলায় ফসলের পরামর্শদাতা এআই"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClearChat}
            className="flex items-center gap-1 text-xs font-bold font-bengali text-white bg-white/15 hover:bg-white/25 px-2.5 py-1.5 rounded-xl border border-white/20 transition-all select-none active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>নতুন আলাপ</span>
          </button>
        </div>
      </div>

      {/* Mic Permission Warning */}
      {micPermissionDenied && (
        <div className="mb-3 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-ink font-bengali text-sm shadow-2xs">
          {STRINGS_BN.errors.micDenied}
        </div>
      )}

      {/* Error state */}
      {errorMessage && (
        <ErrorState
          message={errorMessage}
          onRetry={() => handleSendMessage()}
        />
      )}

      {/* Chat Messages List */}
      <div className="flex-1 space-y-1">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            canSpeak={canSpeak}
            onSpeak={(text) => speak(text)}
          />
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 p-3 bg-white border border-ground-border rounded-2xl w-fit text-ink-muted text-sm font-bengali shadow-2xs animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
            <span
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
            <span
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0.4s" }}
            />
            <span className="ml-1 font-semibold text-emerald-900">ডাক্তার লিখছেন...</span>
          </div>
        )}

        {/* Suggestion Chips */}
        {messages.length <= 2 && (
          <SuggestionChips
            suggestions={suggestions}
            onSelectSuggestion={(q) => handleSendMessage(q)}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <ChatInput
        inputText={inputText}
        onChangeInputText={setInputText}
        onSend={() => handleSendMessage()}
        isLoading={isLoading}
        canListen={canListen}
        isListening={isListening}
        onToggleListening={handleToggleListening}
        attachedImageBase64={attachedImageBase64}
        onAttachImage={setAttachedImageBase64}
      />
    </div>
  );
}

export default function AskPage() {
  return (
    <PageShell>
      <Suspense
        fallback={
          <div className="p-8 text-center font-bengali text-lg text-ink-muted">
            লোড হচ্ছে...
          </div>
        }
      >
        <ChatContent />
      </Suspense>
    </PageShell>
  );
}
