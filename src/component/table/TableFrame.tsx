import { useEffect, useState } from 'react';
import { ConfigProvider, Empty } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { v4 as uuuid } from 'uuid';

import { StyledPagination, StyledTable } from '@/styles/table';

let currentPage = 0;

interface Props<T> {
    columns: ColumnsType<T>;
    list: T[];
    totalItem: number;
    pageIndex: number;
    pageSize: number;
    handleChangePage: (value: any) => void;
    isLoading: boolean;
    rowClassName?: any;
}
function TableFrame<T extends object>({
    columns,
    pageIndex,
    list,
    totalItem,
    pageSize,
    isLoading,
    handleChangePage,
    rowClassName,
}: Props<T>) {
    const [data, setData] = useState<Props<object>[]>();

    useEffect(() => {
        if (list) {
            const result = list.map((item: any) => ({
                ...item,
                key: uuuid(),
            }));
            setData(result);
        }
    }, [list]);
    useEffect(() => {
        currentPage = pageIndex;
    }, [pageIndex]);
    return (
        <>
            <ConfigProvider
                renderEmpty={() => (
                    <Empty
                        style={{ fontSize: 15, fontWeight: 600, color: '#c5c5c5' }}
                        description="Danh sách hiện tại đang trống"
                    />
                )}
            >
                <StyledTable
                    columns={columns}
                    dataSource={data}
                    loading={!isLoading}
                    pagination={false}
                    rowClassName={rowClassName}
                />
            </ConfigProvider>
            <StyledPagination
                style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 22 }}
                pageSize={pageSize}
                current={currentPage + 1}
                showTitle={false}
                defaultCurrent={1}
                total={totalItem}
                onChange={handleChangePage}
            />
            <p
                style={{
                    fontSize: 18,
                    lineHeight: 20,
                    fontWeight: 700,
                    marginTop: -200,
                }}
            >
                Tổng:{totalItem}
            </p>
        </>
    );
}
export default TableFrame;
