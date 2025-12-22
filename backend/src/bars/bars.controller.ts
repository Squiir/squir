import { Controller, Get, Param, NotFoundException } from "@nestjs/common";
import { BarsService } from "@bars/bars.service";
import { Public } from "@auth/public.decorator";

@Controller("bars")
export class BarsController {
    constructor(private bars: BarsService) { }

    @Public()
    @Get()
    findAll() {
        return this.bars.findAll();
    }

    @Public()
    @Get(":id")
    async findOne(@Param("id") id: string) {
        const bar = await this.bars.findOne(id);
        if (!bar) throw new NotFoundException("Bar not found");
        return bar;
    }
}

