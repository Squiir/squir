import { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { Link } from "expo-router";
import { useLogin } from "@hooks/auth/use-login";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";

export default function LoginScreen() {
	const { mutate: login, isPending } = useLogin();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function onSubmit() {
		if (!username || !password) {
			Alert.alert("Erreur", "Username et mot de passe requis");
			return;
		}

		login(
			{ username, password },
			{
				onError: () => {
					Alert.alert("Login failed", "Identifiants incorrects");
				},
			},
		);
	}

	return (
		<View className="items-center justify-center flex-1 px-4 gap-4 background-white">
			<Text className="text-2xl font-bold">Login</Text>

			<Input
				placeholder="Username"
				autoCapitalize="none"
				value={username}
				onChangeText={setUsername}
			/>

			<Input
				placeholder="Password"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>

			<View className="w-full flex-row gap-2">
				<Button
					title="Se connecter"
					variant="primary"
					onPress={onSubmit}
					disabled={isPending}
				/>

				<Link href="/register" asChild>
					<Button title="Pas de compte ? S'inscrire" variant="ghost" />
				</Link>
			</View>
		</View>
	);
}
