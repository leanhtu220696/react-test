import { DetailConstructionModel } from '@/model/Construction/ConstructionModel';

export const initConstruction: DetailConstructionModel[] = [
    {
        id: -1,
        name: '',
        type: '',
        businessSector: '',
        district: {
            id: -1,
            name: '',
            latitude: -1,
            longitude: -1,
            province: {
                id: -1,
                name: '',
                latitude: -1,
                longitude: -1,
            },
        },
        province: {
            id: -1,
            name: '',
            latitude: -1,
            longitude: -1,
        },
        longitude: 3000,
        latitude: 3000,
        fullAddress: '',
        accountCustomerViewable: {
            id: -1,
            fullName: '',
            idCard: '',
            username: '',
            email: '',
            address: '',
        },
        alertReceiverList: [],
    },
];
