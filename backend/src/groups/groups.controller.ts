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

  @Patch(":id")
  update(
    @CurrentUserId() userId: string,
    @Param("id") groupId: string,
    @Body() dto: UpdateGroupDto,
  ) {
    return this.groups.updateName(userId, groupId, dto.name);
  }

  @Post(":id/join")
  join(@CurrentUserId() userId: string, @Param("id") groupId: string) {
    return this.groups.join(userId, groupId);
  }

  @Post(":id/leave")
  leave(@CurrentUserId() userId: string, @Param("id") groupId: string) {
    return this.groups.leave(userId, groupId);
  }

  @Get(":id/share")
  share(@Param("id") groupId: string) {
    return this.groups.share(groupId);
  }
}
