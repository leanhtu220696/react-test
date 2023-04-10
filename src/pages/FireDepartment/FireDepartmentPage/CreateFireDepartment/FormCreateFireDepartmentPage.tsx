import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import styled from 'styled-components';

import { DataCodeErrorCreateFireDepartment, DataErrorCreateFireDepartment } from '@/assets/data/DataErrorCallApi';
import { BtnFormCreate } from '@/component/button/btnFormDetailAndCreate';
import FormAddFireDepartment from '@/component/form/FireDipartment/FormAddFireDepartment';
import SearchIndex from '@/component/search/SearchIndex/SearchIndex';
import { useCreateFireDepartment } from '@/fetcher/FireDepartment/FireDepartmentService';
import { CreateFireDepartmentModel } from '@/model/FireDepartment/FireDepartmentModel';
import { flex, font } from '@/styles/Style-mixins';
import { FIRE_DEPARTMENT_URL } from '@/util/ConstantApp/Url';
import { showMessage } from '@/util/Util';

import { setMessageRedirectUri } from '../../../../util/Util';

const dataTextConstant = {
    title: 'THÊM MỚI ĐƠN VỊ PCCC',
};

const StyleBackground = styled.div`
    width: 420px;
    margin: 0 20px;
    padding: 20px 0;
    background-color: #ffffff;
    box-shadow: 5px 0 5px #ccc;
    @media (max-width: 576px) {
        width: 100%;
        margin: 0;
        padding: 0;
    }

    & > div {
        min-height: 100vh;
        padding: 20px 20px;
        overflow: hidden;
        ::-webkit-scrollbar {
            width: 0;
        }
        @media (max-width: 576px) {
            height: 50vh;
        }
    }
    .ant-steps-item-title {
        flex-wrap: wrap;
        width: 115px;
        ${font(12, '#000', 500)};
    }
    @media (max-width: 576px) {
        .ant-steps {
            padding: 0 30px;
        }
    }
`;
const Title = styled.h2`
    ${font(20, '#000000', 600)}
`;

const StyleInformation = styled.div`
    margin-bottom: 20px;
`;

const StyleAddFireDepartment = styled.div`
    position: relative;
    ${flex('flex-start', 'center', 'column')}
`;
function FormCreateFireDepartment() {
    const navigate = useNavigate();
    const [resCreateFireDepartment, makeReqCreateFireDepartment] = useCreateFireDepartment();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (resCreateFireDepartment.data) {
            navigate(`${FIRE_DEPARTMENT_URL}`, {
                state: setMessageRedirectUri('success', 'Thêm mới đơn vị PCCC thành công!'),
            });
        } else if (resCreateFireDepartment.error) {
            const codeError: any = resCreateFireDepartment.error.code;
            messageApi.open(showMessage('error', DataErrorCreateFireDepartment[codeError]));
        }
    }, [resCreateFireDepartment]);
    const onFinish = (values: any) => {
        const param: CreateFireDepartmentModel = {
            ...values,
        };
        makeReqCreateFireDepartment(undefined, DataCodeErrorCreateFireDepartment, param);
    };
    return (
        <StyleBackground>
            {contextHolder}
            <div>
                <StyleAddFireDepartment>
                    <StyleInformation>
                        <Title style={{ textAlign: 'center' }}>{dataTextConstant.title}</Title>
                    </StyleInformation>
                </StyleAddFireDepartment>
                <SearchIndex />
                <FormAddFireDepartment
                    onFinish={onFinish}
                    disabledForm={false}
                    detailFireDepartment={undefined}
                    disabledDistrictCurrent={true}
                >
                    <div style={{ marginTop: 100 }}>
                        <BtnFormCreate handledOnClickGoBack={() => navigate(-1)} />
                    </div>
                </FormAddFireDepartment>
            </div>
        </StyleBackground>
    );
}

export default FormCreateFireDepartment;
