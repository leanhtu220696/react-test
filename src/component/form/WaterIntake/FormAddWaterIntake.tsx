import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, Select, Tooltip } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import { dataSelectTypeWater } from '@/assets/data/DataConstant';
import { useGetListDistrict, useGetListProvince } from '@/fetcher/Service';
import { DetailWaterIntakeModel } from '@/model/FireDepartment/WaterIntakeModel';
import { DistrictModel, ProvinceModel } from '@/model/ProvinceModel';
import { placeholderFiled, StyleForm, StyleItemForm } from '@/styles/form';

import { useCoordinatesStore } from '../../hook/useCoordinatesStore';
import { checkFormatPhoneNumber, checkLengthEqualTen } from '../../validate';

const dataTextConstant = {
    messageErrorRequiredAlertReceiver: 'Vui lòng chọn số điện thoại nhận cảnh báo',
    messageCheckLengthPhoneNumber: 'Số điện thoại bao gồm 10 ký tự số',
    messageCheckFormatPhoneNumber: 'Số điện thoại sai định dạng',
    labelCode: 'mã điểm',
    labelName: 'tên điểm lấy nước ',
    labelPhoneNumber: 'số điện thoại',
    labelType: 'loại điểm lấy nước',
    labelDescription: 'mô tả',
    labelAvailable: 'Khả năng cấp nước',
    labelIdDistrict: 'Quận/Huyện',
    labelIdProvince: 'Tỉnh thành',
    labelFullAddress: 'địa chỉ',
    labelLongitude: 'kinh độ',
    labelLatitude: 'vĩ độ',
    titleButtonGoBack: 'Quay lại',
    titleButtonSave: 'Lưu',
};
const validateMessages = {
    required: 'Vui lòng nhập ${label}',
};
const valueWaterIntake = Object.values(dataSelectTypeWater);
const keyWaterIntake = Object.keys(dataSelectTypeWater);

const TypeWaterOptions = valueWaterIntake.map((v, i) => ({ value: keyWaterIntake[i], label: v }));
interface Props {
    onFinish?: (value: unknown) => void;
    children?: React.ReactNode;
    detailWaterIntake: DetailWaterIntakeModel;
    idProvinceCurrent?: number;
    disabledForm: boolean;
    disabledDistrictCurrent?: boolean;
}
function FormAddWaterIntake({
    onFinish,
    children,
    detailWaterIntake,
    idProvinceCurrent,
    disabledForm,
    disabledDistrictCurrent,
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
    const [form] = Form.useForm();

    const setValueForm = (detailWaterIntake: DetailWaterIntakeModel) => {
        form.setFieldsValue({
            ...detailWaterIntake,
            phoneNumber: !detailWaterIntake.phoneNumber ? undefined : detailWaterIntake.phoneNumber,
            longitude: detailWaterIntake.longitude === 0 ? undefined : detailWaterIntake.longitude,
            latitude: detailWaterIntake.longitude === 0 ? undefined : detailWaterIntake.latitude,
        });
        if (detailWaterIntake.fullAddress) {
            setTextTooltipFullAddress(detailWaterIntake.fullAddress);
        } else {
            setTextTooltipFullAddress('');
        }
        setCoordinatesStore({
            latitude: +detailWaterIntake.latitude,
            longitude: +detailWaterIntake.longitude,
        });
    };
    useEffect(() => {
        makeRequestListProvince();
        form.setFieldsValue({ available: true });
    }, []);
    useEffect(() => {
        if (detailWaterIntake) {
            setValueForm(detailWaterIntake);
        }
    }, [detailWaterIntake]);
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
                <StyleItemForm
                    isrequired={'true'}
                    name="code"
                    label={dataTextConstant.labelCode}
                    rules={[{ required: true }]}
                >
                    <Input
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
                    ]}
                >
                    <Input
                        placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelPhoneNumber}`}
                        type="number"
                    />
                </StyleItemForm>
                <StyleItemForm name="type" label={dataTextConstant.labelType}>
                    <Select
                        allowClear
                        placeholder={`${placeholderFiled.placeholderSelect}${dataTextConstant.labelType}`}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(`${input.toLowerCase()}`)
                        }
                        options={TypeWaterOptions}
                    />
                </StyleItemForm>
                <StyleItemForm name="description" label={dataTextConstant.labelDescription}>
                    <TextArea
                        style={{ fontSize: 14 }}
                        placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelDescription}`}
                        rows={4}
                    />
                </StyleItemForm>
                <StyleItemForm name="available" label={dataTextConstant.labelAvailable}>
                    <Radio.Group style={{ marginLeft: 30 }}>
                        <Radio value={true}>Có</Radio>
                        <Radio style={{ paddingLeft: 50 }} value={false}>
                            Không
                        </Radio>
                    </Radio.Group>
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
                <>{children}</>
            </StyleForm>
        </>
    );
}

export default FormAddWaterIntake;
