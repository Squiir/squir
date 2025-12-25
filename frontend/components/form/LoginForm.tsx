import { ControlledInput } from "@components/form/controlled/ControlledInput";
import { FormStep } from "@components/form/FormStep";
import { Button } from "@components/ui/Button";
import { useLoginForm } from "@hooks/form/use-login-form";
import { View } from "react-native";

export function LoginForm() {
	const { control, isSubmitting, submit } = useLoginForm();

	return (
		<View className="flex-1 bg-white px-6 justify-center">
			<FormStep title="Identifiants">
				<ControlledInput
					name="usernameOrEmail"
					label="Pseudo"
					control={control}
				/>
				<ControlledInput
					name="password"
					label="Mot de passe"
					control={control}
					secureTextEntry
				/>
			</FormStep>

			<Button title="Se connecter" onPress={submit} disabled={isSubmitting} />
		</View>
	);
}
