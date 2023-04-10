import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, Input, Radio, RadioChangeEvent, Row, Tooltip } from 'antd';
import styled from 'styled-components';

import { checkFormatPhoneNumber, checkLengthEqualTen, checkLengthIdCard } from '@/component/validate';
import { useGetDetailCustomerByUsername } from '@/fetcher/Customer/CustomerService';
import { placeholderFiled, StyleForm, StyleItemForm } from '@/styles/form';
import { font } from '@/styles/Style-mixins';
import { CODE_ERROR_NOT_FOUND } from '@/util/ConstantApp/CodeError';
import { TYPE_ENTERPRISE, TYPE_HOUSEHOLD_BUSINESS, TYPE_PERSONAL } from '@/util/ConstantApp/TypeConstant';

import { DetailCustomerModel } from '../../model/Customer/CustomerModel';

interface StyleProps {
    isrequired?: string;
}

const StyleFormButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 60px;
`;
const StyleButton = styled(Button)`
    width: 130px;
    height: 40px;
    font-weight: 700;
    line-height: 20px;
    border: none;
    border-radius: 4px;
    font-size: 18px;
    color: white !important;
    &:hover {
        color: white !important;
        opacity: 0.7;
    }
`;
const dataTextConstant = {
    labelFullName: 'họ và tên',
    labelIdCard: 'CMND/ CCCD',
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
const StyleRowItem = styled(Row)`
    width: 100%;
    justify-content: space-between;
`;
const StyleItemFormRadio = styled(StyleForm.Item)<StyleProps>`
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

