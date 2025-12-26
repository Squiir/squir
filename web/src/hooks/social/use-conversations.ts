import { useQuery } from "@tanstack/react-query";
import { socialService } from "@/services/social.service";
import type { Conversation } from "@/types/social";

export function useConversations() {
  return useQuery<Conversation[]>({
    queryKey: ["social", "conversations"],
    queryFn: socialService.listConversations,
    staleTime: 10_000,
  });
}
