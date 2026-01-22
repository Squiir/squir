import { JwtAuthGuard } from "@auth/jwt-auth.guard";
import { BarsService } from "@bars/bars.service";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";

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

  @Get(":id/dashboard-stats")
  async getDashboardStats(@Param("id") id: string) {
    return this.bars.getDashboardStats(id);
  }

  @Get(":id/stripe-dashboard-link")
  async getStripeDashboardLink(@Param("id") id: string) {
    return this.bars.getStripeDashboardLink(id);
  }
}
