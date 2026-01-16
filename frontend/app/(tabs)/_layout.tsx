import { Tabs } from "expo-router";
import React from "react";

import { TabBar } from "@components/navigation/TabBar";
import { IconSymbol } from "@components/ui/IconSymbol";
import { Tokens } from "@constants/tokens";

export default function TabLayout() {
	return (
		<Tabs
			tabBar={(props) => <TabBar {...props} />}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="house.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="map"
				options={{
					title: "Map",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="map.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="person.circle" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="qrcode"
				options={{
					title: "QR Code",
					tabBarIcon: ({ color, focused }) => (
						<IconSymbol size={28} name="qrcode" color={Tokens.colors.white} />
					),
				}}
			/>
		</Tabs>
	);
}
