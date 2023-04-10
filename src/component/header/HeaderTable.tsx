import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import locale from 'antd/es/date-picker/locale/vi_VN';
import styled from 'styled-components';

import { dateSelectTypeCustomer } from '@/assets/data/DataConstant';
import { addRoom } from '@/context/store/ModalSlice';
import { useGetListDistrict, useGetListProvince } from '@/fetcher/Service';
import { StyledFormHeaderTable } from '@/styles/table';
import {
    CONSTRUCTION_URL,
    CUSTOMER_URL,
    DEVICE_URL,
    FIRE_DEPARTMENT_URL,
    FIRE_LOG_URL,
    ROOM_URL,
    SOLDIERS_URL,
} from '@/util/ConstantApp/Url';

const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';
const StyleListSelect = styled.div`
    display: flex;
    flex-direction: row;

    .ant-select-selector {
        width: 130px !important;
    }

    .ant-select-show-arrow {
        width: 130px;
    }
`;

interface ElementListModel {
    btnAddNew: boolean;
    btnSearch: boolean;
    inputSearch: boolean;
    selectProvince: boolean;
    selectDistrict: boolean;
    selectTypeCustomer: boolean;
    chooseDate: boolean;
    selectModelId: boolean;
}

const checkPageCurrent = () => {
    const pathName = location.pathname;
    const result: ElementListModel = {
        btnAddNew: true,
        btnSearch: false,
        inputSearch: false,
        selectProvince: false,
        selectDistrict: false,
        selectTypeCustomer: false,
        chooseDate: false,
        selectModelId: false,
    };
    const isRoomPage = pathName.includes(ROOM_URL);
    const isConstructionPage = pathName.includes(CONSTRUCTION_URL);
    const isDepartmentPage = pathName.includes(FIRE_DEPARTMENT_URL);
    const isSoldiersPage = pathName.includes(SOLDIERS_URL);
    const isCustomerPage = pathName.includes(CUSTOMER_URL);
    const isFireLogPage = pathName.includes(FIRE_LOG_URL);
    const isDevice = pathName.includes(DEVICE_URL);
    if (isDevice) {
        return {
            ...result,
            btnSearch: false,
            inputSearch: false,
            btnAddNew: false,
            selectModelId: false,
        };
    } else if (isRoomPage) {
        return result;
    } else if (isConstructionPage) {
        return {
            ...result,
            btnSearch: true,
            inputSearch: true,
            selectProvince: true,
            selectDistrict: true,
        };
    } else if (isSoldiersPage) {
        return {
            ...result,
            btnSearch: true,
            inputSearch: true,
        };
    } else if (isDepartmentPage) {
        return {
            ...result,
            btnSearch: true,
            inputSearch: true,
            selectProvince: true,
            selectDistrict: true,
        };
    } else if (isCustomerPage) {
        return {
            ...result,
            btnSearch: true,
            inputSearch: true,
            selectTypeCustomer: true,
        };
    } else if (isFireLogPage) {
        return {
            ...result,
            btnSearch: false,
            inputSearch: false,
            chooseDate: false,
            btnAddNew: false,
        };
    }
    return result;
};
const dataTextConstant = {
    placeholderSearch: 'Nhập thông tin tìm kiếm',
    btnSearch: 'Tìm kiếm',
    btnAddNew: 'Thêm mới',
    placeholderSelectTypeCustomer: 'Đối tượng khách hàng',
    placeholderSelectProvince: 'Tỉnh thành',
    placeholderSelectDistrict: 'Quận/huyện',
};

interface Props {
    linkBtnAdd: string;
    title: string;
    name: string;
    address: string;
    searchingInputPlaceHolder?: string;
    isLoadingBtnSearch?: boolean;
    onFinish?: React.Dispatch<React.SetStateAction<any>>;
}

