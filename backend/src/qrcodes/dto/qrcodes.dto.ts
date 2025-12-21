import { IsString, MaxLength, MinLength } from "class-validator";

export class GenerateQrCodeDto {
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  barId!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(80)
  productId!: string;

  @IsString()
  @MinLength(0)
  @MaxLength(120)
  label?: string;
}
