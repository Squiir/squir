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
ALTER TABLE "Bar" DROP CONSTRAINT IF EXISTS "Bar_ownerId_fkey";

-- DropIndex
DROP INDEX IF EXISTS "GroupMember_userId_groupId_key";

-- AlterTable Bar
DO $$
BEGIN
    ALTER TABLE "Bar" DROP COLUMN IF EXISTS "arrondissement";
    ALTER TABLE "Bar" DROP COLUMN IF EXISTS "ownerId";
    ALTER TABLE "Bar" DROP COLUMN IF EXISTS "updatedAt";

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Bar' AND column_name = 'address') THEN
        ALTER TABLE "Bar" ADD COLUMN "address" TEXT NOT NULL DEFAULT '';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Bar' AND column_name = 'offersUpdated') THEN
        ALTER TABLE "Bar" ADD COLUMN "offersUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
    END IF;
END $$;

-- AlterTable Group (conditional add for updatedAt)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'Group' AND column_name = 'updatedAt'
    ) THEN
        ALTER TABLE "Group" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
    END IF;
END $$;

-- AlterTable GroupMember (conditional add for joinedAt)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'GroupMember' AND column_name = 'joinedAt'
    ) THEN
        ALTER TABLE "GroupMember" ADD COLUMN "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
    END IF;
END $$;

-- AlterTable QRCode
DO $$
BEGIN
    ALTER TABLE "QRCode" DROP COLUMN IF EXISTS "productId";
    ALTER TABLE "QRCode" DROP COLUMN IF EXISTS "updatedAt";
    ALTER TABLE "QRCode" ALTER COLUMN "label" DROP NOT NULL;
END $$;

-- AlterTable User (conditional add for barId)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'User' AND column_name = 'barId'
    ) THEN
        ALTER TABLE "User" ADD COLUMN "barId" TEXT;
    END IF;
END $$;

-- CreateTable Purchase (only if it doesn't exist)
CREATE TABLE IF NOT EXISTS "Purchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "points" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes
        WHERE indexname = 'GroupMember_groupId_userId_key'
    ) THEN
        CREATE UNIQUE INDEX "GroupMember_groupId_userId_key" ON "GroupMember"("groupId", "userId");
    END IF;
END $$;

-- AddForeignKey (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'User_barId_fkey'
    ) THEN
        ALTER TABLE "User" ADD CONSTRAINT "User_barId_fkey" FOREIGN KEY ("barId") REFERENCES "Bar"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'QRCode_barId_fkey'
    ) THEN
        ALTER TABLE "QRCode" ADD CONSTRAINT "QRCode_barId_fkey" FOREIGN KEY ("barId") REFERENCES "Bar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;
