import { QrCode } from "@app-types/qrcode";
import React from "react";
import { Text, View } from "react-native";

type QrCodeHistoryCardProps = {
	item: QrCode;
};

export function QrCodeHistoryCard({ item }: QrCodeHistoryCardProps) {
	return (
		<View className="bg-white/10 p-4 rounded-lg mb-3">
			<Text className="font-semibold text-base text-white">{item.label}</Text>
			<Text className="text-white/70 text-sm mt-1">
				Consommé le{" "}
				{item.consumedAt &&
					new Date(item.consumedAt).toLocaleDateString("fr-FR", {
						day: "numeric",
						month: "long",
						year: "numeric",
						hour: "2-digit",
						minute: "2-digit",
					})}
			</Text>
		</View>
	);
}
