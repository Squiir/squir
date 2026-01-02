import { MessagesController } from "@messages/messages.controller";
import { MessagesService } from "@messages/messages.service";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "@prisma/prisma.module";
import { MessagesGateway } from "./messages.gateway";

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesGateway],
  exports: [MessagesService],
})
export class MessagesModule {}
