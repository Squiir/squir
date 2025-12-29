import { useAuth } from "@/hooks/auth/use-auth";
import { friendsService } from "@/services/friends.service";
import type { FriendRequest } from "@/types/friends";
import { useQuery } from "@tanstack/react-query";

export function usePendingFriends() {
  const { isLoggedIn } = useAuth();

  return useQuery<FriendRequest[]>({
    queryKey: ["friends", "pending"],
    queryFn: friendsService.listPendingRequests,
    enabled: isLoggedIn,
    initialData: [],
  });
}
