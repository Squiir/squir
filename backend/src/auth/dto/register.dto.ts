import { IsEmail, IsString, MinLength, MaxLength, IsISO8601 } from "class-validator";

export class RegisterDto {
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

	@IsISO8601()
	birthDate!: string;

	@IsString()
	@MinLength(2)
	firstName?: string;

	@IsString()
	@MinLength(2)
	lastName?: string;
}
