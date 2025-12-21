import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "@prisma/prisma.module";
import { AuthService } from "@auth/auth.service";
import { AuthController } from "@auth/auth.controller";
import {
  JwtAccessTokenStrategy,
  JwtRefreshTokenStrategy,
} from "@auth/jwt.strategy";

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: "15m" },
    }),
    JwtModule.register({
      secret: process.env.REFRESH_TOKEN_SECRET,
      signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
})
export class AuthModule {}
