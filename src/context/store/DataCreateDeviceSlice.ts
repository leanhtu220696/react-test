import { createSlice } from '@reduxjs/toolkit';

import { CreateConstructionModel, CreateGatewayModel } from '@/model/Device/ActiveGatewayModel';
import { CREATE_DEVICE_LS_KEY } from '@/util/ConstantApp/TypeConstant';

import { DetailCustomerModel } from '../../model/Customer/CustomerModel';

export interface DataCreateDeviceModel {
    constructionModel: CreateConstructionModel;
    accountCustomerModel: DetailCustomerModel;
    gatewayModel: CreateGatewayModel;
    step: number;
}
const initialState: DataCreateDeviceModel = {
    constructionModel: null,
    accountCustomerModel: null,
    gatewayModel: null,
    step: 0,
};

export const dataCreateDeviceState = createSlice({
    name: 'dataCreateDevice',
    initialState,
    reducers: {
        callDataCreateDevice: (state) => {
            const dataCreateDevice = localStorage.getItem(CREATE_DEVICE_LS_KEY);
            const checkedExistsDataLocal = Boolean(dataCreateDevice);
            if (checkedExistsDataLocal) {
                const detailConstructionModel = JSON.parse(dataCreateDevice);
                if (detailConstructionModel) {
                    state.accountCustomerModel = detailConstructionModel.accountCustomerModel;
                    state.constructionModel = detailConstructionModel.constructionModel;
                    state.gatewayModel = detailConstructionModel.gatewayModel;
                    state.step = detailConstructionModel.step;
                }
            }
        },
        setDataCreateDevice: (state, actions) => {
            localStorage.setItem(CREATE_DEVICE_LS_KEY, actions.payload);
        },
        resetDataCreateDevice: () => {
            const resetData = (callback: () => void) => {
                localStorage.setItem(CREATE_DEVICE_LS_KEY, JSON.stringify(initialState));
                callback();
            };
            resetData(() => {
                callDataCreateDevice();
            });
        },
    },
});

export const { setDataCreateDevice, callDataCreateDevice, resetDataCreateDevice } = dataCreateDeviceState.actions;
export const getDataCreateDevice = (state: any) => state.dataCreateDevice;
export default dataCreateDeviceState.reducer;
