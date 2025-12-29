import {
  ArrayMinSize,
  IsArray,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateGroupDto {
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  name!: string;

  @IsArray()
  @IsUUID("4", { each: true })
  @ArrayMinSize(2, {
    message:
      "Un groupe doit contenir au moins 2 autres membres en plus de vous-même.",
  })
  memberIds!: string[];
}

export class UpdateGroupDto {
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  name!: string;
}

export class AddGroupMembersDto {
  @IsArray()
  @IsUUID("4", { each: true })
  memberIds!: string[];
}

export interface GroupListItem {
  id: string;
  name: string;
  members: {
    id: string;
    username: string;
    avatarUrl?: string | null;
  }[];
}
