import { AuthModule } from "@auth/auth.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "@prisma/prisma.module";
import { UsersModule } from "@users/users.module";
import { QrCodeGateway } from "./qrcode.gateway";
import { QrCodesController } from "./qrcodes.controller";
import { QrCodesService } from "./qrcodes.service";

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, ConfigModule],
  controllers: [QrCodesController],
  providers: [QrCodesService, QrCodeGateway],
})
export class QrCodesModule {}
