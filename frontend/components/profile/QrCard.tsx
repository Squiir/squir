import { View } from "react-native";
import { ThemedText } from "@components/ThemedText";
import { useThemeColor } from "@hooks/color/use-theme-color";

export function QrCard({ label }: { label: string }) {
	const surface = useThemeColor({}, "surface");
	const background = useThemeColor({}, "background");
	const text = useThemeColor({}, "textPrimary");

	return (
		<View
			className="w-[140px] h-[180px] rounded-[16px] p-4 mr-3 justify-between"
			style={{ backgroundColor: surface }}
		>
			<View
				className="flex-1 rounded-[12px] mb-3"
				style={{ backgroundColor: background }}
			/>

			<ThemedText style={{ color: text }}>{label}</ThemedText>
		</View>
	);
}
