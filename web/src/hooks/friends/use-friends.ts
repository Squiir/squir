import { useAuth } from "@/hooks/auth/use-auth";
import { friendsService } from "@/services/friends.service";
import type { Friend } from "@/types/friends";
import { useQuery } from "@tanstack/react-query";

export function useFriends() {
  const { isLoggedIn } = useAuth();

  return useQuery<Friend[]>({
    queryKey: ["friends"],
    queryFn: friendsService.listFriends,
    enabled: isLoggedIn,
  });
}
