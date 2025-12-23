import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { BarsService } from "@bars/bars.service";
import { JwtAuthGuard } from "@auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("bars")
export class BarsController {
  constructor(private bars: BarsService) {}

  @Get()
  getBars() {
    return this.bars.findAll();
  }

  @Get(":id")
  async getBar(@Param("id") id: string) {
    return this.bars.findOne(id);
  }
}
