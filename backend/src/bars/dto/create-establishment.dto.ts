import {
  IsInt,
  IsLatitude,
  IsLongitude,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CreateEstablishmentDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @IsString()
  @MinLength(5)
  @MaxLength(200)
  address!: string;

  @IsInt()
  @Min(1)
  @Max(20)
  arrondissement!: number;

  @IsLatitude()
  latitude!: number;

  @IsLongitude()
  longitude!: number;
}
