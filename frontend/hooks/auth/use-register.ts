import { RegisterRequestDto } from "@app-types/auth";
import { authService } from "@services/auth.service";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
  return useMutation({
    mutationFn: (registerRequestDto: RegisterRequestDto) =>
      authService.register(registerRequestDto),
  });
}
