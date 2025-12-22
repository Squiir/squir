import { Controller, Get, Param } from "@nestjs/common";
import { BarsService } from "@bars/bars.service";

@Controller("bars")
export class BarsController {
    constructor(private bars: BarsService) { }

    @Get()
    findAll() {
        return this.bars.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.bars.findOne(id);
    }
}

