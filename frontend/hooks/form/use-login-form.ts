import { LoginFormData, loginSchema } from "@app-types/schemas/login-schema";
import { useLogin } from "@hooks/auth/use-login";
import { useMultiStepForm } from "@hooks/form/use-multi-step-form";

export function useLoginForm() {
	const { mutate: login } = useLogin();

	return useMultiStepForm<LoginFormData>({
		schema: loginSchema,
		defaultValues: {
			password: "",
			usernameOrEmail: "",
		},
		stepsFields: [["usernameOrEmail", "password"]],
		onSubmit: login,
	});
}
