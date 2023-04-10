import { useFetch } from '@/fetcher/Api/ApiFetcher';
import { WaterIntakeModel } from '@/model/FireDepartment/WaterIntakeModel';

export const useGetAllWaterIntake = () =>
    useFetch<WaterIntakeModel[]>('/safefire-agency-service/api/water-intake/monitoring', 'GET');
