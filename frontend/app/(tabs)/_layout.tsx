import { Tabs } from "expo-router";
import React from "react";

import { TabBar } from "@components/navigation/TabBar";
import { BounceIcon } from "@components/ui/AnimatedIconSymbol";
import { IconSymbol } from "@components/ui/IconSymbol";

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
						<IconSymbol size={28} name="paperplane.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="social"
				options={{
					title: "Social",
					tabBarIcon: ({ color }) => (
						<BounceIcon
							name="bubble.left.and.bubble.right.fill"
							size={26}
							color={color}
						/>
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
		</Tabs>
	);
}
