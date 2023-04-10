import { configureStore } from '@reduxjs/toolkit';

import coordinatesReducer from '@/context/store/CoordinatesSlice';
import dataCreateDeviceReducer from '@/context/store/DataCreateDeviceSlice';
import idDeleteReducer from '@/context/store/DepartmentSlice';
import expandMenuReducer from '@/context/store/expandMenuSlice';
import phoneNumberExistsReducer from '@/context/store/PhoneNumberExistsSlice';

import collectionCoordinateEncodedReducer from './CollectionCoordinateEncodedSlice';
import originReducer from './CoordinatesOriginSlice';
import idCheckedSelectReducer from './IdCheckedSelectSlice';
import modalReducer from './ModalSlice';
import originAndDestinationListReducer from './OriginAndDestinationListSlice';
import supervisionReducer from './SupervisionSlice';

const rootReducer = {
    expandMenu: expandMenuReducer,
    coordinates: coordinatesReducer,
    phoneNumberExists: phoneNumberExistsReducer,
    idCheckedSelect: idCheckedSelectReducer,
    dataCreateDevice: dataCreateDeviceReducer,
    supervision: supervisionReducer,
    collectionCoordinateEncoded: collectionCoordinateEncodedReducer,
    origin: originReducer,
    originAndDestinationList: originAndDestinationListReducer,
    department: idDeleteReducer,
    modalState: modalReducer,
};

const store = configureStore({
    reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
