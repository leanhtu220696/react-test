import { createSlice } from '@reduxjs/toolkit';

import { CoordinatesModel } from '@/model/Map/CoordinatesModel';

const initialState: CoordinatesModel = {
    latitude: 0,
    longitude: 0,
};

export const coordinatesState = createSlice({
    name: 'coordinates',
    initialState,
    reducers: {
        setCoordinates: (state, actions) => {
            state.longitude = actions.payload.longitude;
            state.latitude = actions.payload.latitude;
        },
        resetCoordinates: () => initialState,
    },
});

export const { setCoordinates, resetCoordinates } = coordinatesState.actions;
export const getCoordinates = (state: any) => state.coordinates;
export default coordinatesState.reducer;
