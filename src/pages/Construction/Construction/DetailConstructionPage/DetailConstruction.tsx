import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Marker } from '@goongmaps/goong-map-react';
import styled from 'styled-components';

import imgConstruction from '@/assets/image/construction.png';
import { useCoordinatesStore } from '@/component/hook/useCoordinatesStore';
import Map from '@/component/map/Map';
import ModalNotificationOfDuplicatePhoneNumber from '@/component/modal/NotificationOfDuplicatePhoneNumber';
import { callDataCreateDevice } from '@/context/store/DataCreateDeviceSlice';
import { flex } from '@/styles/Style-mixins';

import FormDetailConstruction from './FormDetailConstruction';

const StyleBackground = styled.div`
    width: 100%;
    ${flex('flex-start', 'center', 'row')}
    @media(max-width: 576px) {
        display: revert;
    }
`;

function DetailConstruction() {
    const dispatch = useDispatch();
    const { coordinatesStore, setCoordinatesStore } = useCoordinatesStore();
    const [viewport, setViewPort] = useState({});

    const handleClickIndexInMap = ($event: any) => {
        setCoordinatesStore({
            latitude: +$event.lngLat[1],
            longitude: +$event.lngLat[0],
        });
    };
    useEffect(() => {
        dispatch(callDataCreateDevice());
    }, []);

    useEffect(() => {
        if (coordinatesStore.longitude) {
            setViewPort({
                ...viewport,
                latitude: coordinatesStore.latitude,
                longitude: coordinatesStore.longitude,
                zoom: 16,
            });
        }
    }, [coordinatesStore]);

    return (
        <>
            <ModalNotificationOfDuplicatePhoneNumber />
            <StyleBackground>
                <Map viewportCurrent={viewport} deductedWidth={500} onClick={handleClickIndexInMap}>
                    <Marker
                        latitude={coordinatesStore.latitude}
                        longitude={coordinatesStore.longitude}
                        offsetLeft={-10}
                        offsetTop={-20}
                    >
                        <img src={imgConstruction} alt="Công trình" />
                    </Marker>
                </Map>
                <FormDetailConstruction />
            </StyleBackground>
        </>
    );
}

export default DetailConstruction;
