import { Logger } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: [
      "http://localhost:8081",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    credentials: true,
  },
})
export class QrcodeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private logger = new Logger("QrcodeGateway");

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("join-user-room")
  handleJoinUserRoom(client: Socket, userId: string) {
    const roomName = `user:${userId}`;
    client.join(roomName);
    this.logger.log(`Client ${client.id} joined room: ${roomName}`);
    return { event: "joined-room", data: { room: roomName } };
  }

  notifyQrCodeConsumed(
    userId: string,
    data: {
      qrCodeId: string;
      barId: string;
      productId: string;
      label: string;
      timestamp: Date;
    },
  ) {
    const roomName = `user:${userId}`;
    this.logger.log(`Notifying room ${roomName} of QR code consumption`);

    this.server.to(roomName).emit("qr-consumed", {
      message: "Votre QR code a été scanné !",
      ...data,
    });
  }
}
