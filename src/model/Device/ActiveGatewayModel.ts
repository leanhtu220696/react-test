export interface AlertReceiverModel {
    id: number;
    username: string;
    fullName: string;
}

export interface CreateConstructionModel {
    id: number;
    name: string;
    type: string;
    businessSector: string;
    districtId: number;
    provinceId: number;
    fullAddress: string;
    latitude: number;
    longitude: number;
    alertReceiverList: AlertReceiverModel[];
    accountCustomerModel: CreateAccountModel;
}
export interface CreateAccountModel {
    id: number;
    fullName: string;
    idCard: string;
    username: string;
    email: string;
    address: string;
    type: string;
    accountCustomerTypeModel: {
        position: string;
        companyName: string;
        taxCode: string;
        representative: string;
        businessField: string;
        mainAddress: string;
    };
}

export interface CreateGatewayModel {
    name: string;
}
export interface CreateDeviceModel {
    constructionModel: CreateConstructionModel;
    gatewayModel: CreateGatewayModel;
}

export interface AddConstructionModel extends CreateConstructionModel {
    accountCustomerModel: CreateAccountModel;
}
