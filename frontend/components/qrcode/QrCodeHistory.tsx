import { QrCode } from "@app-types/qrcode";
import { useGetHistory } from "@hooks/qrcode/use-get-history";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import { QrCodeHistoryCard } from "./QrCodeHistoryCard";

export function QrCodeHistory() {
	const { data: history, isLoading } = useGetHistory();

	return (
		<View className="mt-8 px-6 pb-6">
			<Text className="text-2xl font-bold mb-4 text-white">
				Historique des consommations
			</Text>

			{isLoading ? (
				<ActivityIndicator color="#fff" />
			) : history && history.length > 0 ? (
				<ScrollView className="max-h-96">
					{history.map((item: QrCode) => (
						<QrCodeHistoryCard key={item.id} item={item} />
					))}
				</ScrollView>
			) : (
				<Text className="text-white/50 text-center">Aucun historique</Text>
			)}
		</View>
	);
}
