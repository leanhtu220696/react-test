import React, { useState } from 'react';
import { Button, Input } from 'antd';
import styled from 'styled-components';

import { regexPhoneNumber } from '@/component/validate';
import { DetailCustomerModel } from '@/model/Customer/CustomerModel';
import { flex, font, TypeStatus } from '@/styles/Style-mixins';

import { listCodeError } from './ListMessageError';

const StyleFormEdit = styled.div`
    ${flex('center', 'center', 'column')}
    padding: 10px 20px;
    width: 100%;

    .ant-input {
        margin: 5px 0;
        border-radius: 5px;
        width: 100%;
        padding: 5px 10px;
        ${font(12, '#000', 400)}
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .cus-list-btn-edit {
        ${flex('space-between', 'center', 'row')}
        width: 100%;
        padding: 0 20px;
        margin: 5px 0;
    }
`;
const dataTextConstant = {
    btnOk: 'OK',
    btnCancel: 'Huỷ',
};

function FormEditPhoneNumber({
    name,
    phoneNumber,
    onSaveEditItem,
    listAlertReceiver,
}: {
    name: string;
    phoneNumber: string;
    onSaveEditItem: (name: string, phoneNumber: string, oldPhoneNumber: string) => void;
    listAlertReceiver: DetailCustomerModel[];
}) {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<TypeStatus>('');
    const oldPhoneNumber = phoneNumber;
    const [newName, setNewName] = useState(name);
    const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    };
    const onChangePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus('');
        setMessage('');
        setNewPhoneNumber(event.target.value);
    };
    const handleOnOkEdit = () => {
        const itemDetailCustomer = listAlertReceiver.find((item) => {
            return item.username === `${newPhoneNumber}`;
        });
        if (newPhoneNumber) {
            if (newPhoneNumber.length <= 9 || newPhoneNumber.length >= 11) {
                setStatus('error');
                setMessage(`${listCodeError[1]}`);
            } else if (itemDetailCustomer && newPhoneNumber !== oldPhoneNumber) {
                setStatus('error');
                setMessage(`${listCodeError[0]}`);
            } else if (!regexPhoneNumber(newPhoneNumber)) {
                setMessage(`${listCodeError[3]}`);
                setStatus('error');
            } else {
                setStatus('');
                setMessage('');
                onSaveEditItem(newName, newPhoneNumber, oldPhoneNumber);
            }
        } else {
            setStatus('error');
            setMessage(`${listCodeError[2]}`);
        }
    };
    const handleOnCancelEdit = () => {
        onSaveEditItem(name, phoneNumber, oldPhoneNumber);
    };

    return (
        <>
            <StyleFormEdit>
                <Input
                    type="text"
                    onChange={(event) => {
                        onChangeName(event);
                    }}
                    value={newName}
                />
                <div style={{ width: '100%' }}>
                    <Input
                        status={status}
                        type="number"
                        value={newPhoneNumber}
                        onChange={(event) => {
                            onChangePhoneNumber(event);
                        }}
                    />
                    <small style={{ color: 'red' }}>{message}</small>
                </div>
                <div className="cus-list-btn-edit">
                    <Button type="primary" onClick={handleOnOkEdit}>
                        {dataTextConstant.btnOk}
                    </Button>
                    <Button type="primary" style={{ background: 'red' }} danger onClick={handleOnCancelEdit}>
                        {dataTextConstant.btnCancel}
                    </Button>
                </div>
            </StyleFormEdit>
        </>
    );
}

export default FormEditPhoneNumber;
