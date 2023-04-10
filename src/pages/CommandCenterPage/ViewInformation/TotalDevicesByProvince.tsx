import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import { useCoordinatesStore } from '@/component/hook/useCoordinatesStore';
import { useGetTotalDeviceByProvince } from '@/fetcher/Device/DeviceService';
import { OverviewDeviceModel } from '@/model/Device/DeviceModel';
import { flex, font } from '@/styles/Style-mixins';
const dataTextConstant = {
    title: 'Số thiết bị lặp đặt trên các quận huyện',
};
const StyleBackground = styled.div`
    border: 1px solid #000;
    border-radius: 4px;
    margin-top: 20px;
    width: 100%;
    height: 510px;
    & > div:nth-child(1) {
        overflow-x: hidden;
        overflow-y: hidden;
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 8px 0;
        border-bottom: 1px solid #000;
        h3 {
            width: 195px;
            word-wrap: break-word;
            text-align: center;
            ${font(15, '#000', 700)}
        }
    }
    & > div:nth-child(2) {
        overflow-x: hidden;
        overflow-y: scroll;
        width: 100%;
        height: 440px;
        padding: 10px 0;
        display: flex;
        justify-content: start;
        flex-direction: column;
        & > a {
            padding: 5px 0;
            ${flex('flex-start', 'flex-start', 'row')}
            h4 {
                width: 50%;
                ${font(12, '#000', 400)}
            }
            h4:nth-child(1) {
                text-align: center;
            }
        }
    }
`;

function TotalDevicesByProvince() {
    const [responseTotalDevicesByProvince, makeRequestTotalDevicesByProvince] = useGetTotalDeviceByProvince();
    const [listTotalDevicesByProvince, setListTotalDevicesByProvince] = useState<OverviewDeviceModel[]>([]);
    const { setCoordinatesStore } = useCoordinatesStore();
    useEffect(() => {
        makeRequestTotalDevicesByProvince();
    }, []);
    useEffect(() => {
        if (responseTotalDevicesByProvince.data) {
            setListTotalDevicesByProvince(responseTotalDevicesByProvince.data);
        }
    }, [responseTotalDevicesByProvince]);
    return (
        <StyleBackground>
            <div>
                <h3>{dataTextConstant.title}</h3>
            </div>
            <div>
                {listTotalDevicesByProvince.map((item) => {
                    return (
                        <a
                            key={uuid()}
                            onClick={() => {
                                setCoordinatesStore({
                                    latitude: +item.latitude,
                                    longitude: +item.longitude,
                                });
                            }}
                        >
                            <h4>{item.count}</h4>
                            <h4>{item.name}</h4>
                        </a>
                    );
                })}
            </div>
        </StyleBackground>
    );
}
export default TotalDevicesByProvince;
