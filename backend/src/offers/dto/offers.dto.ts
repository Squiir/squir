import { Type } from "class-transformer";
import { IsIn, IsNumber, IsOptional, Max, Min } from "class-validator";

export class OfferParamsDto {
  @IsOptional()
  @IsIn(["distance", "price", "name", "createdAt"])
  sortBy?: "distance" | "price" | "name" | "createdAt";

  @IsOptional()
  @IsIn(["asc", "desc"])
  orderBy?: "asc" | "desc" = "asc";

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minDistance?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxDistance?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  limit?: number = 10;
}
