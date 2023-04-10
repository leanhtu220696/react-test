import React, { useEffect, useState } from 'react';
import { Col, Form, Input, Radio, RadioChangeEvent, Row, Tooltip } from 'antd';
import styled from 'styled-components';

import { checkFormatPhoneNumber, checkLengthEqualTen, checkLengthIdCard } from '@/component/validate';
import { useGetDetailCustomerByUsername } from '@/fetcher/Customer/CustomerService';
import { DetailCustomerModel } from '@/model/Customer/CustomerModel';
import { placeholderFiled, StyleForm, StyleItemForm } from '@/styles/form';
import { font } from '@/styles/Style-mixins';
import { CODE_ERROR_NOT_FOUND } from '@/util/ConstantApp/CodeError';
import { TYPE_ENTERPRISE, TYPE_HOUSEHOLD_BUSINESS, TYPE_PERSONAL } from '@/util/ConstantApp/TypeConstant';

interface StyleProps {
    isrequired?: string;
}
const dataTextConstant = {
    labelFullName: 'họ và tên',
    labelIdCard: 'CMND/CCCD',
    labelUsername: 'số điện thoại',
    labelEmail: 'email',
    labelAddress: 'địa chỉ',
    labelCompanyName: 'tên công ty',
    labelTaxCode: 'mã số thuế',
    labelPosition: 'chức vụ',
    labelType: 'Chọn đối tượng khách hàng',
    labelRepresentative: 'người đại diện pháp luật',
    labelBusinessField: 'ngành nghề kinh doanh',
    labelMainAddress: 'trụ sở công ty',
    radioLabelPersonal: 'Cá nhân',
    radioLabelHouseholdBusiness: 'Hộ kinh doanh',
    radioLabelEnterprise: 'Doanh nghiệp',
    messageCheckLengthIdCard: 'Số CMND/CCCD bao gồm 9 hoặc 12 ký tự số',
    messageCheckLengthPhoneNumber: 'Số điện thoại bao gồm 10 ký tự số',
    messageCheckLengthTaxCode: 'Mã số thuế bao gồm 10 ký tự số',
    messageCheckUsernameExists: 'Số điện thoại được sử dụng',
    messageCheckFormatPhoneNumber: 'Số điện thoại sai định dạng',
};
const validateMessages = {
    required: 'Vui lòng nhập ${label}',
    types: {
        email: 'Email không đúng định dạng',
    },
};

