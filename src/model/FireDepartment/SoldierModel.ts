import { SoldierTeam } from '@/util/ConstantApp/TypeConstant';

import { DetailFireDepartmentModel } from './FireDepartmentModel';

export interface TableDataSoldierModel {
    firefighterViewList: DetailSoldierModel[];
    soldierViewList: DetailSoldierModel[];
    page: {
        pageSize: number;
        pageIndex: number;
        totalResult: number;
        fullName: string;
    };
}

export interface CreateSoldierModel {
    id: number;
    fireDepartmentId: number;
    fullName: string;
    idCard: string;
    team: string;
    phoneNumber: string;
    position: string;
    email: string;
    code: string;
    rank: string;
    dateOfBirth: number;
    beginningTime: number;
    function: string;
}
export interface DetailSoldierModel {
    id?: number;
    idCard?: string;
    fullName?: string;
    phoneNumber?: string;
    team?: SoldierTeam | string;
    fireDepartment?: DetailFireDepartmentModel;
    rank?: string;
    position?: string;
    dateOfBirth?: string;
    beginningTime?: string;
    email?: string;
    code?: string;
    function?: string;
    fireDepartmentId?: number;
}
