import { injectable } from 'inversify';
import 'reflect-metadata';
import { BorrowerServiceInterface } from '../../interfaces/borrower.interface';
import { PrismaClient } from '@prisma/client';
import BaseError from '../../utils/BaseError';
import { Respond } from '../../utils/Respond';
import { HttpStatusCode } from '../../utils/ErrorStatusCode';
import { AccountService } from '../account/account.service';
import { CreateBorrowerType } from '../../Type/CreateBorrowerType';
const accountService = new AccountService();
const { ajv, BorrowerSchema } = require('../../Schema/EmployeeSchema');
import { HashPassword } from '../employees/HashPassword.service';
const hashPassWord = new HashPassword();
const validate = ajv.getSchema('BorrowerSchema');
@injectable()
export class BorrwerService implements BorrowerServiceInterface {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }
    async addData(data: CreateBorrowerType): Promise<void> {
        try {
            const hashedPassword : string = await hashPassWord.hash(data.password);
            data.password = hashedPassword;
            const newAccount = await accountService.create(data.username, data.password, 'Borrower');
            data.accountId = newAccount.id;
            console.log(data);
            
            const result : any =  await this.prisma.borrower.create({
                data: {
                    full_name: data.full_name,
                    address: data.address,
                    job_title: data.job_title,
                    phone_number: data.phone_number,
                    income: data.income,
                    outcome: data.outcome,
                    CCCD: data.CCCD,
                    accountId: data.accountId,
                },
            });
            return Respond('success', 'Done create borrower', result);
        } catch (error: any) {
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                'Cant create borrowers: ' + error.message,
            );
        }
    }
    async readAllData(): Promise<void> {
        try {
            const borrowers: any = await this.prisma.borrower.findMany();
            return Respond('success', 'Done read all lender', borrowers);
        } catch (error) {
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                'Cant read borrowers',
            );
        }
    }
    async deleteData(id: number): Promise<void> {
        try {
            await this.prisma.borrower.findFirstOrThrow({
                where: {
                    id: id,
                },
            });
            const deletedLender: any = await this.prisma.borrower.delete({
                where: {
                    id: id,
                },
            });
            return Respond('success', 'Lender deleted', deletedLender);
        } catch (error) {
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                'Cant delete borrowers',
            );
        }
    }
    async updateData(id: number, data: any): Promise<void> {
        var updateSchema = {
            full_name: data.full_name || '',
            address: data.address || '',
            job_title: data.job_title || '',
            phone_number: data.phone_number || '',
            income: data.income || '',
            outcome: data.outcome || '',
            CCCD: data.CCCD || '',
        };
        Object.assign(updateSchema, data);
        if (validate(updateSchema) == false) {
            const schemaProperties = Object.keys(BorrowerSchema.properties);
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
        const updatedBorrower: any = await this.prisma.borrower.update({
            where: {
                id: id,
            },
            data: data,
        });
        return Respond('success', 'Borrower updated', updatedBorrower);
    }
    login(req: any, res: any, next: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
