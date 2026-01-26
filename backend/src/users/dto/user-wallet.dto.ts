import { QRCode } from "@prisma/client";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class WalletActiveItemDto {
  @IsString()
  @IsNotEmpty()
  offerId!: string;

  @IsString()
  @IsNotEmpty()
  offerName!: string;

  @IsString()
  @IsOptional()
  offerDescription?: string;

  @IsString()
  @IsOptional()
  offerImageUrl?: string;

  @IsNumber()
  quantity!: number;

  @IsNumber()
  squirPrice!: number;

  @IsString()
  @IsNotEmpty()
  barName!: string;

  @IsString()
  @IsOptional()
  barAddress?: string;

  @IsArray()
  qrCodes!: QRCode[];
}

export class WalletHistoryItemDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  offerName!: string;

  @IsString()
  @IsOptional()
  offerDescription?: string;

  @IsString()
  @IsOptional()
  offerImageUrl?: string;

  @IsNumber()
  squirPrice!: number;

  @IsString()
  @IsNotEmpty()
  barName!: string;

  @IsString()
  @IsOptional()
  barAddress?: string;

  @IsDate()
  @Type(() => Date)
  usedAt!: Date;

  @IsString()
  @IsNotEmpty()
  status!: string;
}

export class UserWalletDto {
  @IsArray()
  @Type(() => WalletActiveItemDto)
  active!: WalletActiveItemDto[];

  @IsArray()
  @Type(() => WalletHistoryItemDto)
  history!: WalletHistoryItemDto[];
}
