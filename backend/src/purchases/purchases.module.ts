import { Module } from "@nestjs/common";
import { PrismaModule } from "@prisma/prisma.module";
import { PurchasesController } from "@purchases/purchases.controller";
import { PurchasesService } from "@purchases/purchases.service";

@Module({
  imports: [PrismaModule],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
