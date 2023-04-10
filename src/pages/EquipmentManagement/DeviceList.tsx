import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import { optionSearchStatus } from '@/assets/data/DataConstant';
import { IconViewTooltip } from '@/assets/icon';
import { IconActive, IconInActive } from '@/assets/svg';
import TableFrame from '@/component/table/TableFrame';
import { resetDataCreateDevice } from '@/context/store/DataCreateDeviceSlice';
import { useGetListDevice } from '@/fetcher/Device/DeviceService';
import { DetailDeviceModel } from '@/model/Device/DeviceModel';
import { StyleForm } from '@/styles/form';
import { StyledInput, StyledViewPageWithTable } from '@/styles/table';
import { ACTIVATED_DEVICE_URL, EQUIPMENT_MANAGEMENT_URL } from '@/util/ConstantApp/Url';

import { useGetListModel } from '../../fetcher/Device/DeviceService';
import { ModelDeviceModel } from '../../model/Device/DeviceModel';

const dataTextConstant = {
    title: 'DANH SÁCH THIẾT BỊ',
    placeholderSearch: 'Nhập tên hoặc imei thiết bị ',
    placeholderSelect: 'Tình trạng',
    optionSelectActive: 'Đã kích hoạt',
    optionSelectInActive: 'Chưa kích hoạt',
    btnSearch: 'Tìm kiếm',
    descStatusStorage: 'Lưu kho',
    descStatusActive: 'Đang hoạt động',
    descStatusInActive: 'Không hoạt động',
    descStatusMaintenance: 'Bảo hành',
    descStatusError: 'Lỗi',
    txtActive: 'ACTIVE',
    txtError: 'ERROR',
    txtMaintenance: 'MAINTENANCE',
    txtInActive: 'INACTIVE',
    txtStorage: 'STORAGE',
    tooltipView: 'Xem chi tiết',
    tooltipActive: 'Kích hoạt thiết bị',
};
const StyleButton = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
`;
const StyleFormSearch = styled(StyleForm)`
    @media (max-width: 1201px) {
        .ant-select-show-arrow {
            width: auto !important;
        }
        .ant-select-selector {
            width: auto !important;
        }
    }
