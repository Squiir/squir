import { LoginForm } from "@components/form/LoginForm";
import { ThemedScreenWrapper } from "@components/ThemedScreenWrapper";
import { Button } from "@components/ui/Button";
import { Link } from "expo-router";

export default function LoginScreen() {
	return (
		<ThemedScreenWrapper>
			<LoginForm />

			<Link href="/register" asChild>
				<Button title="Pas de compte ? S'inscrire" variant="ghost" />
			</Link>
		</ThemedScreenWrapper>
	);
}
