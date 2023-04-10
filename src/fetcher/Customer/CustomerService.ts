import { DetailCustomerModel, TableDataCustomer } from '@/model/Customer/CustomerModel';

import { useFetch } from '../Api/ApiFetcher';

export const useGetAllAlertReceiver = () =>
    useFetch<DetailCustomerModel[]>('/safefire-agency-service/api/customer/alert-receiver', 'GET');

export const useGetListCustomer = () => useFetch<DetailCustomerModel[]>('/safefire-agency-service/api/customer', 'GET');
export const useGetDetailCustomerByUsername = (username: string) =>
    useFetch<DetailCustomerModel>(`/safefire-agency-service/api/customer/by-username?username=${username}`, 'GET');

export const useSearchCustomerList = (pageIndex: number, pageSize: number, valueSearch: string, type: string) => {
    const typeNew = type ? `&type=${type}` : '';
    return useFetch<TableDataCustomer>(
        `/safefire-agency-service/api/customer/searching?page-index=${pageIndex}&page-size=${pageSize}&valueSearch=${valueSearch}${typeNew}`,
        'GET',
    );
};
export const useCreateCustomer = () => useFetch('/safefire-agency-service/api/customer/storage', 'POST');

export const useLockOrUnlockAccount = (id: number, status: string) =>
    useFetch(`/safefire-agency-service/api/customer/${id}/locking?status=${status}`, 'PUT');
