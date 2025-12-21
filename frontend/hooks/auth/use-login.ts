import { LoginRequestDto } from "@app-types/auth";
import { authService } from "@services/auth.service";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: ({ username, password }: LoginRequestDto) =>
      authService.login(username, password),
  });
}
