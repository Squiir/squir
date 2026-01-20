import { CreatePromotionRuleDto } from "@offers/dto/create-promotion-rule.dto";
import { Type } from "class-transformer";
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  ValidateNested,
} from "class-validator";

export class CreateOfferDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @Min(0)
  originalPrice!: number;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsDateString()
  validUntil?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreatePromotionRuleDto)
  promotionRule?: CreatePromotionRuleDto;

  @IsString()
  @IsNotEmpty()
  barId!: string;
}
