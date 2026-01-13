import { Bar } from "@app-types/bar";
import { Offer } from "@app-types/offer";
import { QrCode } from "@app-types/qrcode";
import { Tokens } from "@constants/tokens";
import { QrCodeDto } from "@services/qrcode.service";
import { formatPrice } from "@utils/format";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
	ActivityIndicator,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";

interface OfferItemProps {
	offer: Offer;
	selectedBar: Bar;
	quantity: number;
	disabled: boolean;
	onCreateQrCode: (qr: QrCodeDto) => void;
}

function OfferItem({
	offer,
	selectedBar,
	quantity,
	disabled,
	onCreateQrCode,
}: OfferItemProps) {
	const handlePress = () => {
		onCreateQrCode({
			offerId: offer.id,
			label: `${selectedBar.name} • ${offer.name}${
				typeof offer.price === "number" ? ` • ${formatPrice(offer.price)}` : ""
			}`,
		});
	};

	return (
		<Pressable
			onPress={handlePress}
			disabled={disabled}
			style={[
				styles.offerItem,
				styles.offerActive,
				disabled && styles.offerOpacity,
			]}
		>
			<View style={styles.offerRow}>
				<Text style={styles.offerName}>{offer.name}</Text>
				{quantity > 0 && (
					<Text style={styles.offerStock}>En stock: x{quantity}</Text>
				)}
			</View>
			{typeof offer.price === "number" && (
				<Text style={styles.offerPrice}>{formatPrice(offer.price)}</Text>
			)}
		</Pressable>
	);
}

// TODO: Remove this component or at least refactor it
export function OfferCardFromMap({
	offerOpen,
	setOfferOpen,
	selectedBar,
	qrcodes,
	onCreateQrCode,
	isCreateQrCodePending,
	isGetMyQrCodesPending,
}: {
	offerOpen: boolean;
	setOfferOpen: (open: boolean) => void;
	selectedBar: Bar | null | undefined;
	qrcodes: QrCode[] | null;
	onCreateQrCode: (qr: QrCodeDto) => void;
	isCreateQrCodePending: boolean;
	isGetMyQrCodesPending: boolean;
}) {
	const offers = selectedBar?.offers ?? [];

	return (
		<Modal
			visible={offerOpen}
			transparent
			animationType="fade"
			onRequestClose={() => setOfferOpen(false)}
		>
			<Pressable onPress={() => setOfferOpen(false)} style={styles.overlay}>
				<Pressable onPress={() => {}}>
					<LinearGradient
						colors={["#ffffff", "#1e4e71ff"]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.modal}
					>
						<Text style={styles.title}>{selectedBar?.name ?? "Offres"}</Text>
						<Text style={styles.subtitle}>
							Choisis une offre pour générer le QR code
						</Text>

						<View style={styles.offersList}>
							{offers.map((offer) => (
								<OfferItem
									key={offer.id}
									offer={offer}
									selectedBar={selectedBar!}
									quantity={
										qrcodes?.filter(
											(qr) =>
												qr.offer?.barId === selectedBar!.id &&
												qr.offerId === offer.id,
										).length ?? 0
									}
									disabled={isCreateQrCodePending}
									onCreateQrCode={onCreateQrCode}
								/>
							))}

							{offers.length === 0 && (
								<Text style={styles.empty}>Aucune offre disponible.</Text>
							)}
						</View>

						<View style={styles.loadingRow}>
							{(isCreateQrCodePending || isGetMyQrCodesPending) && (
								<>
									<ActivityIndicator color={Tokens.colors.primary[600]} />
									<Text style={styles.loadingText}>
										{isCreateQrCodePending
											? "Génération…"
											: "Chargement du stock…"}
									</Text>
								</>
							)}
						</View>

						<Pressable
							onPress={() => setOfferOpen(false)}
							style={styles.closeButton}
						>
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
		maxWidth: 380,
		borderRadius: Tokens.borderRadius["3xl"],
		overflow: "hidden",
		padding: Tokens.spacing[6],
	},
	title: {
		color: Tokens.colors.gray[900],
		fontSize: Tokens.typography.sizes.xl,
		fontWeight: Tokens.typography.weights.bold,
		marginBottom: Tokens.spacing[1],
	},
	subtitle: {
		color: Tokens.colors.gray[600],
		fontSize: Tokens.typography.sizes.sm,
		marginBottom: Tokens.spacing[4],
	},
	offersList: {
		gap: 10,
		marginBottom: Tokens.spacing[4],
	},
	offerItem: {
		paddingVertical: Tokens.spacing[3],
		paddingHorizontal: Tokens.spacing[4],
		borderRadius: Tokens.borderRadius.xl,
		borderWidth: 2,
	},
	offerActive: {
		backgroundColor: Tokens.colors.primary[50],
		borderColor: Tokens.colors.primary[200],
	},
	offerDisabled: {
		backgroundColor: Tokens.colors.gray[100],
		borderColor: Tokens.colors.gray[300],
	},
	offerOpacity: {
		opacity: 0.5,
	},
	offerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	offerName: {
		color: Tokens.colors.gray[900],
		fontWeight: Tokens.typography.weights.bold,
	},
	offerStock: {
		color: Tokens.colors.gray[500],
		fontWeight: Tokens.typography.weights.semibold,
		fontSize: Tokens.typography.sizes.sm,
	},
	offerPrice: {
		color: Tokens.colors.gray[600],
		marginTop: Tokens.spacing[1],
	},
	empty: {
		color: Tokens.colors.gray[500],
	},
	loadingRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: Tokens.spacing[4],
		minHeight: 24,
	},
	loadingText: {
		color: Tokens.colors.gray[600],
		marginLeft: Tokens.spacing[2],
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
