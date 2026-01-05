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
import { SendMessageDto } from "./dto/send-message.dto";
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

  private activeConversations = new Map<string, string | null>();

  async handleConnection(socket: Socket) {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) throw new UnauthorizedException();

      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });

      socket.data.userId = payload.sub;

      socket.join(payload.sub);

      console.log("WS connected:", payload.sub);
    } catch {
      socket.disconnect();
    }
  }

  handleDisconnect(socket: Socket) {
    console.log("WS disconnected:", socket.data.userId);
  }

  @SubscribeMessage("message:send")
  async handleSendMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: SendMessageDto,
  ) {
    const senderId = socket.data.userId;
    const receiverActiveFriend = this.activeConversations.get(
      payload.receiverId,
    );

    const isReceiverActive = receiverActiveFriend === senderId;

    try {
      const message = await this.messagesService.sendMessage(
        senderId,
        payload.receiverId,
        payload.content,
        { read: isReceiverActive },
      );

      this.server
        .to([payload.receiverId, senderId])
        .emit("message:new", message);
      if (isReceiverActive) {
        this.server
          .to(senderId)
          .emit("conversation:read", { friendId: payload.receiverId });
      }

      return { success: true, message };
    } catch {
      socket.emit("message:error", {
        type: "SEND_MESSAGE_FAILED",
        message: "Impossible d’envoyer le message",
      });

      return { success: false };
    }
  }

  @SubscribeMessage("conversation:read")
  async handleRead(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: { friendId: string },
  ) {
    const userId = socket.data.userId;

    try {
      await this.messagesService.markAsRead(userId, payload.friendId);

      this.server
        .to(payload.friendId)
        .emit("conversation:read", { friendId: userId });

      return { success: true };
    } catch {
      socket.emit("conversation:error", {
        type: "MARK_READ_FAILED",
      });

      return { success: false };
    }
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

  @SubscribeMessage("conversation:active")
  handleActiveConversation(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: { friendId: string | null },
  ) {
    const userId = socket.data.userId;
    this.activeConversations.set(userId, payload.friendId);
  }
}
