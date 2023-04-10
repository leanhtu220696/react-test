import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import styled from 'styled-components';

import { DataCodeErrorCreateConstruction, DataErrorCreateConstruction } from '@/assets/data/DataErrorCallApi';
import ButtonNextAndPer from '@/component/button/BtnNextAndPer';
import FromAddAccount from '@/component/form/Account/FormAddAccount';
import { useDataCreateDeviceStore } from '@/component/hook/useDataCreateDevice';
import { useIdCheckedSelectStore } from '@/component/hook/useIdCheckedSelectStore';
import ShowConvertTypeToText from '@/component/ShowConvertTypeToText';
import { DataCreateDeviceModel } from '@/context/store/DataCreateDeviceSlice';
import { getIdCheckedSelect } from '@/context/store/IdCheckedSelectSlice';
import { useCreateConstruction } from '@/fetcher/Construction/ConstructionService';
import { useGetListCustomer } from '@/fetcher/Customer/CustomerService';
import { DetailCustomerModel } from '@/model/Customer/CustomerModel';
import { AddConstructionModel } from '@/model/Device/ActiveGatewayModel';
import { font } from '@/styles/Style-mixins';
import { TYPE_PERSONAL } from '@/util/ConstantApp/TypeConstant';
import { CONSTRUCTION_URL } from '@/util/ConstantApp/Url';
import { showMessage } from '@/util/Util';

import { setMessageRedirectUri } from '../../../../../util/Util';

const dataTextConstant = {
    titleCreate: 'TẠO MỚI TÀI KHOẢN KHÁCH HÀNG',
    titleExists: 'THÔNG TIN TÀI KHOẢN KHÁCH HÀNG',
};

const Title = styled.h2`
    ${font(16, '#000000', 600)}
`;

