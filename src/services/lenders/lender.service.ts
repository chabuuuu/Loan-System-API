import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { LenderServiceInterface } from '../../interfaces/lender.interface';
import { PrismaClient } from '@prisma/client';
import BaseError from '../../utils/BaseError';
import { HttpStatusCode } from '../../utils/ErrorStatusCode';
import { json } from 'stream/consumers';
@injectable()
export class LenderServce implements LenderServiceInterface {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }
    validate(phoneNumber: string): boolean {
        throw new Error('Method not implemented.');
    }
    async addData(req: any, res: any, next: any): Promise<void> {
        const data = req.body;
        try {
            await this.prisma.lender.create({
                data: data,
            });
            const respond: any = {
                status: 'success',
                message: 'Done add lender',
                data: data,
            };
            return respond;
        } catch (error) {
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                'Cant read lenders',
            );
        }
    }
    async readAllData(req: any, res: any, next: any): Promise<void> {
        try {
            await this.prisma.lender.findMany();
        } catch (error) {
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                'Cant read lenders',
            );
        }
    }
    deleteData(req: any, res: any, next: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
    updateData(req: any, res: any, next: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
    login(req: any, res: any, next: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
