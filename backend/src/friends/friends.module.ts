import { FriendsController } from "@friends/friends.controller";
import { FriendsService } from "@friends/friends.service";
import { Module } from "@nestjs/common";
import { PrismaModule } from "@prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
