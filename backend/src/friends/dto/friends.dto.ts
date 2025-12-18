import { IsUUID } from "class-validator";

export class AddFriendDto {
  @IsUUID()
  friendId!: string;
}
