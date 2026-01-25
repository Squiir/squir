/*
  Warnings:

  - You are about to drop the column `price` on the `Offer` table. All the data in the column will be lost.
  - Added the required column `originalPrice` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `squirPrice` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PromotionType" AS ENUM ('BUY_X_GET_Y', 'PERCENTAGE_OFF', 'FIXED_AMOUNT_OFF');

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "price",
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "originalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "squirPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "validUntil" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "PromotionRule" (
    "id" TEXT NOT NULL,
    "type" "PromotionType" NOT NULL,
    "buyQuantity" INTEGER,
    "getQuantity" INTEGER,
    "percentageOff" DOUBLE PRECISION,
    "amountOff" DOUBLE PRECISION,
    "offerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PromotionRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PromotionRule_offerId_key" ON "PromotionRule"("offerId");

-- AddForeignKey
ALTER TABLE "PromotionRule" ADD CONSTRAINT "PromotionRule_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
