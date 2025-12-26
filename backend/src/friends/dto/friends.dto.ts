import { IsBoolean, IsString, IsUUID, MinLength } from "class-validator";

export class AddFriendDto {
  @IsUUID()
  friendId!: string;
}

export class RespondFriendDto {
  @IsBoolean()
  accept!: boolean;
}

export class SearchFriendsDto {
  @IsString()
  @MinLength(1)
  query!: string;
}
