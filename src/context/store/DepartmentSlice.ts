import { useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

import { DetailSoldierModel } from '@/model/FireDepartment/SoldierModel';
import { ViewListWaterIntakeModel } from '@/model/FireDepartment/WaterIntakeModel';

import { RootState } from '.';

export interface DeleteModel {
    deletedSoldier?: DetailSoldierModel;
    deletedWaterIntake?: ViewListWaterIntakeModel;
}
const initialState: DeleteModel = {
    deletedSoldier: undefined,
    deletedWaterIntake: undefined,
};

export const idDeleteState = createSlice({
    name: 'idDepartment',
    initialState,
    reducers: {
        setDeletedSoldier: (state, actions) => {
            state.deletedSoldier = actions.payload;
        },
        setDeletedWaterIntake: (state, actions) => {
            state.deletedWaterIntake = actions.payload;
        },
    },
});

export const { setDeletedSoldier, setDeletedWaterIntake } = idDeleteState.actions;
export const getIdDeletedSoldier = () => useSelector((state: RootState) => state.department.deletedSoldier);
export const getIdDeletedWaterIntake = () => useSelector((state: RootState) => state.department.deletedWaterIntake);

export default idDeleteState.reducer;
