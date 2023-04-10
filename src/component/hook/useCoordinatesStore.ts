import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCoordinates, resetCoordinates, setCoordinates } from '@/context/store/CoordinatesSlice';
import { CoordinatesModel } from '@/model/Map/CoordinatesModel';

interface Props {
    coordinatesStore?: CoordinatesModel;
    setCoordinatesStore?: Dispatch<SetStateAction<CoordinatesModel>>;
    resetCoordinatesStore?: () => void;
}

export const useCoordinatesStore: () => Props = () => {
    const dispatch = useDispatch();
    const [coordinates, setCoordinatesStore] = useState<CoordinatesModel>({
        longitude: 0,
        latitude: 0,
    });
    const coordinatesStore: CoordinatesModel = useSelector(getCoordinates);
    const resetCoordinatesStore = () => {
        dispatch(resetCoordinates());
    };
    useEffect(() => {
        dispatch(
            setCoordinates({
                longitude: coordinates.longitude,
                latitude: coordinates.latitude,
            }),
        );
    }, [coordinates]);
    return { coordinatesStore, setCoordinatesStore, resetCoordinatesStore };
};
