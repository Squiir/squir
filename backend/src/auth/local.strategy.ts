import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { PrismaService } from "@prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { isEmail } from "class-validator";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({ usernameField: "usernameOrEmail" });
  }

  async validate(usernameOrEmail: string, password: string) {
    console.log(usernameOrEmail, password);

    const query = isEmail(usernameOrEmail)
      ? { email: usernameOrEmail }
      : { username: usernameOrEmail };

    console.log(query);

    const user = await this.prisma.user.findUnique({
      where: query,
    });

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return user;
  }
}
