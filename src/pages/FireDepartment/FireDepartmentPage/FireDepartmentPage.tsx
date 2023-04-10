import { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styled from 'styled-components';

import { IconSoldierTooltip, IconViewTooltip, IconWaterPillarTooltip } from '@/assets/icon';
import HeaderTable from '@/component/header/HeaderTable';
import TableFrame from '@/component/table/TableFrame';
import { useGetListFireDepartment } from '@/fetcher/FireDepartment/FireDepartmentService';
import { DetailFireDepartmentModel } from '@/model/FireDepartment/FireDepartmentModel';
import { StyledViewPageWithTable } from '@/styles/table';
import { CREATE_FIRE_DEPARTMENT, FIRE_DEPARTMENT_URL, SOLDIERS_URL, WATER_INTAKE_URL } from '@/util/ConstantApp/Url';

const dataTextConstant = {
    title: 'DANH SÁCH ĐƠN VỊ PHÒNG CHÁY CHỮA CHÁY',
};

let currentPage = 0;
const StyleButton = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
`;
const columns: ColumnsType<DetailFireDepartmentModel> = [
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
        title: 'Tên đơn vị',
        dataIndex: 'name',
        key: 'name',
        align: 'left',
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
        width: '10%',
        ellipsis: true,
        render: (value) => (
            <Tooltip color="#108ee9" placement="topLeft" title={value}>
                <span>{value}</span>
            </Tooltip>
        ),
    },
    {
        title: 'Số lượng điểm lấy nước',
        dataIndex: 'numberWaterIntake',
        key: 'numberWaterIntake',
        align: 'center',
    },
    {
        title: 'Số lượng nhân sự',
        dataIndex: 'numberOfEmployees',
        key: 'numberOfEmployees',
        align: 'center',
    },
    {
        title: 'Tỉnh thành',
        dataIndex: 'province',
        key: 'province',
        width: '10%',
        render: (values) => <p style={{ paddingLeft: 30, textAlign: 'justify' }}>{values?.name}</p>,
    },
    {
        title: 'Hành động',
        dataIndex: 'deviceStatus',
        key: 'deviceStatus',
        width: '12%',
        align: 'center',
        render: (_status: any, record: DetailFireDepartmentModel) => {
            return (
                <StyleButton>
                    <IconWaterPillarTooltip to={`${FIRE_DEPARTMENT_URL}/${record.id}${WATER_INTAKE_URL}`} />
                    <IconSoldierTooltip to={`${FIRE_DEPARTMENT_URL}/${record.id}${SOLDIERS_URL}`} />
                    <IconViewTooltip to={`${FIRE_DEPARTMENT_URL}/${record.id}`} />
                </StyleButton>
            );
        },
    },
];

const FireDepartmentPage = () => {
    const pageSize = 10;
    const [pageIndex, setPageIndex] = useState(0);
    const [valueSearch, setValueSearch] = useState('');
    const [provinceId, setProvinceId] = useState();
    const [districtId, setDistrictId] = useState();
    const [responseFireDepartment, makeFireDepartmentRequest] = useGetListFireDepartment(
        pageIndex,
        pageSize,
        valueSearch,
        provinceId,
        districtId,
    );
    const fireDepartmentViewList = responseFireDepartment.data?.fireDepartmentViewList;
    const totalFireDepartment = responseFireDepartment.data?.page.totalResult;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, [responseFireDepartment]);
    useEffect(() => {
        setIsLoading(true);
        currentPage = pageIndex;
        makeFireDepartmentRequest();
    }, [pageIndex, valueSearch, provinceId, districtId]);
    const handleChangePage = (value: any) => {
        setPageIndex(value - 1);
    };

    const handleOnClickSearch = ({
        inputSearch,
        provinceId,
        districtId,
    }: {
        inputSearch: string;
        provinceId: number;
        districtId: number;
    }) => {
        setPageIndex(0);
        const returnConvertId = (value: any) => {
            if (value && value !== -1) {
                return value;
            } else {
                return undefined;
            }
        };
        setProvinceId(returnConvertId(provinceId));
        setDistrictId(returnConvertId(districtId));
        if (inputSearch) {
            setValueSearch(inputSearch);
        } else {
            setValueSearch('');
        }
    };

    return (
        <StyledViewPageWithTable>
            <HeaderTable
                title={dataTextConstant.title}
                linkBtnAdd={`${FIRE_DEPARTMENT_URL}${CREATE_FIRE_DEPARTMENT}`}
                name={''}
                address={''}
                searchingInputPlaceHolder={'Nhập tên, địa chỉ'}
                onFinish={handleOnClickSearch}
                isLoadingBtnSearch={isLoading}
            />
            <TableFrame
                pageIndex={pageIndex}
                columns={columns}
                pageSize={pageSize}
                handleChangePage={handleChangePage}
                list={fireDepartmentViewList}
                isLoading={!isLoading}
                totalItem={totalFireDepartment}
            />
        </StyledViewPageWithTable>
    );
};

export default FireDepartmentPage;
