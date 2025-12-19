import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useAuth } from "@store/auth";
import { API_URL } from "@services/api";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  if (!API_URL) {
    throw new Error("API_URL is not defined");
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    if (!username || !password) {
      Alert.alert("Erreur", "Username et mot de passe requis");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      await login(data.token);

      router.replace("/")

    } catch (error) {
      Alert.alert("Login failed", "Identifiants incorrects");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
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
        disabled={loading}
        onPress={onSubmit}
        className={`w-full items-center py-3 rounded-lg ${
          loading ? "bg-blue-300" : "bg-blue-600"
        }`}
      >
        <Text className="font-semibold text-white">
          {loading ? "..." : "Se connecter"}
        </Text>
      </Pressable>
    </View>
  );
}
