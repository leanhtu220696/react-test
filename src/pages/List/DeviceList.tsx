import { useState } from 'react';
import { Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';

// import { useGetListDevice } from '@/fetcher/DeviceService';
import { DetailDeviceModel } from '@/Model/Device';

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

// let currentPage = 0;
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
        // render: (_value, _record, _index) => {
        //     return _index + currentPage * 10 + 1;
        // },
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
];

function ManagerDevicePage() {
    // const pageSize = 10;
    // const [pageIndex] = useState(0);
    // const [valueSearch] = useState();
    // const [modelId] = useState();
    // const [deviceStatus] = useState();
    // const [responseDeviceList, makeRequestListDevice] = useGetListDevice(
    //     pageIndex,
    //     pageSize,
    //     valueSearch,
    //     modelId,
    //     deviceStatus,
    // );
    const [listDevice] = useState<DetailDeviceModel[]>([]);

    // useEffect(() => {
    //     if (responseDeviceList.data) {
    //         setDeviceList(responseDeviceList.data.deviceViewList);
    //     }
    // }, [responseDeviceList]);
    // useEffect(() => {
    //     currentPage = pageIndex;
    //     makeRequestListDevice();
    // }, [pageIndex, valueSearch, modelId, deviceStatus]);

    return (
        <div>
            <div>Imei</div>
            <Table columns={columns} dataSource={listDevice} pagination={false} />
        </div>
    );
}
export default ManagerDevicePage;
