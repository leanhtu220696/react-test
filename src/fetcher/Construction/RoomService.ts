import { RoomModel } from '@/model/Construction/RoomModel';

import { useFetch } from '../Api/ApiFetcher';

export const useGetListRoomByIdConstruction = (id: number, pageIndex: number, pageSize: number, roomName: string) =>
    useFetch<RoomModel>(
        `/safefire-agency-service/api/construction/${id}/room?page-index=${pageIndex}&page-size=${pageSize}&roomName=${roomName}`,
        'GET',
    );
export const useGetDetailRoomByIdConstruction = (idConstruction: number, idRoom: number) =>
    useFetch<RoomModel>(`/safefire-agency-service/api/construction/${idConstruction}/room/${idRoom}`, 'GET');

export const useStoreDetailRoom = () => useFetch('/safefire-agency-service/api/room/storage', 'POST');
export const useDeleteRoom = (idConstruction: number, idRoom: number) =>
    useFetch(`/safefire-agency-service/api/construction/${idConstruction}/room/${idRoom}/deletion`, 'DELETE');
