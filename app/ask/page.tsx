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
import { RotateCcw } from "lucide-react";

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
    // Append or set transcript into chat input
    setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest message
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
      {/* Top Header & Clear Conversation Button */}
      <div className="flex items-center justify-between pb-3 border-b border-ground-border mb-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black font-bengali text-ink">
            {STRINGS_BN.chat.title}
          </h1>
          <p className="text-sm font-bengali text-ink-muted">
            {diagnosisContextString
              ? STRINGS_BN.chat.contextBannerPrefix + " পূর্বের রোগ নির্ণয়"
              : STRINGS_BN.chat.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={handleClearChat}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold font-bengali text-ink-muted hover:text-danger px-2.5 py-1.5 rounded-lg border border-ground-border bg-white transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{STRINGS_BN.actions.newChat}</span>
        </button>
      </div>

      {/* Mic Permission Warning */}
      {micPermissionDenied && (
        <div className="mb-3 p-3 bg-harvest-light border border-harvest-border rounded-xl text-ink font-bengali text-sm">
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
          <div className="flex items-center gap-2 p-3 bg-white border border-ground-border rounded-2xl w-fit text-ink-muted text-base font-bengali">
            <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
            <span
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
            <span
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0.4s" }}
            />
            <span className="ml-1 text-sm">ডাক্তার লিখছেন...</span>
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
