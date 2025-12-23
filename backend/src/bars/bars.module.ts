import { Module } from "@nestjs/common";
import { BarsController } from "@bars/bars.controller";
import { BarsService } from "@bars/bars.service";
import { PrismaModule } from "@prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [BarsController],
    providers: [BarsService],
    exports: [BarsService],
})
export class BarsModule { }

