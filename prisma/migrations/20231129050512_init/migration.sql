-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "loanContractId" INTEGER;

-- CreateTable
CREATE TABLE "Borrower" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "income" MONEY NOT NULL,
    "outcome" MONEY NOT NULL,
    "CCCD" TEXT NOT NULL,
    "loanContractId" INTEGER,

    CONSTRAINT "Borrower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lender" (
    "id" SERIAL NOT NULL,
    "bank" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "loanContractId" INTEGER,

    CONSTRAINT "Lender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanPackage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "guarantee_type" TEXT NOT NULL,
    "interest_rate" DECIMAL(65,30) NOT NULL,
    "duration" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "max_money" MONEY NOT NULL,
    "min_money" MONEY NOT NULL,
    "interest_period" INTEGER NOT NULL,
    "loanContractId" INTEGER,

    CONSTRAINT "LoanPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanContract" (
    "id" SERIAL NOT NULL,
    "money" MONEY NOT NULL,
    "purpose" TEXT NOT NULL,
    "loan_date" TIMESTAMP(3) NOT NULL,
    "expire_date" TIMESTAMP(3) NOT NULL,
    "contract_status" TEXT NOT NULL,
    "loan_method" TEXT NOT NULL,

    CONSTRAINT "LoanContract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "pay_date" MONEY NOT NULL,
    "money" MONEY NOT NULL,
    "principal_amount" MONEY NOT NULL,
    "profit_amount" MONEY NOT NULL,
    "payment_method" TEXT NOT NULL,
    "financial_situation" TEXT NOT NULL,
    "property_status" TEXT NOT NULL,
    "borrowerId" INTEGER,
    "loanContractId" INTEGER,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_loanContractId_fkey" FOREIGN KEY ("loanContractId") REFERENCES "LoanContract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrower" ADD CONSTRAINT "Borrower_loanContractId_fkey" FOREIGN KEY ("loanContractId") REFERENCES "LoanContract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lender" ADD CONSTRAINT "Lender_loanContractId_fkey" FOREIGN KEY ("loanContractId") REFERENCES "LoanContract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanPackage" ADD CONSTRAINT "LoanPackage_loanContractId_fkey" FOREIGN KEY ("loanContractId") REFERENCES "LoanContract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_loanContractId_fkey" FOREIGN KEY ("loanContractId") REFERENCES "LoanContract"("id") ON DELETE SET NULL ON UPDATE CASCADE;
