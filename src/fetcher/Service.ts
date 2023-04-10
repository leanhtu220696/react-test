import { DistrictModel, ProvinceModel } from '@/model/ProvinceModel';

import { useFetch } from './Api/ApiFetcher';

export const useGetListProvince = () => useFetch<ProvinceModel[]>('/safefire-agency-service/api/province', 'GET');
export const useGetListDistrict = (id: number) =>
    useFetch<DistrictModel[]>(`/safefire-agency-service/api/province/${id}/district`, 'GET');
