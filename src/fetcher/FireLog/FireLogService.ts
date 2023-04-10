import { FireLogDetailModel } from '@/model/FireLog/FireLogDetailModel';
import { FireLogModel } from '@/model/FireLog/FireLogModel';
import { FireLogView } from '@/model/FireLog/FireLogView';

import { useFetch } from '../Api/ApiFetcher';

export const useGetListFireHappening = () =>
    useFetch<FireLogModel[]>('/safefire-agency-service/api/fire-log/fire-happening', 'GET');

export const useGetDetailFireLog = (id: number) =>
    useFetch<FireLogDetailModel>(`/safefire-agency-service/api/fire-log/${id}`, 'GET');

export const useUpdateStatusFireHappening = (id: number, status: string) =>
    useFetch(`/safefire-agency-service/api/fire-log/${id}/status-changes?status=${status}`, 'PUT');

export const useSearchFireLog = (pageIndex: number, pageSize: number, valueSearch: string, from: number, to: number) =>
    useFetch<FireLogView>(
        `/safefire-agency-service/api/fire-log/searching?value-search=${valueSearch}&page-index=${pageIndex}&page-size=${pageSize}&from=${from}&to=${to}`,
        'GET',
    );
