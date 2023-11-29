import container from '../config/lender.config';
import { LENDERSERVICE } from '../config/types/lender.types';
import { LenderServiceInterface } from '../interfaces/lender.interface';
const lenderService = container.get<LenderServiceInterface>(LENDERSERVICE);
export class LenderController {
    async addData(req: any, res: any, next: any) {
        try {
            const respond = await lenderService.addData(req.body);
            res.json(respond);
        } catch (error: any) {
            next(error);
        }
    }
    async readAllData(req: any, res: any, next: any) {
        try {
            const respond = await lenderService.readAllData();
            res.json(respond);
        } catch (error: any) {
            next(error);
        }
    }
    async deleteData(req: any, res: any, next: any) {
        const id = Number(req.params.id);
        try {
            const respond = await lenderService.deleteData(id);
            res.json(respond);
        } catch (error: any) {
            next(error);
        }
    }
    async updateData(req: any, res: any, next: any) {
        const id = Number(req.params.id);
        const data = req.body;
        try {
            const respond = await lenderService.updateData(id, data);
            res.json(respond);
        } catch (error: any) {
            next(error);
        }
    }
    async login(req: any, res: any, next: any) {}
}
