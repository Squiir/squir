import { AuthModule } from "@auth/auth.module";
import { Module } from "@nestjs/common";
import { NotificationsController } from "@notifications/notifications.controller";
import { NotificationsGateway } from "@notifications/notifications.gateway";
import { NotificationsService } from "@notifications/notifications.service";
import { PrismaService } from "@prisma/prisma.service";

@Module({
  imports: [AuthModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsGateway, PrismaService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
