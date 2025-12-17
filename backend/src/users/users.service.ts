import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findOne() {
    return this.prisma.user.findFirst({
      include: {
        qrCodes: true,
      },
    });
  }
}
