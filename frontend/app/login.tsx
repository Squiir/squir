import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { Link } from "expo-router";
import { useLogin } from "@hooks/auth/use-login";

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
			}
		);
	}

	return (
		<View className="items-center justify-center flex-1 gap-4 px-6 background-white">
			<Text className="text-2xl font-bold">Login</Text>

			<TextInput
				placeholder="Username"
				autoCapitalize="none"
				className="w-full px-4 py-3 border rounded-lg"
				value={username}
				onChangeText={setUsername}
			/>

			<TextInput
				placeholder="Password"
				secureTextEntry
				className="w-full px-4 py-3 border rounded-lg"
				value={password}
				onChangeText={setPassword}
			/>

			<Pressable
				disabled={isPending}
				onPress={onSubmit}
				className={`w-full items-center py-3 rounded-lg ${isPending ? "bg-blue-300" : "bg-blue-600"}`}
			>
				<Text className="font-semibold text-white">
					{isPending ? "..." : "Se connecter"}
				</Text>
			</Pressable>

			<Link href="/register" asChild>
				<Pressable className="mt-4">
					<Text className="text-blue-600 text-center">Pas de compte ? S'inscrire</Text>
				</Pressable>
			</Link>
		</View>
	);
}
