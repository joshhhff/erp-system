/*
  Warnings:

  - Added the required column `companyid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "companyid" INTEGER NOT NULL,
ALTER COLUMN "surename" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyid" INTEGER NOT NULL,
    "mainaddr1" TEXT NOT NULL,
    "mainaddr2" TEXT,
    "city" TEXT NOT NULL,
    "county" TEXT,
    "country" TEXT NOT NULL,
    "postcode" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyid_key" ON "Company"("companyid");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyid_fkey" FOREIGN KEY ("companyid") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
