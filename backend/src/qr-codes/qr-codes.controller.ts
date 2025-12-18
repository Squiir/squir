import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUserId } from "../auth/current-user.decorator";
import { QrCodesService } from "./qr-codes.service";
import { CreateQrDto } from "./dto/qr-codes.dto";

@Controller("qr-codes")
@UseGuards(JwtAuthGuard)
export class QrCodesController {
  constructor(private qr: QrCodesService) {}

  @Post()
  create(@CurrentUserId() userId: string, @Body() dto: CreateQrDto) {
    return this.qr.create(userId, dto.label);
  }
}
