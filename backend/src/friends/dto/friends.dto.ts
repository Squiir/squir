import { IsBoolean, IsNotEmpty, IsString, IsUUID } from "class-validator";

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
  @IsNotEmpty()
  query!: string;
}
