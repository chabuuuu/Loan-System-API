import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { LenderServiceInterface } from '../../interfaces/lender.interface';

@injectable()
export class LenderServce implements LenderServiceInterface {
    validate(phoneNumber: string): boolean {
        throw new Error('Method not implemented.');
    }
    addData(req: any, res: any, next: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
    readAllData(req: any, res: any, next: any): Promise<void> {
        throw new Error('Method not implemented.');
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
