import { createSlice } from '@reduxjs/toolkit';

export interface ExpandMenuModel {
    isExpandMenu: boolean;
}
const initialState: ExpandMenuModel = {
    isExpandMenu: false,
};

export const expandMenu = createSlice({
    name: 'expandMenu',
    initialState,
    reducers: {
        setIsExpandMenu: (state, actions) => {
            state.isExpandMenu = actions.payload;
        },
        resetIsExpandMenu: () => initialState,
    },
});

export const { setIsExpandMenu, resetIsExpandMenu } = expandMenu.actions;
export const getIsExpandMenu = (state: any) => state.expandMenu;
export default expandMenu.reducer;
