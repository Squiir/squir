import { api } from "@/services/api.service";
import type { ConversationPreview, Message } from "@/types/messages";

export const messagesService = {
  async listConversations(): Promise<ConversationPreview[]> {
    const { data } = await api.get("/messages/conversations");
    return data;
  },

  async getConversation(friendId: string): Promise<Message[]> {
    const { data } = await api.get(`/messages/${friendId}`);
    return data;
  },
};
