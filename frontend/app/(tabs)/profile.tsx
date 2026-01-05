import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

import { QrCode } from "@app-types/qrcode";
import { SwipeableTabWrapper } from "@components/navigation/SwipeableTabWrapper";
import { ProfileHeader } from "@components/profile/ProfileHeader";
import { QrCard } from "@components/qrcode/QrCard";
import { QrCodeHistory } from "@components/qrcode/QrCodeHistory";
import { QrModal } from "@components/qrcode/QrModal";
import { Button } from "@components/ui/Button";
import { useLogout } from "@hooks/auth/use-logout";
import { useGetMyQrCodes } from "@hooks/qrcode/use-get-qr-codes";
import { useScannerAccess } from "@hooks/scanner/use-scanner-access";
import { useMe } from "@hooks/use-me";
import { useSocketNotifications } from "@hooks/use-socket-notifications";

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

	const [selectedQr, setSelectedQr] = React.useState<QrCode | undefined>(
		undefined,
	);

	if (!user) return null;

	return (
		<SwipeableTabWrapper currentRoute="profile">
			<ScrollView className="flex-1 px-4 pt-6">
				{/* Header */}
				<ProfileHeader
					username={user.username}
					avatarUrl={user.avatarUrl}
					status={user.status}
				/>

				{/* QR codes */}
				<View className="mt-8">
					<Text className="text-white text-lg font-bold mb-3">
						Mes QR codes
					</Text>

					{qrsLoading ? (
						<Text className="text-white/70">Chargement...</Text>
					) : qrsError ? (
						<Text className="text-red-400">
							{qrsErr instanceof Error
								? qrsErr.message
								: "Erreur de chargement"}
						</Text>
					) : !qrcodes || qrcodes.length === 0 ? (
						<Text className="text-white/70">Aucun QR code pour l'instant.</Text>
					) : (
						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							<View className="flex-row gap-4 pr-4">
								{qrcodes.map((qr: QrCode) => (
									<QrCard
										key={qr.id}
										qr={qr}
										onPress={() => setSelectedQr(qr)}
									/>
								))}
							</View>
						</ScrollView>
					)}
				</View>

				{/* Modal QR */}
				<QrModal qr={selectedQr} onClose={() => setSelectedQr(undefined)} />

				{/* Historique */}
				<QrCodeHistory />

				{/* Actions */}
				<View className="px-6 pt-16 pb-6">
					<View className="gap-4">
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

						<View className="h-2" />

						<Button title="Supprimer le compte" variant="danger" />
					</View>
				</View>
			</ScrollView>
		</SwipeableTabWrapper>
	);
}
