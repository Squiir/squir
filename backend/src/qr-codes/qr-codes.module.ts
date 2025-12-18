import { Module } from "@nestjs/common";
import { PrismaModule } from "@prisma/prisma.module";
import { QrCodesController } from "@qr-codes/qr-codes.controller";
import { QrCodesService } from "@qr-codes/qr-codes.service";

@Module({
  imports: [PrismaModule],
  controllers: [QrCodesController],
  providers: [QrCodesService],
})
export class QrCodesModule {}
