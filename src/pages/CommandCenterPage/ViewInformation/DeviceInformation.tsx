import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useGetDeviceInformation } from '@/fetcher/Device/DeviceService';
import { DeviceInformationModel } from '@/model/Device/DeviceModel';
import { flex, font } from '@/styles/Style-mixins';

const dataTextConstant = {
    labelTotalDevice: 'Tổng thiết bị',
    labelDeviceOnline: 'Online',
    labelDeviceOffline: 'Offline',
};
const StyleBackground = styled.div`
    width: 100%;
    margin-top: 17px;
    ${flex('space-between', 'flex-start', 'row')}
    & > div {
        ${flex('center', 'center', 'column')}
        h3 {
            ${font(15, '#000', 600)}
        }
        h5 {
            ${font(25, '#EC1B25', 700)}
        }
    }
`;
function DeviceInformation() {
    const [responseDeviceInformation, makeRequestDeviceInformation] = useGetDeviceInformation();
    const [detailDeviceInformation, setDetailDeviceInformation] = useState<DeviceInformationModel>({
        totalGateway: 0,
        totalGatewayOnline: 0,
        totalGatewayOffline: 0,
    });
    useEffect(() => {
        makeRequestDeviceInformation();
    }, []);
    useEffect(() => {
        if (responseDeviceInformation.data) {
            setDetailDeviceInformation({
                totalGateway: responseDeviceInformation.data.totalGateway,
                totalGatewayOnline: responseDeviceInformation.data.totalGatewayOnline,
                totalGatewayOffline: responseDeviceInformation.data.totalGatewayOffline,
            });
        }
    }, [responseDeviceInformation]);
    return (
        <StyleBackground>
            <div>
                <h3>{dataTextConstant.labelTotalDevice}</h3>
                <h5>{detailDeviceInformation.totalGateway}</h5>
            </div>
            <div>
                <h3>{dataTextConstant.labelDeviceOnline}</h3>
                <h5>{detailDeviceInformation.totalGatewayOnline}</h5>
            </div>
            <div>
                <h3>{dataTextConstant.labelDeviceOffline}</h3>
                <h5>{detailDeviceInformation.totalGatewayOffline}</h5>
            </div>
        </StyleBackground>
    );
}
export default DeviceInformation;