export const StyleBackground = styled.div`
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function FromCreateAccount({ setCurrentStep }: { setCurrentStep: (value: any) => void }) {
    const [detailCustomer, setDetailCustomer] = useState<DetailCustomerModel>();
    const [typeRadio, setTypeRadio] = useState(TYPE_PERSONAL);
    const idCheckedSelectAccount = useSelector(getIdCheckedSelect).idAccount;
    const [responseListCustomer, makeRequestListCustomer] = useGetListCustomer();
    const [listCustomer, setListCustomer] = useState<DetailCustomerModel[]>([]);
    const [disabledForm, setDisabledForm] = useState(false);
    const { dataCreateDeviceStore, setDataCreateDeviceStore } = useDataCreateDeviceStore();
    const [responseCreateConstruction, makeRequestCreateConstruction] = useCreateConstruction();
    const checkedExistsDataLocal = Boolean(dataCreateDeviceStore.accountCustomerModel);
    const [messageApi, contextHolder] = message.useMessage();
    const { setIdCheckedSelectStore } = useIdCheckedSelectStore();
    const navigate = useNavigate();
    const changeStep = (step: number, data: DataCreateDeviceModel) => {
        const changeDataLocal = (callBack: () => void) => {
            setDataCreateDeviceStore(data);
            callBack();
        };
        changeDataLocal(() => {
            setCurrentStep(step);
        });
    };
    const setValueForm = (detailCustomer: DetailCustomerModel) => {
        setDetailCustomer({
            ...detailCustomer,
        });
    };
    const setValueWhenIdSelectAccountChange = () => {
        if (idCheckedSelectAccount != -1 && listCustomer.length) {
            const detailCustomer = listCustomer.find((item) => {
                return item.id === idCheckedSelectAccount;
            });
            setDisabledForm(true);
            if (detailCustomer) {
                setValueForm(detailCustomer);
            } else {
                setValueForm(dataCreateDeviceStore.accountCustomerModel);
            }
        } else {
            setDisabledForm(false);
            setDetailCustomer({
                id: undefined,
                fullName: undefined,
                idCard: undefined,
                username: undefined,
                email: undefined,
                address: undefined,
                companyName: undefined,
                taxCode: undefined,
                type: TYPE_PERSONAL,
                position: undefined,
                representative: undefined,
                businessField: undefined,
                mainAddress: undefined,
            });
        }
    };
    useEffect(() => {
        if (responseCreateConstruction.data) {
            navigate(`${CONSTRUCTION_URL}`, { state: setMessageRedirectUri('success', 'Thêm khách hàng thành công!') });
        } else if (responseCreateConstruction.error) {
            const codeError: any = responseCreateConstruction.error.code;
            messageApi.open(showMessage('error', DataErrorCreateConstruction[codeError]));
        }
    }, [responseCreateConstruction]);
    useEffect(() => {
        makeRequestListCustomer();
    }, []);
    useEffect(() => {
        if (responseListCustomer.data) {
            setListCustomer(responseListCustomer.data);
        }
    }, [responseListCustomer]);

    useEffect(() => {
        setValueWhenIdSelectAccountChange();
    }, [idCheckedSelectAccount]);
    useEffect(() => {
        if (listCustomer.length && checkedExistsDataLocal) {
            const idExists = Boolean(dataCreateDeviceStore.accountCustomerModel.id);
            if (idExists) {
                setValueWhenIdSelectAccountChange();
            }
        }
    }, [listCustomer]);

    useEffect(() => {
        if (checkedExistsDataLocal) {
            const idExistsAccount = Boolean(dataCreateDeviceStore.accountCustomerModel.id);
            if (idExistsAccount) {
                setIdCheckedSelectStore({
                    idAccount: dataCreateDeviceStore.accountCustomerModel.id,
                });
            } else {
                setValueForm(dataCreateDeviceStore.accountCustomerModel);
            }
        }
    }, [dataCreateDeviceStore.accountCustomerModel]);

    const onFinish = (values: any) => {
        const param: AddConstructionModel = {
            ...dataCreateDeviceStore.constructionModel,
            accountCustomerModel: {
                id: values.id,
                fullName: values.fullName,
                idCard: values.idCard,
                username: values.username,
                email: values.email,
                address: values.address,
                type: typeRadio,
                accountCustomerTypeModel: {
                    position: values.position,
                    companyName: values.companyName,
                    taxCode: values.taxCode,
                    representative: values.representative,
                    businessField: values.businessField,
                    mainAddress: values.mainAddress,
                },
            },
        };
        makeRequestCreateConstruction(undefined, DataCodeErrorCreateConstruction, param);
    };

    const handleOnClickBtnPre = () => {
        if (dataCreateDeviceStore.constructionModel) {
            const idExistsAccount = Boolean(dataCreateDeviceStore.constructionModel.id);
            if (idExistsAccount === false) {
                setIdCheckedSelectStore({
                    idAccount: -1,
                });
            }
        }
        const data: DataCreateDeviceModel = {
            ...dataCreateDeviceStore,
            step: 0,
        };
        changeStep(0, data);
    };
    return (
        <div>
            {contextHolder}
            <StyleBackground>
                <Title style={{ marginBottom: `${disabledForm ? '0' : '40px'}` }}>
                    {disabledForm ? dataTextConstant.titleExists : dataTextConstant.titleCreate}
                </Title>
                {disabledForm && <ShowConvertTypeToText color={'#000'} typeRadio={typeRadio} isUpperCase={true} />}
                <FromAddAccount
                    onFinish={onFinish}
                    detailCustomer={detailCustomer}
                    disabledForm={disabledForm}
                    setTypeRadioCurrent={setTypeRadio}
                >
                    <ButtonNextAndPer
                        onClickBtnPre={handleOnClickBtnPre}
                        step={1}
                        totalStep={2}
                        htmlTypeNext={'submit'}
                    />
                </FromAddAccount>
            </StyleBackground>
        </div>
    );
}

export default FromCreateAccount;
