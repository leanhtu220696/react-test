import { createSlice } from '@reduxjs/toolkit';

import { CoordinatesModel } from '@/model/Map/CoordinatesModel';

const initialState: CoordinatesModel = {
    latitude: 0,
    longitude: 0,
};

export const originState = createSlice({
    name: 'origin',
    initialState,
    reducers: {
        setOriginStore: (state, actions) => {
            state.longitude = actions.payload.longitude;
            state.latitude = actions.payload.latitude;
        },
        resetOriginCoordinates: () => initialState,
    },
});

export const { setOriginStore, resetOriginCoordinates } = originState.actions;
export const getOriginCoordinates = (state: any) => state.origin;
export default originState.reducer;
