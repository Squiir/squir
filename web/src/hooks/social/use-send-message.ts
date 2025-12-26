import { useMutation, useQueryClient } from "@tanstack/react-query";
import { socialService } from "@/services/social.service";
import type { Message } from "@/types/social";

export function useSendMessage(conversationId: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (text: string) => {
      if (!conversationId) throw new Error("No conversationId");
      return socialService.sendMessage(conversationId, text);
    },
    onSuccess: (message: Message) => {
      queryClient.setQueryData<Message[]>(
        ["social", "messages", conversationId],
        (prev) => (prev ? [...prev, message] : [message])
      );
      queryClient.invalidateQueries({ queryKey: ["social", "conversations"] });
    },
  });
}
