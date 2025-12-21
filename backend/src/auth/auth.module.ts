import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "@prisma/prisma.module";
import { AuthService } from "@auth/auth.service";
import { AuthController } from "@auth/auth.controller";
import { JwtStrategy } from "@auth/jwt.strategy";
import { JwtRefreshTokenStrategy } from "@auth/jwt-refresh-token.strategy";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "@auth/local.strategy";

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRES_IN) },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
})
export class AuthModule {}
