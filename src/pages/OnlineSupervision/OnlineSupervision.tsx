import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { EnvironmentFilled } from '@ant-design/icons';
import ReactMapGL, { GeolocateControl, Layer, MapEvent, Marker, Popup, Source } from '@goongmaps/goong-map-react';
import polyline from '@mapbox/polyline';
import styled from 'styled-components';

import construction from '@/assets/image/construction.png';
import fireHappening from '@/assets/image/fire.png';
import fireDepartment from '@/assets/image/fireDepartment.png';
import waterIntake from '@/assets/image/waterIntake.png';
import soundEffect from '@/assets/sound/soundEffectTest.mp3';
import { useCollectionCoordinateEncodedStore } from '@/component/hook/useCollectionCoordinateEncodedStore';
import { useCoordinatesOriginStore } from '@/component/hook/useCoordinatesOriginStore';
import { useCoordinatesStore } from '@/component/hook/useCoordinatesStore';
import { useRunFirst } from '@/component/hook/UseRunFirst';
import {
    clusterConstructionLayer,
    clusterCountConstructionLayer,
    clusterCountFireDepartmentLayer,
    clusterCountWaterIntakeLayer,
    clusterFireDepartmentLayer,
    clusterWaterIntakeLayer,
    constructionLayer,
    drawLayer,
    fireDepartmentLayer,
    fireHappeningLayer,
    waterIntakeLayer,
} from '@/component/layer/Layers';
import { PopupContent } from '@/component/popup/PopupContent';
import { RootState } from '@/context/store';
import { geoJSONDetailsModel } from '@/model/Map/GeoJSONDetailsModel';
import { DisplayOptionsCheckbox } from '@/pages/OnlineSupervision/DisplayOptionsCheckbox';
import { useConstruction } from '@/pages/OnlineSupervision/hook/useConstructions';
import { useFireDepartmentList } from '@/pages/OnlineSupervision/hook/useFireDepartmentList';
import { useWaterIntakeList } from '@/pages/OnlineSupervision/hook/useWaterIntakeList';
import { calcHeight, flex } from '@/styles/Style-mixins';
import { MAPTILES_KEY } from '@/util/ConstantApp/KeyMap';

import ViewHappening from './ViewHappening';

const StyleBackground = styled.div`
    width: 100%;
    ${flex('center', 'center', 'row')};
    @media (max-width: 576px) {
        display: revert;
    }

    & > div:nth-child(2) {
        width: 100%;
        ${calcHeight()};
        @media (max-width: 576px) {
            height: 50vh;
            display: revert;
        }
    }
`;

