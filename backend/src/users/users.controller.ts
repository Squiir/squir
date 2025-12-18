import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "@users/users.service";
import { JwtAuthGuard } from "@auth/jwt-auth.guard";
import { CurrentUserId } from "@auth/current-user.decorator";
import { UpdateAvatarDto } from "@users/dto/update-avatar.dto";
import { UpdateStatusDto } from "@users/dto/update-status.dto";
import { UpdateUsernameDto } from "@users/dto/update-username.dto";
import { UpdatePasswordDto } from "@users/dto/update-password.dto";

@Controller("users")
export class UsersController {
  constructor(private users: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get("me")
  me(@CurrentUserId() userId: string) {
    return this.users.me(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("me")
  deleteMe(@CurrentUserId() userId: string) {
    return this.users.deleteMe(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("me/avatar")
  updateAvatar(@CurrentUserId() userId: string, @Body() dto: UpdateAvatarDto) {
    return this.users.updateAvatar(userId, dto.avatarUrl);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("me/status")
  updateStatus(@CurrentUserId() userId: string, @Body() dto: UpdateStatusDto) {
    return this.users.updateStatus(userId, dto.status);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("me/username")
  updateUsername(
    @CurrentUserId() userId: string,
    @Body() dto: UpdateUsernameDto,
  ) {
    return this.users.updateUsername(userId, dto.username);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("me/password")
  updatePassword(
    @CurrentUserId() userId: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.users.updatePassword(userId, dto.oldPassword, dto.newPassword);
  }

  @Get(":username/share")
  share(@Param("username") username: string) {
    return this.users.shareByUsername(username);
  }
}
