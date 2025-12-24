import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";

import { QrCode } from "@app-types/qrcode";
import { ProfileHeader } from "@components/profile/ProfileHeader";
import { QrCard } from "@components/qrcode/QrCard";
import { QrModal } from "@components/qrcode/QrModal";
import { Button } from "@components/ui/Button";
import { useLogout } from "@hooks/auth/use-logout";
import { useDeleteQrCode } from "@hooks/qrcode/use-delete-qr-code";
import { useGetMyQrCodes } from "@hooks/qrcode/use-get-qr-codes";
import { useMe } from "@hooks/use-me";
import { useSocketNotifications } from "@hooks/use-socket-notifications";

export default function ProfileScreen() {
	const { data: user } = useMe();
	const { mutate: logout } = useLogout();
	const router = useRouter();

	// Activer les notifications temps réel
	useSocketNotifications();

	const {
		data: qrcodes,
		isLoading: qrsLoading,
		isError: qrsError,
		error: qrsErr,
	} = useGetMyQrCodes();

	const { mutateAsync: deleteQrCode, isPending } = useDeleteQrCode();

	const [selectedQr, setSelectedQr] = React.useState<null | QrCode>(null);

	function handleDeleteQr() {
		if (!selectedQr?.id) return;

		Alert.alert("Supprimer ce QR code ?", "Cette action est irréversible.", [
			{ text: "Annuler", style: "cancel" },
			{
				text: "Supprimer",
				style: "destructive",
				onPress: async () => {
					try {
						await deleteQrCode(selectedQr.id);
						setSelectedQr(null);
					} catch (e: any) {
						Alert.alert(
							"Erreur",
							e?.message ?? "Impossible de supprimer le QR code.",
						);
					}
				},
			},
		]);
	}

	if (!user) return null;

	return (
		<ScrollView className="flex-1 px-4 pt-6">
			{/* Header */}
			<ProfileHeader
				username={user.username}
				avatarUrl={user.avatarUrl}
				status={user.status}
			/>

			{/* QR codes */}
			<View className="mt-8">
				<Text className="text-white text-lg font-bold mb-3">Mes QR codes</Text>

				{qrsLoading ? (
					<View className="py-6 items-center">
						<ActivityIndicator />
					</View>
				) : qrsError ? (
					<Text className="text-red-400">
						{qrsErr instanceof Error ? qrsErr.message : "Erreur de chargement"}
					</Text>
				) : !qrcodes || qrcodes.length === 0 ? (
					<Text className="text-white/70">Aucun QR code pour l’instant.</Text>
				) : (
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						<View className="flex-row gap-4 pr-4">
							{qrcodes.map((qr: QrCode) => (
								<QrCard key={qr.id} qr={qr} onPress={() => setSelectedQr(qr)} />
							))}
						</View>
					</ScrollView>
				)}
			</View>

			{/* Modal QR */}
			<QrModal
				qr={selectedQr}
				deleting={isPending}
				onClose={() => setSelectedQr(null)}
				onDelete={handleDeleteQr}
			/>

			{/* Actions */}
			<View className="px-6 pt-16 pb-6">
				<View className="gap-4">
					<Button
						title="📷 Scanner un QR code"
						variant="primary"
						onPress={() => router.push("/scanner")}
					/>

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
	);
}
