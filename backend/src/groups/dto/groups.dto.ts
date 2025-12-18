import { IsString, MinLength, MaxLength } from "class-validator";

export class CreateGroupDto {
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  name!: string;
}

export class UpdateGroupDto {
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  name!: string;
}
