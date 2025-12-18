import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UserWithQrCodes } from "./types";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findOne(): Promise<UserWithQrCodes | null> {
    return this.prisma.user.findFirst({
      include: {
        qrCodes: true,
      },
    });
  }
}
