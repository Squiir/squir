import { useSocket } from "@contexts/SocketContext";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Alert } from "react-native";

export function useSocketNotifications() {
	const { socket, isConnected } = useSocket();
	const queryClient = useQueryClient();

	useEffect(() => {
		if (!socket || !isConnected) return;

		const handleQrConsumed = (data: { message: string; qrCodeId: string }) => {
			console.log("[NOTIFICATION] QR code consumed:", data);

			// Show notification to user
			Alert.alert("QR Code scanné", data.message, [
				{
					text: "OK",
					style: "default",
				},
			]);

			// Invalidate queries to refresh QR codes list
			queryClient.invalidateQueries({ queryKey: ["qrcodes"] });
		};

		// Listen to event
		socket.on("qrcode:consumed", handleQrConsumed);

		// Cleanup
		return () => {
			socket.off("qrcode:consumed", handleQrConsumed);
		};
	}, [socket, isConnected, queryClient]);
}
