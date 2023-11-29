import { injectable } from 'inversify';
import 'reflect-metadata';
import { LoanPackageServiceInterface } from '../../interfaces/loanpackage.interface';
import { PrismaClient } from '@prisma/client';
import BaseError from '../../utils/BaseError';
import { Respond } from '../../utils/Respond';
import { HttpStatusCode } from '../../utils/ErrorStatusCode';
const { ajv, LoanPackageSchema } = require('../../Schema/EmployeeSchema');
const validate = ajv.getSchema('LoanPackageSchema');

@injectable()
export class LoanPackageService implements LoanPackageServiceInterface {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }
    async addData(data: any): Promise<void> {
        data.duration = Number(data.duration);
        data.interest_period = Number(data.interest_period);
        try {
            await this.prisma.loanPackage.create({
                data: data,
            });
            return Respond('success', 'Done add loan package', data);
        } catch (error: any) {
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                error.message,
            );
        }
    }
    async readAllData(): Promise<void> {
        try {
            const loan_packages: any = await this.prisma.loanPackage.findMany();
            return Respond(
                'success',
                'Done read all loan package',
                loan_packages,
            );
        } catch (error) {
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                'Cant read loan packages',
            );
        }
    }
    async readOne(id: number): Promise<void> {
        try {
            const loan_packages: any = await this.prisma.loanPackage.findFirst({
                where: {
                    id: id,
                },
            });
            return Respond('success', 'Done find loan package', loan_packages);
        } catch (error) {
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                'Cant find loan packages',
            );
        }
    }
    async deleteData(id: number): Promise<void> {
        try {
            await this.prisma.loanPackage.findFirstOrThrow({
                where: {
                    id: id,
                },
            });
            const deletedLender: any = await this.prisma.loanPackage.delete({
                where: {
                    id: id,
                },
            });
            return Respond('success', 'Loan package deleted', deletedLender);
        } catch (error) {
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                'Cant delete loan package',
            );
        }
    }
    async updateData(id: number, data: any): Promise<void> {
        var updateSchema = {
            name: data.name || '',
            guarantee_type: data.guarantee_type || '',
            interest_rate: data.interest_rate || '',
            duration: data.duration || '',
            description: data.description || '',
            max_money: data.max_money || '',
            min_money: data.min_money || '',
            interest_period: data.interest_period || '',
        };
        Object.assign(updateSchema, data);
        if (validate(updateSchema) == false) {
            const schemaProperties = Object.keys(LenderSchema.properties);
            const userProperties = Object.keys(updateSchema);
            const missingColumns = schemaProperties.filter(
                (column) => !userProperties.includes(column),
            );
            const extraColumns = userProperties.filter(
                (column) => !schemaProperties.includes(column),
            );
            if (missingColumns.length != 0) {
                throw new BaseError(
                    HttpStatusCode.UNPROCESSABLE_ENTITY,
                    'fail',
                    'Must have required properties: ' + missingColumns,
                );
            }
            if (extraColumns.length != 0) {
                throw new BaseError(
                    HttpStatusCode.UNPROCESSABLE_ENTITY,
                    'fail',
                    'Must not have properties: ' + extraColumns,
                );
            }
            throw new BaseError(
                HttpStatusCode.UNPROCESSABLE_ENTITY,
                'fail',
                validate.errors[0].message,
            );
        }
        const updatedLender: any = await this.prisma.loanPackage.update({
            where: {
                id: id,
            },
            data: data,
        });
        return Respond('success', 'Lender updated', updatedLender);
    }
}
