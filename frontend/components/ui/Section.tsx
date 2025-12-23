import { Text, View } from "react-native";
import type { SectionProps } from "@app-types/section";

export function Section({ title, children }: SectionProps) {
	return (
		<View className="gap-3">
			<Text className="text-xl font-bold text-gray-500 uppercase dark:text-white">
				{title}
			</Text>
			{children}
		</View>
	);
}
