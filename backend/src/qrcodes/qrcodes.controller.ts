import { CurrentUserId } from "@auth/current-user.decorator";
import { JwtAuthGuard } from "@auth/jwt-auth.guard";
import { Public } from "@auth/public.decorator";
import { Roles } from "@auth/roles.decorator";
import { RolesGuard } from "@auth/roles.guard";
import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { GenerateQrCodeDto } from "@qrcodes/dto/qrcodes.dto";
import { QrCodesService } from "@qrcodes/qrcodes.service";
import { UsersService } from "@users/users.service";
import type { Response } from "express";

@Controller("qrcodes")
@UseGuards(JwtAuthGuard, RolesGuard)
export class QrCodesController {
  constructor(
    private readonly qr: QrCodesService,
    private readonly users: UsersService,
  ) {}

  @Post()
  createQrcode(
    @CurrentUserId() userId: string,
    @Body() dto: GenerateQrCodeDto,
  ) {
    return this.qr.createQrcode({
      userId,
      barId: dto.barId,
      offerId: dto.offerId,
      label: dto.label,
    });
  }

  @Get("me")
  getMyQrcodes(@CurrentUserId() userId: string) {
    return this.qr.getMyQrcodes(userId);
  }

  @Get("history")
  getHistory(@CurrentUserId() userId: string) {
    return this.qr.getHistory(userId);
  }

  @Post(":id/consume")
  @Roles(UserRole.ADMIN, UserRole.PROFESSIONAL)
  async consumeQrcode(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
  ) {
    return this.qr.consumeQrCode(id, userId);
  }

  @Public()
  @Get(":id.png")
  @Header("Content-Type", "image/png")
  async showPng(@Param("id") id: string, @Res() res: Response) {
    const png = await this.qr.renderPng(id);

    res.setHeader("Cache-Control", "no-store");
    res.send(png);
  }
}
