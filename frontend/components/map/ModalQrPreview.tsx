import { QrCode } from "@app-types/qrcode";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

type ModalQrPreviewProps = {
	visible: boolean;
	onClose: () => void;
	qrcode?: QrCode;
};

export function ModalQrPreview({
	visible,
	onClose,
	qrcode,
}: ModalQrPreviewProps) {
	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			onRequestClose={onClose}
		>
			<Pressable
				onPress={onClose}
				className="flex-1 items-center justify-center px-6 bg-black/50"
			>
				<Pressable
					className="w-full max-w-[380px] rounded-3xl overflow-hidden p-6"
					style={{
						backgroundColor: "white",
						backgroundImage:
							"linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%)",
					}}
				>
					{/* Icône succès */}
					<View className="items-center mb-4">
						<View className="w-16 h-16 bg-green-500 rounded-full items-center justify-center">
							<Text className="text-white text-3xl">✓</Text>
						</View>
					</View>

					{/* Message */}
					<Text className="text-gray-900 text-xl font-bold text-center mb-2">
						QR Code généré !
					</Text>

					<Text className="text-gray-600 text-center mb-1">
						{qrcode?.label ?? "Sans label"}
					</Text>

					<Text className="text-gray-500 text-sm text-center mb-6">
						Retrouvez-le dans votre profil
					</Text>

					{/* Bouton */}
					<Pressable
						onPress={onClose}
						className="py-4 rounded-xl bg-blue-500 items-center"
					>
						<Text className="text-white font-bold text-base">OK</Text>
					</Pressable>
				</Pressable>
			</Pressable>
		</Modal>
	);
}
