import { DataTableDeviceModel } from '@/Model/Device';

import { useFetch } from './ApiFetcher';

export const useGetListDevice = (
    pageIndex: number,
    pageSize: number,
    valueSearch: string,
    modelId: number,
    deviceStatus: string,
) => {
    const valueSearchNew = valueSearch ? `&value-search=${valueSearch}` : '';
    const modelIdNew = modelId ? `&model-id=${modelId}` : '';
    const deviceStatusNew = deviceStatus ? `&device-status=${deviceStatus}` : '';
    return useFetch<DataTableDeviceModel>(
        `/safefire-agency-service/api/device/searching?page-index=${pageIndex}&page-size=${pageSize}${valueSearchNew}${modelIdNew}${deviceStatusNew}`,
        'GET',
    );
};
