import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@components/ThemedText";
import { ThemedView } from "@components/ThemedView";
import { IconSymbol } from "@components/ui/IconSymbol";
import { Colors } from "@constants/theme";
import { Tokens } from "@constants/tokens";
import { useColorScheme } from "@hooks/color/use-color-scheme";

export function Collapsible({
	children,
	title,
}: PropsWithChildren & { title: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const theme = useColorScheme() ?? "light";

	return (
		<ThemedView>
			<TouchableOpacity
				style={styles.header}
				onPress={() => setIsOpen((value) => !value)}
				activeOpacity={0.8}
			>
				<IconSymbol
					name="chevron.right"
					size={18}
					weight="medium"
					color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
					textClassName={isOpen ? "rotate-[90deg]" : "rotate-[0deg]"}
				/>

				<ThemedText type="defaultSemiBold">{title}</ThemedText>
			</TouchableOpacity>
			{isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	content: {
		marginTop: 6,
		marginLeft: Tokens.spacing[6],
	},
});
