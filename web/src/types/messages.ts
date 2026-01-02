import type { Friend } from "@/types/friends";

export type ConversationPreview = {
  friend: Friend;
  lastMessage?: string;
  createdAt: string;
  unreadCount: number;
  isSender: boolean;
};

export type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  readAt: string | null;
};
