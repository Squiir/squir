import { IsEnum, IsUUID } from "class-validator";

export class AddFriendDto {
  @IsUUID()
  friendId!: string;
}

export enum FriendResponse {
  ACCEPT = "ACCEPT",
  REJECT = "REJECT",
}

export class RespondFriendDto {
  @IsEnum(FriendResponse)
  response!: FriendResponse;
}
