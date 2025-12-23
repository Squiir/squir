import { Pressable, Text, View } from "react-native";
import { ListItemProps } from "@app-types/list-item";

export function ListItem({ title, subtitle, right, onPress }: ListItemProps) {
	return (
		<Pressable
			onPress={onPress}
			className="flex-row items-center justify-between py-4"
		>
			<View>
				<Text className="text-base font-medium text-black dark:text-white">
					{title}
				</Text>
				{subtitle && <Text className="text-sm text-gray-500">{subtitle}</Text>}
			</View>
			{right}
		</Pressable>
	);
}
