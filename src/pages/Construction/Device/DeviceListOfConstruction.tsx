import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import styled from 'styled-components';

import { IconEyeTooltip, IconRecallTooltip } from '@/assets/icon';
import HeaderTable from '@/component/header/HeaderTable';
import { ModalRecallDevice } from '@/component/modal/ModalRecallDevice';
import TableFrame from '@/component/table/TableFrame';
import store, { RootState } from '@/context/store';
import { getDevice } from '@/context/store/ModalSlice';
import { StyledViewPageWithTable } from '@/styles/table';
import { ADD_CONSTRUCTION_URL, CONSTRUCTION_URL, DEVICE_URL } from '@/util/ConstantApp/Url';

import { useGetDetailConstruction } from '../../../fetcher/Construction/ConstructionService';
import { useGetDeviceListOfConstruction } from '../../../fetcher/Device/DeviceService';
import { DetailDeviceModel } from '../../../model/Device/DeviceModel';

const dataTextConstant = {
    title: 'DANH SÁCH THIẾT BỊ THUỘC CÔNG TRÌNH',
};

let currentPage = 0;
const StyleButton = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
`;

const saveConstructionId: Record<string, any> = {
    value: undefined,
    set: function (constructionId: number) {
        this.value = constructionId;
    },
};

const columns: ColumnsType<DetailDeviceModel> = [
    {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
        width: '70px',
        render: (_value, _record, _index) => <div>{_index + currentPage * 10 + 1}</div>,
    },
    {
        title: 'Tên thiết bị',
        dataIndex: 'name',
        key: 'name',
        align: 'left',
        width: '25%',
    },
    {
        title: 'Imei',
        dataIndex: 'imei',
        key: 'imei',
        align: 'left',
    },
    {
        title: 'Model',
        dataIndex: 'model',
        key: 'model',
        align: 'left',
        render: (model) => <p>{model.name}</p>,
    },
    {
        title: 'Trạng thái',
        dataIndex: 'connectionStatus',
        key: 'connectionStatus',
        align: 'center',
        width: '8%',
        render: (value: string) => (
            <p style={{ color: `${value === 'ONLINE' ? '#32AF64' : '#EC1B25'}`, textTransform: 'capitalize' }}>
                {value === 'ONLINE' ? 'Kết nối' : 'Không kết nối'}
            </p>
        ),
    },
    {
        title: 'Hoạt động',
        dataIndex: 'deviceStatus',
        key: 'deviceStatus',
        width: '10%',
        render: (_value, _record) => {
            return (
                <StyleButton>
                    <IconRecallTooltip to={''} onClick={() => store.dispatch(getDevice(_record))} />
                    <IconEyeTooltip to={`${CONSTRUCTION_URL}/${saveConstructionId.value}${DEVICE_URL}/${_record.id}`} />
                </StyleButton>
            );
        },
    },
];

function DeviceListOfConstruction() {
    const { constructionId } = useParams();
    saveConstructionId.set(constructionId);
    const pageSize = 10;
    const [pageIndex, setPageIndex] = useState(0);
    const [resDetailConstruction, makeReqDetailConstruction] = useGetDetailConstruction(+constructionId);
    const [modelId] = useState();
    const [valueSearch] = useState('');
    const [resDeviceList, makeReqDeviceList] = useGetDeviceListOfConstruction(
        pageIndex,
        pageSize,
        +constructionId,
        valueSearch,
        modelId,
    );
    const constructionName = resDetailConstruction.data?.name;
    const constructionAddress = resDetailConstruction.data?.fullAddress;
    const deviceList = resDeviceList.data?.deviceViewList;
    const totalDevice = resDeviceList.data?.page.totalResult;
    const isLoading = !!resDeviceList.data;
    const { isVisible } = useSelector((state: RootState) => state.modalState);

    useEffect(() => {
        makeReqDetailConstruction();
    }, [constructionId]);

    useEffect(() => {
        currentPage = pageIndex;
        makeReqDeviceList();
    }, [pageIndex]);

    const handleChangePage = (value: any) => {
        setPageIndex(value - 1);
    };

    return (
        <>
            <StyledViewPageWithTable>
                <HeaderTable
                    title={dataTextConstant.title}
                    linkBtnAdd={ADD_CONSTRUCTION_URL}
                    name={constructionName}
                    address={constructionAddress}
                    searchingInputPlaceHolder={'Nhập tên thiết bị, imei để tìm kiếm'}
                />
                <TableFrame
                    pageIndex={pageIndex}
                    columns={columns}
                    pageSize={pageSize}
                    handleChangePage={handleChangePage}
                    list={deviceList}
                    isLoading={isLoading}
                    totalItem={totalDevice}
                />
            </StyledViewPageWithTable>
            <ModalRecallDevice
                visible={isVisible}
                constructionName={constructionName}
                constructionId={+constructionId}
                makeReload={makeReqDeviceList}
            />
        </>
    );
}

export default DeviceListOfConstruction;
