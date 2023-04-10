import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

import { StyledInput } from '@/styles/table';
import { ADD_SOLDIER_URL, FIRE_DEPARTMENT_URL } from '@/util/ConstantApp/Url';
import { LoadingDataState } from '@/util/UseApi';

const dataTextConstant = {
    title: 'DANH SÁCH CHIẾN SĨ PCCC',
    placeholderSearch: 'Nhập tên để tìm kiếm',
    btnSearch: 'Tìm kiếm',
    btnAddNew: 'Thêm mới',
};
interface Props {
    makeRequest: (
        id?: number,
    ) => [
        LoadingDataState<any>,
        (loadingArea?: string, expectedErrorStatus?: number[], requestBody?: Record<string, any>) => Promise<any>,
    ];
}

const HeaderTableSoldier = ({ makeRequest }: Props) => {
    const { id } = useParams();
    const [responseTitleHeaderTable, sendRequestGetTitleHeaderTable] = makeRequest(+id);
    const dataTitleHeaderTable = responseTitleHeaderTable.data;
    useEffect(() => {
        sendRequestGetTitleHeaderTable();
    }, []);
    return (
        <div>
            <div style={{ textAlign: 'center', marginTop: 25, marginBottom: 25 }}>
                <div style={{ marginBottom: 10 }}>
                    <p style={{ fontSize: 22, fontWeight: 700 }}>{dataTextConstant.title}</p>
                    <p style={{ fontSize: 20, fontWeight: 700 }}>{dataTitleHeaderTable?.name}</p>
                    <p style={{ fontSize: 20, fontWeight: 400 }}>
                        Số {dataTitleHeaderTable?.fullAddress} - {dataTitleHeaderTable?.district.name} -
                        {dataTitleHeaderTable?.province.name}
                    </p>
                </div>
            </div>
            <StyledInput>
                <Input placeholder={dataTextConstant.placeholderSearch} />
                <Button type="primary" size="large">
                    {dataTextConstant.btnSearch}
                    {<SearchOutlined style={{ fontSize: 18 }} />}
                </Button>
                <div style={{ float: 'right', marginLeft: 'auto' }}>
                    <Link to={`${FIRE_DEPARTMENT_URL}/${id}${ADD_SOLDIER_URL}`}>
                        <Button
                            style={{ width: 130 }}
                            type="primary"
                            size="large"
                            icon={<PlusOutlined style={{ fontSize: 20 }} />}
                        >
                            {dataTextConstant.btnAddNew}
                        </Button>
                    </Link>
                </div>
            </StyledInput>
        </div>
    );
};
export default HeaderTableSoldier;
