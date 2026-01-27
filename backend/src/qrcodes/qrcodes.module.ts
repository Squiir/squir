import { AuthModule } from "@auth/auth.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NotificationsModule } from "@notifications/notifications.module";
import { PrismaModule } from "@prisma/prisma.module";
import { UsersModule } from "@users/users.module";
import { QrCodeGateway } from "./qrcode.gateway";
import { QrCodesController } from "./qrcodes.controller";
import { QrCodesService } from "./qrcodes.service";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ConfigModule,
    NotificationsModule,
  ],
  controllers: [QrCodesController],
  providers: [QrCodesService, QrCodeGateway],
})
export class QrCodesModule {}
