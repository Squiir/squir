import { CurrentUserId } from "@auth/current-user.decorator";
import { JwtAuthGuard } from "@auth/jwt-auth.guard";
import { Public } from "@auth/public.decorator";
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
import { GenerateQrCodeDto } from "@qrcodes/dto/qrcodes.dto";
import { QrCodesService } from "@qrcodes/qrcodes.service";
import type { Response } from "express";

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
  consumeQrcode(@Param("id") id: string) {
    return this.qr.consumeQrCode(id);
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
