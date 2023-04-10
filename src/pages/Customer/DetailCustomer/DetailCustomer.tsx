import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message, Row } from 'antd';
import styled from 'styled-components';

import { DetailCustomerLoader } from '@/elements/skeleton/ExampleLoader';
import { CreateAccountModel } from '@/model/Device/ActiveGatewayModel';
import { font } from '@/styles/Style-mixins';
import { TYPE_PERSONAL } from '@/util/ConstantApp/TypeConstant';
import { DETAIL_CUSTOMER_LOADER } from '@/util/ConstantApp/TypeLoader';
import { CUSTOMER_URL } from '@/util/ConstantApp/Url';
import { showMessage } from '@/util/Util';

import { DataCodeErrorCreateCustomer, DataErrorCreateCustomer } from '../../../assets/data/DataErrorCallApi';
import { useCreateCustomer, useGetDetailCustomerByUsername } from '../../../fetcher/Customer/CustomerService';
import { DetailCustomerModel } from '../../../model/Customer/CustomerModel';
import { setMessageRedirectUri } from '../../../util/Util';
import FormCustomer from '../FormCustomer';

const StyleTitle = styled.h1`
    width: 100%;
    text-align: center;
    margin: 35px 0;
    ${font(22, '#000', 600)}
`;

function DetailCustomer() {
    const { username } = useParams();
    const [typeRadio, setTypeRadio] = useState(TYPE_PERSONAL);
    const [responseDetailCustomer, makeRequestDetailCustomer] = useGetDetailCustomerByUsername(username);
    const [detailCustomer, setDetailCustomer] = useState<DetailCustomerModel>();
    const [resAddCustomer, makeReqAddCustomer] = useCreateCustomer();
    const [isLoading, setIsLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    useEffect(() => {
        makeRequestDetailCustomer(DETAIL_CUSTOMER_LOADER, [404]);
    }, [username]);
    useEffect(() => {
        if (responseDetailCustomer.data) {
            setDetailCustomer(responseDetailCustomer.data);
        } else if (responseDetailCustomer.error) {
            if (responseDetailCustomer.error.code == 404)
                navigate(`${CUSTOMER_URL}`, {
                    state: setMessageRedirectUri('error', `Không tồn tại khách hàng có số điện thoại ${username}!`),
                });
        }
    }, [responseDetailCustomer]);
    useEffect(() => {
        setIsLoading(false);
        if (resAddCustomer.data) {
            navigate(`${CUSTOMER_URL}`, {
                state: setMessageRedirectUri(
                    'success',
                    `Sửa thông tin khách hàng ${detailCustomer.fullName} thành công!`,
                ),
            });
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
            <StyleTitle>THÔNG TIN KHÁCH HÀNG</StyleTitle>
            <Row style={{ width: '100%', justifyContent: 'center' }}>
                <DetailCustomerLoader loadingarea={DETAIL_CUSTOMER_LOADER}>
                    <FormCustomer
                        onFinish={handelOnFinish}
                        isLoading={isLoading}
                        setTypeRadio={setTypeRadio}
                        typeRadio={typeRadio}
                        detailCustomer={detailCustomer}
                    />
                </DetailCustomerLoader>
            </Row>
        </div>
    );
}
export default DetailCustomer;
