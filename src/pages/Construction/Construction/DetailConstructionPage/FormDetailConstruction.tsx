import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import styled from 'styled-components';

import { DataCodeErrorCreateConstruction, DataErrorCreateConstruction } from '@/assets/data/DataErrorCallApi';
import { BtnFormDetail } from '@/component/button/btnFormDetailAndCreate';
import FormAddConstruction from '@/component/form/Construction/FormAddConstruction';
import { useCoordinatesStore } from '@/component/hook/useCoordinatesStore';
import SearchIndex from '@/component/search/SearchIndex/SearchIndex';
import SelectAccountCustomer from '@/component/select/SelectAccountCustomer';
import { RootState } from '@/context/store';
import { toggleModal } from '@/context/store/ModalSlice';
import { DetailConstructionLoader } from '@/elements/skeleton/ExampleLoader';
import { useCreateConstruction, useGetDetailConstruction } from '@/fetcher/Construction/ConstructionService';
import { useGetDetailCustomerByUsername } from '@/fetcher/Customer/CustomerService';
import { DetailConstructionModel } from '@/model/Construction/ConstructionModel';
import { DetailCustomerModel } from '@/model/Customer/CustomerModel';
import { AddConstructionModel, AlertReceiverModel } from '@/model/Device/ActiveGatewayModel';
import { flex, font } from '@/styles/Style-mixins';
import { DETAIL_CONSTRUCTION_LOADER } from '@/util/ConstantApp/TypeLoader';
import { CONSTRUCTION_URL } from '@/util/ConstantApp/Url';
import { showMessage } from '@/util/Util';

import ModalDeleteConstruction from '../../../../component/modal/ModalDeleteConstruction';
import { setMessageRedirectUri } from '../../../../util/Util';

