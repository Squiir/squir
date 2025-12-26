import { CurrentUserId } from "@auth/current-user.decorator";
import { JwtAuthGuard } from "@auth/jwt-auth.guard";
import {
  AddFriendDto,
  FriendResponse,
  RespondFriendDto,
} from "@friends/dto/friends.dto";
import { FriendsService } from "@friends/friends.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { FriendStatus } from "@prisma/client";

@Controller("friends")
@UseGuards(JwtAuthGuard)
export class FriendsController {
  constructor(private readonly friends: FriendsService) {}

  @Post()
  sendRequest(@CurrentUserId() userId: string, @Body() dto: AddFriendDto) {
    return this.friends.sendRequest(userId, dto.friendId);
  }

  @Post(":id/respond")
  respond(
    @CurrentUserId() userId: string,
    @Param("id") id: string,
    @Body() dto: RespondFriendDto,
  ) {
    const status =
      dto.response === FriendResponse.ACCEPT
        ? FriendStatus.ACCEPTED
        : FriendStatus.REJECTED;

    return this.friends.respondToRequest(userId, id, status);
  }

  @Get("pending")
  pending(@CurrentUserId() userId: string) {
    return this.friends.listPending(userId);
  }

  @Get()
  list(@CurrentUserId() userId: string) {
    return this.friends.listFriends(userId);
  }

  @Delete(":friendId")
  remove(@CurrentUserId() userId: string, @Param("friendId") friendId: string) {
    return this.friends.deleteFriend(userId, friendId);
  }
}
