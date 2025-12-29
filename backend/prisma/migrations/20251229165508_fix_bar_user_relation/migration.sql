/*
  Warnings:

  - You are about to drop the column `arrondissement` on the `Bar` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Bar` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Bar` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `QRCode` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `QRCode` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[groupId,userId]` on the table `GroupMember` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Bar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offersUpdated` to the `Bar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bar" DROP CONSTRAINT "Bar_ownerId_fkey";

-- DropIndex
DROP INDEX "GroupMember_userId_groupId_key";

-- AlterTable
ALTER TABLE "Bar" DROP COLUMN "arrondissement",
DROP COLUMN "ownerId",
DROP COLUMN "updatedAt",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "offersUpdated" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "GroupMember" ADD COLUMN     "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "QRCode" DROP COLUMN "productId",
DROP COLUMN "updatedAt",
ALTER COLUMN "label" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "barId" TEXT;

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "points" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GroupMember_groupId_userId_key" ON "GroupMember"("groupId", "userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_barId_fkey" FOREIGN KEY ("barId") REFERENCES "Bar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QRCode" ADD CONSTRAINT "QRCode_barId_fkey" FOREIGN KEY ("barId") REFERENCES "Bar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
