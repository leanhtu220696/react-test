import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { GeolocateControl, Layer, MapEvent, Popup, Source } from '@goongmaps/goong-map-react';
import styled from 'styled-components';

import { initOverviewDevice } from '@/assets/data/InitOverviewDevice';
import { useRunFirst } from '@/component/hook/UseRunFirst';
import { roundedLayer } from '@/component/layer/Layers';
import Map from '@/component/map/Map';
import { getCoordinates } from '@/context/store/CoordinatesSlice';
import { useGetTotalDeviceByProvince } from '@/fetcher/Device/DeviceService';
import { OverviewDeviceModel } from '@/model/Device/DeviceModel';
import { flex, font } from '@/styles/Style-mixins';
import { parseGeoJSON } from '@/util/parseGeoJSON';

import ViewInformation from './ViewInformation/ViewInformation';

const StyledPopup = styled.div`
    background-color: #004965;

    ${flex('center', 'center', 'column')}
    & > h3 {
        ${font(10, '#fff', 700)}
    }

    & > span {
        ${font(10, '#fff', 400)}
    }
`;
const GeoJSON = require('geojson');
const StyleBackground = styled.div`
    width: 100%;

    ${flex('flex-start', 'center', 'row')}
    .mapboxgl-popup-content {
        background-color: #004965;
    }

    .mapboxgl-popup-anchor-top .mapboxgl-popup-tip {
        border-bottom-color: #004965;
    }

    .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
        border-top-color: #004965;
    }

    .mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
        border-left-color: #004965;
    }

    .mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
        border-right-color: #004965;
    }
`;

function CommandCenterPage() {
    const [overviewRes, overviewReq] = useGetTotalDeviceByProvince();
    const [viewport, setViewPort] = useState({
        width: 400,
        height: 400,
        latitude: 16.0694,
        longitude: 108.2097,
        zoom: 5.3,
    });
    const [overviewDeviceData, setOverviewDeviceData] = useState(parseGeoJSON(initOverviewDevice));
    const mapRef = useRef(null);
    const { runFirst } = useRunFirst();
    const [showPopup, setShowPopup] = useState(false);
    const [description, setDescription] = useState<OverviewDeviceModel>();
    const [coordinate, setCoordinate] = useState([0, 0]);
    const coordinatesCurrent = useSelector(getCoordinates);
    const [isHandleOnClick, setIsHandleOnClick] = useState(false);
    useEffect(() => {
        overviewReq();
    }, []);
    useEffect(() => {
        if (runFirst) return;
        if (coordinatesCurrent.longitude !== 0 && isHandleOnClick) {
            setViewPort((state) => {
                return {
                    ...state,
                    latitude: coordinatesCurrent.latitude,
                    longitude: coordinatesCurrent.longitude,
                    zoom: 13,
                };
            });
        }
    }, [coordinatesCurrent]);
    useEffect(() => {
        if (!overviewRes.data) return;
        setOverviewDeviceData(GeoJSON.parse(overviewRes.data, { Point: ['latitude', 'longitude'] }));
    }, [overviewRes]);

    const onClick = (e: MapEvent) => {
        setIsHandleOnClick(true);
        if (!e.features.length) {
            setShowPopup(false);
            return;
        } else {
            setShowPopup(true);
            setDescription(e.features[0].properties);
            setCoordinate(e.lngLat);
        }
    };

    const mouseEnter = () => {
        mapRef.current.getMap().getCanvas().style.cursor = 'pointer';
    };

    return (
        <>
            <StyleBackground>
                <Map
                    viewportCurrent={viewport}
                    deductedWidth={380}
                    onClick={onClick}
                    onMouseEnter={mouseEnter}
                    interactiveLayerIds={[roundedLayer.id]}
                    ref={mapRef}
                >
                    <>
                        <GeolocateControl
                            positionOptions={{ enableHighAccuracy: true }}
                            trackUserLocation={true}
                            style={{ left: '10px', top: '10px' }}
                        />
                        <Source id="overview-device" type={'geojson'} data={overviewDeviceData}>
                            <Layer type={'circle'} {...roundedLayer} />
                        </Source>
                        {showPopup && coordinate && (
                            <Popup
                                closeOnClick={false}
                                closeButton={false}
                                longitude={coordinate[0]}
                                latitude={coordinate[1]}
                            >
                                {description && (
                                    <StyledPopup>
                                        <h3>{description.name}</h3>
                                        <span>{description.count} thiết bị</span>
                                    </StyledPopup>
                                )}
                            </Popup>
                        )}
                    </>
                </Map>
                <ViewInformation />
            </StyleBackground>
        </>
    );
}

export default CommandCenterPage;
