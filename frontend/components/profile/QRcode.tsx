import type { QRCodeCarouselProps } from "@app-types/profile";
import { Tokens } from "@constants/tokens";
import { useColorScheme } from "@hooks/color/use-color-scheme";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export function QRCodeCarousel({ qrCodes }: QRCodeCarouselProps) {
	const colorScheme = useColorScheme();
	const isDark = colorScheme === "dark";

	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			<View style={styles.container}>
				{qrCodes.map((qr: any) => (
					<View
						key={qr.id}
						style={[
							styles.qrItem,
							isDark ? styles.qrItemDark : styles.qrItemLight,
						]}
					>
						<Text style={styles.label}>{qr.label}</Text>
					</View>
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: Tokens.spacing[3],
	},
	qrItem: {
		alignItems: "center",
		justifyContent: "center",
		width: 160,
		height: 96,
		borderRadius: Tokens.borderRadius.xl,
	},
	qrItemLight: {
		backgroundColor: Tokens.colors.gray[200],
	},
	qrItemDark: {
		backgroundColor: Tokens.colors.gray[700],
	},
	label: {
		fontSize: Tokens.typography.sizes.sm,
		color: Tokens.colors.white,
	},
});
