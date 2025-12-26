import { Badge } from "@components/ui/Badge";
import { API_URL } from "@constants/api";
import { parseQrLabel } from "@utils/qrcode";
import { Image } from "expo-image";
import { Modal, Pressable, Text, View } from "react-native";

type QrCode = {
	id: string;
	label?: string;
	used?: boolean;
	barId?: string;
};

type Props = {
	qr: QrCode | null;
	onClose: () => void;
};

export function QrModal({ qr, onClose }: Props) {
	if (!qr) return null;

	const { barName, offerName, priceText } = parseQrLabel(qr.label);
	const url = `${API_URL}/qrcodes/${qr.id}.png`;

	return (
		<Modal visible transparent animationType="fade">
			<Pressable
				onPress={onClose}
				className="flex-1 justify-center items-center px-6 bg-black/60"
			>
				<Pressable
					onPress={() => {}}
					className="w-full max-w-[400px] bg-gradient-to-br from-white to-blue-50 rounded-3xl overflow-hidden p-6"
				>
					{/* Header */}
					<View className="mb-4">
						<View className="flex-row items-center justify-between mb-2">
							<View className="flex-1 pr-3">
								<Text className="text-gray-900 text-lg font-bold">
									{offerName || qr.label}
								</Text>
								<Text className="text-gray-600 text-sm mt-1">
									{barName ? `Chez ${barName}` : ""}
									{priceText ? ` • ${priceText}` : ""}
								</Text>
							</View>
							<Badge text="QR" variant={qr.used ? "warn" : "ok"} />
						</View>

						<Text className="text-gray-500 text-xs">
							{qr.used ? "Statut : utilisé" : "Statut : disponible"}
							{qr.barId ? ` • ${qr.barId}` : ""}
						</Text>
					</View>

					{/* QR Code - Centré */}
					<View className="items-center justify-center py-4 bg-white rounded-2xl mb-4">
						<Image
							source={{ uri: url }}
							className="w-[280px] h-[280px]"
							contentFit="contain"
						/>
					</View>

					{/* Bouton Fermer */}
					<Pressable
						onPress={onClose}
						className="py-4 rounded-xl bg-blue-500 items-center"
					>
						<Text className="text-white font-bold text-base">Fermer</Text>
					</Pressable>
				</Pressable>
			</Pressable>
		</Modal>
	);
}
