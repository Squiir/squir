import { Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
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

  constructor(private jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      if (!token) {
        this.logger.warn(`Client ${client.id} connected without token`);
        client.disconnect();
        return;
      }

      const payload = await this.jwtService.verifyAsync(token);
      client.data.userId = payload.sub;
      this.logger.log(`User ${payload.sub} connected: ${client.id}`);
    } catch (error: any) {
      this.logger.error(
        `Authentication failed for ${client.id}: ${error?.message || "Unknown"}`,
      );
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("join-user-room")
  handleJoinUserRoom(client: Socket) {
    const userId = client.data.userId;
    if (!userId) {
      this.logger.warn(
        `Client ${client.id} tried to join room without authentication`,
      );
      return { event: "error", data: { message: "Not authenticated" } };
    }

    const roomName = `user:${userId}`;
    client.join(roomName);
    this.logger.log(
      `User ${userId} (${client.id}) joined own room: ${roomName}`,
    );
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
