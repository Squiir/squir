import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class SendMessageDto {
  @IsString()
  receiverId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  content!: string;
}
