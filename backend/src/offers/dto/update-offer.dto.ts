import { PartialType } from "@nestjs/mapped-types";
import { IsInt, IsOptional, IsString, IsUrl, Min } from "class-validator";
import { CreateOfferDto } from "./create-offer.dto";

export class UpdateOfferDto extends PartialType(CreateOfferDto) {
  @IsOptional()
  @IsUrl()
  imageUrl?: string | null;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number | null;
}
