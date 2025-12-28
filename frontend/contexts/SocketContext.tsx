import { useSocketConnection } from "@hooks/use-socket-connection";
import React, {
	createContext,
	useContext,
	type PropsWithChildren,
} from "react";
import { Socket } from "socket.io-client";

interface SocketContextType {
	socket: Socket | null;
	isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
	socket: null,
	isConnected: false,
});

export function SocketProvider({ children }: PropsWithChildren) {
	const { socket, isConnected } = useSocketConnection();

	return (
		<SocketContext.Provider value={{ socket, isConnected }}>
			{children}
		</SocketContext.Provider>
	);
}

export function useSocket() {
	const context = useContext(SocketContext);
	if (context === undefined) {
		throw new Error("useSocket must be used within a SocketProvider");
	}
	return context;
}
