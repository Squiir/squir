import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { AuthModule } from "@auth/auth.module";
import { BarsModule } from "@bars/bars.module";
import { FriendsModule } from "@friends/friends.module";
import { GroupsModule } from "@groups/groups.module";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "@prisma/prisma.module";
import { PurchasesModule } from "@purchases/purchases.module";
import { QrCodesModule } from "@qrcodes/qrcodes.module";
import { UsersModule } from "@users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
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
