import { RegistrationFormData } from "./schemas/registration-schema";
import { User } from "./user";

export interface RegisterRequestDto extends Omit<
	RegistrationFormData,
	"birthDate"
> {
	birthDate: string;
}

export interface LoginRequestDto {
	username: string;
	password: string;
}

export interface AuthResponseDto {
	accessToken: string;
	refreshToken: string;
	user?: User;
}
