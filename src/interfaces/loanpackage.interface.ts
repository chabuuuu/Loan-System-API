export interface LoanPackageServiceInterface {
    addData(data: any): Promise<void>;
    readAllData(): Promise<void>;
    readOne(id: number): Promise<void>;
    deleteData(id: number): Promise<void>;
    updateData(id: number, data: any): Promise<void>;
}
