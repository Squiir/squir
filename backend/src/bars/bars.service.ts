import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class BarsService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.bar.findMany({
            include: { offers: true },
            orderBy: { arrondissement: "asc" },
        });
    }

    async findOne(id: string) {
        const bar = await this.prisma.bar.findUnique({
            where: { id },
            include: { offers: true },
        });

        if (!bar) throw new NotFoundException("Bar not found");

        return bar;
    }
}

