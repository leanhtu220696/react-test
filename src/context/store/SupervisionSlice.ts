import { createSlice } from '@reduxjs/toolkit';

interface IconCheckModel {
    displayedConstruction: boolean;
    displayedFireDepartment: boolean;
    displayedWaterIntake: boolean;
}

const initCheckbox: IconCheckModel = {
    displayedConstruction: true,
    displayedFireDepartment: true,
    displayedWaterIntake: true,
};

const supervisionSlice = createSlice({
    name: 'supervision',
    initialState: initCheckbox,
    reducers: {
        checkConstruction(state) {
            state.displayedConstruction = !state.displayedConstruction;
        },
        checkFireDepartment(state) {
            state.displayedFireDepartment = !state.displayedFireDepartment;
        },
        checkWaterIntake(state) {
            state.displayedWaterIntake = !state.displayedWaterIntake;
        },
    },
});

export const { checkConstruction, checkWaterIntake, checkFireDepartment } = supervisionSlice.actions;
const supervisionReducer = supervisionSlice.reducer;
export default supervisionReducer;
