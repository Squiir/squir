import { AuthController } from "@auth/auth.controller";
import { AuthService } from "@auth/auth.service";
import { JwtRefreshTokenStrategy } from "@auth/jwt-refresh-token.strategy";
import { JwtStrategy } from "@auth/jwt.strategy";
import { LocalStrategy } from "@auth/local.strategy";
import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "@prisma/prisma.module";

@Global()
@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRES_IN) },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
