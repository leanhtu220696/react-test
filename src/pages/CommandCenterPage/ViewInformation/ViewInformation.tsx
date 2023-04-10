import styled from 'styled-components';

import { font } from '@/styles/Style-mixins';

import DeviceInformation from './DeviceInformation';
import ShowTotalConstructionAndFireAndDepartment from './ShowTotalConstructionAndFireAndDepartment';
import TotalDevicesByProvince from './TotalDevicesByProvince';
const StyleBackground = styled.div`
    width: 350px;
    margin: 0 5px;
    padding: 10px 0;
    background-color: #ffffff;
    height: 100%;
    @media (max-width: 576px) {
        width: 100%;
        margin: 0;
        padding: 0;
        height: 50%;
    }

    & > div {
        height: 91vh;
        padding: 20px 20px;
        overflow-y: scroll;
        overflow-x: hidden;
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: column;
        @media (max-width: 576px) {
            height: 50vh;
        }
    }
`;
const StyleTitle = styled.h1`
    text-align: center;
    ${font(35, '#EC1B25', 700)}
`;
const dataTextConstant = {
    title: 'Việt Nam',
    desSerial: 'Imei',
    desTypeOfDevice: 'Loại thiết bị',
};
function ViewInformation() {
    return (
        <StyleBackground>
            <div>
                <StyleTitle>{dataTextConstant.title}</StyleTitle>
                <DeviceInformation />
                <TotalDevicesByProvince />
                <ShowTotalConstructionAndFireAndDepartment />
            </div>
        </StyleBackground>
    );
}
export default ViewInformation;
