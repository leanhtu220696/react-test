import { DetailFireDepartmentModel, TableDataFireDepartmentModel } from '@/model/FireDepartment/FireDepartmentModel';
import { TableDataSoldierModel } from '@/model/FireDepartment/SoldierModel';
import { DetailWaterIntakeModel, ListWaterIntakeModel } from '@/model/FireDepartment/WaterIntakeModel';

import { DetailSoldierModel } from '../../model/FireDepartment/SoldierModel';
import { useFetch } from '../Api/ApiFetcher';

export const useGetListFireDepartment = (
    pageIndex: number,
    pageSize: number,
    valueSearch?: string,
    provinceId?: number,
    districtId?: number,
) => {
    const provinceParam = provinceId ? `&provinceId=${provinceId}` : '';
    const districtIdParam = districtId ? `&districtId=${districtId}` : '';
    return useFetch<TableDataFireDepartmentModel>(
        `/safefire-agency-service/api/fire-department/searching?page-index=${pageIndex}&page-size=${pageSize}&valueSearch=${valueSearch}${provinceParam}${districtIdParam}`,
        'GET',
    );
};
export const useGetListSoldier = (idDepartment: number, pageIndex: number, pageSize: number, fullName: string) =>
    useFetch<TableDataSoldierModel>(
        `/safefire-agency-service/api/fire-department/${idDepartment}/firefighter/searching?page-index=${pageIndex}&page-size=${pageSize}&full-name=${fullName}`,
        'GET',
    );

export const useGetFireDepartmentById = (idDepartment: number) =>
    useFetch<DetailFireDepartmentModel>(`/safefire-agency-service/api/fire-department/${idDepartment}`, 'GET');

export const useGetAllFireDepartment = () =>
    useFetch<DetailFireDepartmentModel[]>('/safefire-agency-service/api/fire-department/monitoring', 'GET');

export const useAddSoldier = () => useFetch(`/safefire-agency-service/api/firefighter/storage`, 'POST');

export const useGetDetailSoldier = (idDepartment: number, idSoldier: number) =>
    useFetch<DetailSoldierModel>(
        `/safefire-agency-service/api/fire-department/${idDepartment}/firefighter/${idSoldier}`,
    );
export const useDeleteSoldier = (idDepartment: number, idSoldier: number) =>
    useFetch(`/safefire-agency-service/api/fire-department/${idDepartment}/firefighter/${idSoldier}`, 'DELETE');
export const useGetAllViewListWaterIntake = (
    idDepartment: number,
    pageIndex: number,
    pageSize: number,
    valueSearch: string,
) =>
    useFetch<ListWaterIntakeModel>(
        `/safefire-agency-service/api/fire-department/${idDepartment}/water-intake?page-index=${pageIndex}&page-size=${pageSize}&valueSearch=${valueSearch}`,
        'GET',
    );
export const useGetDetailWater = (idDepartment: number, idWaterIntake: number) =>
    useFetch<DetailWaterIntakeModel>(
        `/safefire-agency-service/api/fire-department/${idDepartment}/water-intake/${idWaterIntake}`,
        'GET',
    );
export const useCreateWaterIntake = () => useFetch('/safefire-agency-service/api/water-intake/storage', 'POST');

export const useDeleteWaterIntake = (idDepartment: number, idWaterIntake: number) =>
    useFetch<DetailSoldierModel>(
        `/safefire-agency-service/api/fire-department/${idDepartment}/water-intake/${idWaterIntake}`,
        'DELETE',
    );

export const useCreateFireDepartment = () => useFetch('/safefire-agency-service/api/fire-department/storage', 'POST');

export const useDeleteFireDepartment = (idDepartment: number) =>
    useFetch<DetailFireDepartmentModel>(
        `/safefire-agency-service/api/fire-department/${idDepartment}/deletion`,
        'DELETE',
    );
