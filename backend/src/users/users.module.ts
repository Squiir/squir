import { Module } from "@nestjs/common";
import { PrismaModule } from "@prisma/prisma.module";
import { UsersController } from "@users/users.controller";
import { UsersService } from "@users/users.service";

import { AzureStorageModule } from "@azure-storage/azure-storage.module";

@Module({
  imports: [PrismaModule, AzureStorageModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
