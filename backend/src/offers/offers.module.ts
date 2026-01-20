import { AzureStorageModule } from "@azure-storage/azure-storage.module";
import { Module } from "@nestjs/common";
import { PrismaModule } from "@prisma/prisma.module";
import { OffersController } from "./offers.controller";
import { OffersService } from "./offers.service";

@Module({
  imports: [PrismaModule, AzureStorageModule],
  controllers: [OffersController],
  providers: [OffersService],
  exports: [OffersService],
})
export class OffersModule {}
