import { LoginRequestDto } from "@app-types/auth";
import { authService } from "@services/auth.service";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
	return useMutation({
		mutationFn: (loginRequestDto: LoginRequestDto) =>
			authService.login(loginRequestDto),
	});
}
