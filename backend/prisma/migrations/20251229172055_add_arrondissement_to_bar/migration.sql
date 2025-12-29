/*
  Warnings:

  - Added the required column `arrondissement` to the `Bar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bar" ADD COLUMN     "arrondissement" INTEGER NOT NULL;
