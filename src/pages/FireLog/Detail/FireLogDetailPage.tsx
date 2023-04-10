import { useEffect, useState } from 'react';
import { Marker } from '@goongmaps/goong-map-react';
import styled from 'styled-components';

import { IconFireLogShadow } from '@/assets/svg';
import { useCoordinatesStore } from '@/component/hook/useCoordinatesStore';
import Map from '@/component/map/Map';
import ModalNotificationOfDuplicatePhoneNumber from '@/component/modal/NotificationOfDuplicatePhoneNumber';
import { flex } from '@/styles/Style-mixins';

import FireLogDetail from './FireLogDetail';

const StyleBackground = styled.div`
    width: 100%;
    ${flex('flex-start', 'center', 'row')}
`;
const FireLogDetailPage = () => {
    const { coordinatesStore } = useCoordinatesStore();
    const [viewport, setViewPort] = useState({});
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
                <Map deductedWidth={500} viewportCurrent={viewport}>
                    <Marker
                        latitude={coordinatesStore.latitude}
                        longitude={coordinatesStore.longitude}
                        offsetLeft={-10}
                        offsetTop={-20}
                    >
                        <IconFireLogShadow />
                    </Marker>
                </Map>
                <FireLogDetail />
            </StyleBackground>
        </>
    );
};
export default FireLogDetailPage;
