import { DetailConstructionModel, TableDataConstruction } from '@/model/Construction/ConstructionModel';

import { useFetch } from '../Api/ApiFetcher';

export const useGetListConstruction = () =>
    useFetch<DetailConstructionModel[]>('/safefire-agency-service/api/construction', 'GET');
export const useCreateConstruction = () => useFetch('/safefire-agency-service/api/construction/storage', 'POST');

export const useGetDetailConstruction = (id: number) =>
    useFetch<DetailConstructionModel>(`/safefire-agency-service/api/construction/${id}`, 'GET');
export const useDeleteConstruction = (id: number) =>
    useFetch<DetailConstructionModel>(`/safefire-agency-service/api/construction/${id}`, 'DELETE');

export const useGetListConstructionSearch = (
    pageIndex: number,
    pageSize: number,
    provinceId: number,
    districtId: number,
    valueSearch: string,
) => {
    const provinceParam = provinceId ? `&provinceId=${provinceId}` : '';
    const districtIdParam = districtId ? `&districtId=${districtId}` : '';
    return useFetch<TableDataConstruction>(
        `/safefire-agency-service/api/construction/searching?page-index=${pageIndex}&page-size=${pageSize}&valueSearch=${valueSearch}${provinceParam}${districtIdParam}`,
        'GET',
    );
};
export const useRecallDevice = (idConstruction: number, idDevice: number) =>
    useFetch(`/safefire-agency-service/api/construction/${idConstruction}/device/${idDevice}/recall`, 'PUT');
