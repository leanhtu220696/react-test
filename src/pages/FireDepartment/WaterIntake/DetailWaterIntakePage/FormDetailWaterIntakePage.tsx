import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import styled from 'styled-components';

import { DataCodeErrorCreateWaterIntake, DataErrorCreateWaterIntake } from '@/assets/data/DataErrorCallApi';
import { BtnFormDetail } from '@/component/button/btnFormDetailAndCreate';
import FormAddWaterIntake from '@/component/form/WaterIntake/FormAddWaterIntake';
import { useCoordinatesStore } from '@/component/hook/useCoordinatesStore';
import SearchIndex from '@/component/search/SearchIndex/SearchIndex';
import { DetailWaterIntakeLoader } from '@/elements/skeleton/ExampleLoader';
import {
    useCreateWaterIntake,
    useGetDetailWater,
    useGetFireDepartmentById,
} from '@/fetcher/FireDepartment/FireDepartmentService';
import { CreateWaterIntakeModel, DetailWaterIntakeModel } from '@/model/FireDepartment/WaterIntakeModel';
import { flex, font } from '@/styles/Style-mixins';
import { DETAIL_CUSTOMER_LOADER } from '@/util/ConstantApp/TypeLoader';
import { FIRE_DEPARTMENT_URL, WATER_INTAKE_URL } from '@/util/ConstantApp/Url';
import { showMessage } from '@/util/Util';

import ModalDeleteWaterIntake from '../../../../component/modal/ModalDeleteWaterIntake';
import { setMessageRedirectUri } from '../../../../util/Util';

const dataTextConstant = {
    title: 'THÔNG TIN ĐIỂM LẤY NƯỚC',
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
function FormDetailWaterIntake() {
    const { idDepartment, idWaterIntake } = useParams();
    const navigate = useNavigate();
    const { setCoordinatesStore } = useCoordinatesStore();
    const [idProvince, setIdProvince] = useState(-1);
    const [detailWaterIntake, setDetailWaterIntake] = useState<DetailWaterIntakeModel>();
    const [resDetailWaterIntake, makeReqWaterIntake] = useGetDetailWater(+idDepartment, +idWaterIntake);
    const [disabledDistrict, setDisabledDistrict] = useState(true);
    const [resCreateWaterIntake, makeReqCreateWaterIntake] = useCreateWaterIntake();
    const [messageApi, contextHolder] = message.useMessage();
    const [responseTitleHeaderTable, sendRequestGetTitleHeaderTable] = useGetFireDepartmentById(+idDepartment);
    const dataTitleHeaderTable = responseTitleHeaderTable.data;
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        sendRequestGetTitleHeaderTable(DETAIL_CUSTOMER_LOADER, [404, 467]);
    }, []);
    const setValueForm = (detailWaterIntakeNew: DetailWaterIntakeModel) => {
        setDetailWaterIntake((detailWaterIntake) => {
            return {
                ...detailWaterIntake,
                ...detailWaterIntakeNew,
                provinceId: detailWaterIntakeNew.province.id,
                districtId: detailWaterIntakeNew.district.id,
            };
        });
    };

    useEffect(() => {
        makeReqWaterIntake();
    }, []);
    useEffect(() => {
        if (resDetailWaterIntake.data) {
            setDisabledDistrict(false);
            const waterIntake = resDetailWaterIntake.data;
            setValueForm(waterIntake);
            setIdProvince(waterIntake.province.id);
            setCoordinatesStore({
                longitude: +waterIntake.longitude,
                latitude: +waterIntake.latitude,
            });
        } else if (resDetailWaterIntake.error) {
            if (resDetailWaterIntake.error.code == 467)
                navigate(`${FIRE_DEPARTMENT_URL}/${idDepartment}${WATER_INTAKE_URL}`, {
                    state: setMessageRedirectUri('error', `Không tìm thấy điểm lấy nước.`),
                });
        }
    }, [resDetailWaterIntake]);

    useEffect(() => {
        if (resCreateWaterIntake.data) {
            navigate(`${FIRE_DEPARTMENT_URL}/${idDepartment}${WATER_INTAKE_URL}`, {
                state: setMessageRedirectUri('success', 'Sửa thông tin điểm lấy nước thành công!'),
            });
        } else if (resCreateWaterIntake.error) {
            const codeError: any = resCreateWaterIntake.error.code;
            messageApi.open(showMessage('error', DataErrorCreateWaterIntake[codeError]));
        }
    }, [resCreateWaterIntake]);
    const onFinish = (values: any) => {
        const param: CreateWaterIntakeModel = {
            fireDepartmentId: idDepartment,
            id: idWaterIntake,
            ...values,
        };
        makeReqCreateWaterIntake(undefined, DataCodeErrorCreateWaterIntake, param);
    };

    return (
        <StyleBackground>
            <ModalDeleteWaterIntake
                visible={isVisible}
                idWaterIntake={+idWaterIntake}
                idDepartment={+idDepartment}
                nameWaterIntake={detailWaterIntake?.name}
                addressWaterIntake={detailWaterIntake?.fullAddress}
                handleOnClickCancel={() => setIsVisible(false)}
            />
            {contextHolder}
            <div>
                <DetailWaterIntakeLoader loadingarea={DETAIL_CUSTOMER_LOADER}>
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
                        disabledDistrictCurrent={disabledDistrict}
                        onFinish={onFinish}
                        idProvinceCurrent={idProvince}
                        disabledForm={false}
                        detailWaterIntake={detailWaterIntake}
                    >
                        <BtnFormDetail
                            handledOnClickGoBack={() => navigate(-1)}
                            handledOnClickDelete={() => setIsVisible(true)}
                        />
                    </FormAddWaterIntake>
                </DetailWaterIntakeLoader>
            </div>
        </StyleBackground>
    );
}

export default FormDetailWaterIntake;
