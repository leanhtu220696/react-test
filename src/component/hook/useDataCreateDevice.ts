import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    callDataCreateDevice,
    DataCreateDeviceModel,
    getDataCreateDevice,
    resetDataCreateDevice,
    setDataCreateDevice,
} from '@/context/store/DataCreateDeviceSlice';

interface Props {
    dataCreateDeviceStore?: any;
    setDataCreateDeviceStore?: Dispatch<SetStateAction<DataCreateDeviceModel>>;
    resetDataCreateDeviceStore?: () => void;
}

export const useDataCreateDeviceStore: () => Props = () => {
    const dispatch = useDispatch();
    const [dataCreateDevice, setDataCreateDeviceStore] = useState<any>();
    const dataCreateDeviceStore = useSelector(getDataCreateDevice);
    const resetDataCreateDeviceStore = () => {
        dispatch(resetDataCreateDevice());
    };
    useEffect(() => {
        if (dataCreateDevice) {
            dispatch(setDataCreateDevice(JSON.stringify(dataCreateDevice)));
            dispatch(callDataCreateDevice());
        }
    }, [dataCreateDevice]);
    return { dataCreateDeviceStore, setDataCreateDeviceStore, resetDataCreateDeviceStore };
};
