import { FireLogModel } from '@/model/FireLog/FireLogModel';

export const initFireHappening: FireLogModel[] = [
    {
        id: -1,
        constructionName: '',
        longitude: -1,
        latitude: -1,
        constructionFullAddress: '',
        province: {
            name: '',
            id: -1,
            latitude: -1,
            longitude: -1,
        },
        status: '',
        dateModified: 0,
    },
];
