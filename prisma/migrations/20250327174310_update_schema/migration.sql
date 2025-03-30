/*
  Warnings:

  - Made the column `surename` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "forename" DROP NOT NULL,
ALTER COLUMN "surename" SET NOT NULL,
ALTER COLUMN "role" DROP NOT NULL;
