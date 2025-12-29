import { IconSymbol } from "@components/ui/IconSymbol";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export function GoBackButton() {
	const router = useRouter();

	return (
		<Pressable
			onPress={() => router.back()}
			style={{
				flexDirection: "row",
				alignItems: "center",
				marginLeft: 10,
			}}
		>
			<IconSymbol name="chevron.backward" size={24} color="black" />
		</Pressable>
	);
}
