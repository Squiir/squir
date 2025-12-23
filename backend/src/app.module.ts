import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { UsersModule } from "@users/users.module";
import { AuthModule } from "@auth/auth.module";
import { PrismaModule } from "@prisma/prisma.module";
import { FriendsModule } from "@friends/friends.module";
import { GroupsModule } from "@groups/groups.module";
import { PurchasesModule } from "@purchases/purchases.module";
import { QrCodesModule } from "@qrcodes/qrcodes.module";
import { BarsModule } from "@bars/bars.module";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    FriendsModule,
    GroupsModule,
    PurchasesModule,
    QrCodesModule,
    BarsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
