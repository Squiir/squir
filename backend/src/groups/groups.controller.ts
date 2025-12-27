import { CurrentUserId } from "@auth/current-user.decorator";
import { JwtAuthGuard } from "@auth/jwt-auth.guard";
import {
  AddGroupMembersDto,
  CreateGroupDto,
  GroupListItem,
  UpdateGroupDto,
} from "@groups/dto/groups.dto";
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
    return this.groups.create(userId, dto);
  }

  @Patch(":groupId")
  update(
    @CurrentUserId() userId: string,
    @Param("groupId") groupId: string,
    @Body() dto: UpdateGroupDto,
  ) {
    return this.groups.updateName(userId, groupId, dto.name);
  }

  @Post(":groupId/members")
  addMember(
    @CurrentUserId() userId: string,
    @Param("groupId") groupId: string,
    @Body() dto: AddGroupMembersDto,
  ) {
    return this.groups.addMember(userId, groupId, dto.memberIds);
  }

  @Post(":groupId/leave")
  leave(@CurrentUserId() userId: string, @Param("groupId") groupId: string) {
    return this.groups.leave(userId, groupId);
  }

  @Get(":groupId/share")
  share(@Param("groupId") groupId: string) {
    return this.groups.share(groupId);
  }

  @Get()
  list(@CurrentUserId() userId: string): Promise<GroupListItem[]> {
    return this.groups.listUserGroups(userId);
  }
}
