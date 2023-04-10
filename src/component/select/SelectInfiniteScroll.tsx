import { ReactNode, useEffect, useState } from 'react';
import React from 'react';
import { Select, Spin } from 'antd';

import { IconDirect } from '@/assets/svg';
interface Props<T> {
    placeholder: string;
    data: T[];
    style: React.CSSProperties;
    value: any;
    onChange: (value: any) => void;
    makeRequest: (
        loadingArea?: string | undefined,
        expectedErrorStatus?: number[],
        requestBody?: Record<string, any>,
    ) => Promise<void>;
    item: (value: T) => ReactNode;
}
const { Option } = Select;
const SelectInfiniteScroll = <T extends object>({
    style,
    placeholder,
    data,
    makeRequest,
    item,
    value,
    onChange,
}: Props<T>) => {
    const [list, setList] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (data) {
            setList((state) => state.concat(data));
        }
    }, [data]);

    const onScroll = async (event: any) => {
        const target = event.target;
        if (data.length !== 0) {
            if (!loading && target.scrollTop + target.offsetHeight === target.scrollHeight) {
                setLoading(true);
                target.scrollTo(0, target.scrollHeight);
                setTimeout(() => {
                    makeRequest(undefined, [465]);
                    setLoading(false);
                }, 1500);
            }
        }
    };

    return (
        <Select
            size="large"
            style={style}
            loading={loading}
            onPopupScroll={onScroll}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            suffixIcon={<IconDirect />}
        >
            {list.map((el: T) => item(el))}
            {loading && (
                <Option>
                    <span>
                        <Spin></Spin> <span>Loading......</span>
                    </span>
                </Option>
            )}
        </Select>
    );
};

export default SelectInfiniteScroll;
