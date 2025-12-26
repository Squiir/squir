import { Module } from "@nestjs/common";
import { PrismaModule } from "@prisma/prisma.module";
import { PresenceService } from "@social/presence/presence.service";
import { SocialGateway } from "@social/social.gateway";
import { SocialService } from "@social/social.service";

@Module({
  imports: [PrismaModule],
  providers: [SocialGateway, SocialService, PresenceService],
  exports: [SocialService],
})
export class SocialModule {}
