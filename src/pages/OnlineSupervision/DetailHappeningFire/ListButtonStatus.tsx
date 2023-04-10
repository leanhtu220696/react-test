import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import styled from 'styled-components';

import { dataSelectStatusFireHappening } from '@/assets/data/DataConstant';
import { FireLogModel } from '@/model/FireLog/FireLogModel';
import { flex, font } from '@/styles/Style-mixins';
import {
    STATUS_FIRE_LOG_FALSE_ALERT,
    STATUS_FIRE_LOG_FIRE_DRILLS,
    STATUS_FIRE_LOG_IN_PROCESS,
    STATUS_FIRE_LOG_PENDING,
    STATUS_FIRE_LOG_RESOLVED,
} from '@/util/ConstantApp/TypeConstant';

interface StyleProps {
    color_status_current: string;
    color_status_new: string;
}

const StyleBackground = styled.div`
    ${flex('space-evenly', 'center', 'column')}
    div:nth-child(1) {
        margin: 15px 0 10px;

        & > h2 {
            ${font(16, '#000', 700)}
        }
    }

    div:nth-child(2) {
        width: 100%;
        ${flex('space-evenly', 'center', 'row')}
        flex-wrap: wrap;
    }
`;
const StyleButton = styled(Button)`
    height: auto;
    margin: 15px 0;
    padding: 10px 0;
    border-radius: 5px;
    border-color: #00adee;
    ${font(14, '#00adee', 700)}
    width: 47%;
`;
const StyleContentModal = styled.h4<StyleProps>`
    ${font(14, '#000', 400)};

    & > b:nth-child(1) {
        ${font(14, '#000', 700)};
        color: ${(props) => props.color_status_current};
    }

    & > b:nth-child(2) {
        ${font(14, '#000', 700)};
        color: ${(props) => props.color_status_new};
    }
`;

function ListButtonStatus({
    detailFireHappening,
    setStatusUpdate,
}: {
    detailFireHappening: FireLogModel;
    setStatusUpdate: (value: any) => void;
}) {
    const defaultDisable = {
        inProcess: false,
        resolved: false,
        fireDrills: false,
        falseAlert: false,
    };
    const modalConfirmUpdateStatus = (value: string) => {
        const detailStatusFireLogCurrent = dataSelectStatusFireHappening.find((item) => {
            return item.value === detailFireHappening.status;
        });
        const detailStatusFireLogNew = dataSelectStatusFireHappening.find((item) => {
            return item.value === value;
        });
        const convertColor = (status: string) => {
            if (status === STATUS_FIRE_LOG_PENDING) {
                return '#ec1b25';
            }
            if (status === STATUS_FIRE_LOG_IN_PROCESS) {
                return '#ff5e13b3';
            }
            return '#000';
        };
        Modal.confirm({
            title: <b>XÁC NHẬN</b>,
            content: (
                <StyleContentModal
                    color_status_current={convertColor(detailStatusFireLogCurrent?.value)}
                    color_status_new={convertColor(detailStatusFireLogNew?.value)}
                >
                    Chuyển trạng thái đám cháy từ <b> &quot;{detailStatusFireLogCurrent?.label} &quot;</b> sang{' '}
                    <b> &quot;{detailStatusFireLogNew.label} &quot;</b>
                </StyleContentModal>
            ),
            cancelText: 'Huỷ',
            okText: 'Xác nhận',
            onOk() {
                setStatusUpdate(value);
            },
        });
    };
    const [disabled, setDisabled] = useState(defaultDisable);
    useEffect(() => {
        if (!detailFireHappening) return;
        if (detailFireHappening.status === STATUS_FIRE_LOG_IN_PROCESS) {
            setDisabled({
                inProcess: true,
                resolved: false,
                fireDrills: true,
                falseAlert: true,
            });
            return;
        }
        if (detailFireHappening.status === STATUS_FIRE_LOG_PENDING) {
            setDisabled(defaultDisable);
            return;
        }
    }, [detailFireHappening]);
    return (
        <StyleBackground>
            <div>
                <h2>Cập nhật trạng thái đám cháy</h2>
            </div>
            <div>
                <StyleButton
                    disabled={disabled.fireDrills}
                    onClick={() => {
                        modalConfirmUpdateStatus(STATUS_FIRE_LOG_FIRE_DRILLS);
                    }}
                    type="default"
                >
                    Diễn tập
                </StyleButton>
                <StyleButton
                    disabled={disabled.inProcess}
                    onClick={() => {
                        modalConfirmUpdateStatus(STATUS_FIRE_LOG_IN_PROCESS);
                    }}
                    type="default"
                >
                    Đang xử lý
                </StyleButton>
                <StyleButton
                    disabled={disabled.falseAlert}
                    onClick={() => {
                        modalConfirmUpdateStatus(STATUS_FIRE_LOG_FALSE_ALERT);
                    }}
                    type="default"
                >
                    Cảnh báo sai
                </StyleButton>
                <StyleButton
                    disabled={disabled.resolved}
                    onClick={() => {
                        modalConfirmUpdateStatus(STATUS_FIRE_LOG_RESOLVED);
                    }}
                    type="default"
                >
                    Đã xử lý
                </StyleButton>
            </div>
        </StyleBackground>
    );
}

export default ListButtonStatus;
