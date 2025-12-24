import { useGetHistory } from "@hooks/qrcode/use-get-history";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

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
					{history.map((item: any) => (
						<View key={item.id} className="bg-white/10 p-4 rounded-lg mb-3">
							<Text className="font-semibold text-base text-white">
								{item.label}
							</Text>
							<Text className="text-white/70 text-sm mt-1">
								Consommé le{" "}
								{new Date(item.consumedAt).toLocaleDateString("fr-FR", {
									day: "numeric",
									month: "long",
									year: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								})}
							</Text>
							<Text className="text-white/50 text-xs mt-1">
								{item.bar?.name || "Bar inconnu"}
							</Text>
						</View>
					))}
				</ScrollView>
			) : (
				<Text className="text-white/50 text-center">Aucun historique</Text>
			)}
		</View>
	);
}
