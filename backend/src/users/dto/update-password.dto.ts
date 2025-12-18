import { IsString, MinLength, MaxLength } from "class-validator";

export class UpdatePasswordDto {
  @IsString()
  oldPassword!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  newPassword!: string;
}
