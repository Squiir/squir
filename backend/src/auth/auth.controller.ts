import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "@auth/auth.service";
import { RegisterDto } from "@auth/dto/register.dto";
import type { LoginDto } from "@auth/dto/login.dto";
import { LocalAuthGuard } from "@auth/lcoal-auth.guard";
import { JwtAuthGuard } from "@auth/jwt-auth.guard";
import { JwtRefreshTokenGuard } from "@auth/jwt-refresh-token.guard";
import { CurrentUserId } from "@auth/current-user.decorator";

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto.email, dto.username, dto.password);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Req() req: LoginDto) {
    return this.auth.login(req.user.id);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post("refresh")
  async refresh(
    @Req() req: LoginDto,
    @Body("refreshToken") refreshToken: string,
  ) {
    return this.auth.refreshTokens(req.user.id, refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  logout(@CurrentUserId() userId: string) {
    return this.auth.logout(userId);
  }
}
