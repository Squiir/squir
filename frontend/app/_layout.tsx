import { AuthProvider, useAuth } from "@contexts/AuthProvider";
import { SocketProvider } from "@contexts/SocketContext";
import {
	Montserrat_400Regular,
	Montserrat_600SemiBold,
	Montserrat_700Bold,
	useFonts as useMontserrat,
} from "@expo-google-fonts/montserrat";
import { useColorScheme } from "@hooks/color/use-color-scheme";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

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

	const [fontsLoaded] = useMontserrat({
		Montserrat_400Regular,
		Montserrat_600SemiBold,
		Montserrat_700Bold,
	});

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
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
		</GestureHandlerRootView>
	);
}
