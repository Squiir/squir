import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class BarsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all bars with their offers
   * @returns List of all bars ordered by arrondissement
   */
  async findAll() {
    return await this.prisma.bar.findMany({
      include: { offers: true },
      orderBy: { arrondissement: "asc" },
    });
  }

  /**
   * Get a specific bar by ID with its offers
   * @param id - Bar ID
   * @returns Bar with offers
   * @throws NotFoundException if bar not found
   */
  async findOne(id: string) {
    const bar = await this.prisma.bar.findUnique({
      where: { id },
      include: { offers: true },
    });

    if (!bar) throw new NotFoundException("Bar not found");

    return bar;
  }
}
