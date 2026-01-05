/*
  Warnings:

  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,groupId]` on the table `GroupMember` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "QRCode" DROP CONSTRAINT "QRCode_userId_fkey";

-- DropIndex
DROP INDEX "GroupMember_groupId_userId_key";

-- AlterTable
ALTER TABLE "Bar" ALTER COLUMN "address" DROP DEFAULT,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- DropTable
DROP TABLE "Purchase";

-- CreateIndex
CREATE UNIQUE INDEX "GroupMember_userId_groupId_key" ON "GroupMember"("userId", "groupId");

-- AddForeignKey
ALTER TABLE "QRCode" ADD CONSTRAINT "QRCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
