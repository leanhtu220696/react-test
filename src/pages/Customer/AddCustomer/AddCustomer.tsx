import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import styled from 'styled-components';

import { CreateAccountModel } from '@/model/Device/ActiveGatewayModel';
import { font } from '@/styles/Style-mixins';
import { TYPE_PERSONAL } from '@/util/ConstantApp/TypeConstant';
import { CUSTOMER_URL } from '@/util/ConstantApp/Url';
import { setMessageRedirectUri, showMessage } from '@/util/Util';

import { DataCodeErrorCreateCustomer, DataErrorCreateCustomer } from '../../../assets/data/DataErrorCallApi';
import { useCreateCustomer } from '../../../fetcher/Customer/CustomerService';
import { DetailCustomerModel } from '../../../model/Customer/CustomerModel';
import FormCustomer from '../FormCustomer';

const StyleTitle = styled.h1`
    width: 100%;
    text-align: center;
    margin: 35px 0;
    ${font(22, '#000', 600)}
`;

function AddCustomer() {
    const [typeRadio, setTypeRadio] = useState(TYPE_PERSONAL);
    const [resAddCustomer, makeReqAddCustomer] = useCreateCustomer();
    const [isLoading, setIsLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(false);
        if (resAddCustomer.data) {
            navigate(`${CUSTOMER_URL}`, { state: setMessageRedirectUri('success', 'Thêm khách hàng thành công!') });
        } else if (resAddCustomer.error) {
            const codeError: any = resAddCustomer.error.code;
            messageApi.open(showMessage('error', DataErrorCreateCustomer[codeError]));
        }
    }, [resAddCustomer]);

    const handelOnFinish = (_value: DetailCustomerModel) => {
        const body: CreateAccountModel = {
            id: _value.id,
            fullName: _value.fullName,
            idCard: _value.idCard,
            username: _value.username,
            email: _value.email,
            address: _value.address,
            type: typeRadio,
            accountCustomerTypeModel: {
                position: _value.position,
                companyName: _value.companyName,
                taxCode: _value.taxCode,
                representative: _value.representative,
                businessField: _value.businessField,
                mainAddress: _value.mainAddress,
            },
        };
        setIsLoading(true);
        makeReqAddCustomer(undefined, DataCodeErrorCreateCustomer, body);
    };

    return (
        <div style={{ backgroundColor: '#fff', paddingBottom: 360 }}>
            {contextHolder}
            <StyleTitle>THÊM MỚI KHÁCH HÀNG</StyleTitle>
            <FormCustomer
                onFinish={handelOnFinish}
                isLoading={isLoading}
                setTypeRadio={setTypeRadio}
                typeRadio={typeRadio}
            />
        </div>
    );
}
export default AddCustomer;