`;
let currentPage = 0;
const returnDescStatus = (status: string) => {
    if (status === dataTextConstant.txtActive) {
        return <span style={{ color: '#0A7BFF' }}>{dataTextConstant.descStatusActive}</span>;
    } else if (status === dataTextConstant.txtInActive) {
        return <span style={{ color: '#EC1B25' }}>{dataTextConstant.descStatusInActive}</span>;
    } else if (status === dataTextConstant.txtStorage) {
        return <span style={{ color: '#FF8A47' }}>{dataTextConstant.descStatusStorage}</span>;
    } else if (status === dataTextConstant.txtMaintenance) {
        return <span style={{ color: '#FF8A47' }}>{dataTextConstant.descStatusMaintenance}</span>;
    } else {
        return status;
    }
};
const columns: ColumnsType<DetailDeviceModel> = [
    {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
        width: '70px',
        render: (_value, _record, _index) => {
            return _index + currentPage * 10 + 1;
        },
    },
    {
        title: 'Tên thiết bị',
        dataIndex: 'name',
        key: 'name',
        align: 'left',
    },
    {
        title: 'Model',
        dataIndex: 'model',
        key: 'name',
        align: 'left',
        render: (values) => <p>{values?.name}</p>,
    },
    {
        title: 'Imei',
        dataIndex: 'imei',
        key: 'imei',
        align: 'left',
    },
    {
        title: 'Tỉnh thành',
        dataIndex: 'construction',
        key: 'province',
        align: 'left',
        render: (values) => <p>{values?.province.name}</p>,
    },
    {
        title: 'Tình trạng',
        dataIndex: 'deviceStatus',
        key: 'deviceStatus',
        align: 'left',
        render: (status) => returnDescStatus(status),
    },
    {
        title: 'Công trình',
        dataIndex: 'construction',
        key: 'constructionName',
        align: 'left',
        render: (values) => <p>{values?.name}</p>,
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'construction',
        key: 'fullAddress',
        width: '16%',
        align: 'left',
        ellipsis: true,
        render: (value) => (
            <Tooltip color="#108ee9" placement="topLeft" title={value?.fullAddress}>
                <span>{value?.fullAddress}</span>
            </Tooltip>
        ),
    },
    {
        title: 'Hoạt động',
        dataIndex: 'deviceStatus',
        key: 'deviceStatus',
        render: (status, _record) => {
            return (
                <StyleButton>
                    <IconViewTooltip to={`${EQUIPMENT_MANAGEMENT_URL}/${_record.id}`} />
                    <Tooltip color="#108ee9" placement="top" title={`${dataTextConstant.tooltipActive}`}>
                        {status === dataTextConstant.txtStorage ? (
                            <Link to={ACTIVATED_DEVICE_URL} state={{ id: _record.id, imei: _record.imei }}>
                                <IconActive />
                            </Link>
                        ) : (
                            <IconInActive />
                        )}
                    </Tooltip>
                </StyleButton>
            );
        },
    },
];

const HeaderTableDevice = ({
    handleOnSubmit,
    isLoadingButton,
}: {
    handleOnSubmit: (value: any) => void;
    isLoadingButton: boolean;
}) => {
    const [form] = Form.useForm();
    const [resListModel, makeReqListModel] = useGetListModel();
    const [isLoadingSelectModel, setIsLoadingSelectModel] = useState(false);
    const [listModel, setListModel] = useState<ModelDeviceModel[]>([]);
    useEffect(() => {
        setIsLoadingSelectModel(true);
        makeReqListModel();
    }, []);
    useEffect(() => {
        if (resListModel.data) {
            setListModel(resListModel?.data);
            setIsLoadingSelectModel(false);
        }
    }, [resListModel]);
    const onFinish = (value: any) => {
        if (typeof handleOnSubmit === 'function') {
            handleOnSubmit(value);
        }
    };
    const filterOption = (input: any, option: any) => {
        const name = option?.label.props.children[0].props.children;
        const phoneNumber = option?.label.props.children[2];
        return (`${name} - ${phoneNumber}` ?? '').toLowerCase().includes(input.toLowerCase());
    };
    return (
        <div>
            <p style={{ textAlign: 'center', marginTop: 25, marginBottom: 25, fontSize: 20, fontWeight: 700 }}>
                {dataTextConstant.title}
            </p>
            <StyledInput>
                <StyleFormSearch form={form} onFinish={onFinish} layout="inline">
                    <StyleFormSearch.Item name={'valueSearch'}>
                        <Input placeholder={dataTextConstant.placeholderSearch} />
                    </StyleFormSearch.Item>
                    <StyleFormSearch.Item name={'modelId'}>
                        <Select
                            allowClear
                            showSearch
                            disabled={isLoadingSelectModel}
                            loading={isLoadingSelectModel}
                            placeholder={'Model'}
                            optionFilterProp="children"
                            filterOption={filterOption}
                            options={listModel.map((item) => ({
                                label: <Tooltip title={item.name}>{item.name}</Tooltip>,
                                value: item.id,
                            }))}
                        />
                    </StyleFormSearch.Item>
                    <StyleFormSearch.Item name={'deviceStatus'}>
                        <Select
                            allowClear
                            placeholder={dataTextConstant.placeholderSelect}
                            options={optionSearchStatus.map((item) => ({
                                label: item.label,
                                value: item.value,
                            }))}
                        />
                    </StyleFormSearch.Item>
                    <Button
                        style={{ width: 130 }}
                        loading={isLoadingButton}
                        htmlType="submit"
                        type="primary"
                        size="large"
                    >
                        {dataTextConstant.btnSearch}
                        <SearchOutlined style={{ fontSize: 18 }} />
                    </Button>
                </StyleFormSearch>
            </StyledInput>
        </div>
    );
};

function ManagerDevicePage() {
    const pageSize = 10;
    const [pageIndex, setPageIndex] = useState(0);
    const [valueSearch, setValueSearch] = useState();
    const [modelId, setModelId] = useState();
    const [deviceStatus, setDeviceStatus] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [responseListDevice, makeRequestListDevice] = useGetListDevice(
        pageIndex,
        pageSize,
        valueSearch,
        modelId,
        deviceStatus,
    );
    const [listDevice, setListDevice] = useState<DetailDeviceModel[]>([]);
    const [totalDevice, setTotalDevice] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetDataCreateDevice());
    }, []);
    useEffect(() => {
        currentPage = pageIndex;
        makeRequestListDevice();
        setIsLoading(true);
    }, [pageIndex, valueSearch, modelId, deviceStatus]);

    useEffect(() => {
        setIsLoading(false);
        if (responseListDevice.data) {
            const resultDevice = responseListDevice.data.deviceViewList.map((item) => ({
                ...item,
                key: uuid(),
            }));
            setListDevice(resultDevice);
            setTotalDevice(responseListDevice.data.page.totalResult);
        }
    }, [responseListDevice]);
    const handleChangePage = (value: any) => {
        setPageIndex(value - 1);
    };
    const handleOnSubmit = ({
        valueSearch,
        modelId,
        deviceStatus,
    }: {
        valueSearch: string;
        modelId: number;
        deviceStatus: string;
    }) => {
        setPageIndex(0);
        const returnResult = (value: any) => {
            if (value) {
                return value;
            } else {
                return undefined;
            }
        };
        setValueSearch(returnResult(valueSearch));
        setModelId(returnResult(modelId));
        setDeviceStatus(returnResult(deviceStatus));
    };

    return (
        <StyledViewPageWithTable>
            <HeaderTableDevice handleOnSubmit={handleOnSubmit} isLoadingButton={isLoading} />
            <TableFrame
                pageIndex={pageIndex}
                columns={columns}
                pageSize={pageSize}
                handleChangePage={handleChangePage}
                list={listDevice}
                isLoading={!isLoading}
                totalItem={totalDevice}
            />
        </StyledViewPageWithTable>
    );
}
export default ManagerDevicePage;
