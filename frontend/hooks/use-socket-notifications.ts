import { useSocket } from "@contexts/SocketContext";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Alert } from "react-native";

export function useSocketNotifications() {
	const { socket, isConnected } = useSocket();
	const queryClient = useQueryClient();

	useEffect(() => {
		if (!socket || !isConnected) return;

		const handleQrConsumed = (data: {
			message: string;
			qrCodeId: string;
			barId: string;
			productId: string;
			label: string;
			timestamp: string;
		}) => {
			console.log("[NOTIFICATION] QR code consumed:", data);

			// Afficher une notification à l'utilisateur
			Alert.alert("QR Code scanné", data.message, [
				{
					text: "OK",
					style: "default",
				},
			]);

			// Invalider le cache pour rafraîchir automatiquement la liste
			queryClient.invalidateQueries({ queryKey: ["qrcodes"] });
		};

		// Écouter l'événement
		socket.on("qrcode:consumed", handleQrConsumed);

		// Cleanup
		return () => {
			socket.off("qrcode:consumed", handleQrConsumed);
		};
	}, [socket, isConnected, queryClient]);
}
