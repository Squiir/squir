import { friendsService } from "@/services/friends.service";
import type { FriendSearchResult } from "@/types/friends";
import { useQuery } from "@tanstack/react-query";

export function useSearchFriends(query: string) {
  return useQuery<FriendSearchResult[]>({
    queryKey: ["friends", "search", query],
    queryFn: () => friendsService.searchFriends(query),
    enabled: query.trim().length >= 1,
  });
}
