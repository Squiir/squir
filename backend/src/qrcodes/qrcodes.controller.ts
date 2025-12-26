import { Public } from "@auth/public.decorator";
import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { UserRole } from "@prisma/client";
import type { Response } from "express";
import { CurrentUserId } from "../auth/current-user.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { GenerateQrCodeDto } from "./dto/qrcodes.dto";
import { QrCodesService } from "./qrcodes.service";

@Controller("qrcodes")
@UseGuards(JwtAuthGuard)
export class QrCodesController {
  constructor(private readonly qr: QrCodesService) {}

  @Post()
  createQrcode(
    @CurrentUserId() userId: string,
    @Body() dto: GenerateQrCodeDto,
  ) {
    return this.qr.createQrcode({
      userId,
      barId: dto.barId,
      productId: dto.productId,
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
  @Roles(UserRole.BAR_STAFF, UserRole.ADMIN)
  @UseGuards(RolesGuard)
  consumeQrcode(@Param("id") id: string, @Req() req: any) {
    // req.user comes from JwtStrategy.validate() and contains userId, role, barId
    const scanner = {
      userId: req.user.userId,
      role: req.user.role,
      barId: req.user.barId,
    };
    return this.qr.consumeQrCode(id, scanner);
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
