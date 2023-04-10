import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getOriginCoordinates, resetOriginCoordinates, setOriginStore } from '@/context/store/CoordinatesOriginSlice';
import { CoordinatesModel } from '@/model/Map/CoordinatesModel';

interface Props {
    coordinatesOriginStore?: CoordinatesModel;
    setCoordinatesOriginStore?: Dispatch<SetStateAction<CoordinatesModel>>;
    resetOriginCoordinatesStore?: () => void;
}

export const useCoordinatesOriginStore: () => Props = () => {
    const dispatch = useDispatch();
    const [coordinatesOrigin, setCoordinatesOriginStore] = useState<CoordinatesModel>({
        longitude: 0,
        latitude: 0,
    });
    const coordinatesOriginStore: CoordinatesModel = useSelector(getOriginCoordinates);
    const resetOriginCoordinatesStore = () => {
        dispatch(resetOriginCoordinates());
    };
    useEffect(() => {
        dispatch(
            setOriginStore({
                longitude: coordinatesOrigin.longitude,
                latitude: coordinatesOrigin.latitude,
            }),
        );
    }, [coordinatesOrigin]);
    return { coordinatesOriginStore, setCoordinatesOriginStore, resetOriginCoordinatesStore };
};
