import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ButtonNextAndPer from '@/component/button/BtnNextAndPer';
import FormAddConstruction from '@/component/form/Construction/FormAddConstruction';
import { useCoordinatesStore } from '@/component/hook/useCoordinatesStore';
import { useDataCreateDeviceStore } from '@/component/hook/useDataCreateDevice';
import { useIdCheckedSelectStore } from '@/component/hook/useIdCheckedSelectStore';
import SearchIndex from '@/component/search/SearchIndex/SearchIndex';
import { DataCreateDeviceModel } from '@/context/store/DataCreateDeviceSlice';
import { getIdCheckedSelect } from '@/context/store/IdCheckedSelectSlice';
import { useGetListConstruction } from '@/fetcher/Construction/ConstructionService';
import { DetailConstructionModel } from '@/model/Construction/ConstructionModel';
import { DetailCustomerModel } from '@/model/Customer/CustomerModel';
import { AlertReceiverModel } from '@/model/Device/ActiveGatewayModel';
import { font } from '@/styles/Style-mixins';
import { EQUIPMENT_MANAGEMENT_URL } from '@/util/ConstantApp/Url';

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

function FormInformationConstruction({ setCurrentStep }: { setCurrentStep: (value: any) => void }) {
    const navigate = useNavigate();
    const { resetCoordinatesStore } = useCoordinatesStore();
    const [detailConstructor, setDetailConstructor] = useState<DetailConstructionModel>();
    const [disabledForm, setDisabledForm] = useState(false);
    const [idProvince, setIdProvince] = useState(-1);
    const [disabledDistrict, setDisabledDistrict] = useState(true);
    const [listAddAlertReceiver, setListAddAlertReceiver] = useState<DetailCustomerModel[]>([]);
    const [responseListConstruction, makeRequestListConstruction] = useGetListConstruction();
    const [listConstruction, setListConstruction] = useState<DetailConstructionModel[]>([]);
    const idCheckedSelectConstruction = useSelector(getIdCheckedSelect).idConstruction;
    const [messageAlertReceiver, setMessageAlertReceiver] = useState('');
    const { setIdCheckedSelectStore } = useIdCheckedSelectStore();
    const { dataCreateDeviceStore, setDataCreateDeviceStore } = useDataCreateDeviceStore();
    const checkedExistsDataLocal = Boolean(dataCreateDeviceStore.constructionModel);
    const setValueForm = (detailConstructorNew: DetailConstructionModel) => {
        setDetailConstructor((detailConstructor) => {
            return {
                ...detailConstructor,
                ...detailConstructorNew,
                alertReceiverList: detailConstructorNew.alertReceiverList,
            };
        });
    };
    const setValueWhenIdSelectConstructionChange = () => {
        if (idCheckedSelectConstruction != -1 && listConstruction.length) {
            setDisabledDistrict(true);
            const detailConstructor = listConstruction.find((item) => {
                return item.id === idCheckedSelectConstruction;
            });
            if (detailConstructor) {
                setDisabledForm(true);
                setIdProvince(detailConstructor.province.id);
                setValueForm(detailConstructor);
                setDetailConstructor((detailConstructor) => {
                    return {
                        ...detailConstructor,
                        districtId: detailConstructor.district.id,
                        provinceId: detailConstructor.province.id,
                    };
                });
            }
        } else {
            setDetailConstructor((detailConstructor) => {
                return {
                    ...detailConstructor,
                    id: undefined,
                    name: undefined,
                    type: undefined,
                    businessSector: undefined,
                    districtId: undefined,
                    provinceId: undefined,
                    fullAddress: undefined,
                    longitude: 0,
                    latitude: 0,
                    alertReceiverList: [],
                };
            });
            setDisabledForm(false);
            setMessageAlertReceiver(null);
            resetCoordinatesStore();
        }
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

    useEffect(() => {
        setValueWhenIdSelectConstructionChange();
    }, [idCheckedSelectConstruction]);
    useEffect(() => {
        if (listConstruction.length && checkedExistsDataLocal) {
            const idExists = Boolean(dataCreateDeviceStore.constructionModel.id);
            if (idExists) {
                setValueWhenIdSelectConstructionChange();
            }
        }
    }, [listConstruction]);

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
        navigate(EQUIPMENT_MANAGEMENT_URL);
    };

    return (
        <StyleBackground>
            <Title>{disabledForm ? dataTextConstant.titleExists : dataTextConstant.titleCreate}</Title>
            <SearchIndex />
            <FormAddConstruction
                hiddenSelect={false}
                disabledDistrictCurrent={disabledDistrict}
                onFinish={onFinish}
                detailConstructor={detailConstructor}
                idProvinceCurrent={idProvince}
                disabledForm={disabledForm}
                messageAlertReceiver={messageAlertReceiver}
                setListAddAlertReceiverNew={setListAddAlertReceiver}
            >
                <ButtonNextAndPer onClickBtnPre={handleOnClickBtnPre} step={0} totalStep={4} htmlTypeNext={'submit'} />
            </FormAddConstruction>
        </StyleBackground>
    );
}

export default FormInformationConstruction;
