import { useEffect, useState } from 'react';
import { Col, Select } from 'antd';

import { useGetListCustomer } from '@/fetcher/Customer/CustomerService';
import { DetailCustomerModel } from '@/model/Customer/CustomerModel';
import { StyleBackgroundSelect } from '@/styles/form';

import { useIdCheckedSelectStore } from '../hook/useIdCheckedSelectStore';

const dataTextConstant = {
    label: 'Tài khoản khách hàng',
    nameCreateAccount: 'Tạo mới tài khoản',
    placeholderSelect: 'Chọn tài khoản',
};
const SelectAccountCustomer = ({
    detailAccount,
    setIdAccountCustomerModel,
}: {
    detailAccount: DetailCustomerModel;
    setIdAccountCustomerModel: (value: any) => void;
}) => {
    const [responseListCustomer, makeRequestListCustomer] = useGetListCustomer();
    const [listCustomer, setListCustomer] = useState<DetailCustomerModel[]>([]);
    const [value, setValue] = useState('');
    const disabledForm = false;
    const { setIdCheckedSelectStore } = useIdCheckedSelectStore();
    useEffect(() => {
        makeRequestListCustomer();
    }, []);
    useEffect(() => {
        setIdAccountCustomerModel(value);
    }, [value]);
    useEffect(() => {
        if (detailAccount) {
            setValue(detailAccount.username);
            setListCustomer((state) => {
                return [...state, detailAccount];
            });
        }
    }, [detailAccount]);
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

    const onChange = (value: string) => {
        setValue(value);
        setIdCheckedSelectStore({
            idAccount: +value,
        });
    };

    const filterOption = (input: any, option: any) => {
        const name = option?.label.props.children[0];
        const phoneNumber = option?.label.props.children[2];
        return (`${name} - ${phoneNumber}` ?? '').toLowerCase().includes(input.toLowerCase());
    };
    return (
        <StyleBackgroundSelect isrequired={'true'}>
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
                                value: item.username,
                                label: <b style={{ color: '#1890ff' }}>{item.fullName}</b>,
                            };
                        } else {
                            return {
                                value: item.username,
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

export default SelectAccountCustomer;
