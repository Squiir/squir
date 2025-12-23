import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      queryClient.clear();
      return authService.logout();
    },
  });
}
