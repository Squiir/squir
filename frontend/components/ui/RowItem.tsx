import { ThemedText } from "@components/ThemedText";
import { IconSymbol } from "@components/ui/IconSymbol";
import { Tokens } from "@constants/tokens";
import { useThemeColor } from "@hooks/color/use-theme-color";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
	label: string;
	value?: string;
	onPress?: () => void;
	danger?: boolean;
	iconLeft?: React.ComponentProps<typeof IconSymbol>["name"];
};

export function RowItem({ label, value, onPress, danger, iconLeft }: Props) {
	const border = useThemeColor({}, "icon");
	const tint = useThemeColor({}, "tint");

	return (
		<Pressable
			onPress={onPress}
			disabled={!onPress}
			style={({ pressed }) => [
				styles.container,
				{ borderColor: border },
				{ opacity: pressed ? 0.75 : !onPress ? 0.85 : 1 },
			]}
		>
			<View style={styles.content}>
				{iconLeft ? (
					<View style={styles.iconContainer}>
						<IconSymbol
							name={iconLeft}
							size={18}
							color={danger ? Tokens.colors.red[500] : tint}
						/>
					</View>
				) : null}

				<View style={styles.textContainer}>
					<ThemedText style={[styles.label, danger && styles.dangerText]}>
						{label}
					</ThemedText>
					{value ? <ThemedText style={styles.value}>{value}</ThemedText> : null}
				</View>
			</View>

			{onPress ? (
				<IconSymbol name="chevron.right" size={18} color={tint} />
			) : null}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		minHeight: 52,
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 12,
		borderWidth: 0.4,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 10,
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		flex: 1,
		paddingRight: Tokens.spacing[2],
	},
	iconContainer: {
		width: 34,
		height: 34,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	textContainer: {
		flex: 1,
	},
	label: {
		fontSize: 15,
	},
	dangerText: {
		color: Tokens.colors.red[500],
	},
	value: {
		marginTop: 2,
		fontSize: 12,
		opacity: 0.7,
	},
});
