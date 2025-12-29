import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUserId } from "../utils/decorators/current-user.decorator";
import { AddPointsDto } from "./dto/purchases.dto";
import { PurchasesService } from "./purchases.service";

@Controller("purchases")
@UseGuards(JwtAuthGuard)
export class PurchasesController {
  constructor(private purchases: PurchasesService) {}

  @Post("points")
  addPoints(@CurrentUserId() userId: string, @Body() dto: AddPointsDto) {
    return this.purchases.addPoints(userId, dto.amount);
  }
}
