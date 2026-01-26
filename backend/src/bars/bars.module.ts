import { BarsController } from "@bars/bars.controller";
import { BarsService } from "@bars/bars.service";
import { Module } from "@nestjs/common";
import { PrismaModule } from "@prisma/prisma.module";
import { StripeModule } from "@stripe/stripe.module";

@Module({
  imports: [PrismaModule, StripeModule],
  controllers: [BarsController],
  providers: [BarsService],
  exports: [BarsService],
})
export class BarsModule {}
