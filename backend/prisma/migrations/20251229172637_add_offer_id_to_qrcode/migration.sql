/*
  Warnings:

  - Added the required column `offerId` to the `QRCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QRCode" ADD COLUMN     "offerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "QRCode" ADD CONSTRAINT "QRCode_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
