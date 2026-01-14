import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { SwipeableTabWrapper } from "@components/navigation/SwipeableTabWrapper";
import { QrCard } from "@components/qrcode/QrCard";
import { QrCodeHistory } from "@components/qrcode/QrCodeHistory";
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
				{/* Header - Solid pink background */}
				<View style={styles.headerContainer}>
					<View style={styles.headerContent}>
						<View style={styles.headerIcon}>
							<IconSymbol
								name="qrcode.viewfinder"
								size={32}
								color={Tokens.colors.white}
							/>
						</View>
						<Text style={styles.title}>Mes QR Codes</Text>
						<Text style={styles.subtitle}>
							{groupedQrCodes.length > 0
								? `${groupedQrCodes.length} offre${groupedQrCodes.length > 1 ? "s" : ""} disponible${groupedQrCodes.length > 1 ? "s" : ""}`
								: "Scannez ou achetez des offres"}
						</Text>
					</View>
				</View>

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
								color={Tokens.colors.white}
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
	// Header
	headerContainer: {
		paddingTop: Tokens.spacing[12],
		paddingBottom: Tokens.spacing[8],
		paddingHorizontal: Tokens.spacing[6],
		borderBottomLeftRadius: Tokens.borderRadius["3xl"],
		borderBottomRightRadius: Tokens.borderRadius["3xl"],
		backgroundColor: Tokens.colors.pink[400], // Lighter than scanner button
	},
	headerContent: {
		alignItems: "center",
	},
	headerIcon: {
		width: 64,
		height: 64,
		borderRadius: 32,
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: Tokens.spacing[3],
	},
	title: {
		color: Tokens.colors.white,
		fontSize: Tokens.typography.sizes["2xl"],
		fontWeight: Tokens.typography.weights.bold,
	},
	subtitle: {
		color: "rgba(255, 255, 255, 0.8)",
		fontSize: Tokens.typography.sizes.sm,
		marginTop: Tokens.spacing[1],
	},
	// Scanner
	scannerButton: {
		marginHorizontal: Tokens.spacing[6],
		marginTop: -Tokens.spacing[4],
		borderRadius: Tokens.borderRadius.xl,
		backgroundColor: Tokens.colors.pink[500],
		borderWidth: 2,
		borderColor: Tokens.colors.white,
		shadowColor: Tokens.colors.pink[500],
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
	},
	scannerContent: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: Tokens.spacing[4],
		gap: Tokens.spacing[2],
	},
	scannerText: {
		color: Tokens.colors.white,
		fontSize: Tokens.typography.sizes.base,
		fontWeight: Tokens.typography.weights.semibold,
	},
	// Section
	section: {
		marginTop: Tokens.spacing[6],
		paddingHorizontal: Tokens.spacing[4],
	},
	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: Tokens.spacing[3],
	},
	sectionDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: Tokens.colors.pink[500],
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
