import { API_URL } from "@constants/api";
import { useAuthStore } from "@store/auth.store";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useSocketConnection() {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [isConnected, setIsConnected] = useState(false);
	const accessToken = useAuthStore((state) => state.accessToken);

	useEffect(() => {
		if (!accessToken) {
			socket?.disconnect();
			setSocket(null);
			setIsConnected(false);
			return;
		}

		const newSocket = io(API_URL, {
			auth: { token: accessToken },
			transports: ["websocket", "polling"],
		});

		newSocket.on("connect", () => {
			console.log("[WS] Connected:", newSocket.id);
			setIsConnected(true);
			newSocket.emit("join-user-room");
		});

		newSocket.on("disconnect", () => {
			console.log("[WS] Disconnected");
			setIsConnected(false);
		});

		newSocket.on("connect_error", (error) => {
			console.error("[WS] Connection error:", error);
		});

		setSocket(newSocket);

		return () => newSocket.disconnect();
	}, [accessToken]);

	return { socket, isConnected };
}
