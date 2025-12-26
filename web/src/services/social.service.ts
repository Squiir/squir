import type {
  Conversation,
  ConversationDetails,
  Message,
} from "@/types/social";
import { api } from "@/services/api.service";

export const socialService = {
  async listConversations(): Promise<Conversation[]> {
    const { data } = await api.get<Conversation[]>("/social/conversations");
    return data;
  },

  async getConversationDetails(
    conversationId: string
  ): Promise<ConversationDetails> {
    const { data } = await api.get<ConversationDetails>(
      `/social/conversations/${conversationId}`
    );
    return data;
  },

  async listMessages(conversationId: string): Promise<Message[]> {
    const { data } = await api.get<Message[]>(
      `/social/conversations/${conversationId}/messages`
    );
    return data;
  },

  async sendMessage(conversationId: string, text: string): Promise<Message> {
    const { data } = await api.post<Message>(
      `/social/conversations/${conversationId}/messages`,
      { text }
    );
    return data;
  },
};