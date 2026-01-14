import { authService } from "@/services/auth.service";
import type { RegisterRequestDto } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: RegisterRequestDto) => authService.register(dto),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
