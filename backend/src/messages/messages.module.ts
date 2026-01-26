import { AuthModule } from "@auth/auth.module";
import { MessagesController } from "@messages/messages.controller";
import { MessagesService } from "@messages/messages.service";
import { Module } from "@nestjs/common";
import { NotificationsModule } from "@notifications/notifications.module";
import { PrismaModule } from "@prisma/prisma.module";
import { MessagesGateway } from "./messages.gateway";

@Module({
  imports: [PrismaModule, AuthModule, NotificationsModule],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesGateway],
  exports: [MessagesService],
})
export class MessagesModule {}
