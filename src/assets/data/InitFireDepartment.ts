import { DetailFireDepartmentModel } from '@/model/FireDepartment/FireDepartmentModel';

export const initFireDepartment: DetailFireDepartmentModel[] = [
    {
        id: -1,
        code: '',
        firefighter: null,
        fullAddress: '',
        hotLine: '',
        longitude: -1,
        latitude: -1,
        name: '',
        phoneNumber: '',
        province: {
            id: -1,
            name: '',
        },
        numberOfEmployees: 0,
    },
];
