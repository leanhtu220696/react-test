import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ButtonNextAndPer from '@/component/button/BtnNextAndPer';
import FormAddConstruction from '@/component/form/Construction/FormAddConstruction';
import { useDataCreateDeviceStore } from '@/component/hook/useDataCreateDevice';
import { useIdCheckedSelectStore } from '@/component/hook/useIdCheckedSelectStore';
import SearchIndex from '@/component/search/SearchIndex/SearchIndex';
import { DataCreateDeviceModel } from '@/context/store/DataCreateDeviceSlice';
import { useGetListConstruction } from '@/fetcher/Construction/ConstructionService';
import { DetailConstructionModel } from '@/model/Construction/ConstructionModel';
import { DetailCustomerModel } from '@/model/Customer/CustomerModel';
import { AlertReceiverModel } from '@/model/Device/ActiveGatewayModel';
import { font } from '@/styles/Style-mixins';
import { CONSTRUCTION_URL } from '@/util/ConstantApp/Url';

const StyleBackground = styled.div`
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Title = styled.h2`
    ${font(16, '#000000', 600)}
`;
const dataTextConstant = {
    titleCreate: 'NHẬP THÔNG TIN CÔNG TRÌNH',
    titleExists: 'THÔNG TIN CÔNG TRÌNH',
    messageErrorRequiredAlertReceiver: 'Vui lòng chọn số điện thoại nhận cảnh báo',
};

function FormCreateConstruction({ setCurrentStep }: { setCurrentStep: (value: any) => void }) {
    const navigate = useNavigate();
    const [detailConstructor, setDetailConstructor] = useState<DetailConstructionModel>();
    const [idProvince, setIdProvince] = useState(-1);
    const [disabledDistrict, setDisabledDistrict] = useState(true);
    const [listAddAlertReceiver, setListAddAlertReceiver] = useState<DetailCustomerModel[]>([]);
    const [responseListConstruction, makeRequestListConstruction] = useGetListConstruction();
    const [listConstruction, setListConstruction] = useState<DetailConstructionModel[]>([]);
    const [messageAlertReceiver, setMessageAlertReceiver] = useState('');
    const { dataCreateDeviceStore, setDataCreateDeviceStore } = useDataCreateDeviceStore();
    const checkedExistsDataLocal = Boolean(dataCreateDeviceStore.constructionModel);
    const { setIdCheckedSelectStore } = useIdCheckedSelectStore();
    const setValueForm = (detailConstructorNew: DetailConstructionModel) => {
        setDetailConstructor((detailConstructor) => {
            return {
                ...detailConstructor,
                ...detailConstructorNew,
                alertReceiverList: detailConstructorNew.alertReceiverList,
            };
        });
    };

    useEffect(() => {
        makeRequestListConstruction();
    }, []);
    useEffect(() => {
        if (checkedExistsDataLocal) {
            const idExists = Boolean(dataCreateDeviceStore.constructionModel.id);
            if (idExists) {
                setIdCheckedSelectStore({
                    idConstruction: dataCreateDeviceStore.constructionModel.id,
                });
            } else {
                setDisabledDistrict(false);
                setTimeout(() => {
                    setValueForm(dataCreateDeviceStore.constructionModel);
                    setIdProvince(dataCreateDeviceStore.constructionModel.provinceId);
                });
            }
        }
    }, [dataCreateDeviceStore.constructionModel]);
    useEffect(() => {
        if (responseListConstruction.data) {
            setListConstruction(responseListConstruction.data);
        }
    }, [responseListConstruction]);

    const onFinish = (value: any) => {
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
            const detailConstruction = listConstruction.find((item) => {
                return item.id === value.id;
            });
            const data: DataCreateDeviceModel = {
                constructionModel: {
                    ...value,
                    alertReceiverList: listAddAlertReceiverNew,
                },
                accountCustomerModel: null,
                gatewayModel: null,
                step: 1,
            };
            if (detailConstruction) {
                data.accountCustomerModel = {
                    ...detailConstruction.accountCustomerViewable,
                };
            }
            const changeDataLocal = (callBack: () => void) => {
                setDataCreateDeviceStore(data);
                callBack();
            };
            changeDataLocal(() => {
                setCurrentStep(1);
            });
        } else {
            setMessageAlertReceiver(`${dataTextConstant.messageErrorRequiredAlertReceiver}`);
        }
    };
    const handleOnClickBtnPre = () => {
        navigate(CONSTRUCTION_URL);
    };

    return (
        <StyleBackground>
            <Title>{dataTextConstant.titleCreate}</Title>
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
                <ButtonNextAndPer onClickBtnPre={handleOnClickBtnPre} step={0} totalStep={4} htmlTypeNext={'submit'} />
            </FormAddConstruction>
        </StyleBackground>
    );
}

export default FormCreateConstruction;