function FormCustomer({
    onFinish,
    isLoading,
    setTypeRadio,
    typeRadio,
    detailCustomer,
}: {
    onFinish: (value: any) => void;
    isLoading: boolean;
    setTypeRadio: React.Dispatch<React.SetStateAction<string>>;
    typeRadio: string;
    detailCustomer?: DetailCustomerModel;
}) {
    const [form] = Form.useForm();
    const [valueRadio, setValueRadio] = useState(TYPE_PERSONAL);
    const [username, setUsername] = useState('');
    const [responseDetailCustomer, makeRequestDetailCustomer] = useGetDetailCustomerByUsername(username);
    const [isErrorPhoneNumberExists, setIsErrorPhoneNumberExists] = useState(true);
    const [textTooltipAddress, setTextTooltipAddress] = useState('');
    const [textTooltipMainAddress, setTextTooltipMainAddress] = useState('');
    const [isDetailCustomerPage, setIsDetailCustomerPage] = useState(false);
    const navigate = useNavigate();
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
        if (detailCustomer) {
            setIsDetailCustomerPage(true);
            setValueForm(detailCustomer);
        }
    }, [detailCustomer]);

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
    const handelOnFinish = (_value: DetailCustomerModel) => {
        if (isErrorPhoneNumberExists) {
            form.setFields([{ name: 'username', errors: [`${dataTextConstant.messageCheckUsernameExists}`] }]);
        } else {
            typeof onFinish === 'function' && onFinish(_value);
        }
    };
    const onChange = (e: RadioChangeEvent) => {
        setValueRadio(e.target.value);
        setTypeRadio(e.target.value);
    };
    useEffect(() => {
        if (username) {
            makeRequestDetailCustomer(undefined, [CODE_ERROR_NOT_FOUND]);
        }
    }, [username]);

    return (
        <Row style={{ width: '100%', justifyContent: 'center' }}>
            <Col lg={20} xxl={16} xl={18}>
                <StyleForm
                    form={form}
                    onFinish={handelOnFinish}
                    labelWrap={true}
                    labelAlign="left"
                    labelCol={{ span: 8 }}
                    size={'large'}
                    validateMessages={validateMessages}
                >
                    <StyleItemForm hidden={true} name="id">
                        <Input />
                    </StyleItemForm>
                    <StyleRowItem>
                        <Col lg={10} xl={8}>
                            <StyleItemForm
                                isrequired={'true'}
                                name="fullName"
                                label={dataTextConstant.labelFullName}
                                rules={[{ required: true }]}
                            >
                                <Input
                                    placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelFullName}`}
                                />
                            </StyleItemForm>
                        </Col>
                        <Col lg={10} xl={8}>
                            <StyleItemForm
                                isrequired={'true'}
                                name="email"
                                label={dataTextConstant.labelEmail}
                                rules={[{ required: true, type: 'email' }]}
                            >
                                <Input
                                    placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelEmail}`}
                                />
                            </StyleItemForm>
                        </Col>
                    </StyleRowItem>
                    <StyleRowItem>
                        <Col lg={10} xl={8}>
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
                                    disabled={isDetailCustomerPage}
                                    onChange={onChangeUsername}
                                    placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelUsername}`}
                                    type="number"
                                />
                            </StyleItemForm>
                        </Col>
                        <Col lg={10} xl={8}>
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
                                        placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelAddress}`}
                                    />
                                </StyleItemForm>
                            </Tooltip>
                        </Col>
                    </StyleRowItem>
                    <StyleRowItem>
                        <Col lg={10} xl={8}>
                            <StyleItemForm
                                name="idCard"
                                label={dataTextConstant.labelIdCard}
                                rules={[
                                    {
                                        validator: checkLengthIdCard,
                                        message: `${dataTextConstant.messageCheckLengthIdCard}`,
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelIdCard}`}
                                    type="number"
                                />
                            </StyleItemForm>
                        </Col>
                        <Col lg={10} xl={8}></Col>
                    </StyleRowItem>
                    <StyleRowItem>
                        <Col lg={12}>
                            <StyleItemFormRadio
                                labelCol={{ span: 16 }}
                                isrequired={'true'}
                                label={dataTextConstant.labelType}
                            >
                                <Radio.Group onChange={onChange} value={valueRadio}>
                                    <Radio value={TYPE_PERSONAL}>{dataTextConstant.radioLabelPersonal}</Radio>
                                    <Radio value={TYPE_HOUSEHOLD_BUSINESS}>
                                        {dataTextConstant.radioLabelHouseholdBusiness}
                                    </Radio>
                                    <Radio value={TYPE_ENTERPRISE}>{dataTextConstant.radioLabelEnterprise}</Radio>
                                </Radio.Group>
                            </StyleItemFormRadio>
                        </Col>
                    </StyleRowItem>
                    <div style={{ marginTop: '40px' }}>
                        {typeRadio === TYPE_ENTERPRISE && (
                            <>
                                <StyleRowItem>
                                    <Col lg={10} xl={8}>
                                        <StyleItemForm
                                            isrequired={'true'}
                                            name="position"
                                            label={dataTextConstant.labelPosition}
                                            rules={[{ required: true }]}
                                        >
                                            <Input
                                                placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelPosition}`}
                                            />
                                        </StyleItemForm>
                                    </Col>
                                    <Col lg={10} xl={8}>
                                        <StyleItemForm
                                            name="representative"
                                            label={dataTextConstant.labelRepresentative}
                                        >
                                            <Input
                                                placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelRepresentative}`}
                                            />
                                        </StyleItemForm>
                                    </Col>
                                </StyleRowItem>
                            </>
                        )}
                        <StyleRowItem>
                            {typeRadio === TYPE_ENTERPRISE && (
                                <Col lg={10} xl={8}>
                                    <StyleItemForm
                                        isrequired={'true'}
                                        name="companyName"
                                        label={dataTextConstant.labelCompanyName}
                                        rules={[{ required: true }]}
                                    >
                                        <Input
                                            placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelCompanyName}`}
                                        />
                                    </StyleItemForm>
                                </Col>
                            )}
                            {typeRadio === TYPE_HOUSEHOLD_BUSINESS || typeRadio === TYPE_ENTERPRISE ? (
                                <Col lg={10} xl={8}>
                                    <StyleItemForm
                                        isrequired={'true'}
                                        name="businessField"
                                        label={dataTextConstant.labelBusinessField}
                                        rules={[{ required: true }]}
                                    >
                                        <Input
                                            placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelBusinessField}`}
                                        />
                                    </StyleItemForm>
                                </Col>
                            ) : (
                                <></>
                            )}
                        </StyleRowItem>
                        {typeRadio === TYPE_ENTERPRISE && (
                            <StyleRowItem>
                                <Col lg={10} xl={8}>
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
                                            placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelTaxCode}`}
                                        />
                                    </StyleItemForm>
                                </Col>
                                <Col lg={10} xl={8}>
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
                                                placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelMainAddress}`}
                                            />
                                        </StyleItemForm>
                                    </Tooltip>
                                </Col>
                            </StyleRowItem>
                        )}
                    </div>
                    <StyleFormButton>
                        <StyleButton
                            style={{ backgroundColor: `${isDetailCustomerPage ? '#FF9518' : '#c71b1b'}` }}
                            onClick={() => navigate(-1)}
                        >
                            {isDetailCustomerPage ? 'Quay lại' : 'Hủy'}
                        </StyleButton>
                        <StyleButton style={{ backgroundColor: '#1f8e4f' }} htmlType="submit" loading={isLoading}>
                            Lưu
                        </StyleButton>
                    </StyleFormButton>
                </StyleForm>
            </Col>
        </Row>
    );
}
export default FormCustomer;