const StyleItemFormRadio = styled(Form.Item)<StyleProps>`
     {
        margin-bottom: 45px;
    }
    .ant-form-item-row {
        flex-direction: column;
    }
    .ant-form-item-row > div:nth-child(1) {
        text-align: start;
    }
    .ant-form-item-label > label:nth-child(1) {
        white-space: normal;
        width: 100%;
        display: block;
        ${font(14, '#000000', 600)}
    }
    .ant-form-item-label > label:nth-child(1)::after {
        content: ' *';
        display: ${(props) => (props.isrequired == 'true' ? 'revert' : 'none')};
        ${font(14, 'red', 600)}
    }
    .ant-radio-group-outline > lable {
        display: block;
        ${font(14, '#000', 400)}
    }
    .ant-radio-group-outline {
        display: flex;
        justify-content: space-between;
    }
`;
interface Props {
    onFinish?: (value: unknown) => void;
    children?: React.ReactNode;
    detailCustomer: DetailCustomerModel | any;
    disabledForm: boolean;
    setTypeRadioCurrent: (value: any) => void;
    layoutForm?: TypeLayout;
}
type TypeLayout = 'vertical' | 'horizontal';
function FromAddAccount({ detailCustomer, disabledForm, onFinish, children, setTypeRadioCurrent, layoutForm }: Props) {
    const [form] = Form.useForm();
    const [typeRadio, setTypeRadio] = useState(TYPE_PERSONAL);
    const [valueRadio, setValueRadio] = useState(TYPE_PERSONAL);
    const [username, setUsername] = useState('');
    const [responseDetailCustomer, makeRequestDetailCustomer] = useGetDetailCustomerByUsername(username);
    const [isErrorPhoneNumberExists, setIsErrorPhoneNumberExists] = useState(true);
    const [textTooltipAddress, setTextTooltipAddress] = useState('');
    const [textTooltipMainAddress, setTextTooltipMainAddress] = useState('');
    const [span, setSpan] = useState(24);
    const setValueForm = (detailCustomerNew: DetailCustomerModel) => {
        form.setFieldsValue({
            ...detailCustomerNew,
        });
        if (detailCustomerNew.address) {
            setTextTooltipAddress(detailCustomerNew.address);
        } else {
            setTextTooltipAddress('');
        }
        if (detailCustomerNew.mainAddress) {
            setTextTooltipMainAddress(detailCustomerNew.mainAddress);
        } else {
            setTextTooltipMainAddress('');
        }
        setValueRadio(detailCustomerNew.type);
        setTypeRadio(detailCustomerNew.type);
    };

    useEffect(() => {
        const spanNew = layoutForm === 'vertical' || !layoutForm ? 24 : 10;
        setSpan(spanNew);
    }, [layoutForm]);

    useEffect(() => {
        if (detailCustomer) {
            setValueForm(detailCustomer);
        }
    }, [detailCustomer]);
    useEffect(() => {
        if (typeRadio) {
            setTypeRadioCurrent(typeRadio);
        }
    }, [typeRadio]);
    useEffect(() => {
        if (username) {
            makeRequestDetailCustomer(undefined, [CODE_ERROR_NOT_FOUND]);
        }
    }, [username]);

    useEffect(() => {
        if (responseDetailCustomer) {
            const dataExists = Boolean(responseDetailCustomer.data);
            if (dataExists) {
                setIsErrorPhoneNumberExists(true);
                form.setFields([{ name: 'username', errors: [`${dataTextConstant.messageCheckUsernameExists}`] }]);
            } else {
                setIsErrorPhoneNumberExists(false);
            }
        }
    }, [responseDetailCustomer]);

    const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value !== undefined) {
            if (value.length !== 0) {
                if (value.length === 10) {
                    setUsername(value);
                }
            }
        }
    };
    const handelOnFinish = (_value: any) => {
        if (typeof onFinish === 'function') {
            if (isErrorPhoneNumberExists) {
                form.setFields([{ name: 'username', errors: [`${dataTextConstant.messageCheckUsernameExists}`] }]);
            } else {
                onFinish(_value);
            }
        }
    };
    const onChange = (e: RadioChangeEvent) => {
        setValueRadio(e.target.value);
        setTypeRadio(e.target.value);
    };

    return (
        <StyleForm
            form={form}
            onFinish={handelOnFinish}
            labelWrap={true}
            labelAlign="left"
            labelCol={{ span: 8 }}
            size={'large'}
            validateMessages={validateMessages}
        >
            <Row style={{ width: '100%', justifyContent: 'space-between' }}>
                <Col md={span}>
                    <StyleItemForm hidden={true} name="id">
                        <Input />
                    </StyleItemForm>
                    <StyleItemForm
                        isrequired={'true'}
                        name="fullName"
                        label={dataTextConstant.labelFullName}
                        rules={[{ required: true }]}
                    >
                        <Input
                            disabled={disabledForm}
                            placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelFullName}`}
                        />
                    </StyleItemForm>
                </Col>
                <Col md={span}>
                    <StyleItemForm
                        name="idCard"
                        label={dataTextConstant.labelIdCard}
                        rules={[
                            { validator: checkLengthIdCard, message: `${dataTextConstant.messageCheckLengthIdCard}` },
                        ]}
                    >
                        <Input
                            disabled={disabledForm}
                            placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelIdCard}`}
                            type="number"
                        />
                    </StyleItemForm>
                </Col>
                <Col md={span}>
                    <StyleItemForm
                        isrequired={'true'}
                        name="username"
                        label={dataTextConstant.labelUsername}
                        rules={[
                            { required: true },
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
                            onChange={onChangeUsername}
                            disabled={disabledForm}
                            placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelUsername}`}
                            type="number"
                        />
                    </StyleItemForm>
                </Col>
                <Col md={span}>
                    <StyleItemForm
                        isrequired={'true'}
                        name="email"
                        label={dataTextConstant.labelEmail}
                        rules={[{ required: true, type: 'email' }]}
                    >
                        <Input
                            disabled={disabledForm}
                            placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelEmail}`}
                        />
                    </StyleItemForm>
                </Col>
                <Col md={span}>
                    <Tooltip color="#108ee9" placement="top" title={`${textTooltipAddress}`}>
                        <StyleItemForm
                            isrequired={'true'}
                            name="address"
                            label={dataTextConstant.labelAddress}
                            rules={[{ required: true }]}
                        >
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    if (event.target.value !== undefined) {
                                        setTextTooltipAddress(event.target.value);
                                    }
                                }}
                                maxLength={140}
                                disabled={disabledForm}
                                placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelAddress}`}
                            />
                        </StyleItemForm>
                    </Tooltip>
                </Col>

                {!disabledForm && (
                    <StyleItemFormRadio labelCol={{ span: 24 }} isrequired={'true'} label={dataTextConstant.labelType}>
                        <Radio.Group onChange={onChange} value={valueRadio}>
                            <Radio disabled={disabledForm && typeRadio !== TYPE_PERSONAL} value={TYPE_PERSONAL}>
                                {dataTextConstant.radioLabelPersonal}
                            </Radio>
                            <Radio
                                disabled={disabledForm && typeRadio !== TYPE_HOUSEHOLD_BUSINESS}
                                value={TYPE_HOUSEHOLD_BUSINESS}
                            >
                                {dataTextConstant.radioLabelHouseholdBusiness}
                            </Radio>
                            <Radio disabled={disabledForm && typeRadio !== TYPE_ENTERPRISE} value={TYPE_ENTERPRISE}>
                                {dataTextConstant.radioLabelEnterprise}
                            </Radio>
                        </Radio.Group>
                    </StyleItemFormRadio>
                )}
                {typeRadio === TYPE_ENTERPRISE && (
                    <>
                        <Col md={span}>
                            <StyleItemForm
                                isrequired={'true'}
                                name="position"
                                label={dataTextConstant.labelPosition}
                                rules={[{ required: true }]}
                            >
                                <Input
                                    disabled={disabledForm}
                                    placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelPosition}`}
                                />
                            </StyleItemForm>
                        </Col>
                        <Col md={span}>
                            <StyleItemForm
                                isrequired={'true'}
                                name="companyName"
                                label={dataTextConstant.labelCompanyName}
                                rules={[{ required: true }]}
                            >
                                <Input
                                    disabled={disabledForm}
                                    placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelCompanyName}`}
                                />
                            </StyleItemForm>
                        </Col>
                        <Col md={span}>
                            <StyleItemForm
                                isrequired={'true'}
                                name="taxCode"
                                label={dataTextConstant.labelTaxCode}
                                rules={[
                                    { required: true },
                                    {
                                        validator: checkLengthEqualTen,
                                        message: `${dataTextConstant.messageCheckLengthTaxCode}`,
                                    },
                                ]}
                            >
                                <Input
                                    type="number"
                                    disabled={disabledForm}
                                    placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelTaxCode}`}
                                />
                            </StyleItemForm>
                        </Col>
                        <Col md={span}>
                            <StyleItemForm name="representative" label={dataTextConstant.labelRepresentative}>
                                <Input
                                    disabled={disabledForm}
                                    placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelRepresentative}`}
                                />
                            </StyleItemForm>
                        </Col>
                    </>
                )}
                {typeRadio === TYPE_HOUSEHOLD_BUSINESS || typeRadio === TYPE_ENTERPRISE ? (
                    <Col md={span}>
                        <StyleItemForm
                            isrequired={'true'}
                            name="businessField"
                            label={dataTextConstant.labelBusinessField}
                            rules={[{ required: true }]}
                        >
                            <Input
                                disabled={disabledForm}
                                placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelBusinessField}`}
                            />
                        </StyleItemForm>
                    </Col>
                ) : (
                    <></>
                )}
                {typeRadio === TYPE_ENTERPRISE && (
                    <Col md={span}>
                        <Tooltip color="#108ee9" placement="top" title={`${textTooltipMainAddress}`}>
                            <StyleItemForm
                                isrequired={'true'}
                                name="mainAddress"
                                label={dataTextConstant.labelMainAddress}
                                rules={[{ required: true }]}
                            >
                                <Input
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        if (event.target.value !== undefined) {
                                            setTextTooltipMainAddress(event.target.value);
                                        }
                                    }}
                                    disabled={disabledForm}
                                    placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelMainAddress}`}
                                />
                            </StyleItemForm>
                        </Tooltip>
                    </Col>
                )}
            </Row>
            {children}
        </StyleForm>
    );
}
export default FromAddAccount;
