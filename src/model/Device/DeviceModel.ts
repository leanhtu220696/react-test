import { DetailConstructionModel } from '@/model/Construction/ConstructionModel';

import { PaginationModel } from '../PaginationModel';

export interface ModelDeviceModel {
    id: number;
    name: string;
    code: string;
}
export interface DetailDeviceModel {
    connectionStatus?: string;
    construction?: DetailConstructionModel;
    deviceStatus?: string;
    id?: number;
    model?: {
        id: number;
        name: string;
    };
    name?: string;
    imei?: string;
    mobileNetwork?: string;
    ethernetStatus?: string;
    temperature?: number;
    remainingBattery?: number;
    dateModified?: number;
    rs485Status?: string;
    powerStatus?: string | number;
}
export interface DataTableDeviceModel {
    deviceViewList: DetailDeviceModel[];
    page: PaginationModel;
}
export interface DeviceInformationModel {
    totalGateway: number;
    totalGatewayOnline: number;
    totalGatewayOffline: number;
}

export interface OverviewDeviceModel {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    count: number;
}

export interface OverviewReportModel {
    totalHappeningFire: number;
    totalHappenedFire: number;
    totalConstruction: number;
    totalFireDepartment: number;
}
