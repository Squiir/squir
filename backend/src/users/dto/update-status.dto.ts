import { IsString, MaxLength } from "class-validator";

export class UpdateStatusDto {
  @IsString()
  @MaxLength(140)
  status!: string;
}
