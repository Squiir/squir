import { IconSymbol } from "@components/ui/IconSymbol";
import { API_URL } from "@constants/api";
import { Tokens } from "@constants/tokens";
import { parseQrLabel, QrCodeGroup } from "@utils/qrcode";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

type Props = {
	group?: QrCodeGroup;
	onClose: () => void;
};

export function QrModal({ group, onClose }: Props) {
	const [selectedIndex, setSelectedIndex] = useState(0);

	// Reset selection when group changes
	useEffect(() => {
		setSelectedIndex(0);
	}, [group?.offerId]);

	if (!group) return null;

	const qrCodes = group.qrCodes ?? [];
	const totalCount = group.totalCount ?? qrCodes.length;

	// Guard against empty qrCodes array
	if (qrCodes.length === 0) {
		return (
			<Modal visible transparent animationType="fade">
				<View style={styles.overlay}>
					<View style={styles.modalContainer}>
						<View style={styles.modal}>
							<Text style={styles.title}>Aucun QR code disponible</Text>
							<Pressable onPress={onClose} style={styles.closeButton}>
								<Text style={styles.closeButtonText}>Fermer</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
		);
	}

	const selectedQr = qrCodes[selectedIndex];
	if (!selectedQr) return null;

	const { barName, offerName } = parseQrLabel(selectedQr);
	const url = `${API_URL}/qrcodes/${selectedQr.id}.png`;

	const goToPrevious = () => {
		if (selectedIndex > 0) {
			setSelectedIndex(selectedIndex - 1);
		}
	};

	const goToNext = () => {
		if (selectedIndex < totalCount - 1) {
			setSelectedIndex(selectedIndex + 1);
		}
	};

	return (
		<Modal visible transparent animationType="fade">
			{/* Purple-tinted overlay */}
			<View style={styles.overlay}>
				<View style={styles.modalContainer}>
					<View style={styles.modal}>
						{/* Header */}
						<View style={styles.header}>
							<View style={styles.headerIconContainer}>
								<IconSymbol
									name="qrcode.viewfinder"
									size={24}
									color={Tokens.colors.pink[500]}
								/>
							</View>
							<View style={styles.headerContent}>
								<Text style={styles.title}>
									{offerName || selectedQr.label}
								</Text>
								<Text style={styles.subtitle}>
									{barName ? `Chez ${barName}` : ""}
								</Text>
							</View>
						</View>

						{/* QR Code Selector (if multiple) */}
						{totalCount > 1 && (
							<View style={styles.selectorContainer}>
								<Text style={styles.selectorLabel}>
									QR code {selectedIndex + 1} sur {totalCount}
								</Text>

								{/* Navigation arrows + selector */}
								<View style={styles.navigationRow}>
									{/* Previous arrow */}
									<Pressable
										onPress={goToPrevious}
										style={[
											styles.arrowButton,
											selectedIndex === 0 && styles.arrowButtonDisabled,
										]}
									>
										<IconSymbol
											name="chevron.left"
											size={18}
											color={Tokens.colors.white}
										/>
									</Pressable>

									{/* Selector dots */}
									<ScrollView
										horizontal
										showsHorizontalScrollIndicator={false}
										contentContainerStyle={styles.selectorScrollContent}
									>
										{qrCodes.map((qr, index) => (
											<Pressable
												key={qr.id}
												onPress={() => setSelectedIndex(index)}
												style={[
													styles.selectorItem,
													selectedIndex === index && styles.selectorItemActive,
												]}
											>
												<Text
													style={[
														styles.selectorItemText,
														selectedIndex === index &&
															styles.selectorItemTextActive,
													]}
												>
													{index + 1}
												</Text>
												{qr.used && <View style={styles.usedDot} />}
											</Pressable>
										))}
									</ScrollView>

									{/* Next arrow */}
									<Pressable
										onPress={goToNext}
										style={[
											styles.arrowButton,
											selectedIndex === totalCount - 1 &&
												styles.arrowButtonDisabled,
										]}
									>
										<IconSymbol
											name="chevron.right"
											size={18}
											color={Tokens.colors.white}
										/>
									</Pressable>
								</View>
							</View>
						)}

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
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: Tokens.spacing[6],
		backgroundColor: `${Tokens.colors.pink[900]}99`, // 60% opacity
	},
	modalContainer: {
		width: "100%",
		maxWidth: 400,
		shadowColor: Tokens.colors.pink[500],
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.25,
		shadowRadius: 24,
		elevation: 12,
	},
	modal: {
		borderRadius: Tokens.borderRadius["3xl"],
		overflow: "hidden",
		padding: Tokens.spacing[6],
		borderWidth: 1,
		borderColor: Tokens.colors.pink[200],
		backgroundColor: Tokens.colors.pink[50],
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: Tokens.spacing[4],
	},
	headerIconContainer: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: `${Tokens.colors.pink[400]}26`, // 15% opacity
		justifyContent: "center",
		alignItems: "center",
		marginRight: Tokens.spacing[3],
	},
	headerContent: {
		flex: 1,
	},
	title: {
		color: Tokens.colors.pink[900],
		fontSize: Tokens.typography.sizes.lg,
		fontWeight: Tokens.typography.weights.bold,
	},
	subtitle: {
		color: Tokens.colors.pink[600],
		fontSize: Tokens.typography.sizes.sm,
		marginTop: Tokens.spacing[1],
	},
	selectorContainer: {
		marginBottom: Tokens.spacing[4],
		backgroundColor: `${Tokens.colors.pink[400]}33`, // 20% opacity
		borderRadius: Tokens.borderRadius.xl,
		padding: Tokens.spacing[3],
	},
	selectorLabel: {
		color: Tokens.colors.pink[700],
		fontSize: Tokens.typography.sizes.sm,
		fontWeight: "600",
		textAlign: "center",
		marginBottom: Tokens.spacing[3],
	},
	navigationRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	arrowButton: {
		width: 36,
		height: 36,
		borderRadius: Tokens.borderRadius.lg,
		backgroundColor: Tokens.colors.pink[500],
		alignItems: "center",
		justifyContent: "center",
	},
	arrowButtonDisabled: {
		backgroundColor: Tokens.colors.pink[200],
	},
	selectorScrollContent: {
		flexDirection: "row",
		gap: Tokens.spacing[2],
		paddingHorizontal: Tokens.spacing[3],
	},
	selectorItem: {
		width: 40,
		height: 40,
		borderRadius: Tokens.borderRadius.lg,
		backgroundColor: Tokens.colors.white,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 2,
		borderColor: Tokens.colors.pink[200],
		position: "relative",
	},
	selectorItemActive: {
		backgroundColor: Tokens.colors.pink[100],
		borderColor: Tokens.colors.pink[500],
	},
	selectorItemText: {
		color: Tokens.colors.pink[600],
		fontWeight: "700",
		fontSize: Tokens.typography.sizes.base,
	},
	selectorItemTextActive: {
		color: Tokens.colors.pink[700],
	},
	usedDot: {
		position: "absolute",
		top: -3,
		right: -3,
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: Tokens.colors.pink[400],
		borderWidth: 2,
		borderColor: Tokens.colors.white,
	},
	qrContainer: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: Tokens.spacing[4],
		backgroundColor: Tokens.colors.white,
		borderRadius: Tokens.borderRadius["2xl"],
		marginBottom: Tokens.spacing[4],
		borderWidth: 1,
		borderColor: Tokens.colors.pink[200],
	},
	qrImage: {
		width: 260,
		height: 260,
	},
	closeButton: {
		paddingVertical: Tokens.spacing[4],
		borderRadius: Tokens.borderRadius.xl,
		backgroundColor: Tokens.colors.pink[500],
		alignItems: "center",
	},
	closeButtonText: {
		color: Tokens.colors.white,
		fontWeight: Tokens.typography.weights.bold,
		fontSize: Tokens.typography.sizes.base,
	},
});
