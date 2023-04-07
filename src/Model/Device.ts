export interface PaginationModel {
    pageSize: number;
    pageIndex: number;
    totalResult: number;
}

export interface ProvinceModel {
    id?: number;
    name?: string;
    latitude?: number;
    longitude?: number;
}
export interface DistrictModel extends ProvinceModel {
    province?: ProvinceModel;
}

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
