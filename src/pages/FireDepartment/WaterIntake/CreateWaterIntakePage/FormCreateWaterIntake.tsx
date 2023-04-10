import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import styled from 'styled-components';

import { DataCodeErrorCreateWaterIntake, DataErrorCreateWaterIntake } from '@/assets/data/DataErrorCallApi';
import { BtnFormCreate } from '@/component/button/btnFormDetailAndCreate';
import FormAddWaterIntake from '@/component/form/WaterIntake/FormAddWaterIntake';
import SearchIndex from '@/component/search/SearchIndex/SearchIndex';
import { useCreateWaterIntake, useGetFireDepartmentById } from '@/fetcher/FireDepartment/FireDepartmentService';
import { CreateWaterIntakeModel } from '@/model/FireDepartment/WaterIntakeModel';
import { flex, font } from '@/styles/Style-mixins';
import { FIRE_DEPARTMENT_URL, WATER_INTAKE_URL } from '@/util/ConstantApp/Url';
import { showMessage } from '@/util/Util';

import { setMessageRedirectUri } from '../../../../util/Util';

const dataTextConstant = {
    title: 'THÊM MỚI ĐIỂM LẤY NƯỚC',
};

const StyleBackground = styled.div`
    width: 460px;
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

const StyleAddWaterIntake = styled.div`
    position: relative;
    ${flex('flex-start', 'center', 'column')}
`;
function FormCreateWaterIntake() {
    const { idDepartment } = useParams();
    const navigate = useNavigate();
    const [resCreateWaterIntake, makeReqCreateWaterIntake] = useCreateWaterIntake();
    const [messageApi, contextHolder] = message.useMessage();
    const [responseTitleHeaderTable, sendRequestGetTitleHeaderTable] = useGetFireDepartmentById(+idDepartment);
    const dataTitleHeaderTable = responseTitleHeaderTable.data;
    useEffect(() => {
        sendRequestGetTitleHeaderTable();
    }, []);
    useEffect(() => {
        if (resCreateWaterIntake.data) {
            navigate(`${FIRE_DEPARTMENT_URL}/${idDepartment}${WATER_INTAKE_URL}`, {
                state: setMessageRedirectUri('success', 'Thêm mới điểm lấy nước thành công!'),
            });
        } else if (resCreateWaterIntake.error) {
            const codeError: any = resCreateWaterIntake.error.code;
            messageApi.open(showMessage('error', DataErrorCreateWaterIntake[codeError]));
        }
    }, [resCreateWaterIntake]);
    const onFinish = (values: any) => {
        const param: CreateWaterIntakeModel = {
            fireDepartmentId: idDepartment,
            ...values,
        };
        makeReqCreateWaterIntake(undefined, DataCodeErrorCreateWaterIntake, param);
    };

    return (
        <StyleBackground>
            {contextHolder}
            <div>
                <StyleAddWaterIntake>
                    <StyleInformation>
                        <div style={{ textAlign: 'center' }}>
                            <Title>{dataTextConstant.title}</Title>
                            <p style={{ fontSize: 20, fontWeight: 700 }}>{dataTitleHeaderTable?.name}</p>
                            <p
                                style={{ fontSize: 20, fontWeight: 400 }}
                            >{`${dataTitleHeaderTable?.fullAddress} - ${dataTitleHeaderTable?.district.name} -
                             ${dataTitleHeaderTable?.province.name}`}</p>
                        </div>
                    </StyleInformation>
                </StyleAddWaterIntake>
                <SearchIndex />
                <FormAddWaterIntake
                    onFinish={onFinish}
                    disabledForm={false}
                    detailWaterIntake={undefined}
                    disabledDistrictCurrent={true}
                >
                    <BtnFormCreate handledOnClickGoBack={() => navigate(-1)} />
                </FormAddWaterIntake>
            </div>
        </StyleBackground>
    );
}

export default FormCreateWaterIntake;
