import { useEffect, useState } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Button, Divider, message } from 'antd';
import styled from 'styled-components';

import { DataCodeErrorUpdateStatusHappening, DataErrorUpdateStatusHappening } from '@/assets/data/DataErrorCallApi';
import { DetailFireDepartmentLoader } from '@/elements/skeleton/ExampleLoader';
import { useGetDetailFireLog, useUpdateStatusFireHappening } from '@/fetcher/FireLog/FireLogService';
import { flex, font } from '@/styles/Style-mixins';
import { DETAIL_FIRE_HAPPENING_LOADER } from '@/util/ConstantApp/TypeLoader';

import { showMessage } from '../../../util/Util';

import DescDetailHappeningFire from './DescDetailHappeningFire';
import ListButtonStatus from './ListButtonStatus';
import TabSearch from './TabSearchDirect';

const StyleBackground = styled.div`
    width: 420px;
    @media (max-width: 1441px) {
        width: 380px;
    }
    padding: 20px 20px !important;
    & > div:nth-child(1) {
        width: 100%;
        padding-right: 10%;
        margin: 5px 0 25px;
        ${flex('flex-start', 'center', 'row')}
        & > button {
            width: 10%;
        }
        & > button:hover {
            background-color: #fff;
        }
        & > h2 {
            margin: 0;
            width: 90%;
            text-align: center;
            ${font(22, '#000', 700)}
        }
    }
`;

function DetailHappeningFire({
    idFireHappening,
    setStateDescWhenUpdateStatus,
}: {
    setStateDescWhenUpdateStatus: (value: any) => void;
    idFireHappening: number;
}) {
    const [responseDetailHappening, makeRequestFireHappening] = useGetDetailFireLog(idFireHappening);
    const [statusUpdate, setStatusUpdate] = useState('');
    const [responseUpdateStatus, makeRequestUpdateStatus] = useUpdateStatusFireHappening(idFireHappening, statusUpdate);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (statusUpdate) {
            makeRequestUpdateStatus(DETAIL_FIRE_HAPPENING_LOADER, DataCodeErrorUpdateStatusHappening);
        }
    }, [statusUpdate]);
    useEffect(() => {
        if (responseDetailHappening.error) {
            if (responseDetailHappening.error.code === 404) {
                messageApi.open(showMessage('error', 'Không tìm thấy đám cháy'));
            }
        }
    }, [responseDetailHappening]);
    useEffect(() => {
        if (responseUpdateStatus && responseUpdateStatus.data) {
            setStateDescWhenUpdateStatus((state: any) => {
                return {
                    ...state,
                    isUpdateStatus: true,
                    isOpenDetail: false,
                };
            });
        } else if (responseUpdateStatus.error) {
            const codeError = responseUpdateStatus.error.code;
            messageApi.open(showMessage('error', DataErrorUpdateStatusHappening[codeError]));
        }
    }, [responseUpdateStatus]);
    useEffect(() => {
        if (idFireHappening && idFireHappening !== -1) {
            makeRequestFireHappening(DETAIL_FIRE_HAPPENING_LOADER, [404]);
        }
    }, [idFireHappening]);
    return (
        <StyleBackground>
            {contextHolder}
            <DetailFireDepartmentLoader loadingarea={DETAIL_FIRE_HAPPENING_LOADER}>
                <div>
                    <Button
                        type="text"
                        icon={<LeftOutlined />}
                        onClick={() => {
                            setStateDescWhenUpdateStatus((state: any) => {
                                return {
                                    ...state,
                                    isOpenDetail: false,
                                };
                            });
                        }}
                    ></Button>
                    <h2>CHI TIẾT ĐIỂM CHÁY</h2>
                </div>
                <TabSearch detailHappeningFire={responseDetailHappening?.data} />
                <DescDetailHappeningFire detailFireHappening={responseDetailHappening?.data} />
                <Divider style={{ backgroundColor: '#000', margin: '10px 0' }} />
                <ListButtonStatus
                    detailFireHappening={responseDetailHappening?.data}
                    setStatusUpdate={setStatusUpdate}
                />
            </DetailFireDepartmentLoader>
        </StyleBackground>
    );
}
export default DetailHappeningFire;
