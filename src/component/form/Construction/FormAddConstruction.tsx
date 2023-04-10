import React, { useEffect, useState } from 'react';
import { Col, Form, Input, Row, Select, Tooltip } from 'antd';

import { dataSelectBusinessSector, dataSelectTypeConstructor } from '@/assets/data/DataConstant';
import ControlPhoneNumber from '@/component/form/Construction/ControlPhoneNumber/ControlPhoneNumber';
import { useGetListDistrict, useGetListProvince } from '@/fetcher/Service';
import { DetailConstructionModel } from '@/model/Construction/ConstructionModel';
import { DetailCustomerModel } from '@/model/Customer/CustomerModel';
import { DistrictModel, ProvinceModel } from '@/model/ProvinceModel';
import { placeholderFiled, StyleForm, StyleItemForm } from '@/styles/form';

import { useCoordinatesStore } from '../../hook/useCoordinatesStore';

const dataTextConstant = {
    messageErrorRequiredAlertReceiver: 'Vui lòng chọn số điện thoại nhận cảnh báo',
    labelName: 'tên công trình',
    labelType: 'kiểu công trình',
    labelBusinessSector: 'loại hình kinh doanh',
    labelIdDistrict: 'Quận/Huyện',
    labelIdProvince: 'Tỉnh thành',
    labelFullAddress: 'địa chỉ',
    labelLongitude: 'kinh độ',
    labelLatitude: 'vĩ độ',
};
const validateMessages = {
    required: 'Vui lòng nhập ${label}',
};
interface Props {
    hiddenSelect: boolean;
    onFinish?: (value: unknown) => void;
    children?: React.ReactNode;
    detailConstructor: DetailConstructionModel | any;
    idProvinceCurrent?: number;
    disabledForm: boolean;
    messageAlertReceiver?: string;
    disabledDistrictCurrent?: boolean;
    setListAddAlertReceiverNew?: (value: any) => void;
    layoutForm?: TypeLayout;
}
type TypeLayout = 'vertical' | 'horizontal';
function FormAddConstruction({
    hiddenSelect,
    onFinish,
    children,
    detailConstructor,
    idProvinceCurrent,
    disabledForm,
    messageAlertReceiver,
    disabledDistrictCurrent,
    setListAddAlertReceiverNew,
    layoutForm,
}: Props) {
    const { coordinatesStore, setCoordinatesStore } = useCoordinatesStore();
    const [responseListProvince, makeRequestListProvince] = useGetListProvince();
    const [idProvince, setIdProvince] = useState(-1);
    const [responseListDistrict, makeRequestListDistrict] = useGetListDistrict(idProvince);
    const [disabledDistrict, setDisabledDistrict] = useState(true);
    const [isLoadingDistrict, setIsLoadingDistrict] = useState(false);
    const [listProvince, setListProvince] = useState<ProvinceModel[]>([]);
    const [listDistrict, setListDistrict] = useState<DistrictModel[]>([]);
    const [textTooltipFullAddress, setTextTooltipFullAddress] = useState('');
    const [span, setSpan] = useState(24);
    const [listAddAlertReceiver, setListAddAlertReceiver] = useState<DetailCustomerModel[]>([]);
    const [form] = Form.useForm();
    const setValueForm = (detailConstructor: DetailConstructionModel) => {
        form.setFieldsValue({
            ...detailConstructor,
            longitude: detailConstructor.longitude === 0 ? undefined : detailConstructor.longitude,
            latitude: detailConstructor.longitude === 0 ? undefined : detailConstructor.latitude,
        });
        if (detailConstructor.fullAddress) {
            setTextTooltipFullAddress(detailConstructor.fullAddress);
        } else {
            setTextTooltipFullAddress('');
        }
        setIdProvince(detailConstructor.provinceId);
        setListAddAlertReceiver(detailConstructor.alertReceiverList);
        setCoordinatesStore({
            latitude: +detailConstructor.latitude,
            longitude: +detailConstructor.longitude,
        });
    };
    useEffect(() => {
        const spanNew = layoutForm === 'vertical' || !layoutForm ? 24 : 10;
        setSpan(spanNew);
    }, [layoutForm]);
    useEffect(() => {
        makeRequestListProvince();
    }, []);
    useEffect(() => {
        if (listAddAlertReceiver) {
            if (typeof setListAddAlertReceiverNew === 'function') {
                setListAddAlertReceiverNew(listAddAlertReceiver);
            }
        }
    }, [listAddAlertReceiver]);
    useEffect(() => {
        if (detailConstructor) {
            setValueForm(detailConstructor);
        }
    }, [detailConstructor]);
    useEffect(() => {
        if (idProvinceCurrent) {
            setIdProvince(idProvinceCurrent);
        }
    }, [idProvinceCurrent]);
    useEffect(() => {
        setDisabledDistrict(disabledDistrictCurrent);
    }, [disabledDistrictCurrent]);
    useEffect(() => {
        if (idProvince !== -1 && idProvince) {
            makeRequestListDistrict();
        }
    }, [idProvince]);
    useEffect(() => {
        if (responseListProvince.data) {
            setListProvince(responseListProvince.data);
        }
    }, [responseListProvince]);
    useEffect(() => {
        if (responseListDistrict.data) {
            setIsLoadingDistrict(false);
            setListDistrict(responseListDistrict.data);
        }
    }, [responseListDistrict]);

    useEffect(() => {
        form.setFieldsValue({
            latitude: coordinatesStore.latitude == 0 ? '' : coordinatesStore.latitude,
            longitude: coordinatesStore.longitude == 0 ? '' : coordinatesStore.longitude,
        });
    }, [coordinatesStore]);

    const handleOnChangeSelectProvince = (value: any) => {
        setDisabledDistrict(false);
        setIsLoadingDistrict(true);
        form.setFieldsValue({ districtId: undefined });
        setIdProvince(value);
    };
    const handelOnFinish = (_value: any) => {
        if (typeof onFinish === 'function') {
            onFinish(_value);
        }
    };

    return (
        <>
            <StyleForm
                form={form}
                labelWrap={true}
                labelAlign="left"
                labelCol={{ span: 8 }}
                size={'large'}
                onFinish={handelOnFinish}
                validateMessages={validateMessages}
            >
                <Row style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Col xl={span}>
                        <StyleItemForm hidden={true} name="id">
                            <Input />
                        </StyleItemForm>
                        <StyleItemForm
                            isrequired={'true'}
                            name="name"
                            label={dataTextConstant.labelName}
                            rules={[{ required: true }]}
                        >
                            <Input
                                disabled={disabledForm}
                                placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelName}`}
                            />
                        </StyleItemForm>
                        <StyleItemForm name="type" label={dataTextConstant.labelType}>
                            <Select
                                allowClear
                                disabled={disabledForm}
                                placeholder={`${placeholderFiled.placeholderSelect}${dataTextConstant.labelType}`}
                                options={dataSelectTypeConstructor.map((item) => ({
                                    label: item.label,
                                    value: item.value,
                                }))}
                            />
                        </StyleItemForm>
                        <StyleItemForm name="businessSector" label={dataTextConstant.labelBusinessSector}>
                            <Select
                                allowClear
                                disabled={disabledForm}
                                placeholder={`${placeholderFiled.placeholderSelect}${dataTextConstant.labelBusinessSector}`}
                                options={dataSelectBusinessSector.map((item) => ({
                                    label: item.label,
                                    value: item.value,
                                }))}
                            />
                        </StyleItemForm>
                        <ControlPhoneNumber
                            hiddenSelect={hiddenSelect}
                            isPopup={true}
                            listAddAlertReceiver={listAddAlertReceiver}
                            disabledForm={disabledForm}
                            messageError={messageAlertReceiver}
                            setListAddAlertReceiver={setListAddAlertReceiver}
                        />
                    </Col>
                    <Col xl={span} style={{ width: `${span === 10 ? 'auto' : '96%'}` }}>
                        <StyleItemForm
                            isrequired={'true'}
                            name="provinceId"
                            label={dataTextConstant.labelIdProvince}
                            rules={[{ required: true }]}
                        >
                            <Select
                                disabled={disabledForm}
                                showSearch
                                placeholder={`${placeholderFiled.placeholderSelect}${dataTextConstant.labelIdProvince}`}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                onChange={handleOnChangeSelectProvince}
                                options={listProvince.map((item) => {
                                    return {
                                        value: item.id,
                                        label: item.name,
                                    };
                                })}
                            />
                        </StyleItemForm>
                        <StyleItemForm
                            isrequired={'true'}
                            name="districtId"
                            label={dataTextConstant.labelIdDistrict}
                            rules={[{ required: true }]}
                        >
                            <Select
                                loading={isLoadingDistrict}
                                disabled={disabledDistrict || isLoadingDistrict}
                                showSearch
                                placeholder={`${placeholderFiled.placeholderSelect}${dataTextConstant.labelIdDistrict}`}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={listDistrict.map((item) => {
                                    return {
                                        value: item.id,
                                        label: item.name,
                                    };
                                })}
                            />
                        </StyleItemForm>
                        <Tooltip color="#108ee9" placement="top" title={`${textTooltipFullAddress}`}>
                            <StyleItemForm
                                isrequired={'true'}
                                name="fullAddress"
                                label={dataTextConstant.labelFullAddress}
                                rules={[{ required: true }]}
                            >
                                <Input
                                    disabled={disabledForm}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        if (event.target.value !== undefined) {
                                            setTextTooltipFullAddress(event.target.value);
                                        }
                                    }}
                                    maxLength={140}
                                    placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelFullAddress}`}
                                />
                            </StyleItemForm>
                        </Tooltip>
                        <StyleItemForm
                            isrequired={'true'}
                            name="longitude"
                            label={dataTextConstant.labelLongitude}
                            rules={[{ required: true }]}
                        >
                            <Input
                                type="number"
                                disabled={true}
                                placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelLongitude}`}
                            />
                        </StyleItemForm>
                        <StyleItemForm
                            isrequired={'true'}
                            name="latitude"
                            label={dataTextConstant.labelLatitude}
                            rules={[{ required: true }]}
                        >
                            <Input
                                type="number"
                                disabled={true}
                                placeholder={`${placeholderFiled.placeholderSelect}${dataTextConstant.labelLatitude}`}
                            />
                        </StyleItemForm>
                    </Col>
                </Row>
                <>{children}</>
            </StyleForm>
        </>
    );
}

export default FormAddConstruction;
