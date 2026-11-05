"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ChatMessage } from "@/types";
import { getChatMessages, saveChatMessages, clearChatMessages } from "@/lib/storage/chat";
import { getDiagnosisById } from "@/lib/storage/history";
import { STRINGS_BN } from "@/lib/strings.bn";

export function useChat() {
  const searchParams = useSearchParams();
  const diagnosisId = searchParams.get("from");

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Attached image for chat
  const [attachedImageBase64, setAttachedImageBase64] = useState<string | null>(null);

  // Diagnosis context description
  const [diagnosisContextString, setDiagnosisContextString] = useState<string | undefined>(
    undefined
  );

  const initializedRef = useRef<boolean>(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Check if opened with diagnosis ID context
    if (diagnosisId) {
      const diag = getDiagnosisById(diagnosisId);
      if (diag) {
        const contextStr = `${diag.cropBn} ফসলের সমস্যা: "${diag.problemNameBn}"। লক্ষণ ও কারণ: ${diag.whyBn}।`;
        setDiagnosisContextString(contextStr);

        const initialAssistantMsg: ChatMessage = {
          id: `context_${Date.now()}`,
          role: "assistant",
          content: `আমি আপনার "${diag.cropBn}" ফসলের "${diag.problemNameBn}" সমস্যা সম্পর্কে দেখতে পাচ্ছি। এই বিষয়ে আপনার কী জানার আছে? নিচের প্রস্তাবিত প্রশ্নগুলো চাপতে পারেন বা লিখে পাঠাতে পারেন।`,
          timestamp: Date.now(),
          diagnosisIdContext: diagnosisId,
        };

        setMessages([initialAssistantMsg]);
        return;
      }
    }

    // Otherwise load existing saved messages
    const saved = getChatMessages();
    if (saved.length > 0) {
      setMessages(saved);
    } else {
      // Default greeting
      const defaultGreeting: ChatMessage = {
        id: `greeting_${Date.now()}`,
        role: "assistant",
        content: STRINGS_BN.chat.emptyGreeting,
        timestamp: Date.now(),
      };
      setMessages([defaultGreeting]);
      saveChatMessages([defaultGreeting]);
    }
  }, [diagnosisId]);

  // Persist messages whenever they change
  const updateMessages = (newMessages: ChatMessage[]) => {
    setMessages(newMessages);
    saveChatMessages(newMessages);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text && !attachedImageBase64) return;

    setErrorMessage(null);

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      content: text,
      timestamp: Date.now(),
      imageBase64: attachedImageBase64 || undefined,
    };

    const updated = [...messages, userMsg];
    updateMessages(updated);
    setInputText("");
    const currentAttachedImage = attachedImageBase64;
    setAttachedImageBase64(null);

    setIsLoading(true);

    try {
      const apiMessages = updated.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          diagnosisContext: diagnosisContextString,
          imageBase64: currentAttachedImage || undefined,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.messageBn || STRINGS_BN.errors.serverError);
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: data.reply,
        timestamp: Date.now(),
      };

      updateMessages([...updated, assistantMsg]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setErrorMessage(err.message || STRINGS_BN.errors.serverError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    clearChatMessages();
    const freshGreeting: ChatMessage = {
      id: `greeting_${Date.now()}`,
      role: "assistant",
      content: STRINGS_BN.chat.emptyGreeting,
      timestamp: Date.now(),
    };
    setMessages([freshGreeting]);
    setDiagnosisContextString(undefined);
    setAttachedImageBase64(null);
    setErrorMessage(null);
  };

  return {
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
  };
}
