import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { MessagesService } from "./messages.service";

@WebSocketGateway({
  namespace: "/ws",
  cors: { origin: "*" },
})
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  constructor(
    private messagesService: MessagesService,
    private jwtService: JwtService,
  ) {}

  async handleConnection(socket: Socket) {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) throw new UnauthorizedException();

      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });

      socket.data.userId = payload.sub;

      socket.join(payload.sub);

      console.log("🟢 WS connected:", payload.sub);
    } catch {
      socket.disconnect();
    }
  }

  handleDisconnect(socket: Socket) {
    console.log("🔴 WS disconnected:", socket.data.userId);
  }

  @SubscribeMessage("message:send")
  async handleSendMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody()
    payload: { receiverId: string; content: string },
  ) {
    const senderId = socket.data.userId;

    const message = await this.messagesService.sendMessage(
      senderId,
      payload.receiverId,
      payload.content,
    );

    this.server.to([payload.receiverId]).emit("message:new", message);

    return message;
  }

  @SubscribeMessage("conversation:read")
  async handleRead(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: { friendId: string },
  ) {
    const userId = socket.data.userId;
    await this.messagesService.markAsRead(userId, payload.friendId);

    this.server
      .to(payload.friendId)
      .emit("conversation:read", { friendId: userId });
  }

  @SubscribeMessage("typing:start")
  handleTypingStart(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: { friendId: string },
  ) {
    const userId = socket.data.userId;
    this.server.to(payload.friendId).emit("typing:start", userId);
  }

  @SubscribeMessage("typing:stop")
  handleTypingStop(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: { friendId: string },
  ) {
    const userId = socket.data.userId;
    this.server.to(payload.friendId).emit("typing:stop", userId);
  }
}
