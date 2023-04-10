import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { initConstruction } from '@/assets/data/InitConstruction';
import { initFireHappening } from '@/assets/data/InitFireHappening';
import { useOriginAndDestinationListStore } from '@/component/hook/useOriginAndDestinationListStore';
import {
    callOriginAndDestinationList,
    OriginAndDestinationItemModel,
} from '@/context/store/OriginAndDestinationListSlice';
import { useGetListConstruction } from '@/fetcher/Construction/ConstructionService';
import { useGetListFireHappening } from '@/fetcher/FireLog/FireLogService';
import { DetailConstructionModel } from '@/model/Construction/ConstructionModel';
import { FireLogModel } from '@/model/FireLog/FireLogModel';
import { PropsType } from '@/model/PropsType';
import { ITEM_DETAIL_FIRE_HAPPENING_LOADER } from '@/util/ConstantApp/TypeLoader';
import { parseGeoJSON } from '@/util/parseGeoJSON';

const objectsEqual = (o1: FireLogModel, o2: FireLogModel): boolean =>
    Object.keys(o1).length === Object.keys(o2).length &&
    Object.keys(o1)
        // @ts-ignore
        .every((p) => o1[p] === o2[p]);
const arraysEqual = (a1: FireLogModel[], a2: FireLogModel[]): boolean =>
    a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));

interface StateDescWhenUpdateStatus {
    isOpenDetail: boolean;
    isUpdateStatus: boolean;
}

interface Props {
    constructionList: PropsType;
    fireHappeningGeoList: PropsType;
    listFireHappening: FireLogModel[];
    setIdFireHappening: Dispatch<SetStateAction<number | undefined>>;
    setStateDescWhenUpdateStatus: Dispatch<SetStateAction<StateDescWhenUpdateStatus | undefined>>;
    idFireHappening: number;
    stateDescWhenUpdateStatus: StateDescWhenUpdateStatus;
}

export const useConstruction: () => Props = () => {
    const dispatch = useDispatch();
    const [constructionRes, constructionReq] = useGetListConstruction();
    const [fireHappeningRes, fireHappeningReq] = useGetListFireHappening();
    const [constructionList, setConstructionList] = useState(parseGeoJSON(initConstruction));
    const [fireHappeningGeoList, setFireHappeningGeoList] = useState(parseGeoJSON(initFireHappening));
    const [stateDescWhenUpdateStatus, setStateDescWhenUpdateStatus] = useState<StateDescWhenUpdateStatus>({
        isOpenDetail: false,
        isUpdateStatus: true,
    });
    const [listFireHappening, setListFireHappening] = useState<FireLogModel[]>([]);
    const [idFireHappening, setIdFireHappening] = useState(-1);
    const { originAndDestinationListStore, setOriginAndDestinationListStore } = useOriginAndDestinationListStore();
    const listRemoveId = fireHappeningRes?.data
        ?.map((fire) => fire.constructionId)
        .filter((e, i, a) => a.indexOf(e) === i);
    let listFilteredCons: DetailConstructionModel[] = [...(constructionRes.data ?? initConstruction)];
    const filterConstructionList = () => {
        listRemoveId.forEach((id) => {
            listFilteredCons = listFilteredCons?.filter((e) => e.id !== id);
        });
    };

    useEffect(() => {
        const fireHappening = setInterval(() => {
            fireHappeningReq(undefined, [504]);
        }, 5000);
        dispatch(callOriginAndDestinationList());
        return () => clearInterval(fireHappening);
    }, []);
    useEffect(() => {
        if (listFireHappening && listFireHappening.length !== 0) {
            const newCoordinatesList: OriginAndDestinationItemModel[] = [];
            listFireHappening.forEach((itemFireLog) => {
                const itemExist = originAndDestinationListStore.find(
                    (itemFireLogLS) => itemFireLogLS.idHappeningFire === itemFireLog.id,
                );
                if (itemExist) {
                    newCoordinatesList.push(itemExist);
                }
            });
            setOriginAndDestinationListStore(newCoordinatesList);
        }
    }, [listFireHappening]);
    useEffect(() => {
        if (stateDescWhenUpdateStatus.isUpdateStatus) {
            constructionReq(undefined, [504, 404]);
            fireHappeningReq(ITEM_DETAIL_FIRE_HAPPENING_LOADER, [504, 404]);
            setStateDescWhenUpdateStatus((state) => {
                return {
                    ...state,
                    isUpdateStatus: false,
                };
            });
        }
        if (!stateDescWhenUpdateStatus.isOpenDetail) {
            setIdFireHappening(-1);
        }
    }, [stateDescWhenUpdateStatus.isOpenDetail]);

    useEffect(() => {
        if (!fireHappeningRes.data) return;
        filterConstructionList();
        setConstructionList(parseGeoJSON(listFilteredCons));
        setFireHappeningGeoList(parseGeoJSON(fireHappeningRes.data));
        if (!arraysEqual(listFireHappening, fireHappeningRes.data)) {
            setListFireHappening(fireHappeningRes.data);
        }
    }, [fireHappeningRes.data]);

    useEffect(() => {
        if (!constructionRes.data) return;
        filterConstructionList();
        setConstructionList(parseGeoJSON(listFilteredCons));
    }, [constructionRes.data]);

    return {
        constructionList,
        listFireHappening,
        fireHappeningGeoList,
        idFireHappening,
        setIdFireHappening,
        setStateDescWhenUpdateStatus,
        stateDescWhenUpdateStatus,
    };
};
