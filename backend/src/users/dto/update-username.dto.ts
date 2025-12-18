import { IsString, MinLength, MaxLength } from "class-validator";

export class UpdateUsernameDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username!: string;
}
