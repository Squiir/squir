import { GroupsController } from "@groups/groups.controller";
import { GroupsService } from "@groups/groups.service";
import { Module } from "@nestjs/common";
import { PrismaModule } from "@prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
