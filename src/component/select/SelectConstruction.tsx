import { useEffect, useState } from 'react';
import { Col, Select } from 'antd';

import { useGetListConstruction } from '@/fetcher/Construction/ConstructionService';
import { DetailConstructionModel } from '@/model/Construction/ConstructionModel';
import { StyleBackgroundSelect } from '@/styles/form';

import { useDataCreateDeviceStore } from '../hook/useDataCreateDevice';
import { useIdCheckedSelectStore } from '../hook/useIdCheckedSelectStore';

const dataTextConstant = {
    label: 'Chọn/tạo mới công trình',
    nameCreateConstruction: 'Tạo mới công trình',
    placeholderSelect: 'Chọn công trình',
};
const SelectConstruction = () => {
    const [responseListConstruction, makeRequestListConstruction] = useGetListConstruction();
    const [listConstruction, setListConstruction] = useState<DetailConstructionModel[]>([]);
    const [value, setValue] = useState(-1);
    const { dataCreateDeviceStore } = useDataCreateDeviceStore();
    const { setIdCheckedSelectStore } = useIdCheckedSelectStore();
    useEffect(() => {
        makeRequestListConstruction();
    }, []);
    useEffect(() => {
        const checkedExistsDataLocal = Boolean(dataCreateDeviceStore.constructionModel);
        if (checkedExistsDataLocal) {
            const idExists = Boolean(dataCreateDeviceStore.constructionModel.id);
            if (idExists) {
                setValue(dataCreateDeviceStore.constructionModel.id);
            }
        }
    }, [dataCreateDeviceStore.constructionModel]);
    useEffect(() => {
        if (responseListConstruction.data) {
            const dataNew: DetailConstructionModel[] = [
                {
                    id: -1,
                    name: `${dataTextConstant.nameCreateConstruction}`,
                    accountCustomerViewable: null,
                    type: '',
                    businessSector: '',
                    district: null,
                    province: null,
                    fullAddress: '',
                    longitude: 0,
                    latitude: 0,
                    alertReceiverList: [],
                },
                ...responseListConstruction.data,
            ];
            setListConstruction(dataNew);
        }
    }, [responseListConstruction]);

    const onChange = (value: number) => {
        setValue(value);
        setIdCheckedSelectStore({
            idConstruction: value,
        });
    };

    return (
        <StyleBackgroundSelect>
            <Col span={8}>
                <label>{dataTextConstant.label}</label>
            </Col>
            <Col span={16}>
                <Select
                    size={'large'}
                    value={value}
                    showSearch
                    style={{ width: '100%' }}
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={(input, option) =>
                        (`${option?.label}` ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={listConstruction.map((item, index) => {
                        if (index === 0) {
                            return {
                                value: item.id,
                                label: <b style={{ color: '#1890ff' }}>{item.name}</b>,
                            };
                        } else {
                            return {
                                value: item.id,
                                label: item.name,
                            };
                        }
                    })}
                />
            </Col>
        </StyleBackgroundSelect>
    );
};

export default SelectConstruction;
