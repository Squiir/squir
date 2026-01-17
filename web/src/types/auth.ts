export interface LoginRequestDto {
  usernameOrEmail: string;
  password: string;
}

export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequestDto {
  email: string;
  username: string;
  password: string;
  birthDate: string;
  firstName?: string;
  lastName?: string;
}
