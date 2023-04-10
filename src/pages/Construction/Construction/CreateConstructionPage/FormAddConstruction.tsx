import { useEffect, useState } from 'react';
import { Steps } from 'antd';
import styled from 'styled-components';

import { dataStepAddConstruction } from '@/assets/data/DataConstant';
import { useCoordinatesStore } from '@/component/hook/useCoordinatesStore';
import { useDataCreateDeviceStore } from '@/component/hook/useDataCreateDevice';
import SelectAccount from '@/component/select/SelectAccount';
import { flex, font } from '@/styles/Style-mixins';

import FormInformationConstruction from './step1/FormCreateConstruction';
import FromCreateAccount from './step2/FormCreateAccount';

const dataTextConstant = {
    title: 'THÊM MỚI CÔNG TRÌNH',
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
        width: 115px;
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

const StyleInformation = styled.div`
    margin-bottom: 20px;
`;

const StyleAddConstruction = styled.div`
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

function FormAddConstruction() {
    const [currentStep, setCurrentStep] = useState(0);
    const { dataCreateDeviceStore } = useDataCreateDeviceStore();
    const { setCoordinatesStore } = useCoordinatesStore();

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
                <StyleAddConstruction>
                    <StyleInformation>
                        <Title>{dataTextConstant.title}</Title>
                    </StyleInformation>
                    <Steps
                        size="small"
                        style={{ width: 300 }}
                        labelPlacement="vertical"
                        current={currentStep}
                        items={dataStepAddConstruction}
                    />
                    {currentStep === 1 && <SelectAccount />}
                </StyleAddConstruction>
                {currentStep === 0 && <FormInformationConstruction setCurrentStep={setCurrentStep} />}
                {currentStep === 1 && <FromCreateAccount setCurrentStep={setCurrentStep} />}
            </div>
        </StyleBackground>
    );
}

export default FormAddConstruction;
