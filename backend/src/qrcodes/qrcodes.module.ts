import { Module } from "@nestjs/common";
import { PrismaModule } from "@prisma/prisma.module";
import { QrcodeGateway } from "./qrcode.gateway";
import { QrCodesController } from "./qrcodes.controller";
import { QrCodesService } from "./qrcodes.service";

@Module({
  imports: [PrismaModule],
  controllers: [QrCodesController],
  providers: [QrCodesService, QrcodeGateway],
})
export class QrCodesModule {}
