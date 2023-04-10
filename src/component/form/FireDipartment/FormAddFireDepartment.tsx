import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ConfigProvider, Empty, Form, Input, Select, Tooltip } from 'antd';

import { dataSelectTypeUnit } from '@/assets/data/DataConstant';
import { useGetListDistrict, useGetListProvince } from '@/fetcher/Service';
import { DetailFireDepartmentModel } from '@/model/FireDepartment/FireDepartmentModel';
import { DetailSoldierModel } from '@/model/FireDepartment/SoldierModel';
import { DistrictModel, ProvinceModel } from '@/model/ProvinceModel';
import { placeholderFiled, StyleForm, StyleItemForm } from '@/styles/form';
import { CREATE_FIRE_DEPARTMENT } from '@/util/ConstantApp/Url';

import { useCoordinatesStore } from '../../hook/useCoordinatesStore';
import { checkFormatPhoneNumber, checkLengthEqualTen } from '../../validate';

const dataTextConstant = {
    messageErrorRequiredAlertReceiver: 'Vui lòng chọn số điện thoại nhận cảnh báo',
    messageCheckLengthPhoneNumber: 'Số điện thoại bao gồm 10 ký tự số',
    messageCheckFormatPhoneNumber: 'Số điện thoại sai định dạng',
    labelCode: 'mã đơn vị',
    labelName: 'tên đơn vị',
    labelPhoneNumber: 'số điện thoại',
    labelHotLine: 'số điện thoại trực ban',
    labelType: 'loại hình đơn vị',
    labelIdDistrict: 'Quận/Huyện',
    labelIdProvince: 'Tỉnh thành',
    labelFullAddress: 'địa chỉ',
    labelLongitude: 'kinh độ',
    labelLatitude: 'vĩ độ',
    labelManager: 'cán bộ quản lí',
};
const validateMessages = {
    required: 'Vui lòng nhập ${label}',
};
const valueTypeUnit = Object.values(dataSelectTypeUnit);
const keyTypeUnit = Object.keys(dataSelectTypeUnit);

const TypeUnitOptions = valueTypeUnit.map((v, i) => ({ value: keyTypeUnit[i], label: v }));
interface Props {
    onFinish?: (value: unknown) => void;
    children?: React.ReactNode;
    detailFireDepartment: DetailFireDepartmentModel;
    idProvinceCurrent?: number;
    disabledForm: boolean;
    disabledDistrictCurrent?: boolean;
    listSoldier?: any;
}

function FormAddFireDepartment({
    onFinish,
    children,
    detailFireDepartment,
    idProvinceCurrent,
    disabledForm,
    disabledDistrictCurrent,
    listSoldier,
}: Props) {
    const { pathname } = useLocation();
    const { coordinatesStore, setCoordinatesStore } = useCoordinatesStore();
    const [responseListProvince, makeRequestListProvince] = useGetListProvince();
    const [idProvince, setIdProvince] = useState(-1);
    const [responseListDistrict, makeRequestListDistrict] = useGetListDistrict(idProvince);
    const [disabledDistrict, setDisabledDistrict] = useState(true);
    const [isLoadingDistrict, setIsLoadingDistrict] = useState(false);
    const [listProvince, setListProvince] = useState<ProvinceModel[]>([]);
    const [listDistrict, setListDistrict] = useState<DistrictModel[]>([]);
    const [textTooltipFullAddress, setTextTooltipFullAddress] = useState('');
    const [form] = Form.useForm();

    const setValueForm = (detailFireDepartment: DetailFireDepartmentModel) => {
        form.setFieldsValue({
            ...detailFireDepartment,
            fireFighterId: detailFireDepartment.manager?.id ?? undefined,
            phoneNumber: detailFireDepartment.phoneNumber ?? undefined,
            hotLine: detailFireDepartment.hotLine ?? undefined,
            longitude: detailFireDepartment.longitude ?? undefined,
            latitude: detailFireDepartment.longitude ?? undefined,
        });
        if (detailFireDepartment.fullAddress) {
            setTextTooltipFullAddress(detailFireDepartment.fullAddress);
        } else {
            setTextTooltipFullAddress('');
        }
        setCoordinatesStore({
            latitude: +detailFireDepartment.latitude,
            longitude: +detailFireDepartment.longitude,
        });
    };
    useEffect(() => {
        makeRequestListProvince();
    }, []);
    useEffect(() => {
        if (detailFireDepartment) {
            setValueForm(detailFireDepartment);
        }
    }, [detailFireDepartment]);
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
    const handelOnFinish = (value: any) => {
        if (typeof onFinish === 'function') {
            onFinish({ ...value });
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
                <StyleItemForm
                    isrequired={'true'}
                    name="code"
                    label={dataTextConstant.labelCode}
                    rules={[{ required: true }]}
                >
                    <Input
                        maxLength={30}
                        disabled={disabledForm}
                        placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelCode}`}
                    />
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
                <StyleItemForm
                    isrequired={'true'}
                    name="phoneNumber"
                    label={dataTextConstant.labelPhoneNumber}
                    rules={[
                        {
                            validator: checkLengthEqualTen,
                            message: `${dataTextConstant.messageCheckLengthPhoneNumber}`,
                        },
                        {
                            validator: checkFormatPhoneNumber,
                            message: `${dataTextConstant.messageCheckFormatPhoneNumber}`,
                        },
                        { required: true },
                    ]}
                >
                    <Input
                        disabled={disabledForm}
                        placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelPhoneNumber}`}
                        type="number"
                    />
                </StyleItemForm>
                <StyleItemForm
                    name="hotLine"
                    label={dataTextConstant.labelHotLine}
                    rules={[
                        {
                            validator: checkLengthEqualTen,
                            message: `${dataTextConstant.messageCheckLengthPhoneNumber}`,
                        },
                        {
                            validator: checkFormatPhoneNumber,
                            message: `${dataTextConstant.messageCheckFormatPhoneNumber}`,
                        },
                    ]}
                >
                    <Input
                        placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelHotLine}`}
                        type="number"
                    />
                </StyleItemForm>
                <StyleItemForm
                    isrequired={'true'}
                    rules={[{ required: true }]}
                    name="typeUnit"
                    label={dataTextConstant.labelType}
                >
                    <Select
                        allowClear
                        placeholder={`${placeholderFiled.placeholderSelect}${dataTextConstant.labelType}`}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(`${input.toLowerCase()}`)
                        }
                        options={TypeUnitOptions}
                    />
                </StyleItemForm>
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

                {!pathname.includes(CREATE_FIRE_DEPARTMENT) && (
                    <ConfigProvider
                        renderEmpty={() => (
                            <Empty
                                style={{ fontSize: 14, fontWeight: 400, color: '#c5c5c5' }}
                                description="Danh sách hiện tại đang trống"
                            />
                        )}
                    >
                        <StyleItemForm name="fireFighterId" label={dataTextConstant.labelManager}>
                            <Select
                                allowClear
                                placeholder={`${placeholderFiled.placeholderSelect}${dataTextConstant.labelManager}`}
                                optionFilterProp="children"
                                filterOption={(input, option) => {
                                    //@ts-ignore
                                    return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
                                }}
                                options={listSoldier.map((item: DetailSoldierModel) => {
                                    return {
                                        value: item.id,
                                        label: item.fullName,
                                    };
                                })}
                            />
                        </StyleItemForm>
                    </ConfigProvider>
                )}
                <>{children}</>
            </StyleForm>
        </>
    );
}

export default FormAddFireDepartment;
