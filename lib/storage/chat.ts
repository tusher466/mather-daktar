import { ChatMessage } from "@/types";

const CHAT_STORAGE_KEY = "mather_daktar_chat_v1";
const MAX_SAVED_MESSAGES = 20;

export function getChatMessages(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn("Failed to load chat history:", e);
    return [];
  }
}

export function saveChatMessages(messages: ChatMessage[]): void {
  if (typeof window === "undefined") return;
  try {
    const trimmed = messages.slice(-MAX_SAVED_MESSAGES);
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.warn("Failed to save chat history:", e);
  }
}

export function clearChatMessages(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CHAT_STORAGE_KEY);
  } catch (e) {
    console.warn("Failed to clear chat history:", e);
  }
}
