import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "@auth/auth.service";
import { RegisterDto } from "@auth/dto/register.dto";
import { LoginDto } from "@auth/dto/login.dto";
import { RefreshDto } from "@auth/dto/refresh.dto";

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto.email, dto.username, dto.password);
  }

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.username, dto.password);
  }

  @Post("refresh")
  refresh(@Body() dto: RefreshDto) {
    return this.auth.ref(dto.refreshToken);
  }
}
