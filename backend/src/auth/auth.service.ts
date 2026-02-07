import { BarsService } from "@bars/bars.service";
import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Prisma } from "@prisma/client";
import { PrismaService } from "@prisma/prisma.service";
import { StripeService } from "@stripe/stripe.service";
import { iso8601ToDateTime } from "@utils/date";
import * as bcrypt from "bcrypt";
import { RegisterProfessionalDto } from "./dto/register-professional.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private barsService: BarsService,
    private stripeService: StripeService,
  ) {}

  /**
   * Register a new user account
   * @param dto - Registration data including email, username, password, and birthdate
   * @returns Access and refresh tokens
   * @throws ConflictException if email or username already exists
   */
  async register(dto: RegisterDto) {
    const existingEmail = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingEmail) throw new ConflictException("Email already used");

    const existingUsername = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });
    if (existingUsername) throw new ConflictException("Username already used");

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: hashed,
        birthDate: iso8601ToDateTime(dto.birthDate),
      },
      select: {
        id: true,
      },
    });

    const tokens = await this.generateTokens(user.id);
    return tokens;
  }

  /**
   * Register a new professional user with bar
   * @param dto - Professional registration data including user and bar information
   * @returns Access tokens and Stripe onboarding URL
   * @throws ConflictException if email or username already exists
   */
  async registerProfessional(dto: RegisterProfessionalDto) {
    const existingEmail = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingEmail) throw new ConflictException("Email already used");

    const existingUsername = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });
    if (existingUsername) throw new ConflictException("Username already used");

    const hashed = await bcrypt.hash(dto.password, 10);

    const frontendUrl = process.env.FRONTEND_URL || "";
    console.log("DEBUG: FRONTEND_URL env var:", process.env.FRONTEND_URL);
    console.log("DEBUG: resolved frontendUrl:", frontendUrl);

    return await this.prisma.$transaction(async (tx) => {
      const bar = await this.barsService.create(
        {
          name: dto.barName,
          address: dto.barAddress,
          arrondissement: dto.arrondissement,
          latitude: dto.latitude,
          longitude: dto.longitude,
        },
        tx,
      );

      const user = await tx.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          password: hashed,
          role: "PROFESSIONAL",
          barId: bar.id,
        },
        select: {
          id: true,
        },
      });

      const tokens = await this.generateTokens(user.id);
      await this.updateRefreshToken(user.id, tokens.refreshToken, tx);

      const refreshUrl = `${frontendUrl}/register/professional?error=stripe`;
      const returnUrl = `${frontendUrl}/dashboard`;
      console.log("DEBUG: Calling Stripe createOnboardingLink with:", {
        refreshUrl,
        returnUrl,
      });

      const stripeOnboardingUrl = await this.stripeService.createOnboardingLink(
        bar.id,
        refreshUrl,
        returnUrl,
        tx,
      );

      return {
        ...tokens,
        stripeOnboardingUrl,
        barId: bar.id,
      };
    });
  }

  /**
   * Log in an existing user
   * @param userId - User ID
   * @returns Access and refresh tokens
   */
  async login(userId: string) {
    const tokens = await this.generateTokens(userId);
    await this.updateRefreshToken(userId, tokens.refreshToken);
    return tokens;
  }

  /**
   * Refresh access and refresh tokens
   * @param userId - User ID from JWT payload
   * @param refreshToken - Current refresh token
   * @returns New access and refresh tokens
   * @throws ForbiddenException if refresh token is invalid or doesn't match
   */
  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
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

    const tokens = await this.generateTokens(userId);
    await this.updateRefreshToken(userId, tokens.refreshToken);

    return tokens;
  }

  /**
   * Log out user by clearing refresh token
   * @param userId - User ID
   */
  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  /**
   * Generate access and refresh tokens for a user
   * @param userId - User ID
   * @returns Access and refresh tokens
   * @private
   */
  private async generateTokens(userId: string) {
    const payload = { sub: userId };

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

  /**
   * Hash and store refresh token in database
   * @param userId - User ID
   * @param refreshToken - Refresh token to hash and store
   * @private
   */
  private async updateRefreshToken(
    userId: string,
    refreshToken: string,
    tx?: Prisma.TransactionClient,
  ) {
    const prisma = tx || this.prisma;
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: refreshTokenHash },
    });
  }

  async checkUsernameAvailability(username: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    return { isAvailable: !user };
  }

  async checkEmailAvailability(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return { isAvailable: !user };
  }
}
