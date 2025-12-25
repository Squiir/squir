import { AuthService } from "@auth/auth.service";
import { CurrentUserId } from "@auth/current-user.decorator";
import type { AuthDto } from "@auth/dto/auth.dto";
import { RegisterDto } from "@auth/dto/register.dto";
import { JwtAuthGuard } from "@auth/jwt-auth.guard";
import { JwtRefreshTokenGuard } from "@auth/jwt-refresh-token.guard";
import { LocalAuthGuard } from "@auth/local-auth.guard";
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Req() req: AuthDto) {
    return this.auth.login(req.user.id);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post("refresh")
  async refresh(
    @Req() req: AuthDto,
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
