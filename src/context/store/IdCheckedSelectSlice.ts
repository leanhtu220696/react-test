import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '.';

export interface IdCheckedSelectModel {
    idConstruction?: number;
    idAccount?: number;
}
const initialState: IdCheckedSelectModel = {
    idConstruction: -1,
    idAccount: -1,
};

export const idCheckedSelectState = createSlice({
    name: 'idCheckedSelect',
    initialState,
    reducers: {
        setIdCheckedSelect: (state, actions) => {
            state.idConstruction = actions.payload.idConstruction;
            state.idAccount = actions.payload.idAccount;
        },
        resetIdCheckedSelect: () => initialState,
    },
});

export const { setIdCheckedSelect, resetIdCheckedSelect } = idCheckedSelectState.actions;
export const getIdCheckedSelect = (state: RootState) => state.idCheckedSelect;
export default idCheckedSelectState.reducer;
