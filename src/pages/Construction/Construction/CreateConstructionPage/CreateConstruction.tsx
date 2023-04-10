import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EnvironmentFilled } from '@ant-design/icons';
import { Marker } from '@goongmaps/goong-map-react';
import styled from 'styled-components';

import { useCoordinatesStore } from '@/component/hook/useCoordinatesStore';
import { useDataCreateDeviceStore } from '@/component/hook/useDataCreateDevice';
import Map from '@/component/map/Map';
import ModalNotificationOfDuplicatePhoneNumber from '@/component/modal/NotificationOfDuplicatePhoneNumber';
import { callDataCreateDevice } from '@/context/store/DataCreateDeviceSlice';
import { flex } from '@/styles/Style-mixins';
import { ScrollToTopStep } from '@/util/ScrollToTop';

import FormAddConstruction from './FormAddConstruction';

const StyleBackground = styled.div`
    width: 100%;
    ${flex('flex-start', 'center', 'row')}
    @media(max-width: 576px) {
        display: revert;
    }
`;

function AddConstructionPage() {
    const dispatch = useDispatch();
    const { dataCreateDeviceStore } = useDataCreateDeviceStore();
    const [currentStep, setCurrentStep] = useState(0);
    const { coordinatesStore, setCoordinatesStore } = useCoordinatesStore();
    ScrollToTopStep(currentStep);

    useEffect(() => {
        setCurrentStep(dataCreateDeviceStore.step);
    }, [dataCreateDeviceStore.step]);
    const [viewport, setViewPort] = useState({});
    const handleClickIndexInMap = ($event: any) => {
        if (currentStep === 0) {
            setCoordinatesStore({
                latitude: +$event.lngLat[1],
                longitude: +$event.lngLat[0],
            });
        }
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
                {currentStep !== 3 && (
                    <Map viewportCurrent={viewport} deductedWidth={500} onClick={handleClickIndexInMap}>
                        <Marker
                            latitude={coordinatesStore.latitude}
                            longitude={coordinatesStore.longitude}
                            offsetLeft={-10}
                            offsetTop={-20}
                        >
                            <EnvironmentFilled style={{ color: 'red', fontSize: '25px' }} />
                        </Marker>
                    </Map>
                )}
                <FormAddConstruction />
            </StyleBackground>
        </>
    );
}

export default AddConstructionPage;
