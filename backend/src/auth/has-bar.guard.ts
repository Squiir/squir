import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class HasEstablishmentGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;

    if (!userId) {
      throw new ForbiddenException("User not authenticated");
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { barId: true, role: true },
    });

    if (!user || user.role !== "PROFESSIONAL") {
      throw new ForbiddenException("User is not a professional");
    }

    if (!user.barId) {
      throw new ForbiddenException("Professional user must complete bar setup");
    }

    return true;
  }
}
