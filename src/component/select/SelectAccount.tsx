import { useEffect, useState } from 'react';
import { Col, Select } from 'antd';

import { useGetListCustomer } from '@/fetcher/Customer/CustomerService';
import { DetailCustomerModel } from '@/model/Customer/CustomerModel';
import { StyleBackgroundSelect } from '@/styles/form';

import { useDataCreateDeviceStore } from '../hook/useDataCreateDevice';
import { useIdCheckedSelectStore } from '../hook/useIdCheckedSelectStore';

const dataTextConstant = {
    label: 'Chọn/tạo mới tài khoản',
    nameCreateAccount: 'Tạo mới tài khoản',
    placeholderSelect: 'Chọn tài khoản',
};
const SelectAccount = () => {
    const [responseListCustomer, makeRequestListCustomer] = useGetListCustomer();
    const [listCustomer, setListCustomer] = useState<DetailCustomerModel[]>([]);
    const [value, setValue] = useState(-1);
    const [disabledForm, setDisabledForm] = useState(false);
    const { dataCreateDeviceStore } = useDataCreateDeviceStore();
    const { setIdCheckedSelectStore } = useIdCheckedSelectStore();
    useEffect(() => {
        makeRequestListCustomer();
    }, []);
    useEffect(() => {
        const checkedExistsDataLocal = Boolean(dataCreateDeviceStore.accountCustomerModel);
        if (checkedExistsDataLocal) {
            const idExists = Boolean(dataCreateDeviceStore.constructionModel.id);
            if (idExists) {
                setDisabledForm(true);
            } else {
                const idExistsAccount = Boolean(dataCreateDeviceStore.accountCustomerModel.id);
                if (idExistsAccount) {
                    setValue(dataCreateDeviceStore.accountCustomerModel.id);
                }
                setDisabledForm(false);
            }
        }
    }, [dataCreateDeviceStore.accountCustomerModel]);
    useEffect(() => {
        if (responseListCustomer.data) {
            const dataNew = [
                {
                    id: -1,
                    fullName: `${dataTextConstant.nameCreateAccount}`,
                    idCard: '',
                    username: '',
                    email: '',
                    address: '',
                    type: '',
                    position: '',
                    companyName: '',
                    taxCode: '',
                    representative: '',
                    businessField: '',
                    mainAddress: '',
                },
                ...responseListCustomer.data,
            ];
            setListCustomer(dataNew);
        }
    }, [responseListCustomer]);

    const onChange = (value: number) => {
        setValue(value);
        setIdCheckedSelectStore({ idAccount: value });
    };

    const filterOption = (input: any, option: any) => {
        const name = option?.label.props.children[0];
        const phoneNumber = option?.label.props.children[2];
        return (`${name} - ${phoneNumber}` ?? '').toLowerCase().includes(input.toLowerCase());
    };
    return (
        <StyleBackgroundSelect>
            <Col span={8}>
                <label>{dataTextConstant.label}</label>
            </Col>
            <Col span={16}>
                <Select
                    size={'large'}
                    disabled={disabledForm}
                    showSearch
                    style={{ width: '100%' }}
                    value={value}
                    placeholder={dataTextConstant.placeholderSelect}
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={filterOption}
                    options={listCustomer.map((item, index) => {
                        if (index === 0) {
                            return {
                                value: item.id,
                                label: <b style={{ color: '#1890ff' }}>{item.fullName}</b>,
                            };
                        } else {
                            return {
                                value: item.id,
                                label: (
                                    <>
                                        {item.username} - {item.fullName}
                                    </>
                                ),
                            };
                        }
                    })}
                />
            </Col>
        </StyleBackgroundSelect>
    );
};

export default SelectAccount;
