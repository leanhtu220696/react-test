import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import ButtonNextAndPer from '@/component/button/BtnNextAndPer';
import FromAddAccount from '@/component/form/Account/FormAddAccount';
import { useDataCreateDeviceStore } from '@/component/hook/useDataCreateDevice';
import { useIdCheckedSelectStore } from '@/component/hook/useIdCheckedSelectStore';
import ShowConvertTypeToText from '@/component/ShowConvertTypeToText';
import { DataCreateDeviceModel } from '@/context/store/DataCreateDeviceSlice';
import { getIdCheckedSelect } from '@/context/store/IdCheckedSelectSlice';
import { useGetListCustomer } from '@/fetcher/Customer/CustomerService';
import { DetailCustomerModel } from '@/model/Customer/CustomerModel';
import { font } from '@/styles/Style-mixins';
import { TYPE_PERSONAL } from '@/util/ConstantApp/TypeConstant';

const dataTextConstant = {
    titleCreate: 'TẠO MỚI TÀI KHOẢN KHÁCH HÀNG',
    titleExists: 'THÔNG TIN TÀI KHOẢN KHÁCH HÀNG',
    desExistsPersonal: 'KHÁCH HÀNG CÁ NHÂN',
    desExistsHouseholdBusiness: 'KHÁCH HÀNG HỘ KINH DOANH',
    desExistsEnterprise: 'KHÁCH HÀNG DOANH NGHIỆP',
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
    const checkedExistsDataLocal = Boolean(dataCreateDeviceStore.accountCustomerModel);
    const { setIdCheckedSelectStore } = useIdCheckedSelectStore();
    const changeStep = (step: number, data: DataCreateDeviceModel) => {
        const changeDataLocal = (callBack: () => void) => {
            setDataCreateDeviceStore(data);
            callBack();
        };
        changeDataLocal(() => {
            setTimeout(() => {
                setCurrentStep(step);
            }, 100);
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

    const onFinish = (value: any) => {
        const data: DataCreateDeviceModel = {
            ...dataCreateDeviceStore,
            accountCustomerModel: {
                ...value,
                type: typeRadio,
            },
            step: 2,
        };
        changeStep(2, data);
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
                <ButtonNextAndPer onClickBtnPre={handleOnClickBtnPre} step={1} totalStep={4} htmlTypeNext={'submit'} />
            </FromAddAccount>
        </StyleBackground>
    );
}
export default FromCreateAccount;
