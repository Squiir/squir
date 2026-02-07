import {
  IsEmail,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class RegisterProfessionalDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  barName!: string;

  @IsString()
  @MinLength(5)
  @MaxLength(200)
  barAddress!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(20)
  arrondissement?: number;

  @IsLatitude()
  latitude!: number;

  @IsLongitude()
  longitude!: number;
}
