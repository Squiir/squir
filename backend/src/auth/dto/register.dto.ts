import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateIf,
} from "class-validator";

export enum UserRole {
  CUSTOMER = "CUSTOMER",
  BAR_STAFF = "BAR_STAFF",
  ADMIN = "ADMIN",
}

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(3)
  username!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsDateString()
  birthDate!: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsUUID()
  @IsOptional()
  @ValidateIf((o) => o.role === UserRole.BAR_STAFF)
  barId?: string;
}
