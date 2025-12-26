import { IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class SendGroupMessageDto {
  @IsUUID()
  groupId!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  text!: string;
}
