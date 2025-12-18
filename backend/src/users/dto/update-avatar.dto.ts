import { IsString, MaxLength } from "class-validator";

export class UpdateAvatarDto {
  @IsString()
  @MaxLength(500)
  avatarUrl!: string;
}
