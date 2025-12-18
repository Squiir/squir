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
import { JwtAuthGuard } from "@auth/jwt-auth.guard";
import { CurrentUserId } from "@auth/current-user.decorator";
import { QrCodesService } from "@qrcodes/qrcodes.service";
import { GenerateQrCodeDto } from "@qrcodes/dto/qrcodes.dto";

@Controller("qr-codes")
@UseGuards(JwtAuthGuard)
export class QrCodesController {
  constructor(private qr: QrCodesService) {}

  // generate
  @Post("generate")
  generate(@CurrentUserId() userId: string, @Body() dto: GenerateQrCodeDto) {
    return this.qr.generate(userId, dto.barId, dto.product);
  }

  // list user QR codes 
  @Get()
  listMine(@CurrentUserId() userId: string) {
    return this.qr.listMine(userId);
  }

  // remove qr
  @Delete(":id")
  remove(@CurrentUserId() userId: string, @Param("id") id: string) {
    return this.qr.remove(userId, id);
  }

  // show image PNG
  @Get(":id.png")
  @Header("Content-Type", "image/png")
  async showPng(
    @CurrentUserId() userId: string,
    @Param("id") id: string,
    @Res() res: Response,
  ) {
    const png = await this.qr.renderPng(userId, id);

    // Pour tests: pas de cache agressif
    res.setHeader("Cache-Control", "no-store");
    res.send(png);
  }
}
