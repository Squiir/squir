import { AuthModule } from "@auth/auth.module";
import { Module } from "@nestjs/common";
import { NotificationsController } from "@notifications/notifications.controller";
import { NotificationsGateway } from "@notifications/notifications.gateway";
import { NotificationsService } from "@notifications/notifications.service";
import { PrismaModule } from "@prisma/prisma.module";

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsGateway],
  exports: [NotificationsService],
})
export class NotificationsModule {}
