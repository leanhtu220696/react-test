import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    getIdCheckedSelect,
    IdCheckedSelectModel,
    resetIdCheckedSelect,
    setIdCheckedSelect,
} from '@/context/store/IdCheckedSelectSlice';

interface Props {
    idCheckedSelectStore?: any;
    setIdCheckedSelectStore?: Dispatch<SetStateAction<IdCheckedSelectModel>>;
    resetIdCheckedSelectStore?: () => void;
}

export const useIdCheckedSelectStore: () => Props = () => {
    const dispatch = useDispatch();
    const [idCheckedSelect, setIdCheckedSelectStore] = useState<IdCheckedSelectModel>();
    const idCheckedSelectStore = useSelector(getIdCheckedSelect);
    const resetIdCheckedSelectStore = () => {
        dispatch(resetIdCheckedSelect());
    };
    useEffect(() => {
        if (idCheckedSelect) {
            dispatch(
                setIdCheckedSelect({
                    ...idCheckedSelect,
                }),
            );
        }
    }, [idCheckedSelect]);
    return { idCheckedSelectStore, setIdCheckedSelectStore, resetIdCheckedSelectStore };
};
