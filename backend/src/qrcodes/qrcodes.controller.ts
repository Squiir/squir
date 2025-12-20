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

@Controller("qrcodes")
@UseGuards(JwtAuthGuard)
export class QrCodesController {
  constructor(private readonly qr: QrCodesService) {}

  @Post("generate")
  generate(@CurrentUserId() userId: string, @Body() dto: GenerateQrCodeDto) {
    return this.qr.generate({
      userId,
      barId: dto.barId,
      productId: dto.productId,
      label: dto.label,
    });
  }

  @Get()
  listMine(@CurrentUserId() userId: string) {
    return this.qr.listMine(userId);
  }

  @Delete(":id")
  remove(@CurrentUserId() userId: string, @Param("id") id: string) {
    return this.qr.remove(userId, id);
  }

  @Get(":id.png")
  @Header("Content-Type", "image/png")
  async showPng(
    @CurrentUserId() userId: string,
    @Param("id") id: string,
    @Res() res: Response,
  ) {
    const png = await this.qr.renderPng(userId, id);

    res.setHeader("Cache-Control", "no-store");
    res.send(png);
  }
}
