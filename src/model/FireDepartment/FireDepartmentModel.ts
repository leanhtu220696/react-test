import { PaginationModel } from '../PaginationModel';
import { DistrictModel, ProvinceModel } from '../ProvinceModel';

export interface DetailFireDepartmentModel {
    name?: string;
    code?: string;
    fullAddress?: string;
    latitude?: number;
    longitude?: number;
    numberOfEmployees?: number;
    numberWaterIntake?: number;
    hotLine?: string;
    phoneNumber?: string;
    typeUnit?: string;
    province?: ProvinceModel;
    firefighter?: ManagerAndFireFighterModel;
    id?: number;
    district?: DistrictModel;
    manager?: ManagerAndFireFighterModel;
}
export interface ManagerAndFireFighterModel {
    fullName?: string;
    id?: number;
    idCard?: string;
    phoneNumber?: string;
    team?: string;
    rank?: string;
    position?: string;
    dateOfBirth?: string;
    beginningTime?: string;
    email?: string;
    code?: string;
    function?: string;
}

export interface TableDataFireDepartmentModel {
    fireDepartmentViewList: DetailFireDepartmentModel[];
    page: PaginationModel;
}

export interface CreateFireDepartmentModel {
    id?: number;
    code?: string;
    name?: string;
    hotLine?: string;
    phoneNumber?: string;
    districtId?: number;
    provinceId?: number;
    fullAddress?: string;
    longitude?: number;
    latitude?: number;
    typeUnit?: string;
    fireFighterId?: number;
}
