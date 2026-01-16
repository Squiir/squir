import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { SwipeableTabWrapper } from "@components/navigation/SwipeableTabWrapper";
import { QrCard } from "@components/qrcode/QrCard";
import { QrCodeHistory } from "@components/qrcode/QrCodeHistory";
import { QrHeader } from "@components/qrcode/QrHeader";
import { QrModal } from "@components/qrcode/QrModal";
import { IconSymbol } from "@components/ui/IconSymbol";
import { Tokens } from "@constants/tokens";
import { useGetMyQrCodes } from "@hooks/qrcode/use-get-qr-codes";
import { useScannerAccess } from "@hooks/scanner/use-scanner-access";
import { useSocketNotifications } from "@hooks/use-socket-notifications";
import { groupQrCodesByOffer, QrCodeGroup } from "@utils/qrcode";
import { Pressable } from "react-native";

export default function QrCodeScreen() {
	const router = useRouter();
	const { canAccessScanner } = useScannerAccess();

	// Activer les notifications temps réel
	useSocketNotifications();

	const {
		data: qrcodes,
		isLoading: qrsLoading,
		isError: qrsError,
		error: qrsErr,
	} = useGetMyQrCodes();

	// Group QR codes by offer
	const groupedQrCodes = React.useMemo(() => {
		if (!qrcodes) return [];
		return groupQrCodesByOffer(qrcodes);
	}, [qrcodes]);

	const [selectedGroup, setSelectedGroup] = React.useState<
		QrCodeGroup | undefined
	>(undefined);

	return (
		<SwipeableTabWrapper currentRoute="qrcode">
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.content}
			>
				{/* Header */}
				<QrHeader />

				{/* Scanner Button - PRO/ADMIN only */}
				{canAccessScanner && (
					<Pressable
						style={styles.scannerButton}
						onPress={() => router.push("/scanner")}
					>
						<View style={styles.scannerContent}>
							<IconSymbol
								name="camera.fill"
								size={24}
								color={Tokens.colors.pink[300]}
							/>
							<Text style={styles.scannerText}>Scanner un QR code</Text>
						</View>
					</Pressable>
				)}

				{/* QR codes Section */}
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<View style={styles.sectionDot} />
						<Text style={styles.sectionTitle}>Disponibles</Text>
					</View>

					{qrsLoading ? (
						<View style={styles.stateContainer}>
							<Text style={styles.loadingText}>Chargement...</Text>
						</View>
					) : qrsError ? (
						<View style={styles.stateContainer}>
							<Text style={styles.errorText}>
								{qrsErr instanceof Error
									? qrsErr.message
									: "Erreur de chargement"}
							</Text>
						</View>
					) : !groupedQrCodes || groupedQrCodes?.length === 0 ? (
						<View style={styles.emptyContainer}>
							<View style={styles.emptyIcon}>
								<IconSymbol
									name="qrcode"
									size={48}
									color={Tokens.colors.pink[300]}
								/>
							</View>
							<Text style={styles.emptyTitle}>Aucun QR code</Text>
							<Text style={styles.emptySubtitle}>
								Explorez les offres sur la carte pour commencer
							</Text>
						</View>
					) : (
						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							<View style={styles.qrList}>
								{groupedQrCodes.map((group) => (
									<QrCard
										key={group.offerId}
										group={group}
										onPress={() => setSelectedGroup(group)}
									/>
								))}
							</View>
						</ScrollView>
					)}
				</View>

				{/* Modal QR */}
				<QrModal
					group={selectedGroup}
					onClose={() => setSelectedGroup(undefined)}
				/>

				{/* Historique */}
				<QrCodeHistory />
			</ScrollView>
		</SwipeableTabWrapper>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		paddingBottom: Tokens.spacing[16],
	},
	// Header styles moved to components/qrcode/QrHeader.tsx

	// Scanner - No white background
	scannerButton: {
		marginHorizontal: Tokens.spacing[6],
		marginTop: -Tokens.spacing[4],
		borderRadius: Tokens.borderRadius.xl,
		backgroundColor: "transparent", // Transparent
		borderWidth: 2,
		borderColor: Tokens.appColors.light.primary,
	},
	scannerContent: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: Tokens.spacing[4],
	},
	scannerText: {
		color: Tokens.appColors.light.primary,
		fontSize: Tokens.typography.sizes.base,
		fontWeight: Tokens.typography.weights.semibold,
		marginLeft: Tokens.spacing[2],
	},
	// Section
	section: {
		marginTop: Tokens.spacing[8],
		paddingHorizontal: Tokens.spacing[6],
	},
	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: Tokens.spacing[4],
	},
	sectionDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: Tokens.appColors.light.primary,
		marginRight: Tokens.spacing[2],
	},
	sectionTitle: {
		color: Tokens.colors.white,
		fontSize: Tokens.typography.sizes.lg,
		fontWeight: Tokens.typography.weights.bold,
	},
	// States
	stateContainer: {
		paddingVertical: Tokens.spacing[6],
		alignItems: "center",
	},
	loadingText: {
		color: Tokens.colors.pink[300],
		fontSize: Tokens.typography.sizes.base,
	},
	errorText: {
		color: Tokens.colors.red[500],
	},
	// Empty state
	emptyContainer: {
		alignItems: "center",
		paddingVertical: Tokens.spacing[10],
		paddingHorizontal: Tokens.spacing[6],
		backgroundColor: "rgba(236, 72, 153, 0.1)",
		borderRadius: Tokens.borderRadius["2xl"],
		borderWidth: 1,
		borderColor: "rgba(236, 72, 153, 0.2)",
		borderStyle: "dashed",
	},
	emptyIcon: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: "rgba(236, 72, 153, 0.15)",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: Tokens.spacing[4],
	},
	emptyTitle: {
		color: Tokens.colors.white,
		fontSize: Tokens.typography.sizes.lg,
		fontWeight: Tokens.typography.weights.semibold,
		marginBottom: Tokens.spacing[1],
	},
	emptySubtitle: {
		color: Tokens.colors.pink[300],
		fontSize: Tokens.typography.sizes.sm,
		textAlign: "center",
	},
	// QR List
	qrList: {
		flexDirection: "row",
		gap: Tokens.spacing[4],
		paddingRight: Tokens.spacing[4],
	},
});
