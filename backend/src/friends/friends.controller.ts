import { JwtAuthGuard } from "@auth/jwt-auth.guard";
import {
  AddFriendDto,
  RespondFriendDto,
  SearchFriendsDto,
} from "@friends/dto/friends.dto";
import { FriendsService } from "@friends/friends.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { FriendStatus } from "@prisma/client";
import { CurrentUserId } from "@utils/decorators/current-user.decorator";

@Controller("friends")
@UseGuards(JwtAuthGuard)
export class FriendsController {
  constructor(private friends: FriendsService) {}

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
      dto.accept === true ? FriendStatus.ACCEPTED : FriendStatus.REJECTED;

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

  @Get("search")
  search(@CurrentUserId() userId: string, @Query() dto: SearchFriendsDto) {
    return this.friends.searchUsers(userId, dto.query);
  }
}
