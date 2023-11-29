/*
  Warnings:

  - You are about to drop the column `loanContractId` on the `Borrower` table. All the data in the column will be lost.
  - You are about to drop the column `loanContractId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `loanContractId` on the `Lender` table. All the data in the column will be lost.
  - You are about to drop the column `loanContractId` on the `LoanPackage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Borrower" DROP CONSTRAINT "Borrower_loanContractId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_loanContractId_fkey";

-- DropForeignKey
ALTER TABLE "Lender" DROP CONSTRAINT "Lender_loanContractId_fkey";

-- DropForeignKey
ALTER TABLE "LoanPackage" DROP CONSTRAINT "LoanPackage_loanContractId_fkey";

-- AlterTable
ALTER TABLE "Borrower" DROP COLUMN "loanContractId";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "loanContractId";

-- AlterTable
ALTER TABLE "Lender" DROP COLUMN "loanContractId";

-- AlterTable
ALTER TABLE "LoanContract" ADD COLUMN     "borrowerId" INTEGER,
ADD COLUMN     "employeeId" INTEGER,
ADD COLUMN     "lenderId" INTEGER,
ADD COLUMN     "loanPackageId" INTEGER;

-- AlterTable
ALTER TABLE "LoanPackage" DROP COLUMN "loanContractId";

-- AddForeignKey
ALTER TABLE "LoanContract" ADD CONSTRAINT "LoanContract_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanContract" ADD CONSTRAINT "LoanContract_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanContract" ADD CONSTRAINT "LoanContract_lenderId_fkey" FOREIGN KEY ("lenderId") REFERENCES "Lender"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanContract" ADD CONSTRAINT "LoanContract_loanPackageId_fkey" FOREIGN KEY ("loanPackageId") REFERENCES "LoanPackage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
