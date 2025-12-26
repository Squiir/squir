export type ID = string;

export type UserLite = {
  id: ID;
  username: string;
  avatarUrl?: string | null;
};

export type Conversation = {
  id: ID;
  type: "group" | "dm";
  name: string;
  avatarUrl?: string | null;
  membersCount: number;
  lastMessage?: {
    id: ID;
    text: string;
    createdAt: string;
    author: UserLite;
  } | null;
  unreadCount?: number;
  updatedAt: string;
};

export type Message = {
  id: ID;
  conversationId: ID;
  author: UserLite;
  text: string;
  createdAt: string;
  readBy: UserLite[];
};

export type ConversationDetails = {
  id: ID;
  name: string;
  avatarUrl?: string | null;
  members: UserLite[];
  membersCount: number;
  nextEvent?: {
    date?: string | null;
    place?: string | null;
    time?: string | null;
  } | null;
};
