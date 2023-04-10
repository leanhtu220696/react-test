import { DetailConstructionModel } from '@/model/Construction/ConstructionModel';

import { ProvinceModel } from '../ProvinceModel';

export interface FireLogModel {
    id?: number;
    constructionName?: string;
    constructionFullAddress?: string;
    province?: ProvinceModel;
    status?: string;
    dateModified?: number;
    longitude?: number;
    latitude?: number;
    dateSolved?: number;
    username?: string;
    construction?: DetailConstructionModel;
    dateCreated?: number;
    constructionId?: number;
}
