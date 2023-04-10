import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    callOriginAndDestinationList,
    getOriginAndDestinationList,
    OriginAndDestinationItemModel,
    resetOriginAndDestinationList,
    setOriginAndDestinationList,
} from '../../context/store/OriginAndDestinationListSlice';

interface Props {
    originAndDestinationListStore?: OriginAndDestinationItemModel[];
    setOriginAndDestinationListStore?: Dispatch<SetStateAction<OriginAndDestinationItemModel[]>>;
    resetOriginAndDestinationListStore?: () => void;
}

export const useOriginAndDestinationListStore: () => Props = () => {
    const dispatch = useDispatch();
    const [originAndDestinationList, setOriginAndDestinationListStore] = useState<OriginAndDestinationItemModel[]>();
    const originAndDestinationListStore = useSelector(getOriginAndDestinationList).list;
    const resetOriginAndDestinationListStore = () => {
        dispatch(resetOriginAndDestinationList());
    };
    useEffect(() => {
        dispatch(callOriginAndDestinationList());
    }, []);
    useEffect(() => {
        if (originAndDestinationList) {
            dispatch(setOriginAndDestinationList(JSON.stringify(originAndDestinationList)));
            dispatch(callOriginAndDestinationList());
        }
    }, [originAndDestinationList]);
    return { originAndDestinationListStore, setOriginAndDestinationListStore, resetOriginAndDestinationListStore };
};
