import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from "class-validator";

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
  @MinLength(1)
  query!: string;
}
