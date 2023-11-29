import container from '../config/borrower.config';
import { BORROWERSERVICE } from '../config/types/borrower.type';
import { BorrowerServiceInterface } from '../interfaces/borrower.interface';
const borrowerService =
    container.get<BorrowerServiceInterface>(BORROWERSERVICE);
export class BorrowerrController {
    async addData(req: any, res: any, next: any) {
        try {
            const respond = await borrowerService.addData(req.body);
            res.json(respond);
        } catch (error: any) {
            next(error);
        }
    }
    async readAllData(req: any, res: any, next: any) {
        try {
            const respond = await borrowerService.readAllData();
            res.json(respond);
        } catch (error: any) {
            next(error);
        }
    }
    async deleteData(req: any, res: any, next: any) {
        const id = Number(req.params.id);
        try {
            const respond = await borrowerService.deleteData(id);
            res.json(respond);
        } catch (error: any) {
            next(error);
        }
    }
    async updateData(req: any, res: any, next: any) {
        const id = Number(req.params.id);
        const data = req.body;
        try {
            const respond = await borrowerService.updateData(id, data);
            res.json(respond);
        } catch (error: any) {
            next(error);
        }
    }
    async login(req: any, res: any, next: any) {}
}
