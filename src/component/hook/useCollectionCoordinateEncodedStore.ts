import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    getCollectionCoordinateEncoded,
    resetCollectionCoordinateEncoded,
    setCollectionCoordinateEncoded,
} from '../../context/store/CollectionCoordinateEncodedSlice';

interface Props {
    collectionCoordinateEncodedStore?: string;
    setCollectionCoordinateEncodedStore?: Dispatch<SetStateAction<string>>;
    resetCollectionCoordinateEncodedStore?: () => void;
}

export const useCollectionCoordinateEncodedStore: () => Props = () => {
    const dispatch = useDispatch();
    const [collectionCoordinateEncoded, setCollectionCoordinateEncodedStore] = useState<string>('');
    const collectionCoordinateEncodedStore: string =
        useSelector(getCollectionCoordinateEncoded).collectionCoordinateEncoded;
    const resetCollectionCoordinateEncodedStore = () => {
        dispatch(resetCollectionCoordinateEncoded());
    };
    useEffect(() => {
        dispatch(
            setCollectionCoordinateEncoded({
                collectionCoordinateEncoded: collectionCoordinateEncoded,
            }),
        );
    }, [collectionCoordinateEncoded]);
    return {
        collectionCoordinateEncodedStore,
        setCollectionCoordinateEncodedStore,
        resetCollectionCoordinateEncodedStore,
    };
};
