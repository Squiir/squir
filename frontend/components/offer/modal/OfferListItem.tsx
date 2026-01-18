import { Offer } from "@app-types/offer";
import { Tokens } from "@constants/tokens";
import { formatPrice } from "@utils/format";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
	offer: Offer;
	quantity: number;
	disabled: boolean;
	onPress: () => void;
}

export function OfferListItem({ offer, quantity, disabled, onPress }: Props) {
	return (
		<Pressable
			onPress={onPress}
			disabled={disabled}
			style={[styles.item, disabled && styles.itemDisabled]}
		>
			<View style={styles.row}>
				<View style={styles.info}>
					<Text style={styles.name}>{offer.name}</Text>
					{typeof offer.price === "number" && (
						<Text style={styles.price}>{formatPrice(offer.price)}</Text>
					)}
				</View>
				{quantity > 0 && (
					<View style={styles.stockBadge}>
						<Text style={styles.stockText}>x{quantity}</Text>
					</View>
				)}
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	item: {
		backgroundColor: Tokens.colors.white,
		borderRadius: Tokens.borderRadius.xl,
		padding: Tokens.spacing[4],
		marginBottom: Tokens.spacing[2],
		borderWidth: 1,
		borderColor: Tokens.colors.pink[200],
	},
	itemDisabled: {
		opacity: 0.5,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	info: {
		flex: 1,
	},
	name: {
		color: Tokens.colors.gray[900],
		fontSize: Tokens.typography.sizes.base,
		fontWeight: Tokens.typography.weights.semibold,
	},
	price: {
		color: Tokens.colors.pink[600],
		fontSize: Tokens.typography.sizes.sm,
		fontWeight: Tokens.typography.weights.medium,
		marginTop: 2,
	},
	stockBadge: {
		backgroundColor: Tokens.colors.pink[100],
		paddingHorizontal: Tokens.spacing[2],
		paddingVertical: Tokens.spacing[1],
		borderRadius: Tokens.borderRadius.md,
	},
	stockText: {
		color: Tokens.colors.pink[600],
		fontSize: Tokens.typography.sizes.xs,
		fontWeight: Tokens.typography.weights.bold,
	},
});
