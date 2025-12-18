import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(email: string, username: string, password: string) {
    const existingEmail = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingEmail) throw new ConflictException("Email already used");

    const existingUsername = await this.prisma.user.findUnique({
      where: { username },
    });
    if (existingUsername) throw new ConflictException("Username already used");

    const hashed = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { email, username, password: hashed },
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        status: true,
        loyaltyPoints: true,
      },
    });

    const token = await this.jwt.signAsync({ sub: user.id });
    return { user, token };
  }

  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) throw new UnauthorizedException("Invalid credentials");

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException("Invalid credentials");

    const token = await this.jwt.signAsync({ sub: user.id });
    const userWithoutPassword = {
      id: user.id,
      email: user.email,
      username: user.username,
      avatarUrl: user.avatarUrl,
      status: user.status,
      loyaltyPoints: user.loyaltyPoints,
    };
    return { user: userWithoutPassword, token };
  }
}
