import { PaginationModel } from '../PaginationModel';

export interface DetailRoomModel {
    id: number;
    ioChannel: number;
    name: string;
    rsDeviceId: number;
    zoneId: number;
    typeChannel: string;
}

export interface RoomModel {
    roomViewList: DetailRoomModel[];
    page: PaginationModel;
}