function OnlineSupervisionPage() {
    const {
        constructionList,
        fireHappeningGeoList,
        listFireHappening,
        idFireHappening,
        setIdFireHappening,
        setStateDescWhenUpdateStatus,
        stateDescWhenUpdateStatus,
    } = useConstruction();
    const { waterIntakeList } = useWaterIntakeList();
    const { fireDepartmentList } = useFireDepartmentList();
    const [viewport, setViewPort] = useState({
        width: 400,
        height: 400,
        latitude: 21.026975,
        longitude: 105.85346,
        zoom: 13,
    });
    const { coordinatesOriginStore, setCoordinatesOriginStore } = useCoordinatesOriginStore();
    const mapRef = useRef(null);
    const [showPopup, setShowPopup] = useState(false);
    const [description, setDescription] = useState<geoJSONDetailsModel>();
    const [coordinates, setCoordinates] = useState([0, 0]);
    const { coordinatesStore, setCoordinatesStore } = useCoordinatesStore();
    const { runFirst } = useRunFirst();
    const { collectionCoordinateEncodedStore } = useCollectionCoordinateEncodedStore();
    const { displayedConstruction, displayedWaterIntake, displayedFireDepartment } = useSelector(
        (state: RootState) => state.supervision,
    );
    useEffect(() => {
        if (runFirst) return;
        if (coordinatesStore.longitude !== 0) {
            setViewPort({
                ...viewport,
                latitude: coordinatesStore.latitude,
                longitude: coordinatesStore.longitude,
                zoom: 18,
            });
        }
    }, [coordinatesStore]);
    useEffect(() => {
        const map = mapRef.current.getMap();
        map.loadImage(construction, (err: any, image: any) => {
            if (err) throw err;
            if (!map.hasImage('construction')) map.addImage('construction', image);
        });
        map.loadImage(waterIntake, (err: any, image: any) => {
            if (err) throw err;
            if (!map.hasImage('waterIntake')) map.addImage('waterIntake', image);
        });
        map.loadImage(fireDepartment, (err: any, image: any) => {
            if (err) throw err;
            if (!map.hasImage('fireDepartment')) map.addImage('fireDepartment', image);
        });
        map.loadImage(fireHappening, (err: any, image: any) => {
            if (err) throw err;
            if (!map.hasImage('fireHappening')) map.addImage('fireHappening', image);
        });
    }, [mapRef]);

    const onClick = (e: MapEvent) => {
        if (!e.features.length || e.features[0].id) {
            setShowPopup(false);
            if (stateDescWhenUpdateStatus.isOpenDetail) {
                setCoordinatesOriginStore({
                    longitude: e.lngLat[0],
                    latitude: e.lngLat[1],
                });
            }
            return;
        } else if (e.features[0].source === 'fireHappening') {
            const dataDetail = e.features[0].properties;
            if (dataDetail.status) {
                const detailFireHappening = listFireHappening.find((item) => item.id === dataDetail.id);
                if (detailFireHappening) {
                    setIdFireHappening(detailFireHappening.id);
                    setCoordinatesStore({
                        latitude: +detailFireHappening.latitude,
                        longitude: +detailFireHappening.longitude,
                    });
                }
            } else {
                setShowPopup(true);
                setDescription(e.features[0].properties);
                setCoordinates(e.lngLat);
            }
        } else {
            setShowPopup(true);
            setDescription(e.features[0].properties);
            setCoordinates(e.lngLat);
        }
    };
    const mouseEnter = () => {
        mapRef.current.getMap().getCanvas().style.cursor = 'pointer';
    };
    const interactiveLayer = [
        fireHappeningLayer.id,
        displayedConstruction ? constructionLayer.id : fireHappeningLayer.id,
        displayedWaterIntake ? waterIntakeLayer.id : fireHappeningLayer.id,
        displayedFireDepartment ? fireDepartmentLayer.id : fireHappeningLayer.id,
    ];
    const data: any = polyline.toGeoJSON(collectionCoordinateEncodedStore);
    return (
        <StyleBackground>
            <ViewHappening
                idFireHappening={idFireHappening}
                listFireHappening={listFireHappening}
                setStateDescWhenUpdateStatus={setStateDescWhenUpdateStatus}
                stateDescWhenUpdateStatus={stateDescWhenUpdateStatus}
            />
            <>
                <ReactMapGL
                    {...viewport}
                    width="100%"
                    height="100%"
                    onViewportChange={(nextViewport: any) => {
                        setViewPort(nextViewport);
                    }}
                    goongApiAccessToken={MAPTILES_KEY}
                    ref={mapRef}
                    interactiveLayerIds={...interactiveLayer}
                    onClick={onClick}
                    onMouseEnter={mouseEnter}
                >
                    <DisplayOptionsCheckbox />
                    <GeolocateControl
                        positionOptions={{ enableHighAccuracy: true }}
                        trackUserLocation={true}
                        style={{ right: '10px', top: '10px' }}
                    />
                    <Source id="route" type={'geojson'} data={data}>
                        <Layer type={'line'} {...drawLayer} />
                    </Source>
                    {displayedWaterIntake ? (
                        <Source id="waterIntake" type={'geojson'} data={waterIntakeList} cluster={true}>
                            <Layer type={'circle'} {...clusterWaterIntakeLayer} />
                            <Layer type={'symbol'} {...waterIntakeLayer} />
                            <Layer type={'symbol'} {...clusterCountWaterIntakeLayer} />
                        </Source>
                    ) : null}
                    {displayedFireDepartment ? (
                        <Source id="fireDepartment" type={'geojson'} data={fireDepartmentList} cluster={true}>
                            <Layer type={'circle'} {...clusterFireDepartmentLayer} />
                            <Layer type={'symbol'} {...fireDepartmentLayer} />
                            <Layer type={'symbol'} {...clusterCountFireDepartmentLayer} />
                        </Source>
                    ) : null}
                    {displayedConstruction ? (
                        <Source id="construction" type={'geojson'} data={constructionList} cluster={true}>
                            <Layer type={'symbol'} {...constructionLayer} />
                            <Layer type={'circle'} {...clusterConstructionLayer} />
                            <Layer type={'symbol'} {...clusterCountConstructionLayer} />
                        </Source>
                    ) : null}
                    <Source id="fireHappening" type={'geojson'} data={fireHappeningGeoList} cluster={false}>
                        <Layer type={'symbol'} {...fireHappeningLayer} />
                    </Source>
                    {listFireHappening.length !== 0 ? <audio src={soundEffect} autoPlay={true} loop={true} /> : null}
                    {showPopup && coordinates && (
                        <Popup longitude={coordinates[0]} latitude={coordinates[1]} closeButton={false}>
                            {description && <PopupContent desc={description} />}
                        </Popup>
                    )}
                    <Marker
                        latitude={coordinatesOriginStore.latitude}
                        longitude={coordinatesOriginStore.longitude}
                        offsetLeft={-10}
                        offsetTop={-20}
                    >
                        <EnvironmentFilled style={{ color: 'red', fontSize: '25px' }} />
                    </Marker>
                </ReactMapGL>
            </>
        </StyleBackground>
    );
}

export default OnlineSupervisionPage;
