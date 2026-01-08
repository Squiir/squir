import { AuthProvider, useAuth } from "@contexts/AuthProvider";
import { LocationProvider } from "@contexts/LocationContext";
import { SocketProvider } from "@contexts/SocketContext";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export function RootNavigator() {
	const insets = useSafeAreaInsets();
	const { isLoading, isLoggedIn } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading) {
			router.replace(isLoggedIn ? "/(tabs)" : "/login");
		}
	}, [isLoading, isLoggedIn]);

	if (isLoading) return null;

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: { paddingTop: insets.top },
			}}
		>
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
						<LocationProvider>
							<RootNavigator />
							<StatusBar style="auto" />
						</LocationProvider>
					</ThemeProvider>
				</SocketProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}
