import { PaginationModel } from '../PaginationModel';

export interface WaterIntakeModel {
    id: number;
    name: string;
    available: boolean;
    code: string;
    description: string;
    fullAddress: string;
    latitude: number;
    longitude: number;
    phoneNumber: string;
    type: string;
}
export interface ViewListWaterIntakeModel {
    id: number;
    name: string;
    phoneNumber: string;
    fullAddress: string;
    available: boolean;
}
export interface ListWaterIntakeModel {
    [x: string]: any;
    ViewListWaterIntake: ViewListWaterIntakeModel[];
    page: PaginationModel;
}
export interface DetailWaterIntakeModel {
    id: number;
    code: string;
    name: string;
    phoneNumber: string;
    type: string;
    description: string;
    province: {
        id: number;
        name: string;
        latitude: number;
        longitude: number;
    };
    district: {
        id: number;
        name: string;
        latitude: number;
        longitude: number;
        province: {
            id: number;
            name: string;
            latitude: number;
            longitude: number;
        };
    };
    fullAddress: string;
    longitude: number;
    latitude: number;
    available: boolean;
}
export interface CreateWaterIntakeModel {
    id: number;
    fireDepartmentId: number;
    name: string;
    code: string;
    phoneNumber: string;
    description: string;
    type: string;
    fullAddress: string;
    districtId: number;
    provinceId: number;
    longitude: number;
    latitude: number;
    available: boolean;
}
