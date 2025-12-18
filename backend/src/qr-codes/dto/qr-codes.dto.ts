import { IsString, MinLength, MaxLength } from "class-validator";

export class CreateQrDto {
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  label!: string;
}
