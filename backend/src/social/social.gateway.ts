import { JwtService } from "@nestjs/jwt";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { createWsJwtMiddleware } from "@social/middlewares/ws-jwt.middleware";
import { PresenceService } from "@social/presence/presence.service";
import { SocialService } from "@social/social.service";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketAuthData,
} from "@social/types/socket";
import type { Server, Socket } from "socket.io";

import { FriendUserPayload } from "@social/types/friends";
import { GroupInvitePayload } from "@social/types/groups";
import type { GroupMessagePayload } from "@social/types/message";

type TypedSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  {},
  SocketAuthData
>;

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
  namespace: "/ws",
})
export class SocialGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private server!: TypedSocket;

  constructor(
    private readonly jwtService: JwtService,
    private readonly socialService: SocialService,
    private readonly presenceService: PresenceService,
  ) {}

  afterInit(server: Server): void {
    server.use(createWsJwtMiddleware(this.jwtService));
  }

  async handleConnection(client: TypedSocket) {
    const userId = client.data.userId;
    if (!userId) {
      client.disconnect();
      return;
    }

    this.presenceService.setOnline(userId);

    this.server.emit("presence:update", {
      userId,
      status: "online",
    });

    const groupIds = await this.socialService.getUserGroupIds(userId);
    for (const groupId of groupIds) {
      await client.join(`group:${groupId}`);
    }

    console.log(
      `[ws] connected: ${client.id} user=${userId} groups=${groupIds.length}`,
    );
  }

  handleDisconnect(client: TypedSocket) {
    const userId = client.data.userId;

    this.presenceService.setOffline(userId);

    this.server.emit("presence:update", {
      userId,
      status: "offline",
    });

    console.log(`[ws] disconnected: ${client.id} user=${client.data.userId}`);
  }

  @SubscribeMessage("group:sendMessage")
  async handleSendMessage(
    @MessageBody()
    payload: { groupId: string; text: string },
    @ConnectedSocket() client: TypedSocket,
  ): Promise<void> {
    const message: GroupMessagePayload =
      await this.socialService.createGroupMessage(
        client.data.userId,
        payload.groupId,
        payload.text,
      );

    this.server
      .to(`group:${payload.groupId}`)
      .emit("group:newMessage", message);
  }

  @SubscribeMessage("group:history")
  async handleGroupHistory(
    @MessageBody()
    body: {
      groupId: string;
      cursor?: string;
      limit?: number;
    },
    @ConnectedSocket() client: TypedSocket,
  ): Promise<void> {
    const { groupId, cursor, limit } = body;

    const result = await this.socialService.getGroupMessages(
      client.data.userId,
      groupId,
      limit,
      cursor,
    );

    client.emit("group:history:result", {
      groupId,
      messages: result.messages,
      nextCursor: result.nextCursor,
    });
  }

  @SubscribeMessage("group:read")
  async handleRead(
    @MessageBody()
    payload: { groupId: string; messageId: string },
    @ConnectedSocket() client: TypedSocket,
  ): Promise<void> {
    const read = await this.socialService.markMessageRead(
      client.data.userId,
      payload.groupId,
      payload.messageId,
    );

    this.server.to(`group:${payload.groupId}`).emit("group:read:update", read);
  }

  notifyFriendRequest(receiverId: string, from: FriendUserPayload) {
    this.server.to(`user:${receiverId}`).emit("friend:request", from);
  }

  notifyFriendAccepted(requesterId: string, by: FriendUserPayload) {
    this.server.to(`user:${requesterId}`).emit("friend:accepted", by);
  }

  notifyGroupInvite(userId: string, payload: GroupInvitePayload) {
    this.server.to(`user:${userId}`).emit("group:invited", payload);
  }
}
