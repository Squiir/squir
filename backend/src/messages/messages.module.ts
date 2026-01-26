import { AuthModule } from "@auth/auth.module";
import { MessagesController } from "@messages/messages.controller";
import { MessagesService } from "@messages/messages.service";
import { Module } from "@nestjs/common";
import { PrismaModule } from "@prisma/prisma.module";
import { MessagesGateway } from "./messages.gateway";

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesGateway],
  exports: [MessagesService],
})
export class MessagesModule {}
