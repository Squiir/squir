import { JwtAuthGuard } from "@auth/jwt-auth.guard";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AddPointsDto } from "@purchases/dto/purchases.dto";
import { PurchasesService } from "@purchases/purchases.service";
import { CurrentUserId } from "@utils/decorators/current-user.decorator";

@Controller("purchases")
@UseGuards(JwtAuthGuard)
export class PurchasesController {
  constructor(private purchases: PurchasesService) {}

  @Post("points")
  addPoints(@CurrentUserId() userId: string, @Body() dto: AddPointsDto) {
    return this.purchases.addPoints(userId, dto.amount);
  }
}
