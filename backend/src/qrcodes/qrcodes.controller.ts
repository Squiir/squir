import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import type { Response } from "express";
import { QrCodesService } from "./qrcodes.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUserId } from "../auth/current-user.decorator";
import { GenerateQrCodeDto } from "./dto/qrcodes.dto";
import { Public } from "@auth/public.decorator";

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

  @Delete(":id")
  removeQrcode(@CurrentUserId() userId: string, @Param("id") id: string) {
    return this.qr.removeQrcode(userId, id);
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
