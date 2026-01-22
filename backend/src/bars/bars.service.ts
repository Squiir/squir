import { CreateEstablishmentDto } from "@bars/dto/create-establishment.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class BarsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new bar with provided coordinates
   * @param dto - Bar creation data including manual coordinates
   * @returns Created bar
   */
  async create(dto: CreateEstablishmentDto) {
    return this.prisma.bar.create({
      data: {
        name: dto.name,
        address: dto.address,
        arrondissement: dto.arrondissement,
        latitude: dto.latitude,
        longitude: dto.longitude,
        color: "",
      },
    });
  }

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
