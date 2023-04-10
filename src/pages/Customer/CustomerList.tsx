import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styled from 'styled-components';

import { dateSelectTypeCustomer } from '@/assets/data/DataConstant';
import { IconLockAndUnLockTooltip, IconViewTooltip } from '@/assets/icon';
import HeaderTable from '@/component/header/HeaderTable';
import TableFrame from '@/component/table/TableFrame';
import store, { RootState } from '@/context/store';
import { lockOrUnlockAccountHandler } from '@/context/store/ModalSlice';
import { useSearchCustomerList } from '@/fetcher/Customer/CustomerService';
import { DetailCustomerModel } from '@/model/Customer/CustomerModel';
import { StyledViewPageWithTable } from '@/styles/table';
import { TypeCustomer, TypeCustomerUnion } from '@/util/ConstantApp/TypeConstant';
import { ADD_CUSTOMER_URL, CUSTOMER_URL } from '@/util/ConstantApp/Url';

import LockOrUnlockAccountModal from '../../component/modal/LockOrUnlockAccountModal';

const dataTextConstant = {
    title: 'DANH SÁCH KHÁCH HÀNG',
    txtActive: 'ACTIVE',
    txtInActive: 'INACTIVE',
    txtPending: 'PENDING',
    tooltipView: 'Xem chi tiết',
    tooltipActive: 'Kích hoạt thiết bị',
    descStatusActive: 'Đã kích hoạt',
    descStatusInActive: 'Đã khoá',
    descStatusPending: 'Chưa kích hoạt',
};

let currentPage = 0;
const StyleButton = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
`;

const isTypeCustomer = (key: string): key is TypeCustomer => TypeCustomerUnion.includes(key as TypeCustomer);

const returnDescStatus = (status: string) => {
    if (status === dataTextConstant.txtActive) {
        return <span style={{ color: '#32AF64' }}>{dataTextConstant.descStatusActive}</span>;
    } else if (status === dataTextConstant.txtInActive) {
        return <span style={{ color: '#EC1B25' }}>{dataTextConstant.descStatusInActive}</span>;
    } else if (status === dataTextConstant.txtPending) {
        return <span style={{ color: '#3A3A3A' }}>{dataTextConstant.descStatusPending}</span>;
    } else {
        return status;
    }
};
const columns: ColumnsType<DetailCustomerModel> = [
    {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
        width: '70px',
        align: 'center',
        render: (_value, _record, _index) => <div>{_index + currentPage * 10 + 1}</div>,
    },
    {
        title: 'Tên khách hàng',
        dataIndex: 'fullName',
        key: 'fullName',
        align: 'left',
        width: '15%',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'username',
        key: 'username',
        align: 'center',
        width: '15%',
    },
    {
        title: 'CMND/CCCD',
        dataIndex: 'idCard',
        key: 'idCard',
        align: 'left',
        width: '15%',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
        align: 'left',
        width: '30%',
        ellipsis: true,
        render: (value) => (
            <Tooltip color="#108ee9" placement="topLeft" title={value}>
                <span>{value}</span>
            </Tooltip>
        ),
    },
    {
        title: 'Đối tượng khách hàng',
        dataIndex: 'type',
        key: 'type',
        align: 'left',
        width: '15%',
        render: (_value) => <span>{isTypeCustomer(_value) ? dateSelectTypeCustomer[_value] : _value}</span>,
    },
    {
        title: 'Trạng thái tài khoản',
        dataIndex: 'status',
        key: 'status',
        align: 'left',
        width: '15%',
        render: (_value) => returnDescStatus(_value),
    },
    {
        title: 'Hành động',
        dataIndex: 'status',
        key: 'status',
        width: '12%',
        align: 'center',
        render: (_value, record: DetailCustomerModel) => (
            <StyleButton>
                <IconViewTooltip to={`${CUSTOMER_URL}/${record.username}`} />
                <IconLockAndUnLockTooltip
                    status={_value}
                    onClick={() => {
                        store.dispatch(lockOrUnlockAccountHandler(record));
                    }}
                />
            </StyleButton>
        ),
    },
];

const CustomerList = () => {
    const pageSize = 10;
    const { isVisible } = useSelector((state: RootState) => state.modalState);
    const [pageIndex, setPageIndex] = useState(0);
    const [valueSearch, setValueSearch] = useState('');
    const [typeCustomer, setTypeCustomer] = useState('');
    const [responseCustomerTable, makeCustomerTableRequest] = useSearchCustomerList(
        pageIndex,
        pageSize,
        valueSearch,
        typeCustomer,
    );
    const customerList = responseCustomerTable.data?.accountCustomerViewList;
    const totalCustomer = responseCustomerTable.data?.page.totalResult;
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(false);
    }, [responseCustomerTable]);
    useEffect(() => {
        setIsLoading(true);
        currentPage = pageIndex;
        makeCustomerTableRequest();
    }, [pageIndex, valueSearch, typeCustomer]);
    const handleChangePage = (value: any) => {
        setPageIndex(value - 1);
    };
    const handleOnFinish = (value: any) => {
        setPageIndex(0);
        if (value.inputSearch) {
            setValueSearch(value.inputSearch);
        } else {
            setValueSearch('');
        }
        if (!value.typeCustomer || value.typeCustomer === 'ALL') {
            setTypeCustomer('');
        } else {
            setTypeCustomer(value.typeCustomer);
        }
    };
    return (
        <>
            <StyledViewPageWithTable>
                <HeaderTable
                    title={dataTextConstant.title}
                    linkBtnAdd={ADD_CUSTOMER_URL}
                    name={''}
                    address={''}
                    onFinish={handleOnFinish}
                    isLoadingBtnSearch={isLoading}
                    searchingInputPlaceHolder={'Nhập tên, số điện thoại hoặc địa chỉ để tìm kiếm'}
                />
                <TableFrame
                    pageIndex={pageIndex}
                    columns={columns}
                    pageSize={pageSize}
                    handleChangePage={handleChangePage}
                    list={customerList}
                    isLoading={!isLoading}
                    totalItem={totalCustomer}
                />
            </StyledViewPageWithTable>
            <LockOrUnlockAccountModal makeReload={makeCustomerTableRequest} visible={isVisible} />
        </>
    );
};

export default CustomerList;
