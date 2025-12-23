import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Redirect, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useColorScheme } from "@hooks/color/use-color-scheme";
import { AuthProvider, useAuth } from "@contexts/AuthProvider";
import React, { useEffect } from "react";

const queryClient = new QueryClient();

export function RootNavigator() {
	const { isLoading, isLoggedIn } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading) {
			router.replace(isLoggedIn ? "/(tabs)" : "/login");
		}
	}, [isLoading, isLoggedIn]);

	if (isLoading) return null;

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(tabs)" />
			<Stack.Screen name="login" />
			<Stack.Screen name="register" />
		</Stack>
	);
}

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<ThemeProvider
					value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
				>
					<RootNavigator />
					<StatusBar style="auto" />
				</ThemeProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}
