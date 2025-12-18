import { IsString, MinLength, MaxLength } from "class-validator";

export class GenerateQrCodeDto {
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  barId!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(80)
  product!: string;
}
