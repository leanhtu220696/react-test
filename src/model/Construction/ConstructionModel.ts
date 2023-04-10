import { DetailCustomerModel } from '../Customer/CustomerModel';
import { PaginationModel } from '../PaginationModel';
import { DistrictModel, ProvinceModel } from '../ProvinceModel';

export interface DetailConstructionModel {
    id: number;
    name: string;
    accountCustomerViewable: DetailCustomerModel;
    type: string;
    businessSector: string;
    district?: DistrictModel;
    province?: ProvinceModel;
    districtId?: number;
    provinceId?: number;
    fullAddress: string;
    longitude: number;
    latitude: number;
    alertReceiverList: DetailCustomerModel[];
}

export interface TableDataConstruction {
    constructionListingViews: DetailConstructionModel[];
    page: PaginationModel;
}
