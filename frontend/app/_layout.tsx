import { AuthProvider, useAuth } from "@contexts/AuthProvider";
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
import { GestureHandlerRootView } from "react-native-gesture-handler";
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

import {
	AbrilFatface_400Regular,
	useFonts as useAbrilFatface,
} from "@expo-google-fonts/abril-fatface";
import {
	Anton_400Regular,
	useFonts as useAnton,
} from "@expo-google-fonts/anton";
import {
	BebasNeue_400Regular,
	useFonts as useBebasNeue,
} from "@expo-google-fonts/bebas-neue";
import {
	DancingScript_400Regular,
	DancingScript_700Bold,
	useFonts as useDancingScript,
} from "@expo-google-fonts/dancing-script";
import {
	Lato_400Regular,
	Lato_700Bold,
	useFonts as useLato,
} from "@expo-google-fonts/lato";
import {
	Lobster_400Regular,
	useFonts as useLobster,
} from "@expo-google-fonts/lobster";
import {
	Merriweather_400Regular,
	Merriweather_700Bold,
	useFonts as useMerriweather,
} from "@expo-google-fonts/merriweather";
import {
	Montserrat_400Regular,
	Montserrat_600SemiBold,
	Montserrat_700Bold,
	useFonts as useMontserrat,
} from "@expo-google-fonts/montserrat";
import {
	Nunito_400Regular,
	Nunito_700Bold,
	useFonts as useNunito,
} from "@expo-google-fonts/nunito";
import {
	Oswald_400Regular,
	Oswald_700Bold,
	useFonts as useOswald,
} from "@expo-google-fonts/oswald";
import {
	Pacifico_400Regular,
	useFonts as usePacifico,
} from "@expo-google-fonts/pacifico";
import {
	PlayfairDisplay_400Regular,
	PlayfairDisplay_700Bold,
	useFonts as usePlayfairDisplay,
} from "@expo-google-fonts/playfair-display";
import {
	Poppins_400Regular,
	Poppins_600SemiBold,
	Poppins_700Bold,
	useFonts as usePoppins,
} from "@expo-google-fonts/poppins";
import {
	Raleway_400Regular,
	Raleway_700Bold,
	useFonts as useRaleway,
} from "@expo-google-fonts/raleway";
import {
	Righteous_400Regular,
	useFonts as useRighteous,
} from "@expo-google-fonts/righteous";
import {
	RobotoSlab_400Regular,
	RobotoSlab_700Bold,
	useFonts as useRobotoSlab,
} from "@expo-google-fonts/roboto-slab";
import {
	Rubik_400Regular,
	Rubik_700Bold,
	useFonts as useRubik,
} from "@expo-google-fonts/rubik";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();

	const [fontsLoaded] = usePoppins({
		Poppins_400Regular,
		Poppins_600SemiBold,
		Poppins_700Bold,
	});

	const [montserratLoaded] = useMontserrat({
		Montserrat_400Regular,
		Montserrat_600SemiBold,
		Montserrat_700Bold,
	});

	const [latoLoaded] = useLato({ Lato_400Regular, Lato_700Bold });
	const [oswaldLoaded] = useOswald({ Oswald_400Regular, Oswald_700Bold });
	const [ralewayLoaded] = useRaleway({ Raleway_400Regular, Raleway_700Bold });
	const [playfairLoaded] = usePlayfairDisplay({
		PlayfairDisplay_400Regular,
		PlayfairDisplay_700Bold,
	});
	const [robotoSlabLoaded] = useRobotoSlab({
		RobotoSlab_400Regular,
		RobotoSlab_700Bold,
	});
	const [merriweatherLoaded] = useMerriweather({
		Merriweather_400Regular,
		Merriweather_700Bold,
	});
	const [nunitoLoaded] = useNunito({ Nunito_400Regular, Nunito_700Bold });
	const [rubikLoaded] = useRubik({ Rubik_400Regular, Rubik_700Bold });
	const [bebasLoaded] = useBebasNeue({ BebasNeue_400Regular });
	const [antonLoaded] = useAnton({ Anton_400Regular });
	const [pacificoLoaded] = usePacifico({ Pacifico_400Regular });
	const [dancingLoaded] = useDancingScript({
		DancingScript_400Regular,
		DancingScript_700Bold,
	});
	const [righteousLoaded] = useRighteous({ Righteous_400Regular });
	const [lobsterLoaded] = useLobster({ Lobster_400Regular });
	const [abrilLoaded] = useAbrilFatface({ AbrilFatface_400Regular });

	const allFontsLoaded =
		fontsLoaded &&
		montserratLoaded &&
		latoLoaded &&
		oswaldLoaded &&
		ralewayLoaded &&
		playfairLoaded &&
		robotoSlabLoaded &&
		merriweatherLoaded &&
		nunitoLoaded &&
		rubikLoaded &&
		bebasLoaded &&
		antonLoaded &&
		pacificoLoaded &&
		dancingLoaded &&
		righteousLoaded &&
		lobsterLoaded &&
		abrilLoaded;

	React.useEffect(() => {
		if (allFontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [allFontsLoaded]);

	if (!allFontsLoaded) {
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
