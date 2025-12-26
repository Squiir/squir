import { GroupsController } from "@groups/groups.controller";
import { GroupsService } from "@groups/groups.service";
import { Module } from "@nestjs/common";
import { PrismaModule } from "@prisma/prisma.module";
import { SocialModule } from "@social/social.module";

@Module({
  imports: [PrismaModule, SocialModule],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
