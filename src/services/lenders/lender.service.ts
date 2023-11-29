import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { LenderServiceInterface } from '../../interfaces/lender.interface';
import { PrismaClient } from '@prisma/client';
import BaseError from '../../utils/BaseError';
import { HttpStatusCode } from '../../utils/ErrorStatusCode';
import { json } from 'stream/consumers';
import { Respond } from '../../utils/Respond';
const { ajv, LenderSchema } = require('../../Schema/EmployeeSchema');
const validate = ajv.getSchema('LenderSchema');

@injectable()
export class LenderServce implements LenderServiceInterface {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }
    validate(phoneNumber: string): boolean {
        throw new Error('Method not implemented.');
    }
    async addData(data: any): Promise<void> {
        try {
            await this.prisma.lender.create({
                data: data,
            });
            return Respond('success', 'Done add lender', data);
        } catch (error) {
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                'Cant read lenders',
            );
        }
    }
    async readAllData(): Promise<void> {
        try {
            const lenders: any = await this.prisma.lender.findMany();
            return Respond('success', 'Done read all lender', lenders);
        } catch (error) {
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                'Cant read lenders',
            );
        }
    }
    async deleteData(id: number): Promise<void> {
        try {
            await this.prisma.lender.findFirstOrThrow({
                where: {
                    id: id,
                },
            });
            const deletedLender: any = await this.prisma.lender.delete({
                where: {
                    id: id,
                },
            });
            return Respond('success', 'Lender deleted', deletedLender);
        } catch (error) {
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                'Cant delete lenders',
            );
        }
    }
    async updateData(id: number, data: any): Promise<void> {
        var updateSchema = {
            full_name: data.full_name || '',
            address: data.address || '',
            job_title: data.job_title || '',
            bank: data.bank || '',
            branch: data.branch || '',
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
        const updatedLender: any = await this.prisma.lender.update({
            where: {
                id: id,
            },
            data: data,
        });
        return Respond('success', 'Lender updated', updatedLender);
    }
    login(req: any, res: any, next: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
