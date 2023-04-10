import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, Space } from 'antd';
import styled from 'styled-components';

import { regexPhoneNumber } from '@/component/validate';
import { setChangeModal } from '@/context/store/PhoneNumberExistsSlice';
import { DetailCustomerModel } from '@/model/Customer/CustomerModel';
import { flex, font, TypeStatus } from '@/styles/Style-mixins';

import { listCodeError } from './ListMessageError';

interface StyleProps {
    status: TypeStatus;
}

const dataTextConstant = {
    placeholderName: 'Nhập họ và tên',
    placeholderPhoneNumber: 'Nhập số điện thoại',
    btnSave: 'Lưu',
};
const StyleFormAddPhoneNumber = styled.div<StyleProps>`
    padding: 10px 10px;

    .ant-space {
        width: 100%;
        ${flex('space-between', 'flex-start', 'row')};
    }

    .ant-space-item:nth-child(1),
    .ant-space-item:nth-child(2) {
        width: 38%;
        position: relative;
    }

    .ant-space-item:nth-child(1):focus-within,
    .ant-space-item:nth-child(2):focus-within {
        width: 71%;
    }

    .ant-space-item:nth-child(1):focus-within > input,
    .ant-space-item:nth-child(2):focus-within > div > input {
        border-top: none !important;
        box-shadow: none;
    }

    .ant-space-item:nth-child(1):focus-within .ant-space-item:nth-child(2),
    .ant-space-item:nth-child(2):focus-within .ant-space-item:nth-child(1) {
        width: 5%;
    }

    .ant-space-item > div > input::-webkit-outer-spin-button,
    .ant-space-item > div > input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .ant-space-item:nth-child(1):focus-within::after {
        content: 'Họ và tên';
    }

    .ant-space-item:nth-child(2):focus-within::after {
        content: 'Số điện thoại';
    }

    .ant-space-item:nth-child(1):focus-within::before {
        width: 53%;
    }

    .ant-space-item:nth-child(2):focus-within::before {
        width: 40%;
    }

    .ant-space-item:nth-child(1):focus-within::after,
    .ant-space-item:nth-child(2):focus-within::after {
        position: absolute;
        top: -12px;
        left: 6px;
        background-color: transparent;
        padding: 0;
        margin: 0;
        ${font(10, '#1890ff', 400)}
    }

    .ant-space-item:nth-child(1):focus-within::before,
    .ant-space-item:nth-child(2):focus-within::before {
        content: ' ';
        position: absolute;
        height: 1px;
        top: -1px;
        right: 4px;
        background-color: #1890ff;
    }

    .ant-space-item:nth-child(2):focus-within::after {
        ${font(10, ``, 400)}
        color: ${(props) => (props.status === 'error' ? 'red' : '#1890ff')};
    }

    .ant-space-item:nth-child(2):focus-within::before {
        background-color: ${(props) => (props.status === 'error' ? 'red' : '#1890ff')};
    }

    .ant-space-item:nth-child(3) {
        width: 18%;
    }

    input {
        width: 100%;
        border-radius: 5px;
        margin: 0;
    }

    button {
        border-radius: 5px;
        ${font(12, '#fff', 600)}
    }
`;

type onChangeInput = 'name' | 'phoneNumber';

interface DataInput {
    name: string;
    phoneNumber: string;
}

function FormAddPhoneNumber({
    setItemAlertReceiverNew,
    listAlertReceiver,
}: {
    setItemAlertReceiverNew: (value: any) => void;
    listAlertReceiver: DetailCustomerModel[];
}) {
    const dispatch = useDispatch();
    const [dataInput, setDataInput] = useState<DataInput>({
        name: '',
        phoneNumber: '',
    });
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<TypeStatus>('');
    const onChange = (event: React.ChangeEvent<HTMLInputElement>, type: onChangeInput) => {
        setMessage('');
        setStatus('');
        const value = event.target.value;
        if (type === 'name') {
            setDataInput({
                ...dataInput,
                name: value,
            });
        } else if (type === 'phoneNumber') {
            setDataInput({
                ...dataInput,
                phoneNumber: value,
            });
        }
    };

    const handleOnSave = () => {
        const itemDetailCustomer = listAlertReceiver.find((item) => {
            return item.username === `${dataInput.phoneNumber}`;
        });
        if (dataInput.phoneNumber) {
            if (dataInput.phoneNumber.length <= 9 || dataInput.phoneNumber.length >= 11) {
                setMessage(`${listCodeError[1]}`);
                setStatus('error');
            } else if (itemDetailCustomer) {
                setMessage('');
                setStatus('');
                setDataInput({
                    name: '',
                    phoneNumber: '',
                });
                dispatch(
                    setChangeModal({
                        name: itemDetailCustomer.fullName,
                        phoneNumber: itemDetailCustomer.username,
                        visible: true,
                        checked: false,
                    }),
                );
            } else if (!regexPhoneNumber(dataInput.phoneNumber)) {
                setMessage(`${listCodeError[3]}`);
                setStatus('error');
            } else {
                setMessage('');
                setStatus('');
                setItemAlertReceiverNew({
                    id: null,
                    fullName: dataInput.name,
                    idCard: '',
                    username: dataInput.phoneNumber,
                    email: '',
                    address: '',
                });
                setDataInput({
                    name: '',
                    phoneNumber: '',
                });
            }
        } else {
            setStatus('error');
            setMessage(`${listCodeError[2]}`);
        }
    };
    return (
        <StyleFormAddPhoneNumber status={status}>
            <Space>
                <Input
                    className="cus-input-username"
                    placeholder={dataTextConstant.placeholderName}
                    value={dataInput.name}
                    onChange={(evt) => {
                        onChange(evt, 'name');
                    }}
                />
                <div>
                    <Input
                        status={status}
                        className="cus-input-phonenumber"
                        type="number"
                        placeholder={dataTextConstant.placeholderPhoneNumber}
                        value={dataInput.phoneNumber}
                        onChange={(evt) => {
                            onChange(evt, 'phoneNumber');
                        }}
                    />
                    <small style={{ color: 'red' }}>{message}</small>
                </div>

                <Button type="primary" onClick={handleOnSave}>
                    {dataTextConstant.btnSave}
                </Button>
            </Space>
        </StyleFormAddPhoneNumber>
    );
}

export default FormAddPhoneNumber;
