export interface BorrowerServiceInterface {
    addData(data: any): Promise<void>;
    readAllData(): Promise<void>;
    deleteData(id: number): Promise<void>;
    updateData(id: number, data: any): Promise<void>;
    login(req: any, res: any, next: any): Promise<void>;
}
