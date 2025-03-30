/*
  Warnings:

  - Made the column `forename` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "forename" SET NOT NULL,
ALTER COLUMN "surename" DROP NOT NULL;
