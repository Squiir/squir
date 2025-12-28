import { AuthProvider, useAuth } from "@contexts/AuthProvider";
import { SocketProvider } from "@contexts/SocketContext";
import { useLoadUserData } from "@hooks/auth/use-load-user-data";
import { useColorScheme } from "@hooks/color/use-color-scheme";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import "react-native-reanimated";

const queryClient = new QueryClient();

export function RootNavigator() {
	const { isLoading, isLoggedIn } = useAuth();
	const router = useRouter();

	// Load user role and bars when authenticated
	useLoadUserData();

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
				<SocketProvider>
					<ThemeProvider
						value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
					>
						<RootNavigator />
						<StatusBar style="auto" />
					</ThemeProvider>
				</SocketProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}
