import { createSlice } from '@reduxjs/toolkit';

import { ORIGIN_AND_DESTINATION_LS_KEY } from '@/util/ConstantApp/TypeConstant';

export interface OriginAndDestinationItemModel {
    idHappeningFire: number;
    idFireDepartment?: number;
    placeId?: string;
    originLat: number;
    originLng: number;
    destinationLat: number;
    destinationLng: number;
}
export interface OriginAndDestinationListModel {
    list: OriginAndDestinationItemModel[];
}
const initialState: OriginAndDestinationListModel = {
    list: [],
};

export const originAndDestinationListState = createSlice({
    name: 'originAndDestinationList',
    initialState,
    reducers: {
        callOriginAndDestinationList: (state) => {
            const originAndDestinationList = localStorage.getItem(ORIGIN_AND_DESTINATION_LS_KEY);
            const checkedExistsDataLocal = Boolean(originAndDestinationList);
            if (checkedExistsDataLocal) {
                state.list = JSON.parse(originAndDestinationList);
            }
        },
        setOriginAndDestinationList: (state, actions) => {
            localStorage.setItem(ORIGIN_AND_DESTINATION_LS_KEY, actions.payload);
        },
        resetOriginAndDestinationList: () => {
            const resetData = (callback: () => void) => {
                localStorage.setItem(ORIGIN_AND_DESTINATION_LS_KEY, JSON.stringify(initialState));
                callback();
            };
            resetData(() => {
                callOriginAndDestinationList();
            });
        },
    },
});

export const { setOriginAndDestinationList, callOriginAndDestinationList, resetOriginAndDestinationList } =
    originAndDestinationListState.actions;
export const getOriginAndDestinationList = (state: any) => state.originAndDestinationList;
export default originAndDestinationListState.reducer;
