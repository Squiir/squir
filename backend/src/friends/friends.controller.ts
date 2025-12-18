import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "@auth/jwt-auth.guard";
import { CurrentUserId } from "@auth/current-user.decorator";
import { FriendsService } from "@friends/friends.service";
import { AddFriendDto } from "@friends/dto/friends.dto";

@Controller("friends")
@UseGuards(JwtAuthGuard)
export class FriendsController {
  constructor(private friends: FriendsService) {}

  @Post()
  add(@CurrentUserId() userId: string, @Body() dto: AddFriendDto) {
    return this.friends.add(userId, dto.friendId);
  }

  @Delete(":friendId")
  remove(@CurrentUserId() userId: string, @Param("friendId") friendId: string) {
    return this.friends.remove(userId, friendId);
  }
}
