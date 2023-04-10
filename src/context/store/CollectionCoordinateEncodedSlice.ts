import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    collectionCoordinateEncoded: '',
};

export const collectionCoordinateEncodedState = createSlice({
    name: 'collectionCoordinateEncoded',
    initialState,
    reducers: {
        setCollectionCoordinateEncoded: (state, actions) => {
            state.collectionCoordinateEncoded = actions.payload.collectionCoordinateEncoded;
        },
        resetCollectionCoordinateEncoded: () => initialState,
    },
});

export const { setCollectionCoordinateEncoded, resetCollectionCoordinateEncoded } =
    collectionCoordinateEncodedState.actions;
export const getCollectionCoordinateEncoded = (state: any) => state.collectionCoordinateEncoded;
export default collectionCoordinateEncodedState.reducer;
