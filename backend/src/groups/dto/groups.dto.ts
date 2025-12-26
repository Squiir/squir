import {
  IsArray,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateGroupDto {
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  name!: string;

  @IsArray()
  @IsUUID("4", { each: true })
  memberIds!: string[];
}

export class UpdateGroupDto {
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  name!: string;
}
