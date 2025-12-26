export type GroupMessagePayload = {
  id: string;
  groupId: string;
  authorId: string;
  text: string;
  createdAt: string;
};

export type GroupReadPayload = {
  groupId: string;
  messageId: string;
  userId: string;
  readAt: string;
};
