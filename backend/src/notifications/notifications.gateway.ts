import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
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
      "https://happy-sky-087b9e503.6.azurestaticapps.net",
    ],
  },
  namespace: "notifications",
})
@Injectable()
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  private userSockets: Map<string, string[]> = new Map();

  constructor(private jwtService: JwtService) {}

  private extractToken(client: Socket): string | null {
    if (client.handshake.auth?.accessToken) {
      return client.handshake.auth.accessToken;
    }
    const authHeader = client.handshake.headers.authorization;
    if (authHeader && authHeader.split(" ")[1]) {
      return authHeader.split(" ")[1];
    }
    const token = client.handshake.query.token as string;
    return token || null;
  }

  async handleConnection(client: Socket) {
    try {
      const token = this.extractToken(client);
      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
      const userId = payload.sub;

      const sockets = this.userSockets.get(userId) || [];
      sockets.push(client.id);
      this.userSockets.set(userId, sockets);

      client.data = { userId };
    } catch (error) {
      console.error("Connection error:", error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data?.userId;
    if (userId) {
      const sockets = this.userSockets.get(userId) || [];
      const updatedSockets = sockets.filter((id) => id !== client.id);

      if (updatedSockets.length === 0) {
        this.userSockets.delete(userId);
      } else {
        this.userSockets.set(userId, updatedSockets);
      }
    }
  }

  sendNotificationToUser(userId: string, notification: any) {
    const sockets = this.userSockets.get(userId);
    if (sockets) {
      sockets.forEach((socketId) => {
        this.server.to(socketId).emit("notification", notification);
      });
    }
  }
}
