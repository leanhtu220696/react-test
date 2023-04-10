import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import styled from 'styled-components';

import { dataSelectTypeTeam } from '@/assets/data/DataConstant';
import { IconViewTooltip } from '@/assets/icon';
import HeaderTable from '@/component/header/HeaderTable';
import TableFrame from '@/component/table/TableFrame';
import { useGetFireDepartmentById, useGetListSoldier } from '@/fetcher/FireDepartment/FireDepartmentService';
import { DetailSoldierModel } from '@/model/FireDepartment/SoldierModel';
import { StyledViewPageWithTable } from '@/styles/table';
import { SoldierTeam, SoldierTeamUnion } from '@/util/ConstantApp/TypeConstant';
import { ADD_SOLDIER_URL, FIRE_DEPARTMENT_URL, SOLDIERS_URL } from '@/util/ConstantApp/Url';

let currentPage = 0;
const StyleButton = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
`;

const departmentId: Record<string, any> = {
    value: undefined,
    set: function (idDepartment: number) {
        this.value = idDepartment;
    },
};

const columns: ColumnsType<DetailSoldierModel> = [
    {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
        width: '70px',
        align: 'center',
        render: (_value, _record, _index) => {
            return _index + currentPage * 10 + 1;
        },
    },
    {
        title: 'Họ và tên',
        dataIndex: 'fullName',
        key: 'fullName',
        align: 'left',
        render: (values) => <p style={{ paddingLeft: 50 }}>{values}</p>,
    },
    {
        title: 'CNND/CCCD',
        dataIndex: 'idCard',
        key: 'idCard',
        align: 'left',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        align: 'center',
    },
    {
        title: 'Trực thuộc',
        dataIndex: 'team',
        key: 'team',
        align: 'left',
        width: '20%',
        render: (team: SoldierTeam | string) => <span>{isSoldierTeam(team) ? dataSelectTypeTeam[team] : team}</span>,
    },
    {
        title: 'Chức vụ',
        dataIndex: 'position',
        key: 'position',
        align: 'left',
    },
    {
        title: 'Hành động',
        dataIndex: 'deviceStatus',
        key: 'deviceStatus',
        align: 'center',
        width: '10%',
        render: (_status: any, _record: DetailSoldierModel) => {
            return (
                <StyleButton>
                    <IconViewTooltip to={`${FIRE_DEPARTMENT_URL}/${departmentId.value}${SOLDIERS_URL}/${_record.id}`} />
                </StyleButton>
            );
        },
    },
];
const isSoldierTeam = (key: string): key is SoldierTeam => SoldierTeamUnion.includes(key as SoldierTeam);

const SoldierPage = () => {
    const pageSize = 10;
    const { idDepartment } = useParams();
    const [fullName, setFullName] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    departmentId.set(+idDepartment);
    const [responseListSoldier, makeListSoldierRequest] = useGetListSoldier(
        +idDepartment,
        pageIndex,
        pageSize,
        fullName,
    );
    const listSoldier = responseListSoldier.data?.firefighterViewList;
    const totalSoldier = responseListSoldier.data?.page.totalResult;
    const [responseTitleHeaderTable, sendRequestGetTitleHeaderTable] = useGetFireDepartmentById(+idDepartment);

    const dataTitleHeaderTable = responseTitleHeaderTable.data;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, [responseListSoldier]);
    const handleOnClickSearch = ({ inputSearch }: { inputSearch: string }) => {
        if (inputSearch) {
            setFullName(inputSearch);
        } else {
            setFullName('');
        }
        setPageIndex(0);
    };

    useEffect(() => {
        sendRequestGetTitleHeaderTable();
    }, []);
    useEffect(() => {
        setIsLoading(true);
        currentPage = pageIndex;
        makeListSoldierRequest();
    }, [pageIndex, fullName]);
    const handleChangePage = (value: any) => {
        setPageIndex(value - 1);
    };

    return (
        <StyledViewPageWithTable>
            <HeaderTable
                linkBtnAdd={`${FIRE_DEPARTMENT_URL}/${idDepartment}${ADD_SOLDIER_URL}`}
                title={'DANH SÁCH CHIẾN SĨ PCCC'}
                name={dataTitleHeaderTable?.name}
                onFinish={handleOnClickSearch}
                isLoadingBtnSearch={isLoading}
                address={`${dataTitleHeaderTable?.fullAddress} - ${dataTitleHeaderTable?.district.name} -
                        ${dataTitleHeaderTable?.province.name}`}
                searchingInputPlaceHolder={'Nhập tên để tìm kiếm'}
            />
            <TableFrame
                pageIndex={pageIndex}
                columns={columns}
                pageSize={pageSize}
                handleChangePage={handleChangePage}
                list={listSoldier}
                isLoading={!isLoading}
                totalItem={totalSoldier}
            />
        </StyledViewPageWithTable>
    );
};
export default SoldierPage;
