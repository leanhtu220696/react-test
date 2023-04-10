import { DataTableDeviceModel, DetailDeviceModel } from '@/model/Device/DeviceModel';
import { DeviceInformationModel, OverviewDeviceModel, OverviewReportModel } from '@/model/Device/DeviceModel';

import { ModelDeviceModel } from '../../model/Device/DeviceModel';
import { useFetch } from '../Api/ApiFetcher';

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
export const useActivationDevice = (idDevice: string) =>
    useFetch(`/safefire-agency-service/api/device/${idDevice}/activation`, 'POST');

export const useGetDeviceInformation = () =>
    useFetch<DeviceInformationModel>('/safefire-agency-service/api/command-center/device-report-around-country', 'GET');

export const useGetTotalDeviceByProvince = () =>
    useFetch<OverviewDeviceModel[]>('/safefire-agency-service/api/province/overview-device', 'GET');

export const useGetDataOverviewReport = () =>
    useFetch<OverviewReportModel>('/safefire-agency-service/api/command-center/overview-report-around-country', 'GET');

export const useGetDeviceListOfConstruction = (
    pageIndex: number,
    pageSize: number,
    constructionId: number,
    valueSearch: string,
    modelId: number | undefined,
) =>
    useFetch<DataTableDeviceModel>(
        `/safefire-agency-service/api/construction/${constructionId}/device?page-index=${pageIndex}&page-size=${pageSize}&valueSearch=${valueSearch}${
            modelId ? `&modelId=${modelId}` : ''
        }`,
    );

export const useGetDetailDeviceById = (id: number) =>
    useFetch<DetailDeviceModel>(`/safefire-agency-service/api/device/${id}`, 'GET');

export const useUpdateDeviceName = (id: number) => useFetch(`/safefire-agency-service/api/device/${id}`, 'POST');

export const useGetDetailDeviceOfConstruction = (constructionId: number, deviceId: number) =>
    useFetch<DetailDeviceModel>(`/safefire-agency-service/api/construction/${constructionId}/device/${deviceId}`);

export const useGetListModel = () => useFetch<ModelDeviceModel[]>('/safefire-agency-service/api/model', 'GET');
