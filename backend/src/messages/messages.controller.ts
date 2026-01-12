import { JwtAuthGuard } from "@auth/jwt-auth.guard";
import { MessagesService } from "@messages/messages.service";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { CurrentUserId } from "@utils/decorators/current-user.decorator";

@Controller("messages")
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messages: MessagesService) {}

  @Get("conversations")
  listConversations(@CurrentUserId() userId: string) {
    return this.messages.getLastMessagesForUser(userId);
  }

  @Get(":friendId")
  getConversation(
    @CurrentUserId() userId: string,
    @Param("friendId") friendId: string,
  ) {
    return this.messages.getConversation(userId, friendId);
  }
}
