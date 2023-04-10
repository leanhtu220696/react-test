import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Steps } from 'antd';
import styled from 'styled-components';

import { dataStepCreateBuilding } from '@/assets/data/DataConstant';
import { useCoordinatesStore } from '@/component/hook/useCoordinatesStore';
import { useDataCreateDeviceStore } from '@/component/hook/useDataCreateDevice';
import { flex, font } from '@/styles/Style-mixins';
import { EQUIPMENT_MANAGEMENT_URL } from '@/util/ConstantApp/Url';

import SelectAccount from '../../../component/select/SelectAccount';
import SelectConstruction from '../../../component/select/SelectConstruction';

import FormInformationConstruction from './step1/FormInformationConstruction';
import FromCreateAccount from './step2/FormCreateAccount';
import FormActivatedGateway from './step3/formActivatedGateway';
import InformationDevice from './step4/InformationDevice';

const dataTextConstant = {
    title: 'KÍCH HOẠT THIẾT BỊ',
    desSerial: 'Imei',
    desTypeOfDevice: 'Loại thiết bị',
};
interface StyleProps {
    step: string;
}
const StyleBackground = styled.div<StyleProps>`
    width: ${(props) => (props.step !== '3' ? '460px' : '100%')};
    margin: 0 20px;
    padding: 20px 0;
    background-color: #ffffff;
    box-shadow: 5px 0 5px #ccc;
    @media (max-width: 576px) {
        width: 100%;
        margin: 0;
        padding: 0;
    }

    & > div {
        min-height: 100vh;
        padding: 20px 20px;
        overflow: hidden;
        ::-webkit-scrollbar {
            width: 0;
        }
        @media (max-width: 576px) {
            height: 50vh;
        }
    }
    .ant-steps-item-title {
        flex-wrap: wrap;
        width: ${(props) => (props.step !== '3' ? '70px' : '100px')};
        ${(props) => (props.step !== '3' ? font(12, '#000', 500) : font(14, '#000', 500))};
    }
    @media (max-width: 576px) {
        .ant-steps {
            padding: 0 30px;
        }
    }
`;
const Title = styled.h2`
    ${font(20, '#000000', 600)}
`;
const DesGateway = styled.h4`
    text-align: center;
    ${font(14, '#000000', 400)}
`;

const StyleInformation = styled.div`
    margin-bottom: 20px;
`;

const StyleActiveGateway = styled.div`
    position: relative;
    ${flex('flex-start', 'center', 'column')}
    &::before {
        content: ' ';
        position: absolute;
        bottom: -15px;
        width: 100%;
        height: 2px;
        background-color: #ccc;
    }
`;

function EquipmentManagementPopup() {
    const location = useLocation();
    const navigate = useNavigate();
    const stateGateway = location.state;
    const [currentStep, setCurrentStep] = useState(0);
    const { dataCreateDeviceStore } = useDataCreateDeviceStore();
    const [imei, setSerial] = useState('');
    const [idDevice, setIdDevice] = useState();
    const { setCoordinatesStore } = useCoordinatesStore();
    useEffect(() => {
        if (stateGateway) {
            setSerial(stateGateway.imei);
            setIdDevice(stateGateway.id);
        } else {
            navigate(EQUIPMENT_MANAGEMENT_URL);
        }
    }, [stateGateway]);
    useEffect(() => {
        setCurrentStep(dataCreateDeviceStore.step);
    }, [dataCreateDeviceStore.step]);
    useEffect(() => {
        const construction = dataCreateDeviceStore.constructionModel;
        if (construction) {
            setCoordinatesStore({
                longitude: +construction.longitude,
                latitude: +construction.latitude,
            });
        }
    }, [dataCreateDeviceStore.constructionModel]);
    return (
        <StyleBackground step={`${currentStep}`}>
            <div>
                <StyleActiveGateway>
                    <StyleInformation>
                        <Title>{dataTextConstant.title}</Title>
                        <DesGateway>
                            {dataTextConstant.desSerial}: {imei}{' '}
                        </DesGateway>
                        <DesGateway>{dataTextConstant.desTypeOfDevice}: Thiết bị</DesGateway>
                    </StyleInformation>
                    <Steps
                        size="small"
                        style={{ width: `${currentStep === 3 ? '80%' : '420px'}` }}
                        labelPlacement="vertical"
                        current={currentStep}
                        items={dataStepCreateBuilding}
                    />
                    {currentStep === 0 && <SelectConstruction />}
                    {currentStep === 1 && <SelectAccount />}
                </StyleActiveGateway>
                {currentStep === 0 && <FormInformationConstruction setCurrentStep={setCurrentStep} />}
                {currentStep === 1 && <FromCreateAccount setCurrentStep={setCurrentStep} />}
                {currentStep === 2 && <FormActivatedGateway setCurrentStep={setCurrentStep} />}
                {currentStep === 3 && (
                    <InformationDevice imei={+imei} setCurrentStep={setCurrentStep} idDevice={idDevice} />
                )}
            </div>
        </StyleBackground>
    );
}

export default EquipmentManagementPopup;
