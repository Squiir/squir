import { Module } from "@nestjs/common";
import { QrCodesController } from "./qrcodes.controller";
import { QrCodesService } from "./qrcodes.service";
import { PrismaModule } from "@prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [QrCodesController],
  providers: [QrCodesService],
})
export class QrCodesModule {}
