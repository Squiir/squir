import { authService } from "@/services/auth.service";
import type { RegisterProfessionalFormValues } from "@/types/register-professional";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRegisterProfessional() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: RegisterProfessionalFormValues) => authService.registerProfessional(dto),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
