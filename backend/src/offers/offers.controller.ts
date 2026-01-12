import { JwtAuthGuard } from "@auth/jwt-auth.guard";
import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { OfferParamsDto } from "@offers/dto/offers.dto";
import { OffersService } from "@offers/offers.service";

@UseGuards(JwtAuthGuard)
@Controller("offers")
export class OffersController {
  constructor(private offers: OffersService) {}

  @Get()
  getOffers(@Query() query: OfferParamsDto) {
    return this.offers.findAll(query);
  }

  @Get(":id")
  async getOffer(@Param("id") id: string) {
    return this.offers.findOne(id);
  }
}
