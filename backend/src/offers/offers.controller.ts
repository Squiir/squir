import { JwtAuthGuard } from "@auth/jwt-auth.guard";
import { Roles } from "@auth/roles.decorator";
import { RolesGuard } from "@auth/roles.guard";
import { AzureStorageService } from "@azure-storage/azure-storage.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateOfferDto } from "@offers/dto/create-offer.dto";
import { OfferParamsDto } from "@offers/dto/offers.dto";
import { UpdateOfferDto } from "@offers/dto/update-offer.dto";
import { OffersService } from "@offers/offers.service";
import { UserRole } from "@prisma/client";

@UseGuards(JwtAuthGuard)
@Controller("offers")
export class OffersController {
  constructor(
    private offers: OffersService,
    private azureStorage: AzureStorageService,
  ) {}

  @Get()
  getOffers(@Query() query: OfferParamsDto) {
    return this.offers.findAll(query);
  }

  @Get("bar/:barId")
  getBarOffers(@Param("barId") barId: string) {
    return this.offers.findByBar(barId);
  }

  @Get("best-selling")
  getBestSelling() {
    return this.offers.findBestSelling();
  }

  @Get("nearby")
  getNearby(
    @Query("latitude") latitude: number,
    @Query("longitude") longitude: number,
  ) {
    return this.offers.findNearby(Number(latitude), Number(longitude));
  }

  @Get("recommendations")
  getRecommendations() {
    return this.offers.findRecommendations();
  }

  @Get("search")
  search(@Query("q") query: string) {
    return this.offers.search(query);
  }

  @Get(":id")
  async getOffer(@Param("id") id: string) {
    return this.offers.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.PROFESSIONAL, UserRole.ADMIN)
  createOffer(@Body() dto: CreateOfferDto) {
    return this.offers.create(dto);
  }

  @Post("upload-image")
  @UseGuards(RolesGuard)
  @Roles(UserRole.PROFESSIONAL, UserRole.ADMIN)
  @UseInterceptors(FileInterceptor("file"))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = await this.azureStorage.uploadFile(file);
    return { imageUrl };
  }

  @Patch(":id")
  @UseGuards(RolesGuard)
  @Roles(UserRole.PROFESSIONAL, UserRole.ADMIN)
  updateOffer(@Param("id") id: string, @Body() dto: UpdateOfferDto) {
    return this.offers.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(RolesGuard)
  @Roles(UserRole.PROFESSIONAL, UserRole.ADMIN)
  deleteOffer(@Param("id") id: string) {
    return this.offers.delete(id);
  }
}
