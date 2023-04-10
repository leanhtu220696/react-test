import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useCoordinatesOriginStore } from '@/component/hook/useCoordinatesOriginStore';
import { FireLogModel } from '@/model/FireLog/FireLogModel';
import { calcHeight } from '@/styles/Style-mixins';

import { useCollectionCoordinateEncodedStore } from '../../component/hook/useCollectionCoordinateEncodedStore';

import DetailHappeningFire from './DetailHappeningFire/DetaiHappeningFire';
import BtnInMap from './ListHappeningFire/BtnInMap';
import ListHappeningFire from './ListHappeningFire/ListHappeningFire';

interface StyleProps {
    ismenu: string;
}

const StyleBackground = styled.div<StyleProps>`
    display: ${(props) => (props.ismenu === 'false' ? 'hidden' : 'block')};
    width: ${(props) => (props.ismenu === 'false' ? '0' : 'auto')};
    margin: ${(props) => (props.ismenu === 'false' ? '0' : '0 10px')};
    padding: 0;
    transition: width 0.09s;
    background-color: #ffffff;
    box-shadow: 5px 0 10px rgba(192, 194, 192, 0.5);
    height: 100%;
    position: relative;

    & > div:nth-child(1) {
        position: absolute;
        z-index: 100;
        top: 10px;
        right: ${(props) => (props.ismenu === 'false' ? '-45px' : '-62px')};
    }

    & > div:nth-child(2) {
        position: relative;
        margin: 0;
        padding: 0;
        overflow-y: scroll;
        overflow-x: hidden;
        ${calcHeight()}

        @media (max-width: 576px) {
            height: 50vh;
        }
    }
`;

function ViewHappening({
    idFireHappening,
    listFireHappening,
    stateDescWhenUpdateStatus,
    setStateDescWhenUpdateStatus,
}: {
    setStateDescWhenUpdateStatus: (value: any) => void;
    stateDescWhenUpdateStatus: { isOpenDetail: boolean; isUpdateStatus: boolean };
    idFireHappening: number;
    listFireHappening: FireLogModel[];
}) {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [detailFireHappening, setDetailFireHappening] = useState<FireLogModel>();
    const [idFireHappeningCurrent, setIdFireHappeningCurrent] = useState<number>(-1);
    const [runFirst, setRunFirst] = useState(false);
    const { resetCollectionCoordinateEncodedStore } = useCollectionCoordinateEncodedStore();
    const { resetOriginCoordinatesStore } = useCoordinatesOriginStore();
    useEffect(() => {
        if (listFireHappening && listFireHappening.length !== 0) {
            if (!runFirst) {
                setIsOpenMenu(true);
                setRunFirst(true);
            }
        }
    }, [listFireHappening]);
    useEffect(() => {
        if (idFireHappening !== idFireHappeningCurrent) {
            setIdFireHappeningCurrent(idFireHappening);
            if (idFireHappening !== -1) {
                setStateDescWhenUpdateStatus((state: any) => {
                    return {
                        ...state,
                        isOpenDetail: true,
                    };
                });
                setIsOpenMenu(true);
                return;
            }
        }
        if (detailFireHappening && detailFireHappening?.id !== idFireHappeningCurrent) {
            setIdFireHappeningCurrent(detailFireHappening.id);
            setStateDescWhenUpdateStatus((state: any) => {
                return {
                    ...state,
                    isOpenDetail: true,
                };
            });

            return;
        }
    }, [idFireHappening, detailFireHappening]);

    useEffect(() => {
        if (!isOpenMenu) {
            setStateDescWhenUpdateStatus((state: any) => {
                return {
                    ...state,
                    isOpenDetail: false,
                };
            });
        }
    }, [isOpenMenu]);
    useEffect(() => {
        if (stateDescWhenUpdateStatus.isOpenDetail === false) {
            setDetailFireHappening(undefined);
            resetCollectionCoordinateEncodedStore();
            resetOriginCoordinatesStore();
        }
    }, [stateDescWhenUpdateStatus.isOpenDetail]);
    const handleClickListHappeningFire = () => {
        setIsOpenMenu(!isOpenMenu);
    };
    return (
        <StyleBackground ismenu={`${isOpenMenu}`}>
            <BtnInMap
                handleClickListHappeningFire={handleClickListHappeningFire}
                lengthListFireLog={listFireHappening.length}
            />
            {!stateDescWhenUpdateStatus.isOpenDetail ? (
                <ListHappeningFire
                    listFireHappening={listFireHappening}
                    setDetailFireHappening={setDetailFireHappening}
                    isOpenMenu={isOpenMenu}
                />
            ) : (
                <DetailHappeningFire
                    setStateDescWhenUpdateStatus={setStateDescWhenUpdateStatus}
                    idFireHappening={idFireHappeningCurrent}
                />
            )}
            <div>{stateDescWhenUpdateStatus.isOpenDetail}</div>
        </StyleBackground>
    );
}

export default ViewHappening;