function HeaderTable({
    linkBtnAdd,
    title,
    name,
    address,
    onFinish,
    searchingInputPlaceHolder,
    isLoadingBtnSearch,
}: Props) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [responseListProvince, makeRequestListProvince] = useGetListProvince();
    const [idProvince, setIdProvince] = useState(-1);
    const [responseListDistrict, makeRequestListDistrict] = useGetListDistrict(idProvince);
    const [disabledDistrict, setDisabledDistrict] = useState(true);
    const [listProvince, setListProvince] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        makeRequestListProvince();
    }, []);
    useEffect(() => {
        if (responseListDistrict.data) {
            const list = responseListDistrict.data;
            list.unshift({ id: -1, name: 'Tất cả', latitude: undefined, longitude: undefined });
            setListDistrict(list);
        }
    }, [responseListDistrict]);
    useEffect(() => {
        if (responseListProvince.data) {
            const list = responseListProvince.data;
            list.unshift({ id: -1, name: 'Tất cả', latitude: undefined, longitude: undefined });
            setListProvince(list);
        }
    }, [responseListProvince]);
    useEffect(() => {
        if (idProvince !== -1) {
            makeRequestListDistrict();
        } else {
            setDisabledDistrict(true);
        }
    }, [idProvince]);
    const handleOnChangeSelectProvince = (values: any) => {
        setDisabledDistrict(false);
        setIdProvince(values);
        form.setFieldsValue({ districtId: undefined });
    };
    const handleOnChangeSelectDistrict = (values: any) => {
        console.log('_values', values);
    };
    const HandleOnFinishSearch = (values: any) => {
        if (typeof onFinish === 'function') {
            onFinish(values);
        }
    };
    const valueTypeCustomer = Object.values(dateSelectTypeCustomer);
    const keyTypeCustomer = Object.keys(dateSelectTypeCustomer);

    const typeCustomerOptions = valueTypeCustomer.map((v, i) => ({ value: keyTypeCustomer[i], label: v }));

    return (
        <div>
            <div style={{ textAlign: 'center', marginTop: 25, marginBottom: 25 }}>
                <div style={{ marginBottom: 10 }}>
                    <p style={{ fontSize: 22, fontWeight: 700 }}>{title ? title : ''}</p>
                    <p style={{ fontSize: 20, fontWeight: 700 }}>{name ? name : ''}</p>
                    <p style={{ fontSize: 20, fontWeight: 400 }}>{address ? address : ''}</p>
                </div>
            </div>
            <StyledFormHeaderTable form={form} onFinish={HandleOnFinishSearch}>
                {checkPageCurrent().inputSearch && (
                    <StyledFormHeaderTable.Item name="inputSearch">
                        <Input
                            placeholder={
                                searchingInputPlaceHolder
                                    ? searchingInputPlaceHolder
                                    : dataTextConstant.placeholderSelectTypeCustomer
                            }
                        />
                    </StyledFormHeaderTable.Item>
                )}
                {checkPageCurrent().chooseDate && (
                    <StyledFormHeaderTable.Item name="chooseDate">
                        <RangePicker placeholder={['Từ ngày', 'Đến ngày']} locale={locale} format={dateFormat} />
                    </StyledFormHeaderTable.Item>
                )}
                {checkPageCurrent().selectTypeCustomer && (
                    <StyledFormHeaderTable.Item name="typeCustomer">
                        <Select
                            style={{ width: '130px !important' }}
                            placeholder={dataTextConstant.placeholderSelectTypeCustomer}
                            options={typeCustomerOptions}
                        ></Select>
                    </StyledFormHeaderTable.Item>
                )}
                <StyleListSelect>
                    {checkPageCurrent().selectProvince && (
                        <StyledFormHeaderTable.Item name="provinceId">
                            <Select
                                style={{ width: '130px !important' }}
                                placeholder={dataTextConstant.placeholderSelectProvince}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                onChange={handleOnChangeSelectProvince}
                                options={listProvince.map((item) => {
                                    return {
                                        value: item.id,
                                        label: item.name,
                                    };
                                })}
                            ></Select>
                        </StyledFormHeaderTable.Item>
                    )}
                    {checkPageCurrent().selectDistrict && (
                        <StyledFormHeaderTable.Item name="districtId">
                            <Select
                                disabled={disabledDistrict}
                                placeholder={dataTextConstant.placeholderSelectDistrict}
                                showSearch
                                onChange={handleOnChangeSelectDistrict}
                                optionFilterProp="children"
                                filterOption={(input, option) => {
                                    return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
                                }}
                                options={listDistrict.map((item) => {
                                    return {
                                        value: item.id,
                                        label: item.name,
                                    };
                                })}
                            ></Select>
                        </StyledFormHeaderTable.Item>
                    )}
                    {checkPageCurrent().selectModelId && (
                        <StyledFormHeaderTable.Item name="modelId">
                            <Select style={{ width: '130px !important' }} placeholder={'Model'}></Select>
                        </StyledFormHeaderTable.Item>
                    )}
                </StyleListSelect>
                {checkPageCurrent().btnSearch && (
                    <Button
                        style={{ width: 130 }}
                        loading={!!isLoadingBtnSearch}
                        type="primary"
                        size="large"
                        htmlType="submit"
                    >
                        {dataTextConstant.btnSearch}
                        {<SearchOutlined style={{ fontSize: 18 }} />}
                    </Button>
                )}
                {checkPageCurrent().btnAddNew && (
                    <div style={{ float: 'right', marginLeft: 'auto' }}>
                        <Button
                            htmlType="button"
                            style={{ width: 130 }}
                            type="primary"
                            size="large"
                            icon={<PlusOutlined style={{ fontSize: 20 }} />}
                            onClick={() => {
                                if (!linkBtnAdd) {
                                    dispatch(addRoom());
                                } else {
                                    navigate(linkBtnAdd);
                                }
                            }}
                        >
                            {dataTextConstant.btnAddNew}
                        </Button>
                    </div>
                )}
            </StyledFormHeaderTable>
        </div>
    );
}

export default HeaderTable;
