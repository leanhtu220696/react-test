import { createSlice } from '@reduxjs/toolkit';

import { initDetailDevice } from '@/assets/data/InitDetailDevice';
import { DetailConstructionModel } from '@/model/Construction/ConstructionModel';
import { DetailRoomModel } from '@/model/Construction/RoomModel';
import { DetailCustomerModel } from '@/model/Customer/CustomerModel';
import { DetailDeviceModel } from '@/model/Device/DeviceModel';
import { TYPE_CHANNEL_RS } from '@/util/ConstantApp/TypeConstant';

interface ModalState {
    isVisible: boolean;
    constructionTarget?: DetailConstructionModel;
    customerTarget?: DetailCustomerModel;
    detailRoom?: DetailRoomModel;
    modalRoom?: {
        toggle: boolean;
        isAddModal: boolean;
        detailRoom?: DetailRoomModel;
    };
    isDelete: boolean;
    device: DetailDeviceModel;
}

const initModalState: ModalState = {
    isVisible: false,
    modalRoom: {
        toggle: false,
        isAddModal: false,
        detailRoom: {
            name: '',
            id: null,
            ioChannel: null,
            zoneId: null,
            rsDeviceId: null,
            typeChannel: TYPE_CHANNEL_RS,
        },
    },
    isDelete: false,
    device: initDetailDevice,
};
const modalSlice = createSlice({
    name: 'modalVisible',
    initialState: initModalState,
    reducers: {
        toggleModal(state) {
            state.isVisible = !state.isVisible;
        },
        deleteConstructionHandler(state, action) {
            state.isVisible = !state.isVisible;
            state.constructionTarget = action.payload;
        },
        lockOrUnlockAccountHandler(state, action) {
            state.isVisible = !state.isVisible;
            state.customerTarget = action.payload;
        },
        roomHandler(state, action) {
            state.isVisible = !state.isVisible;
            state.modalRoom.detailRoom = action.payload;
        },
        toggleDeleteModal(state) {
            state.isDelete = !state.isDelete;
        },
        cancelModal(state) {
            state.isVisible = false;
            state.modalRoom = initModalState.modalRoom;
            state.isDelete = false;
            state.device = initDetailDevice;
        },
        addRoom(state) {
            state.isVisible = !state.isVisible;
            state.modalRoom.isAddModal = !state.modalRoom.isAddModal;
            state.modalRoom.detailRoom = initModalState.modalRoom.detailRoom;
        },
        getDevice(state, action) {
            state.isVisible = !state.isVisible;
            state.device = action.payload;
        },
    },
});

export const {
    toggleModal,
    roomHandler,
    cancelModal,
    addRoom,
    lockOrUnlockAccountHandler,
    toggleDeleteModal,
    getDevice,
} = modalSlice.actions;
export default modalSlice.reducer;
