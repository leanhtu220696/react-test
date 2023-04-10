import { useEffect, useState } from 'react';
import { Marker } from '@goongmaps/goong-map-react';
import styled from 'styled-components';

import { IconFireDepartmentShadow } from '@/assets/svg';
import { useCoordinatesStore } from '@/component/hook/useCoordinatesStore';
import Map from '@/component/map/Map';
import { flex } from '@/styles/Style-mixins';

import FormDetailFireDepartment from './FormDetailFireDepartmentPage';

const StyleBackground = styled.div`
    width: 100%;
    ${flex('flex-start', 'center', 'row')}
    @media(max-width: 576px) {
        display: revert;
    }
`;

function DetailFireDepartment() {
    const { coordinatesStore, setCoordinatesStore } = useCoordinatesStore();
    const [viewport, setViewPort] = useState({});
    const handleClickIndexInMap = ($event: any) => {
        setCoordinatesStore({
            latitude: +$event.lngLat[1],
            longitude: +$event.lngLat[0],
        });
    };
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
        <StyleBackground>
            <Map viewportCurrent={viewport} deductedWidth={470} onClick={handleClickIndexInMap}>
                <Marker
                    latitude={coordinatesStore.latitude}
                    longitude={coordinatesStore.longitude}
                    offsetLeft={-25}
                    offsetTop={-50}
                >
                    <IconFireDepartmentShadow />
                </Marker>
            </Map>
            <FormDetailFireDepartment />
        </StyleBackground>
    );
}

export default DetailFireDepartment;
