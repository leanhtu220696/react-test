import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import styled from 'styled-components';

import { fireLogStatus, fireLogStatusColor } from '@/assets/data/DataConstant';
import { IconViewTooltip } from '@/assets/icon';
import HeaderTable from '@/component/header/HeaderTable';
import TableFrame from '@/component/table/TableFrame';
import { useSearchFireLog } from '@/fetcher/FireLog/FireLogService';
import { FireLogModel } from '@/model/FireLog/FireLogModel';
import { StyledViewPageWithTable } from '@/styles/table';
import { DATE_TIME_FORMAT_PATTERN, FireLogStatus, FireLogStatusUnion } from '@/util/ConstantApp/TypeConstant';
import { FIRE_LOG_URL } from '@/util/ConstantApp/Url';

let currentPage = 0;
const StyleButton = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
`;

const isFireLogStatus = (key: string): key is FireLogStatus => FireLogStatusUnion.includes(key as FireLogStatus);

const columns: ColumnsType<FireLogModel> = [
    {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
        width: '5%',
        align: 'center',
        render: (_value, _record, _index) => {
            return _index + currentPage * 10 + 1;
        },
    },
    {
        title: 'Công trình',
        dataIndex: 'construction',
        key: 'construction',
        align: 'left',
        width: '20%',
        render: (values) => <p>{values?.name}</p>,
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'construction',
        key: 'fullAddress',
        ellipsis: true,
        width: '25%',
        align: 'left',
        render: (values) => (
            <Tooltip color="#108ee9" placement="topLeft" title={values?.fullAddress}>
                {values?.fullAddress}
            </Tooltip>
        ),
    },
    {
        title: 'Tỉnh thành',
        dataIndex: 'construction',
        key: 'province',
        align: 'center',
        render: (values) => <p>{values?.province.name}</p>,
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (value: FireLogStatus | string) => (
            <span style={{ color: isFireLogStatus(value) ? fireLogStatusColor[value] : '#3A3A3A' }}>
                {isFireLogStatus(value) ? fireLogStatus[value] : value}
            </span>
        ),
    },
    {
        title: 'Thời gian báo cháy',
        dataIndex: 'dateCreated',
        key: 'dateCreated',
        align: 'center',
        render: (values) => <p>{moment.unix(values).format(DATE_TIME_FORMAT_PATTERN)}</p>,
    },
    {
        title: 'Hành động',
        align: 'center',
        width: '10%',
        render: (values) => {
            return (
                <StyleButton>
                    <IconViewTooltip to={`${FIRE_LOG_URL}/${values.id}`} />
                </StyleButton>
            );
        },
    },
];

const FireLogManagerPage = () => {
    const [valueSearch, setValueSearch] = useState('');
    const pageSize = 10;
    const [pageIndex, setPageIndex] = useState(0);
    //todo: update set time range and value search when make search feature
    const [responseListFireLog, makeListFireLogRequest] = useSearchFireLog(
        pageIndex,
        pageSize,
        valueSearch,
        1673611151,
        1678708751,
    );
    const totalFireLog = responseListFireLog.data?.page.totalResult;
    const listFireLog = responseListFireLog.data?.fireLogViewList;
    const isLoading = Boolean(responseListFireLog.data);
    const [isLoadingBtnSearch, setIsLoadingBtnSearch] = useState(false);
    useEffect(() => {
        setIsLoadingBtnSearch(false);
    }, [isLoadingBtnSearch]);

    useEffect(() => {
        setIsLoadingBtnSearch(true);
        currentPage = pageIndex;
        makeListFireLogRequest();
    }, [pageIndex, valueSearch]);

    const handleOnClickSearch = ({ inputSearch }: { inputSearch: string }) => {
        setValueSearch(inputSearch);
        setPageIndex(0);
    };

    const handleChangePage = (value: any) => {
        setPageIndex(value - 1);
    };

    return (
        <StyledViewPageWithTable>
            <HeaderTable
                title={'DANH SÁCH ĐIỂM CHÁY'}
                name=""
                address=""
                searchingInputPlaceHolder={'Nhập tên công trình, địa chỉ'}
                linkBtnAdd={''}
                isLoadingBtnSearch={isLoadingBtnSearch}
                onFinish={handleOnClickSearch}
            />
            <TableFrame
                pageIndex={pageIndex}
                columns={columns}
                pageSize={pageSize}
                handleChangePage={handleChangePage}
                list={listFireLog}
                isLoading={isLoading}
                totalItem={totalFireLog}
            />
        </StyledViewPageWithTable>
    );
};

export default FireLogManagerPage;
