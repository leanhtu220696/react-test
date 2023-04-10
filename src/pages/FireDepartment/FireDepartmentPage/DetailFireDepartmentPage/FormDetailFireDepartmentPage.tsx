import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import styled from 'styled-components';

import { DataCodeErrorCreateFireDepartment, DataErrorCreateFireDepartment } from '@/assets/data/DataErrorCallApi';
import { BtnFormDetail } from '@/component/button/btnFormDetailAndCreate';
import FormAddFireDepartment from '@/component/form/FireDipartment/FormAddFireDepartment';
import { useCoordinatesStore } from '@/component/hook/useCoordinatesStore';
import ModalDeleteFireDepartment from '@/component/modal/ModalDeleteFireDepartment';
import SearchIndex from '@/component/search/SearchIndex/SearchIndex';
import { DetailDepartmentLoader } from '@/elements/skeleton/ExampleLoader';
import {
    useCreateFireDepartment,
    useGetFireDepartmentById,
    useGetListSoldier,
} from '@/fetcher/FireDepartment/FireDepartmentService';
import { CreateFireDepartmentModel, DetailFireDepartmentModel } from '@/model/FireDepartment/FireDepartmentModel';
import { DetailSoldierModel } from '@/model/FireDepartment/SoldierModel';
import { flex, font } from '@/styles/Style-mixins';
import { DETAIL_CUSTOMER_LOADER } from '@/util/ConstantApp/TypeLoader';
import { FIRE_DEPARTMENT_URL } from '@/util/ConstantApp/Url';
import { showMessage } from '@/util/Util';

import { setMessageRedirectUri } from '../../../../util/Util';

const dataTextConstant = {
    title: 'THÔNG TIN ĐƠN VỊ PCCC',
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
function FormDetailFireDepartment() {
    const { idDepartment } = useParams();
    const navigate = useNavigate();
    const [idProvince, setIdProvince] = useState(-1);
    const [resCreateFireDepartment, makeReqCreateFireDepartment] = useCreateFireDepartment();
    const [detailFireDepartment, setDetailFireDepartment] = useState<DetailFireDepartmentModel>();
    const [resDetailFireDepartment, makeReqFireDepartment] = useGetFireDepartmentById(+idDepartment);
    const [disabledDistrict, setDisabledDistrict] = useState(true);
    const { setCoordinatesStore } = useCoordinatesStore();
    const [messageApi, contextHolder] = message.useMessage();
    const [responseListSoldier, makeListSoldierRequest] = useGetListSoldier(+idDepartment, 0, 30, '');
    const [listSoldier, setListSoldier] = useState<DetailSoldierModel[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const setValueForm = (detailFireDepartmentNew: DetailFireDepartmentModel) => {
        setDetailFireDepartment((detailFireDepartment) => {
            return {
                ...detailFireDepartment,
                ...detailFireDepartmentNew,
                provinceId: detailFireDepartmentNew.province.id,
                districtId: detailFireDepartmentNew.district.id,
            };
        });
    };
    useEffect(() => {
        if (responseListSoldier.data) {
            setListSoldier(responseListSoldier?.data?.firefighterViewList);
        }
    }, [responseListSoldier]);
    useEffect(() => {
        makeListSoldierRequest(DETAIL_CUSTOMER_LOADER, [404, 465]);
        makeReqFireDepartment();
    }, []);
    useEffect(() => {
        if (resDetailFireDepartment.data) {
            setDisabledDistrict(false);
            const fireDepartment = resDetailFireDepartment.data;
            setValueForm(fireDepartment);
            setIdProvince(fireDepartment.province.id);
            setCoordinatesStore({
                longitude: +fireDepartment.longitude,
                latitude: +fireDepartment.latitude,
            });
        } else if (resDetailFireDepartment.error) {
            if (resDetailFireDepartment.error.code == 465)
                navigate(`${FIRE_DEPARTMENT_URL}`, {
                    state: setMessageRedirectUri('error', `Cơ sở PCCC không tồn tại.`),
                });
        }
    }, [resDetailFireDepartment]);
    useEffect(() => {
        if (resCreateFireDepartment.data) {
            navigate(`${FIRE_DEPARTMENT_URL}`, {
                state: setMessageRedirectUri('success', 'Sửa thông tin đơn vị PCCC thành công!'),
            });
        } else if (resCreateFireDepartment.error) {
            const codeError: any = resCreateFireDepartment.error.code;
            messageApi.open(showMessage('error', DataErrorCreateFireDepartment[codeError]));
        }
    }, [resCreateFireDepartment]);
    const onFinish = (values: any) => {
        const param: CreateFireDepartmentModel = {
            id: idDepartment,
            ...values,
        };
        makeReqCreateFireDepartment(undefined, DataCodeErrorCreateFireDepartment, param);
    };

    return (
        <StyleBackground>
            <ModalDeleteFireDepartment
                visible={isVisible}
                idDepartment={+idDepartment}
                nameFireDepartment={detailFireDepartment?.name}
                addressFireDepartment={detailFireDepartment?.fullAddress}
                handleOnClickCancel={() => setIsVisible(false)}
            />
            {contextHolder}
            <div>
                <DetailDepartmentLoader loadingarea={DETAIL_CUSTOMER_LOADER}>
                    <StyleAddFireDepartment>
                        <StyleInformation>
                            <Title style={{ textAlign: 'center' }}>{dataTextConstant.title}</Title>
                        </StyleInformation>
                    </StyleAddFireDepartment>
                    <SearchIndex />
                    <FormAddFireDepartment
                        onFinish={onFinish}
                        disabledForm={false}
                        detailFireDepartment={detailFireDepartment}
                        disabledDistrictCurrent={disabledDistrict}
                        idProvinceCurrent={idProvince}
                        listSoldier={listSoldier}
                    >
                        <div style={{ marginTop: 100 }}>
                            <BtnFormDetail
                                handledOnClickGoBack={() => navigate(-1)}
                                handledOnClickDelete={() => setIsVisible(true)}
                            />
                        </div>
                    </FormAddFireDepartment>
                </DetailDepartmentLoader>
            </div>
        </StyleBackground>
    );
}

export default FormDetailFireDepartment;