const dataTextConstant = {
    title: 'THÔNG TIN CÔNG TRÌNH',
    messageErrorRequiredAlertReceiver: 'Vui lòng chọn số điện thoại nhận cảnh báo',
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

const StyleAddConstruction = styled.div`
    position: relative;

    ${flex('flex-start', 'center', 'column')}
    &::before {
        content: ' ';
        position: absolute;
        bottom: -15px;
        width: 100%;
        height: 2px;
        background-color: #ccc;
    }
`;

function FormDetailConstruction() {
    const dispatch = useDispatch();
    const param = useParams();
    const navigate = useNavigate();
    const { setCoordinatesStore } = useCoordinatesStore();
    const [detailConstructor, setDetailConstructor] = useState<DetailConstructionModel>();
    const [idProvince, setIdProvince] = useState(-1);
    const [usernameCustomerModel, setIdAccountCustomerModel] = useState('');
    const { isVisible } = useSelector((state: RootState) => state.modalState);
    const [resDetailConstruction, makeReqDetailConstruction] = useGetDetailConstruction(+param.id);
    const [resDetailCustomer, makeReqDetailCustomer] = useGetDetailCustomerByUsername(usernameCustomerModel);
    const [disabledDistrict, setDisabledDistrict] = useState(true);
    const [listAddAlertReceiver, setListAddAlertReceiver] = useState<DetailCustomerModel[]>([]);
    const [resCreateConstruction, makeReqCreateConstruction] = useCreateConstruction();
    const [messageAlertReceiver, setMessageAlertReceiver] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const setValueForm = (detailConstructorNew: DetailConstructionModel) => {
        setDetailConstructor((detailConstructor) => {
            return {
                ...detailConstructor,
                ...detailConstructorNew,
                provinceId: detailConstructorNew.province.id,
                districtId: detailConstructorNew.district.id,
                alertReceiverList: detailConstructorNew.alertReceiverList,
            };
        });
    };
    useEffect(() => {
        makeReqDetailConstruction(DETAIL_CONSTRUCTION_LOADER, [404]);
    }, []);
    useEffect(() => {
        if (usernameCustomerModel) {
            makeReqDetailCustomer(undefined, [404]);
        }
    }, [usernameCustomerModel]);
    useEffect(() => {
        if (resDetailConstruction.data) {
            setDisabledDistrict(false);
            const construction = resDetailConstruction.data;
            setValueForm(construction);
            setIdProvince(construction.province.id);
            setCoordinatesStore({
                longitude: +construction.longitude,
                latitude: +construction.latitude,
            });
        } else if (resDetailConstruction.error) {
            if (resDetailConstruction.error.code == 404) {
                navigate(`${CONSTRUCTION_URL}`, {
                    state: setMessageRedirectUri('error', `Không tìm thấy thông tin Công trình!`),
                });
            }
        }
    }, [resDetailConstruction]);

    useEffect(() => {
        if (resCreateConstruction.data) {
            navigate(CONSTRUCTION_URL, {
                state: setMessageRedirectUri('success', 'Sửa thông tin công trình thành công!'),
            });
        } else if (resCreateConstruction.error) {
            const codeError: any = resCreateConstruction.error.code;
            messageApi.open(showMessage('error', DataErrorCreateConstruction[codeError]));
        }
    }, [resCreateConstruction]);
    const handledOnClickGoBack = () => {
        navigate(CONSTRUCTION_URL);
    };
    const handledOnClickDelete = () => {
        dispatch(toggleModal());
    };
    const onFinish = (values: any) => {
        if (listAddAlertReceiver.length) {
            const listAddAlertReceiverNew: AlertReceiverModel[] = [];
            listAddAlertReceiver.forEach((item) => {
                listAddAlertReceiverNew.push({
                    id: item.id,
                    username: item.username,
                    fullName: item.fullName,
                });
            });
            setMessageAlertReceiver('');
            const detailAccountCustomer = resDetailCustomer.data;
            const param: AddConstructionModel = {
                ...values,
                alertReceiverList: listAddAlertReceiverNew,
                accountCustomerModel: {
                    id: detailAccountCustomer.id,
                    fullName: detailAccountCustomer.fullName,
                    idCard: detailAccountCustomer.idCard,
                    username: detailAccountCustomer.username,
                    email: detailAccountCustomer.email,
                    address: detailAccountCustomer.address,
                    type: detailAccountCustomer.type,
                    accountCustomerTypeModel: {
                        position: detailAccountCustomer.position,
                        companyName: detailAccountCustomer.companyName,
                        taxCode: detailAccountCustomer.taxCode,
                        representative: detailAccountCustomer.representative,
                        businessField: detailAccountCustomer.businessField,
                        mainAddress: detailAccountCustomer.mainAddress,
                    },
                },
            };
            makeReqCreateConstruction(undefined, DataCodeErrorCreateConstruction, param);
        } else {
            setMessageAlertReceiver(`${dataTextConstant.messageErrorRequiredAlertReceiver}`);
        }
    };
    return (
        <StyleBackground>
            <ModalDeleteConstruction
                visible={isVisible}
                id={+param.id}
                nameConstruction={detailConstructor?.name}
                addressConstruction={detailConstructor?.fullAddress}
                handleOnClickCancel={() => {
                    dispatch(toggleModal());
                }}
            />
            {contextHolder}
            <div>
                <StyleAddConstruction>
                    <StyleInformation>
                        <Title>{dataTextConstant.title}</Title>
                    </StyleInformation>
                    <SelectAccountCustomer
                        detailAccount={detailConstructor?.accountCustomerViewable}
                        setIdAccountCustomerModel={setIdAccountCustomerModel}
                    />
                </StyleAddConstruction>
                <div style={{ marginTop: 50 }}>
                    <DetailConstructionLoader loadingarea={DETAIL_CONSTRUCTION_LOADER}>
                        <SearchIndex />
                        <FormAddConstruction
                            hiddenSelect={false}
                            disabledDistrictCurrent={disabledDistrict}
                            onFinish={onFinish}
                            detailConstructor={detailConstructor}
                            idProvinceCurrent={idProvince}
                            disabledForm={false}
                            messageAlertReceiver={messageAlertReceiver}
                            setListAddAlertReceiverNew={setListAddAlertReceiver}
                        >
                            <BtnFormDetail
                                handledOnClickGoBack={handledOnClickGoBack}
                                handledOnClickDelete={handledOnClickDelete}
                            />
                        </FormAddConstruction>
                    </DetailConstructionLoader>
                </div>
            </div>
        </StyleBackground>
    );
}

export default FormDetailConstruction;
