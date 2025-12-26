import { CurrentUserId } from "@auth/current-user.decorator";
import { JwtAuthGuard } from "@auth/jwt-auth.guard";
import { CreateGroupDto, UpdateGroupDto } from "@groups/dto/groups.dto";
import { GroupsService } from "@groups/groups.service";
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

@Controller("groups")
@UseGuards(JwtAuthGuard)
export class GroupsController {
  constructor(private groups: GroupsService) {}

  @Post()
  create(@CurrentUserId() userId: string, @Body() dto: CreateGroupDto) {
    return this.groups.create(userId, dto.name, dto.memberIds);
  }

  @Patch(":groupId")
  update(
    @CurrentUserId() userId: string,
    @Param("groupId") groupId: string,
    @Body() dto: UpdateGroupDto,
  ) {
    return this.groups.updateName(userId, groupId, dto.name);
  }

  @Post(":groupId/join")
  join(@CurrentUserId() userId: string, @Param("groupId") groupId: string) {
    return this.groups.join(userId, groupId);
  }

  @Post(":groupId/leave")
  leave(@CurrentUserId() userId: string, @Param("groupId") groupId: string) {
    return this.groups.leave(userId, groupId);
  }

  @Get(":groupId/share")
  share(@Param("groupId") groupId: string) {
    return this.groups.share(groupId);
  }
}
