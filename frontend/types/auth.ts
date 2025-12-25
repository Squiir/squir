import { LoginFormData } from "./schemas/login-schema";
import { RegistrationFormData } from "./schemas/registration-schema";

export interface RegisterRequestDto extends Omit<
	RegistrationFormData,
	"birthDate"
> {
	birthDate: string;
}

export interface LoginRequestDto extends LoginFormData {}

export interface AuthResponseDto {
	accessToken: string;
	refreshToken: string;
}
