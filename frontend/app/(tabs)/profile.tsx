import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { SwipeableTabWrapper } from "@components/navigation/SwipeableTabWrapper";
import { ProfileHeader } from "@components/profile/ProfileHeader";
import { QrCard } from "@components/qrcode/QrCard";
import { QrCodeHistory } from "@components/qrcode/QrCodeHistory";
import { QrModal } from "@components/qrcode/QrModal";
import { Button } from "@components/ui/Button";
import { Tokens } from "@constants/tokens";
import { useLogout } from "@hooks/auth/use-logout";
import { useGetMyQrCodes } from "@hooks/qrcode/use-get-qr-codes";
import { useScannerAccess } from "@hooks/scanner/use-scanner-access";
import { useMe } from "@hooks/use-me";
import { useSocketNotifications } from "@hooks/use-socket-notifications";
import { groupQrCodesByOffer, QrCodeGroup } from "@utils/qrcode";

export default function ProfileScreen() {
	const { data: user } = useMe();
	const { mutate: logout } = useLogout();
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

	if (!user) return null;

	return (
		<SwipeableTabWrapper currentRoute="profile">
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.content}
			>
				{/* Header */}
				<ProfileHeader
					username={user.username}
					avatarUrl={user.avatarUrl}
					status={user.status}
				/>

				{/* QR codes */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Mes QR codes</Text>

					{qrsLoading ? (
						<Text style={styles.loadingText}>Chargement...</Text>
					) : qrsError ? (
						<Text style={styles.errorText}>
							{qrsErr instanceof Error
								? qrsErr.message
								: "Erreur de chargement"}
						</Text>
					) : !groupedQrCodes || groupedQrCodes?.length === 0 ? (
						<Text style={styles.emptyText}>Aucun QR code pour l'instant.</Text>
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

				{/* Actions */}
				<View style={styles.actionsContainer}>
					<View style={styles.actionsInner}>
						{canAccessScanner && (
							<Button
								title="📷 Scanner un QR code"
								variant="primary"
								onPress={() => router.push("/scanner")}
							/>
						)}

						<Button
							title="Se déconnecter"
							variant="secondary"
							onPress={() => logout()}
						/>

						<View style={styles.spacer} />

						<Button title="Supprimer le compte" variant="danger" />
					</View>
				</View>
			</ScrollView>
		</SwipeableTabWrapper>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		paddingHorizontal: Tokens.spacing[4],
		paddingTop: Tokens.spacing[6],
	},
	section: {
		marginTop: Tokens.spacing[8],
	},
	sectionTitle: {
		color: Tokens.colors.white,
		fontSize: Tokens.typography.sizes.lg,
		fontWeight: Tokens.typography.weights.bold,
		marginBottom: Tokens.spacing[3],
	},
	loadingText: {
		color: "rgba(255, 255, 255, 0.7)",
	},
	errorText: {
		color: Tokens.colors.red[500],
	},
	emptyText: {
		color: "rgba(255, 255, 255, 0.7)",
	},
	qrList: {
		flexDirection: "row",
		gap: Tokens.spacing[4],
		paddingRight: Tokens.spacing[4],
	},
	actionsContainer: {
		paddingHorizontal: Tokens.spacing[6],
		paddingTop: Tokens.spacing[16],
		paddingBottom: Tokens.spacing[6],
	},
	actionsInner: {
		gap: Tokens.spacing[4],
	},
	spacer: {
		height: Tokens.spacing[2],
	},
});
