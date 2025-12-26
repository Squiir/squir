import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRole } from "@prisma/client";
import { PrismaService } from "@prisma/prisma.service";
import { iso8601ToDateTime } from "@utils/date";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingEmail = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingEmail) throw new ConflictException("Email already used");

    const existingUsername = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });
    if (existingUsername) throw new ConflictException("Username already used");

    // Validation: BAR_STAFF must have barId
    if (dto.role === UserRole.BAR_STAFF && !dto.barId) {
      throw new BadRequestException("Bar staff must be associated with a bar");
    }

    // Verify bar exists if barId provided
    if (dto.barId) {
      const bar = await this.prisma.bar.findUnique({
        where: { id: dto.barId },
      });
      if (!bar) throw new NotFoundException("Bar not found");
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        password: hashed,
        birthDate: iso8601ToDateTime(dto.birthDate),
        firstName: dto.firstName,
        lastName: dto.lastName,
        role: dto.role || UserRole.CUSTOMER,
        barId: dto.barId,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        barId: true,
      },
    });

    const tokens = await this.generateTokens(
      user.id,
      user.email,
      user.role,
      user.barId,
    );
    return { ...tokens, user };
  }

  async login(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true, barId: true },
    });
    if (!user) throw new NotFoundException("User not found");

    const tokens = await this.generateTokens(
      user.id,
      user.email,
      user.role,
      user.barId,
    );
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        barId: true,
        refreshToken: true,
      },
    });

    if (!user || !user.refreshToken) {
      throw new ForbiddenException("Access denied");
    }

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException("Access denied");
    }

    const tokens = await this.generateTokens(
      user.id,
      user.email,
      user.role,
      user.barId,
    );
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  private async generateTokens(
    userId: string,
    email: string,
    role: UserRole,
    barId?: string | null,
  ) {
    const payload = {
      sub: userId,
      email,
      role,
      barId: barId || undefined,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRES_IN),
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: Number(process.env.REFRESH_TOKEN_EXPIRES_IN),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: refreshTokenHash },
    });
  }
}
