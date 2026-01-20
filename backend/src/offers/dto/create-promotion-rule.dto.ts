import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class CreatePromotionRuleDto {
  @IsString()
  @IsNotEmpty()
  type!: "BUY_X_GET_Y" | "PERCENTAGE_OFF" | "FIXED_AMOUNT_OFF";

  @IsOptional()
  @IsInt()
  @Min(1)
  buyQuantity?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  getQuantity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  percentageOff?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  amountOff?: number;
}
