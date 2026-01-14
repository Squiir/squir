import { userService } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status: string) => userService.updateStatus(status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
