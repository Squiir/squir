import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "@prisma/prisma.module";
import { StripeController } from "@stripe/stripe.controller";
import { StripeService } from "@stripe/stripe.service";

@Module({
  imports: [ConfigModule, PrismaModule],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
