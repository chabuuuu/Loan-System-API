import container from '../config/loanpackage.config';
import { LOANPACKAGESERVICE } from '../config/types/loan_package';
import { LoanPackageServiceInterface } from '../interfaces/loanpackage.interface';
const loanPackageService =
    container.get<LoanPackageServiceInterface>(LOANPACKAGESERVICE);

export class LoanPackageController {
    async readOne(req: any, res: any, next: any) {
        const id = Number(req.params.id);
        try {
            const respond = await loanPackageService.readOne(id);
            res.json(respond);
        } catch (error: any) {
            next(error);
        }
    }
    async addData(req: any, res: any, next: any) {
        try {
            const respond = await loanPackageService.addData(req.body);
            res.json(respond);
        } catch (error: any) {
            next(error);
        }
    }
    async readAllData(req: any, res: any, next: any) {
        try {
            const respond = await loanPackageService.readAllData();
            res.json(respond);
        } catch (error: any) {
            next(error);
        }
    }
    async deleteData(req: any, res: any, next: any) {
        const id = Number(req.params.id);
        try {
            const respond = await loanPackageService.deleteData(id);
            res.json(respond);
        } catch (error: any) {
            next(error);
        }
    }
    async updateData(req: any, res: any, next: any) {
        const id = Number(req.params.id);
        const data = req.body;
        try {
            const respond = await loanPackageService.updateData(id, data);
            res.json(respond);
        } catch (error: any) {
            next(error);
        }
    }
}
