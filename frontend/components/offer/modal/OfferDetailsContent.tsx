import { Offer } from "@app-types/offer";
import { IconSymbol } from "@components/ui/IconSymbol";
import { ModalHeader } from "@components/ui/ModalHeader";
import { Tokens } from "@constants/tokens";
import { formatPrice } from "@utils/format";
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";

interface OfferDetailsContentProps {
	offer: Offer;
	onConfirm: () => void;
	onClose: () => void;
	isPending: boolean;
}

export function OfferDetailsContent({
	offer,
	onConfirm,
	onClose,
	isPending,
}: OfferDetailsContentProps) {
	return (
		<>
			<ModalHeader
				icon="tag.fill"
				title={offer.name}
				subtitle={offer.bar?.name ?? "Offre spéciale"}
			/>

			{typeof offer.squirPrice === "number" && (
				<View style={styles.priceBadge}>
					<Text style={styles.priceText}>{formatPrice(offer.squirPrice)}</Text>
				</View>
			)}

			{offer.description && (
				<Text style={styles.description}>{offer.description}</Text>
			)}

			<View style={styles.actions}>
				{isPending ? (
					<View style={styles.loadingContainer}>
						<ActivityIndicator color={Tokens.colors.pink[400]} />
						<Text style={styles.loadingText}>Génération...</Text>
					</View>
				) : (
					<>
						<Pressable onPress={onConfirm} style={styles.primaryButton}>
							<IconSymbol name="qrcode" size={20} color={Tokens.colors.white} />
							<Text style={styles.primaryButtonText}>Ajouter aux QR codes</Text>
						</Pressable>
						<Pressable onPress={onClose} style={styles.secondaryButton}>
							<Text style={styles.secondaryButtonText}>Annuler</Text>
						</Pressable>
					</>
				)}
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	priceBadge: {
		alignSelf: "flex-start",
		backgroundColor: `${Tokens.colors.pink[400]}20`,
		paddingHorizontal: Tokens.spacing[3],
		paddingVertical: Tokens.spacing[1],
		borderRadius: Tokens.borderRadius.lg,
		marginBottom: Tokens.spacing[3],
	},
	priceText: {
		color: Tokens.colors.pink[600],
		fontSize: Tokens.typography.sizes.lg,
		fontWeight: Tokens.typography.weights.bold,
	},
	description: {
		color: Tokens.colors.gray[600],
		fontSize: Tokens.typography.sizes.sm,
		lineHeight: 20,
		marginBottom: Tokens.spacing[4],
	},
	actions: {
		gap: Tokens.spacing[3],
	},
	loadingContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: Tokens.spacing[4],
	},
	loadingText: {
		color: Tokens.colors.pink[500],
		marginLeft: Tokens.spacing[2],
		fontWeight: Tokens.typography.weights.medium,
	},
	primaryButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: Tokens.spacing[2],
		paddingVertical: Tokens.spacing[4],
		borderRadius: Tokens.borderRadius.xl,
		backgroundColor: Tokens.colors.pink[500],
	},
	primaryButtonText: {
		color: Tokens.colors.white,
		fontWeight: Tokens.typography.weights.bold,
		fontSize: Tokens.typography.sizes.base,
	},
	secondaryButton: {
		paddingVertical: Tokens.spacing[3],
		alignItems: "center",
	},
	secondaryButtonText: {
		color: Tokens.colors.gray[500],
		fontWeight: Tokens.typography.weights.medium,
	},
});
