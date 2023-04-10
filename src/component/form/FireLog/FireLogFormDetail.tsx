import React, { useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import moment from 'moment';

import { dataSelectStatusFireHappening } from '@/assets/data/DataConstant';
import { FireLogDetailModel } from '@/model/FireLog/FireLogDetailModel';
import { placeholderFiled, StyleForm, StyleItemForm } from '@/styles/form';
import { DATE_TIME_FORMAT_PATTERN } from '@/util/ConstantApp/TypeConstant';

import { useCoordinatesStore } from '../../hook/useCoordinatesStore';

interface Props {
    children: React.ReactNode;
    detailFireLog: FireLogDetailModel;
    handleOnClickSubmit?: (value: any) => void;
}
const labelText = {
    fireSource: 'Nguồn cháy',
    fireStatus: 'Trạng thái',
    customerName: 'Tên khách hàng',
    constructionName: 'Công trình',
    phoneNumber: 'Số điện thoại',
    timeStart: 'Thời điểm báo cháy',
    timeResolve: 'Thời điểm kết thúc xử lý',
    address: 'Địa chỉ',
};

const FireLogFormDetail = ({ children, detailFireLog, handleOnClickSubmit }: Props) => {
    const { setCoordinatesStore } = useCoordinatesStore();
    const [form] = Form.useForm();

    useEffect(() => {
        if (detailFireLog) {
            setValueForm(detailFireLog);
            setCoordinatesStore({
                longitude: +detailFireLog.longitude,
                latitude: +detailFireLog.latitude,
            });
        }
    }, [detailFireLog]);

    const setValueForm = (fireLog: FireLogDetailModel) => {
        form.setFieldsValue({
            ...fireLog,
            dateCreated: fireLog.dateCreated
                ? moment.unix(fireLog.dateCreated).format(DATE_TIME_FORMAT_PATTERN)
                : undefined,
            dateSolved: fireLog.dateSolved
                ? moment.unix(fireLog.dateSolved).format(DATE_TIME_FORMAT_PATTERN)
                : undefined,
        });
    };
    const onFinish = (value: any) => {
        if (typeof handleOnClickSubmit === 'function') {
            handleOnClickSubmit(value);
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
                onFinish={onFinish}
            >
                <StyleItemForm hidden={true} name="id">
                    <Input />
                </StyleItemForm>
                <StyleItemForm name="fireSource" label={labelText.fireSource}>
                    <Input disabled={true} placeholder={`${labelText.fireSource}`} />
                </StyleItemForm>
                <StyleItemForm name="status" label={labelText.fireStatus}>
                    <Select
                        disabled={false}
                        placeholder={`${placeholderFiled.placeholderSelect}${labelText.fireStatus}`}
                        options={dataSelectStatusFireHappening.map((item) => ({
                            label: item.label,
                            value: item.value,
                        }))}
                    />
                </StyleItemForm>
                <StyleItemForm name="fullNameCustomer" label={labelText.customerName}>
                    <Input disabled={true} placeholder={`${labelText.customerName}`} />
                </StyleItemForm>
                <StyleItemForm name="constructionName" label={labelText.constructionName}>
                    <Input disabled={true} placeholder={`${labelText.constructionName}`} />
                </StyleItemForm>
                <StyleItemForm name="constructionFullAddress" label={labelText.address}>
                    <Input disabled={true} placeholder={`${labelText.address}`} />
                </StyleItemForm>
                <StyleItemForm name="username" label={labelText.phoneNumber}>
                    <Input disabled={true} placeholder={`${labelText.phoneNumber}`} />
                </StyleItemForm>
                <StyleItemForm name="dateCreated" label={labelText.timeStart}>
                    <Input disabled={true} placeholder={labelText.timeStart} />
                </StyleItemForm>
                <StyleItemForm
                    wrapperCol={{ span: 16, offset: 1 }}
                    name="dateSolved"
                    label={labelText.timeResolve}
                    labelCol={{ span: 7 }}
                >
                    <Input disabled={true} placeholder={labelText.timeResolve} />
                </StyleItemForm>
                {children}
            </StyleForm>
        </>
    );
};

export default FireLogFormDetail;
