import { API_URL } from "@constants/api";
import { useAuthStore } from "@store/auth.store";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

/**
 * Custom hook to manage WebSocket connection
 * Connects to the server when user is authenticated
 * Automatically disconnects when user logs out
 */
export function useSocketConnection() {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [isConnected, setIsConnected] = useState(false);
	const accessToken = useAuthStore((state) => state.accessToken);

	useEffect(() => {
		// Ne se connecter que si l'utilisateur est authentifié
		if (!accessToken) {
			if (socket) {
				socket.disconnect();
				setSocket(null);
				setIsConnected(false);
			}
			return;
		}

		// Créer la connexion Socket.IO
		const newSocket = io(API_URL, {
			auth: {
				token: accessToken,
			},
			transports: ["websocket", "polling"],
		});

		newSocket.on("connect", () => {
			console.log("✅ WebSocket connected:", newSocket.id);
			setIsConnected(true);

			// Join user room (server uses JWT token)
			newSocket.emit("room:join", (response: any) => {
				console.log("Joined room:", response);
			});
		});

		newSocket.on("disconnect", () => {
			console.log("❌ WebSocket disconnected");
			setIsConnected(false);
		});

		newSocket.on("connection:error", (error) => {
			console.error("[WS] Connection error:", error);
		});

		setSocket(newSocket);

		// Cleanup à la déconnexion
		return () => {
			newSocket.disconnect();
		};
	}, [accessToken]);

	return { socket, isConnected };
}
