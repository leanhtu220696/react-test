import { PaginationModel } from '../PaginationModel';
export interface DetailCustomerModel {
    id: number;
    fullName: string;
    idCard: string;
    username: string;
    email: string;
    address: string;
    type?: string;
    position?: string;
    companyName?: string;
    taxCode?: string;
    representative?: string;
    businessField?: string;
    mainAddress?: string;
    status?: string;
}
export interface TableDataCustomer {
    accountCustomerViewList: DetailCustomerModel[];
    page: PaginationModel;
}
