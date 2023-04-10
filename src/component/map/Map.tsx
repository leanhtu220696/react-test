import { forwardRef, Ref, useEffect, useState } from 'react';
import ReactMapGL, { MapEvent, NavigationControl } from '@goongmaps/goong-map-react';
import PropTypes from 'prop-types';

import { MAPTILES_KEY } from '../../util/ConstantApp/KeyMap';

import ViewMapWhenPopup from './ViewMapWhenPopup';

interface Props {
    children: React.ReactNode;
    deductedWidth: number;
    onClick?: (evt: MapEvent) => void;
    interactiveLayerIds?: string[];
    onMouseEnter?: (evt: MapEvent) => void;
    viewportCurrent?: any;
}
const Map = forwardRef(
    (
        { children, deductedWidth, onClick, interactiveLayerIds, onMouseEnter, viewportCurrent }: Props,
        ref: Ref<any>,
    ) => {
        const [viewport, setViewPort] = useState({
            width: 400,
            height: 400,
            latitude: 21.026975,
            longitude: 105.85346,
            zoom: 13,
        });
        useEffect(() => {
            if (viewportCurrent) {
                setViewPort((state) => {
                    return {
                        ...state,
                        ...viewportCurrent,
                    };
                });
            }
        }, [viewportCurrent]);

        return (
            <>
                <ViewMapWhenPopup deductedWidth={deductedWidth}>
                    <ReactMapGL
                        {...viewport}
                        width="100%"
                        height="100%"
                        onClick={(evt: MapEvent) => {
                            if (typeof onClick === 'function') {
                                onClick(evt);
                            }
                        }}
                        onMouseEnter={(evt: MapEvent) => {
                            if (typeof onMouseEnter === 'function') {
                                onMouseEnter(evt);
                            }
                        }}
                        onViewportChange={(nextViewport: any) => {
                            setViewPort(nextViewport);
                        }}
                        goongApiAccessToken={MAPTILES_KEY}
                        ref={ref}
                        interactiveLayerIds={interactiveLayerIds}
                    >
                        <NavigationControl showZoom showCompass style={{ right: '10px', bottom: '30px' }} />
                        {children}
                    </ReactMapGL>
                </ViewMapWhenPopup>
            </>
        );
    },
);
Map.propTypes = {
    children: PropTypes.element,
    deductedWidth: PropTypes.number,
    onClick: PropTypes.func,
    interactiveLayerIds: PropTypes.array,
    onMouseEnter: PropTypes.func,
    viewportCurrent: PropTypes.any,
};
Map.displayName = 'Map';
export default Map;
