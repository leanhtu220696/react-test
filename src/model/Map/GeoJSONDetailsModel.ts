import { DetailCustomerModel } from '@/model/Customer/CustomerModel';
import { DetailFireDepartmentModel } from '@/model/FireDepartment/FireDepartmentModel';
import { DistrictModel, ProvinceModel } from '@/model/ProvinceModel';

export interface geoJSONDetailsModel {
    id: number;
    name: string;
    type: string;
    province?: ProvinceModel;
    district?: DistrictModel;
    fullAddress: string;
    businessSector?: string;
    accountCustomerViewable?: DetailCustomerModel;
    alertReceiverList?: DetailCustomerModel[];
    available?: boolean;
    description?: string;
    fireDepartment?: DetailFireDepartmentModel;
    code?: string;
    phoneNumber?: string;
    numberWaterIntake?: number;
    firefighter?: {
        fullName: string;
        idCard: string;
        phoneNumber: string;
        team: string;
        position: string;
        id: number;
    };
    numberOfEmployees?: number;
    hotLine?: string;
}
