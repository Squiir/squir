import {
	RegistrationFormData,
	registrationSchema,
} from "@app-types/schemas/registration-schema";
import { useRegister } from "@hooks/auth/use-register";
import { useMultiStepForm } from "@hooks/form/use-multi-step-form";

export function useRegistrationForm() {
	const { mutate: register } = useRegister();

	return useMultiStepForm<RegistrationFormData>({
		schema: registrationSchema,
		defaultValues: {
			username: "",
			email: "",
			password: "",
			firstName: "",
			lastName: "",
			birthDate: new Date(),
		},
		stepsFields: [
			["username", "email", "password"],
			["firstName", "lastName"],
			["birthDate"],
		],
		onSubmit: async (data: RegistrationFormData) =>
			register({
				...data,
				birthDate: data.birthDate.toISOString(),
			}),
	});
}
