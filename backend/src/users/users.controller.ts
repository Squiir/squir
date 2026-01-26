import { JwtAuthGuard } from "@auth/jwt-auth.guard";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateAvatarDto } from "@users/dto/update-avatar.dto";
import { UpdatePasswordDto } from "@users/dto/update-password.dto";
import { UpdateStatusDto } from "@users/dto/update-status.dto";
import { UpdateUsernameDto } from "@users/dto/update-username.dto";
import { UsersService } from "@users/users.service";
import { CurrentUserId } from "@utils/decorators/current-user.decorator";
import { AzureStorageService } from "../azure-storage/azure-storage.service";

@Controller("users")
export class UsersController {
  constructor(
    private users: UsersService,
    private azureStorage: AzureStorageService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("me")
  me(@CurrentUserId() userId: string) {
    return this.users.me(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get("id")
  myId(@CurrentUserId() userId: string) {
    return { id: userId };
  }

  @UseGuards(JwtAuthGuard)
  @Delete("me")
  deleteMe(@CurrentUserId() userId: string) {
    return this.users.deleteMe(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post("me/avatar/upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadAvatar(
    @CurrentUserId() userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = await this.users.me(userId);
    if (user.avatarUrl) {
      await this.azureStorage.deleteFile(user.avatarUrl);
    }

    const avatarUrl = await this.azureStorage.uploadFile(file);
    return this.users.updateAvatar(userId, avatarUrl);
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

  @UseGuards(JwtAuthGuard)
  @Post("favorites/venues/:id")
  toggleFavoriteVenue(
    @CurrentUserId() userId: string,
    @Param("id") barId: string,
  ) {
    return this.users.toggleFavoriteVenue(userId, barId);
  }

  @UseGuards(JwtAuthGuard)
  @Post("favorites/offers/:id")
  toggleSavedOffer(
    @CurrentUserId() userId: string,
    @Param("id") offerId: string,
  ) {
    return this.users.toggleSavedOffer(userId, offerId);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile/favorites")
  getFavorites(@CurrentUserId() userId: string) {
    return this.users.getFavorites(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get("wallet")
  getWallet(@CurrentUserId() userId: string) {
    return this.users.getWallet(userId);
  }
}
