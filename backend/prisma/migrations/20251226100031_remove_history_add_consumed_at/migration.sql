/*
  Warnings:

  - You are about to drop the `qr_code_history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "qr_code_history" DROP CONSTRAINT "qr_code_history_barId_fkey";

-- DropForeignKey
ALTER TABLE "qr_code_history" DROP CONSTRAINT "qr_code_history_userId_fkey";

-- DropIndex
DROP INDEX "QRCode_userId_barId_productId_key";

-- AlterTable
ALTER TABLE "QRCode" ADD COLUMN     "consumedAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "qr_code_history";
