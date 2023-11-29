export interface LenderServiceInterface {
    validate(phoneNumber: string): boolean;
    addData(req: any, res: any, next: any): Promise<void>;
    readAllData(req: any, res: any, next: any): Promise<void>;
    deleteData(req: any, res: any, next: any): Promise<void>;
    updateData(req: any, res: any, next: any): Promise<void>;
    login(req: any, res: any, next: any): Promise<void>;
}
