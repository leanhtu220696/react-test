import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import styled from 'styled-components';

import { IconViewTooltip } from '@/assets/icon';
import HeaderTable from '@/component/header/HeaderTable';
import TableFrame from '@/component/table/TableFrame';
import { useGetAllViewListWaterIntake, useGetFireDepartmentById } from '@/fetcher/FireDepartment/FireDepartmentService';
import { DetailWaterIntakeModel, ViewListWaterIntakeModel } from '@/model/FireDepartment/WaterIntakeModel';
import { StyledViewPageWithTable } from '@/styles/table';
import { CREATE_WATER_INTAKE_URL, FIRE_DEPARTMENT_URL, WATER_INTAKE_URL } from '@/util/ConstantApp/Url';

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
const columns: ColumnsType<ViewListWaterIntakeModel> = [
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
        title: 'Tên điểm',
        dataIndex: 'name',
        key: 'name',
        align: 'left',
        render: (values) => <p style={{ paddingLeft: 50 }}>{values}</p>,
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        align: 'center',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'fullAddress',
        key: 'fullAddress',
        align: 'left',
        ellipsis: true,
        render: (val) => (
            <Tooltip color="#108ee9" placement="topLeft" title={val}>
                {val}
            </Tooltip>
        ),
    },
    {
        title: 'Khả năng cấp nước',
        dataIndex: 'available',
        key: 'available',
        align: 'center',
        render: (values) => <p>{values ? 'Có' : 'Không'}</p>,
    },
    {
        title: 'Hành động',
        align: 'center',
        width: '10%',
        render: (_status: any, record: DetailWaterIntakeModel) => {
            return (
                <StyleButton>
                    <IconViewTooltip
                        to={`${FIRE_DEPARTMENT_URL}/${departmentId.value}${WATER_INTAKE_URL}/${record.id}`}
                    />
                </StyleButton>
            );
        },
    },
];

const WaterIntakePage = () => {
    const [valueSearch, setValueSearch] = useState('');
    const pageSize = 10;
    const { idDepartment } = useParams();
    const [pageIndex, setPageIndex] = useState(0);
    departmentId.set(+idDepartment);
    const [responseListWater, makeListWaterRequest] = useGetAllViewListWaterIntake(
        +idDepartment,
        pageIndex,
        pageSize,
        valueSearch,
    );
    const listWater = responseListWater.data?.waterIntakeForListingViewList;
    const totalWater = responseListWater.data?.page.totalResult;
    const [responseTitleHeaderTable, sendRequestGetTitleHeaderTable] = useGetFireDepartmentById(+idDepartment);
    const dataTitleHeaderTable = responseTitleHeaderTable.data;
    const [isLoading, setIsLoading] = useState(false);
    const handleOnClickSearch = ({ inputSearch }: { inputSearch: string }) => {
        if (inputSearch) {
            setValueSearch(inputSearch);
        } else {
            setValueSearch('');
        }
        setPageIndex(0);
    };
    useEffect(() => {
        setIsLoading(false);
    }, [responseListWater]);
    useEffect(() => {
        sendRequestGetTitleHeaderTable();
        makeListWaterRequest();
    }, []);
    useEffect(() => {
        setIsLoading(true);
        currentPage = pageIndex;
        makeListWaterRequest();
    }, [pageIndex, valueSearch]);
    const handleChangePage = (value: any) => {
        setPageIndex(value - 1);
    };

    return (
        <StyledViewPageWithTable>
            <HeaderTable
                title={'DANH SÁCH ĐIỂM LẤY NƯỚC'}
                name={dataTitleHeaderTable?.name}
                address={`${dataTitleHeaderTable?.fullAddress} - ${dataTitleHeaderTable?.district.name} -
                        ${dataTitleHeaderTable?.province.name}`}
                linkBtnAdd={`${FIRE_DEPARTMENT_URL}/${idDepartment}${CREATE_WATER_INTAKE_URL}`}
                onFinish={handleOnClickSearch}
                searchingInputPlaceHolder={'Nhập tên địa chỉ để tìm kiếm'}
                isLoadingBtnSearch={isLoading}
            />
            <TableFrame
                pageIndex={pageIndex}
                columns={columns}
                pageSize={pageSize}
                handleChangePage={handleChangePage}
                list={listWater}
                isLoading={!isLoading}
                totalItem={totalWater}
            />
        </StyledViewPageWithTable>
    );
};
export default WaterIntakePage;
