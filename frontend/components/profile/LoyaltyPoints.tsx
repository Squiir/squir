import { Text, View } from "react-native";

export function LoyaltyPoints({ points }: { points: number }) {
	return (
		<View className="items-center">
			<Text className="text-3xl font-bold text-blue-600">{points}</Text>
			<Text className="text-sm text-gray-500">points de fidélité</Text>
		</View>
	);
}
