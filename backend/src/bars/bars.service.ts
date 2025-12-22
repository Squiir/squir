import { Injectable } from "@nestjs/common";
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
        return this.prisma.bar.findUnique({
            where: { id },
            include: { offers: true },
        });
    }
}

