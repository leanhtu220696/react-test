import React, { useEffect, useState } from 'react';
import { Form, Input, Tooltip } from 'antd';
import styled from 'styled-components';

import ButtonNextAndPer from '@/component/button/BtnNextAndPer';
import { useDataCreateDeviceStore } from '@/component/hook/useDataCreateDevice';
import { DataCreateDeviceModel } from '@/context/store/DataCreateDeviceSlice';
import { placeholderFiled, StyleForm, StyleItemForm } from '@/styles/form';
import { font } from '@/styles/Style-mixins';

const dataTextConstant = {
    title: 'ĐIỀN THÔNG TIN KÍCH HOẠT THIẾT BỊ',
    labelGatewayModel: 'tên thiết bị',
    labelFullName: 'công trình',
    labelUsername: 'tài khoản',
    messageGatewayModel: 'Vui lòng tên thiết bị',
};
const StyleBackground = styled.div`
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Title = styled.h2`
    margin: 5px 0 40px;
    ${font(16, '#000000', 600)}
`;

function FormActivatedGateway({ setCurrentStep }: { setCurrentStep: (string: any) => void }) {
    const [disabledForm] = useState(true);
    const { dataCreateDeviceStore, setDataCreateDeviceStore } = useDataCreateDeviceStore();
    const [titleTooltipUsername, setTitleTooltipUsername] = useState('');
    const changeStep = (step: number, data: DataCreateDeviceModel) => {
        const changeDataLocal = (callBack: () => void) => {
            setDataCreateDeviceStore(data);
            callBack();
        };
        changeDataLocal(() => {
            setCurrentStep(step);
        });
    };

    useEffect(() => {
        if (dataCreateDeviceStore) {
            const construction = dataCreateDeviceStore.constructionModel;
            const account = dataCreateDeviceStore.accountCustomerModel;
            const gateway = dataCreateDeviceStore.gatewayModel;
            form.setFieldsValue({
                fullName: construction.name,
                username: `${account.username} - ${account.fullName}`,
            });
            setTitleTooltipUsername(`${account.username} - ${account.fullName}`);
            if (gateway) {
                form.setFieldsValue({
                    gatewayModel: gateway.name,
                });
            }
        }
    }, [dataCreateDeviceStore]);

    const onFinish = (values: any) => {
        const data: DataCreateDeviceModel = {
            ...dataCreateDeviceStore,
            gatewayModel: {
                name: values.gatewayModel,
            },
            step: 3,
        };
        changeStep(3, data);
    };

    const [form] = Form.useForm();
    const handleOnClickBtnPre = () => {
        const data: DataCreateDeviceModel = {
            ...dataCreateDeviceStore,
            step: 1,
        };
        changeStep(1, data);
    };
    return (
        <StyleBackground>
            <Title>{dataTextConstant.title}</Title>
            <StyleForm
                onFinish={onFinish}
                form={form}
                labelWrap={true}
                labelAlign="left"
                labelCol={{ span: 8 }}
                size={'large'}
            >
                <StyleItemForm
                    isrequired={'true'}
                    name="gatewayModel"
                    label={dataTextConstant.labelGatewayModel}
                    rules={[{ required: true, message: `${dataTextConstant.messageGatewayModel}` }]}
                >
                    <Input placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelGatewayModel}`} />
                </StyleItemForm>
                <StyleItemForm name="fullName" label={dataTextConstant.labelFullName}>
                    <Input disabled={disabledForm} />
                </StyleItemForm>
                <Tooltip color="#108ee9" placement="top" title={titleTooltipUsername}>
                    <StyleItemForm name="username" label={dataTextConstant.labelUsername}>
                        <Input disabled={disabledForm} />
                    </StyleItemForm>
                </Tooltip>
                <ButtonNextAndPer step={2} onClickBtnPre={handleOnClickBtnPre} totalStep={4} htmlTypeNext={'submit'} />
            </StyleForm>
        </StyleBackground>
    );
}

export default FormActivatedGateway;
