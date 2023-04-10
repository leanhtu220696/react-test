import { useEffect, useState } from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import styled from 'styled-components';

import { dataStatusDeviceTypeUnit } from '@/assets/data/DataConstant';
import { DetailConstructionModel } from '@/model/Construction/ConstructionModel';
import { DetailCustomerModel } from '@/model/Customer/CustomerModel';
import { StyleForm, StyleItemForm } from '@/styles/form';
import { font } from '@/styles/Style-mixins';
import { TYPE_PERSONAL } from '@/util/ConstantApp/TypeConstant';

import { DetailDeviceModel } from '../../../model/Device/DeviceModel';
import ShowConvertTypeToText from '../../ShowConvertTypeToText';
import FromAddAccount from '../Account/FormAddAccount';
import FormAddConstruction from '../Construction/FormAddConstruction';

interface Props {
    detailDevice: DetailDeviceModel;
    children: React.ReactNode;
    onChangeInputName: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface StyleProps {
    existsdecs: string;
}
const DetailTitleForm = styled.h2<StyleProps>`
    margin: 30px 0 ${(props) => (props.existsdecs === 'true' ? '0' : '40px')};
    ${font(18, '#0A7BFF', 600)}
`;

const valueTypeStatusDevice = Object.values(dataStatusDeviceTypeUnit);
const keyTypeStatusDevice = Object.keys(dataStatusDeviceTypeUnit);

const typeStatusDeviceOptions = valueTypeStatusDevice.map((v, i) => ({ value: keyTypeStatusDevice[i], label: v }));

const dataTextConstant = {
    title: 'THÔNG TIN THIẾT BỊ',
    titleDetailConstruction: 'Thông tin công trình',
    titleDetailAccount: 'Thông tin tài khoản khách hàng',
    titleDetailGateway: 'Thông tin thiết bị',
    labelSerial: 'Imei',
    labelNameGateway: 'tên thiết bị',
    labelModel: 'model',
    labelStatus: 'tình trạng',
    labelConnect4G: 'kết nối 4G',
    labelCabinet: 'kết nối tủ',
    labelEthernet: 'kết nối Ethernet',
    labelBroker: 'kết nối hệ thống',
    labelPowerStatus: 'kết nối nguồn',
    labelRemainingBattery: 'pin (%)',
    labelTemperature: 'nhiệt độ (°C)',
};

const validateMessages = {
    required: 'Vui lòng nhập ${label}',
};

function FormDeviceDetail({ detailDevice, children, onChangeInputName }: Props) {
    const [form] = Form.useForm();
    const [disabledForm] = useState(true);
    const [typeRadio, setTypeRadio] = useState(TYPE_PERSONAL);
    const [constructionDetail, setConstructionDetail] = useState<DetailConstructionModel>();
    const [customerDetail, setCustomerDetail] = useState<DetailCustomerModel>();
    const [panConstruction, setPanConstruction] = useState(20);
    const [panCustomer, setPanCustomer] = useState(20);
    const setValueForm = (deviceDetail: DetailDeviceModel) => {
        const returnTextWhenSetStatusConnect = (statusConnect: string | number) => {
            if (!statusConnect || statusConnect === 'OFFLINE') {
                return 'Không kết nối';
            } else {
                return 'Kết nối';
            }
        };
        form.setFieldsValue({
            ...deviceDetail,
            mobileNetwork: returnTextWhenSetStatusConnect(deviceDetail.mobileNetwork),
            rs485Status: returnTextWhenSetStatusConnect(deviceDetail.rs485Status),
            ethernetStatus: returnTextWhenSetStatusConnect(deviceDetail.ethernetStatus),
            connectionStatus: returnTextWhenSetStatusConnect(deviceDetail.connectionStatus),
            powerStatus: returnTextWhenSetStatusConnect(deviceDetail.powerStatus),
            model: deviceDetail.model?.name,
        });
    };

    useEffect(() => {
        if (detailDevice) {
            const constructionDetailNew: DetailConstructionModel = {
                ...detailDevice?.construction,
                provinceId: detailDevice?.construction?.province?.id,
                districtId: detailDevice?.construction?.district?.id,
            };
            setConstructionDetail(constructionDetailNew);
            setCustomerDetail(detailDevice?.construction?.accountCustomerViewable);
            setValueForm(detailDevice);
        }
    }, [detailDevice]);

    useEffect(() => {
        if (!constructionDetail) {
            setPanConstruction(0);
        } else {
            setPanConstruction(20);
        }
    }, [constructionDetail]);

    useEffect(() => {
        if (!customerDetail) {
            setPanCustomer(0);
        } else {
            setPanCustomer(20);
        }
    }, [customerDetail]);

    return (
        <Row style={{ justifyContent: 'space-around', width: '100%' }}>
            <Col md={20}>
                <DetailTitleForm existsdecs="false">{dataTextConstant.titleDetailGateway}</DetailTitleForm>
                <StyleForm
                    form={form}
                    labelWrap={true}
                    labelAlign="left"
                    labelCol={{ span: 8 }}
                    size={'large'}
                    validateMessages={validateMessages}
                >
                    <Row style={{ width: '100%', justifyContent: 'space-between' }}>
                        <Col md={10}>
                            <StyleItemForm
                                isrequired={'true'}
                                name="imei"
                                label={dataTextConstant.labelSerial}
                                rules={[{ required: true }]}
                            >
                                <Input disabled={disabledForm} />
                            </StyleItemForm>
                        </Col>
                        <Col md={10}>
                            <StyleItemForm name="mobileNetwork" label={dataTextConstant.labelConnect4G}>
                                <Input disabled={disabledForm} />
                            </StyleItemForm>
                        </Col>
                        <Col md={10}>
                            <StyleItemForm
                                isrequired={'true'}
                                name="name"
                                label={dataTextConstant.labelNameGateway}
                                rules={[{ required: true }]}
                            >
                                <Input onChange={onChangeInputName} />
                            </StyleItemForm>
                        </Col>
                        <Col md={10}>
                            <StyleItemForm name="rs485Status" label={dataTextConstant.labelCabinet}>
                                <Input disabled={disabledForm} />
                            </StyleItemForm>
                        </Col>
                        <Col md={10}>
                            <StyleItemForm name="model" label={dataTextConstant.labelModel}>
                                <Input disabled={disabledForm} />
                            </StyleItemForm>
                        </Col>
                        <Col md={10}>
                            <StyleItemForm name="powerStatus" label={dataTextConstant.labelPowerStatus}>
                                <Input disabled={disabledForm} />
                            </StyleItemForm>
                        </Col>
                        <Col md={10}>
                            <StyleItemForm name="deviceStatus" label={dataTextConstant.labelStatus}>
                                <Select
                                    disabled={true}
                                    allowClear
                                    optionFilterProp="children"
                                    options={typeStatusDeviceOptions}
                                />
                            </StyleItemForm>
                        </Col>
                        <Col md={10}>
                            <StyleItemForm name="ethernetStatus" label={dataTextConstant.labelEthernet}>
                                <Input disabled={disabledForm} />
                            </StyleItemForm>
                        </Col>
                        <Col md={10}>
                            <StyleItemForm name="remainingBattery" label={dataTextConstant.labelRemainingBattery}>
                                <Input disabled={disabledForm} />
                            </StyleItemForm>
                        </Col>
                        <Col md={10}>
                            <StyleItemForm name="connectionStatus" label={dataTextConstant.labelBroker}>
                                <Input disabled={disabledForm} />
                            </StyleItemForm>
                        </Col>
                        <Col md={10}>
                            <StyleItemForm name="temperature" label={dataTextConstant.labelTemperature}>
                                <Input disabled={disabledForm} />
                            </StyleItemForm>
                        </Col>
                    </Row>
                </StyleForm>
            </Col>
            <Col md={panConstruction}>
                <DetailTitleForm existsdecs="false">{dataTextConstant.titleDetailConstruction}</DetailTitleForm>
                <FormAddConstruction
                    layoutForm="horizontal"
                    hiddenSelect={disabledForm}
                    disabledDistrictCurrent={disabledForm}
                    detailConstructor={constructionDetail}
                    disabledForm={disabledForm}
                />
            </Col>
            <Col md={panCustomer}>
                <DetailTitleForm existsdecs="true">{dataTextConstant.titleDetailAccount}</DetailTitleForm>
                <div style={{ marginTop: 10 }}>
                    <ShowConvertTypeToText color={'#0A7BFF'} typeRadio={typeRadio} isUpperCase={false} />
                </div>
                <FromAddAccount
                    layoutForm="horizontal"
                    detailCustomer={customerDetail}
                    disabledForm={disabledForm}
                    setTypeRadioCurrent={setTypeRadio}
                />
            </Col>
            <Col md={12} style={{ justifyContent: 'center' }}>
                <div>{children}</div>
            </Col>
        </Row>
    );
}

export default FormDeviceDetail;
