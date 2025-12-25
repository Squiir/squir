import { LoginForm } from "@components/form/LoginForm";
import { Button } from "@components/ui/Button";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function LoginScreen() {
	return (
		<View className="items-center justify-center flex-1 px-4 gap-4 background-white">
			<Text className="text-2xl font-bold">Se connecter</Text>

			<LoginForm />

			<View className="w-full flex-row gap-2">
				<Link href="/register" asChild>
					<Button title="Pas de compte ? S'inscrire" variant="ghost" />
				</Link>
			</View>
		</View>
	);
}
