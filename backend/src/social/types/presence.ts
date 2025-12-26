export type PresenceStatus = "online" | "offline";

export type PresenceUpdatePayload = {
  userId: string;
  status: PresenceStatus;
};

export type TypingPayload = {
  groupId: string;
  userId: string;
  isTyping: boolean;
};
