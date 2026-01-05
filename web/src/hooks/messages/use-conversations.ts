import { useAuth } from "@/hooks/auth/use-auth";
import { messagesService } from "@/services/messages.service";
import type { ConversationPreview } from "@/types/messages";
import { useQuery } from "@tanstack/react-query";

export function useConversations() {
  const { isLoggedIn } = useAuth();

  return useQuery<ConversationPreview[]>({
    queryKey: ["messages", "conversations"],
    queryFn: messagesService.listConversations,
    enabled: isLoggedIn,
  });
}
