import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Form, Input, message, Row } from 'antd';
import styled from 'styled-components';

import { DataCodeErrorActiveDevice, DataErrorCreateConstruction } from '@/assets/data/DataErrorCallApi';
import ButtonNextAndPer from '@/component/button/BtnNextAndPer';
import FromAddAccount from '@/component/form/Account/FormAddAccount';
import FormAddConstruction from '@/component/form/Construction/FormAddConstruction';
import { useDataCreateDeviceStore } from '@/component/hook/useDataCreateDevice';
import ShowConvertTypeToText from '@/component/ShowConvertTypeToText';
import { DataCreateDeviceModel } from '@/context/store/DataCreateDeviceSlice';
import { useActivationDevice } from '@/fetcher/Device/DeviceService';
import { CreateDeviceModel } from '@/model/Device/ActiveGatewayModel';
import { StyleForm, StyleItemForm } from '@/styles/form';
import { font } from '@/styles/Style-mixins';
import { TYPE_PERSONAL } from '@/util/ConstantApp/TypeConstant';
import { EQUIPMENT_MANAGEMENT_URL } from '@/util/ConstantApp/Url';
import { showMessage } from '@/util/Util';

import { setMessageRedirectUri } from '../../../../util/Util';

interface StyleProps {
    existsdecs: string;
}
const StyleBackground = styled.div`
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Title = styled.h2`
    margin: 20px 0 40px;
    ${font(22, '#000000', 600)}
`;
const DetailTitleForm = styled.h2<StyleProps>`
    margin: 30px 0 ${(props) => (props.existsdecs === 'true' ? '0' : '40px')};
    ${font(18, '#0A7BFF', 600)}
`;

const dataTextConstant = {
    title: 'KIỂM TRA THÔNG TIN TRƯỚC KHI KÍCH HOẠT',
    titleDetailConstruction: 'Thông tin công trình',
    titleDetailAccount: 'Thông tin tài khoản khách hàng',
    titleDetailGateway: 'Thông tin thiết bị',
    labelSerial: 'Imei',
    labelNameGateway: 'tên thiết bị',
};

function InformationDevice({
    imei,
    setCurrentStep,
    idDevice,
}: {
    imei: number;
    setCurrentStep: (value: any) => void;
    idDevice: string;
}) {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const [responseActivation, makeRequestActivation] = useActivationDevice(idDevice);
    const [disabledForm, setDisabledForm] = useState(false);
    const { dataCreateDeviceStore, setDataCreateDeviceStore } = useDataCreateDeviceStore();
    const [typeRadio, setTypeRadio] = useState(TYPE_PERSONAL);
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
        if (responseActivation.data) {
            navigate(EQUIPMENT_MANAGEMENT_URL, {
                state: setMessageRedirectUri('success', 'Kích hoạt thiết bị thành công!'),
            });
        } else if (responseActivation.error) {
            const codeError = responseActivation.error.code;
            messageApi.open(showMessage('error', DataErrorCreateConstruction[codeError]));
        }
    }, [responseActivation]);

    useEffect(() => {
        setDisabledForm(true);
        const accountCustomerModel = dataCreateDeviceStore.accountCustomerModel;
        const gatewayModel = dataCreateDeviceStore.gatewayModel;
        if (accountCustomerModel) {
            setTypeRadio(accountCustomerModel.type);
        }
        if (gatewayModel) {
            form.setFieldsValue({
                imei: imei,
                nameGateway: gatewayModel.name,
            });
        }
    }, [dataCreateDeviceStore]);

    const onFinish = () => {
        const param: CreateDeviceModel = {
            constructionModel: {
                ...dataCreateDeviceStore.constructionModel,
                accountCustomerModel: {
                    id: dataCreateDeviceStore.accountCustomerModel.id,
                    fullName: dataCreateDeviceStore.accountCustomerModel.fullName,
                    idCard: dataCreateDeviceStore.accountCustomerModel.idCard,
                    username: dataCreateDeviceStore.accountCustomerModel.username,
                    email: dataCreateDeviceStore.accountCustomerModel.email,
                    address: dataCreateDeviceStore.accountCustomerModel.address,
                    type: dataCreateDeviceStore.accountCustomerModel.type,
                    accountCustomerTypeModel: {
                        position: dataCreateDeviceStore.accountCustomerModel.position,
                        companyName: dataCreateDeviceStore.accountCustomerModel.companyName,
                        taxCode: dataCreateDeviceStore.accountCustomerModel.taxCode,
                        representative: dataCreateDeviceStore.accountCustomerModel.representative,
                        businessField: dataCreateDeviceStore.accountCustomerModel.businessField,
                        mainAddress: dataCreateDeviceStore.accountCustomerModel.mainAddress,
                    },
                },
            },
            gatewayModel: dataCreateDeviceStore.gatewayModel,
        };
        makeRequestActivation(undefined, DataCodeErrorActiveDevice, param);
    };
    const handleOnClickBtnPre = () => {
        const data: DataCreateDeviceModel = {
            ...dataCreateDeviceStore,
            step: 2,
        };
        changeStep(2, data);
    };
    return (
        <StyleBackground>
            {contextHolder}
            <Title>{dataTextConstant.title}</Title>
            <Row style={{ justifyContent: 'space-around', width: '100%' }}>
                <Col md={10} xl={8}>
                    <div>
                        <StyleForm form={form} labelWrap={true} labelAlign="left" labelCol={{ span: 8 }} size={'large'}>
                            <DetailTitleForm existsdecs="false">{dataTextConstant.titleDetailGateway}</DetailTitleForm>
                            <StyleItemForm
                                isrequired={'true'}
                                name="imei"
                                label={dataTextConstant.labelSerial}
                                rules={[{ required: true }]}
                            >
                                <Input disabled={disabledForm} />
                            </StyleItemForm>
                            <StyleItemForm
                                isrequired={'true'}
                                name="nameGateway"
                                label={dataTextConstant.labelNameGateway}
                            >
                                <Input disabled={disabledForm} />
                            </StyleItemForm>
                        </StyleForm>
                    </div>
                    <div>
                        <DetailTitleForm existsdecs="true">{dataTextConstant.titleDetailAccount}</DetailTitleForm>
                        <div style={{ marginTop: 10 }}>
                            <ShowConvertTypeToText color={'#0A7BFF'} typeRadio={typeRadio} isUpperCase={false} />
                        </div>
                        <FromAddAccount
                            detailCustomer={dataCreateDeviceStore.accountCustomerModel}
                            disabledForm={true}
                            setTypeRadioCurrent={setTypeRadio}
                        />
                    </div>
                </Col>
                <Col md={12} xl={10} xxl={8}>
                    <DetailTitleForm existsdecs="false">{dataTextConstant.titleDetailConstruction}</DetailTitleForm>
                    <FormAddConstruction
                        hiddenSelect={true}
                        disabledDistrictCurrent={true}
                        detailConstructor={dataCreateDeviceStore.constructionModel}
                        disabledForm={disabledForm}
                    />
                </Col>
            </Row>
            <ButtonNextAndPer
                step={3}
                totalStep={4}
                onClickBtnPre={handleOnClickBtnPre}
                htmlTypeNext={'submit'}
                onClickBtnNext={onFinish}
            />
        </StyleBackground>
    );
}

export default InformationDevice;
