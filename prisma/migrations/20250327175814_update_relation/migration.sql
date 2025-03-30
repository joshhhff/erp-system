-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyid_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyid_fkey" FOREIGN KEY ("companyid") REFERENCES "Company"("companyid") ON DELETE RESTRICT ON UPDATE CASCADE;
