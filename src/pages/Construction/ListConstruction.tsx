import { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styled from 'styled-components';

import { dataSelectBusinessSector, dataSelectTypeConstructor } from '@/assets/data/DataConstant';
import { IconViewDeviceTooltip, IconViewRoomTooltip, IconViewTooltip } from '@/assets/icon';
import HeaderTable from '@/component/header/HeaderTable';
import { useDataCreateDeviceStore } from '@/component/hook/useDataCreateDevice';
import TableFrame from '@/component/table/TableFrame';
import { useGetListConstructionSearch } from '@/fetcher/Construction/ConstructionService';
import { DetailConstructionModel } from '@/model/Construction/ConstructionModel';
import { StyledViewPageWithTable } from '@/styles/table';
import { ADD_CONSTRUCTION_URL, CONSTRUCTION_URL, DEVICE_URL, ROOM_URL } from '@/util/ConstantApp/Url';

const dataTextConstant = {
    title: 'DANH SÁCH CÔNG TRÌNH',
};

let currentPage = 0;
const StyleButton = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
`;

const columns: ColumnsType<DetailConstructionModel> = [
    {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
        width: '70px',
        render: (_value, _record, _index) => <div>{_index + currentPage * 10 + 1}</div>,
    },
    {
        title: 'Tên công trình',
        dataIndex: 'name',
        key: 'name',
        align: 'left',
        width: '25%',
    },
    {
        title: 'Kiểu công trình',
        dataIndex: 'type',
        key: 'type',
        align: 'left',
        render: (value) => {
            const detailType = dataSelectTypeConstructor.find((item) => item.value.includes(value));
            return <p>{detailType ? detailType.label : value}</p>;
        },
    },
    {
        title: 'Loại kinh doanh',
        dataIndex: 'businessSector',
        key: 'businessSector',
        align: 'left',
        render: (value) => {
            const detailBusinessSector = dataSelectBusinessSector.find((item) => item.value.includes(value));
            return <p>{detailBusinessSector ? detailBusinessSector.label : value}</p>;
        },
    },
    {
        title: 'Tỉnh thành',
        dataIndex: 'province',
        key: 'province',
        align: 'left',
        render: (province) => <p>{province.name}</p>,
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'fullAddress',
        key: 'fullAddress',
        align: 'left',
        ellipsis: true,
        render: (value) => (
            <Tooltip color="#108ee9" placement="topLeft" title={value}>
                <span>{value}</span>
            </Tooltip>
        ),
    },
    {
        title: 'Hoạt động',
        dataIndex: 'deviceStatus',
        key: 'deviceStatus',
        width: '10%',
        render: (_state: any, record) => {
            return (
                <StyleButton>
                    <IconViewDeviceTooltip to={`${CONSTRUCTION_URL}/${record.id}${DEVICE_URL}`} />
                    <IconViewRoomTooltip to={`${CONSTRUCTION_URL}/${record.id}${ROOM_URL}`} />
                    <IconViewTooltip to={`${CONSTRUCTION_URL}/${record.id}`} />
                </StyleButton>
            );
        },
    },
];

const ListConstructionPage = () => {
    const pageSize = 10;
    const [pageIndex, setPageIndex] = useState(0);
    const [valueSearch, setValueSearch] = useState('');
    const [provinceId, setProvinceId] = useState();
    const [districtId, setDistrictId] = useState();
    const [responseListConstruction, makeRequestListConstruction] = useGetListConstructionSearch(
        pageIndex,
        pageSize,
        provinceId,
        districtId,
        valueSearch,
    );
    const constructionList = responseListConstruction.data?.constructionListingViews;
    const totalConstruction = responseListConstruction.data?.page.totalResult;
    const [isLoading, setIsLoading] = useState(false);
    const { resetDataCreateDeviceStore } = useDataCreateDeviceStore();
    useEffect(() => {
        setIsLoading(false);
    }, [responseListConstruction]);
    useEffect(() => {
        resetDataCreateDeviceStore();
    }, []);
    useEffect(() => {
        setIsLoading(true);
        currentPage = pageIndex;
        makeRequestListConstruction();
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
                linkBtnAdd={ADD_CONSTRUCTION_URL}
                name={''}
                address={''}
                searchingInputPlaceHolder={'Nhập tên, địa chỉ'}
                isLoadingBtnSearch={isLoading}
                onFinish={handleOnClickSearch}
            />
            <TableFrame
                pageIndex={pageIndex}
                columns={columns}
                pageSize={pageSize}
                handleChangePage={handleChangePage}
                list={constructionList}
                isLoading={!isLoading}
                totalItem={totalConstruction}
            />
        </StyledViewPageWithTable>
    );
};

export default ListConstructionPage;
