import { authService } from "@/services/auth.service";
import type {
  RegisterProfessionalFormValues,
  RegisterProfessionalResponse,
} from "@/types/register-professional";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export function useRegisterProfessional() {
  const queryClient = useQueryClient();
  return useMutation<RegisterProfessionalResponse, AxiosError, RegisterProfessionalFormValues>({
    mutationFn: (dto: RegisterProfessionalFormValues) => authService.registerProfessional(dto),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
