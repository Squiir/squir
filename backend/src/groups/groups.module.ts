import { GroupsController } from "@groups/groups.controller";
import { GroupsService } from "@groups/groups.service";
import { Module } from "@nestjs/common";
import { NotificationsModule } from "@notifications/notifications.module";
import { PrismaModule } from "@prisma/prisma.module";

@Module({
  imports: [PrismaModule, NotificationsModule],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
