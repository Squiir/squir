import { QrCode } from "@app-types/qrcode";
import { Badge } from "@components/ui/Badge";
import { API_URL } from "@constants/api";
import { Tokens } from "@constants/tokens";
import { parseQrLabel } from "@utils/qrcode";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
	qr?: QrCode;
	onClose: () => void;
};

export function QrModal({ qr, onClose }: Props) {
	if (!qr) return null;

	const { barName, offerName, priceText } = parseQrLabel(qr);
	const url = `${API_URL}/qrcodes/${qr.id}.png`;

	return (
		<Modal visible transparent animationType="fade">
			<Pressable onPress={onClose} style={styles.overlay}>
				<Pressable onPress={() => {}}>
					<LinearGradient
						colors={["#ffffff", "#235c84ff"]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.modal}
					>
						{/* Header */}
						<View style={styles.header}>
							<View style={styles.headerRow}>
								<View style={styles.headerContent}>
									<Text style={styles.title}>{offerName || qr.label}</Text>
									<Text style={styles.subtitle}>
										{barName ? `Chez ${barName}` : ""}
									</Text>
								</View>
								<Badge text="QR" variant={qr.used ? "warn" : "ok"} />
							</View>

							<Text style={styles.status}>
								{qr.used ? "Statut : utilisé" : "Statut : disponible"}
							</Text>
						</View>

						{/* QR Code - Centré */}
						<View style={styles.qrContainer}>
							<Image
								source={{ uri: url }}
								style={styles.qrImage}
								contentFit="contain"
							/>
						</View>

						{/* Bouton Fermer */}
						<Pressable onPress={onClose} style={styles.closeButton}>
							<Text style={styles.closeButtonText}>Fermer</Text>
						</Pressable>
					</LinearGradient>
				</Pressable>
			</Pressable>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: Tokens.spacing[6],
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modal: {
		width: "100%",
		maxWidth: 400,
		borderRadius: Tokens.borderRadius["3xl"],
		overflow: "hidden",
		padding: Tokens.spacing[6],
	},
	header: {
		marginBottom: Tokens.spacing[4],
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: Tokens.spacing[2],
	},
	headerContent: {
		flex: 1,
		paddingRight: Tokens.spacing[3],
	},
	title: {
		color: Tokens.colors.gray[900],
		fontSize: Tokens.typography.sizes.lg,
		fontWeight: Tokens.typography.weights.bold,
	},
	subtitle: {
		color: Tokens.colors.gray[600],
		fontSize: Tokens.typography.sizes.sm,
		marginTop: Tokens.spacing[1],
	},
	status: {
		color: Tokens.colors.gray[500],
		fontSize: Tokens.typography.sizes.xs,
	},
	qrContainer: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: Tokens.spacing[4],
		backgroundColor: Tokens.colors.white,
		borderRadius: Tokens.borderRadius["2xl"],
		marginBottom: Tokens.spacing[4],
	},
	qrImage: {
		width: 280,
		height: 280,
	},
	closeButton: {
		paddingVertical: Tokens.spacing[4],
		borderRadius: Tokens.borderRadius.xl,
		backgroundColor: Tokens.colors.primary[500],
		alignItems: "center",
	},
	closeButtonText: {
		color: Tokens.colors.white,
		fontWeight: Tokens.typography.weights.bold,
		fontSize: Tokens.typography.sizes.base,
	},
});
