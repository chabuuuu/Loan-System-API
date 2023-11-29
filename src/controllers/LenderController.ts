import container from '../config/lender.config';
import { LENDERSERVICE } from '../config/types/lender.types';
import { LenderServiceInterface } from '../interfaces/lender.interface';
const lenderService = container.get<LenderServiceInterface>(LENDERSERVICE);
export class LenderController {
    async addData(req: any, res: any, next: any) {
        try {
            await lenderService.addData(req, res, next);
        } catch (error: any) {
            next(error);
        }
    }
    async readAllData(req: any, res: any, next: any) {
        try {
            await lenderService.readAllData(req, res, next);
        } catch (error: any) {
            next(error);
        }
    }
    async deleteData(req: any, res: any, next: any) {}
    async updateData(req: any, res: any, next: any) {}
    async login(req: any, res: any, next: any) {}
}
