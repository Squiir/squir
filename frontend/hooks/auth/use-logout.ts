import { authService } from "@services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      queryClient.clear();
      return authService.logout();
    },
  });
}
