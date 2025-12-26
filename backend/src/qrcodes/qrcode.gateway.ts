import { Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { PrismaService } from "@prisma/prisma.service";
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

  private readonly logger = new Logger(QrcodeGateway.name);

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

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

      // Get username for better logs
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: { username: true, role: true },
      });

      this.logger.log(
        `[AUTH] ${user?.username || "Unknown"} (${user?.role || "CUSTOMER"}) connected to server`,
      );
    } catch (error: any) {
      this.logger.error(
        `Authentication failed for ${client.id}: ${error?.message || "Unknown"}`,
      );
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`[WS] Client disconnected: ${client.id}`);
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

    this.server.to(roomName).emit("qrcode:consumed", {
      message: "Votre QR code a été scanné !",
      ...data,
    });
  }
}
