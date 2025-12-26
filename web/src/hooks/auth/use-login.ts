import { authService } from "@/services/auth.service";
import { friendsService } from "@/services/friends.service";
import type { LoginRequestDto } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ username, password }: LoginRequestDto) => authService.login(username, password),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      await queryClient.prefetchQuery({
        queryKey: ["friends", "pending"],
        queryFn: friendsService.listPendingRequests,
      });
    },
  });
}
