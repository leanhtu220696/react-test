import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import styled from 'styled-components';

import { IconViewTooltip } from '@/assets/icon';
import HeaderTable from '@/component/header/HeaderTable';
import { RoomModal } from '@/component/modal/RoomModal';
import store, { RootState } from '@/context/store';
import { roomHandler } from '@/context/store/ModalSlice';
import { useGetDetailConstruction } from '@/fetcher/Construction/ConstructionService';
import { useGetListRoomByIdConstruction } from '@/fetcher/Construction/RoomService';
import { DetailRoomModel } from '@/model/Construction/RoomModel';
import { StyledViewPageWithTable } from '@/styles/table';

import TableFrame from '../../../component/table/TableFrame';

let currentPage = 0;
const StyleButton = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
`;
const columns: ColumnsType<DetailRoomModel> = [
    {
        title: 'STT',
        key: 'id',
        width: '70px',
        align: 'center',
        render: (_value, _record, _index) => {
            return _index + currentPage * 10 + 1;
        },
    },
    {
        title: 'Tên phòng',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'RS (Zone - ID)',
        dataIndex: 'zoneId',
        key: 'zoneId',
        render: (_state, _recode) => {
            return (
                <div>
                    {_recode.zoneId}
                    {_recode.zoneId || _recode.rsDeviceId ? '-' : ''}
                    {_recode.rsDeviceId}
                </div>
            );
        },
    },
    {
        title: 'IO (ID)',
        dataIndex: 'ioChannel',
        key: 'ioChannel',
    },
    {
        title: 'Hành động',
        align: 'center',
        width: '10%',
        render: (_, record) => {
            return (
                <StyleButton>
                    <IconViewTooltip onClick={() => store.dispatch(roomHandler(record))} />
                </StyleButton>
            );
        },
    },
];

function RoomPage() {
    const roomName = '';
    const pageSize = 10;
    const { id } = useParams();
    const { isVisible } = useSelector((state: RootState) => state.modalState);
    const [pageIndex, setPageIndex] = useState(0);
    const [responseListRoom, makeListRoomRequest] = useGetListRoomByIdConstruction(+id, pageIndex, pageSize, roomName);
    const [resDetailConstruction, makeReqDetailConstruction] = useGetDetailConstruction(+id);
    const listRoom = responseListRoom.data?.roomViewList;
    const totalRoom = responseListRoom.data?.page.totalResult;
    const isLoading = !!responseListRoom.data;
    const name = resDetailConstruction?.data?.name;
    const address = resDetailConstruction?.data?.fullAddress;
    useEffect(() => {
        makeReqDetailConstruction();
    }, []);
    useEffect(() => {
        currentPage = pageIndex;
        makeListRoomRequest();
    }, [pageIndex]);
    const handleChangePage = (value: any) => {
        setPageIndex(value - 1);
    };

    return (
        <>
            <StyledViewPageWithTable>
                <HeaderTable linkBtnAdd={``} title={'DANH SÁCH PHÒNG'} name={name} address={address} />
                <TableFrame
                    pageIndex={pageIndex}
                    columns={columns}
                    pageSize={pageSize}
                    handleChangePage={handleChangePage}
                    list={listRoom}
                    isLoading={isLoading}
                    totalItem={totalRoom}
                />
            </StyledViewPageWithTable>
            <RoomModal
                visible={isVisible}
                nameCons={name}
                addressCons={address}
                idConstruction={+id}
                makeReload={makeListRoomRequest}
            />
        </>
    );
}

export default RoomPage;
