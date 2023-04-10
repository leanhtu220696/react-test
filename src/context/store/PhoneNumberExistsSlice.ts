import { createSlice } from '@reduxjs/toolkit';

interface ModalPhoneNumberExists {
    phoneNumber: number;
    name: string;
    visible: boolean;
    checked: boolean;
}

const initialState: ModalPhoneNumberExists = {
    name: '',
    phoneNumber: null,
    visible: false,
    checked: false,
};

export const phoneNumberExistsState = createSlice({
    name: 'phoneNumberExists',
    initialState,
    reducers: {
        setChangeModal: (state, actions) => {
            state.checked = actions.payload.checked;
            state.phoneNumber = actions.payload.phoneNumber;
            state.visible = actions.payload.visible;
            state.name = actions.payload.name;
        },
        resetChangeModal: () => initialState,
    },
});

export const { setChangeModal, resetChangeModal } = phoneNumberExistsState.actions;
export const getPhoneNumberExists = (state: any) => state.phoneNumberExists;
export default phoneNumberExistsState.reducer;
