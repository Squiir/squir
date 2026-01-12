import { useAuth } from "@/hooks/auth/use-auth";
import { messagesService } from "@/services/messages.service";
import type { Message } from "@/types/messages";
import { useQuery } from "@tanstack/react-query";

export function useConversation(friendId?: string) {
  const { isLoggedIn } = useAuth();

  return useQuery<Message[]>({
    queryKey: ["messages", "conversation", friendId],
    queryFn: () => messagesService.getConversation(friendId!),
    enabled: isLoggedIn && !!friendId,
    initialData: [],
  });
}
