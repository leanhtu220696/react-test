import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, message } from 'antd';

import { DataErrorRecallDevice } from '@/assets/data/DataErrorCallApi';
import { StyleModal } from '@/component/modal/styleModal';
import { RootState } from '@/context/store';
import { cancelModal } from '@/context/store/ModalSlice';
import { useRecallDevice } from '@/fetcher/Construction/ConstructionService';
import { showMessage } from '@/util/Util';

const textConstant = {
    titleModal: 'Thu hồi thiết bị',
};
export const ModalRecallDevice = ({
    visible,
    constructionName,
    constructionId,
    makeReload,
}: {
    visible: boolean;
    constructionName: string;
    constructionId: number;
    makeReload?: (
        loadingArea?: string | undefined,
        expectedErrorStatus?: number[],
        requestBody?: Record<string, any>,
    ) => Promise<void>;
}) => {
    const dispatch = useDispatch();
    const { device } = useSelector((state: RootState) => state.modalState);
    const [recallDeviceRes, recallDeviceReq] = useRecallDevice(constructionId, device.id);
    const [loadingBtnDelete, setLoadingBtnDelete] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const onCancelBtn = () => {
        dispatch(cancelModal());
    };
    const submitRecallDevice = () => {
        setLoadingBtnDelete(true);
        recallDeviceReq(undefined, [404, 500]);
    };

    useEffect(() => {
        setTimeout(() => {
            setLoadingBtnDelete(false);
        }, 500);
        if (recallDeviceRes.data) {
            setTimeout(() => {
                dispatch(cancelModal());
            }, 100);
            messageApi.open(showMessage('success', 'Thu hồi thiết bị thành công!'));
            typeof makeReload === 'function' && makeReload();
        } else if (recallDeviceRes.error) {
            setTimeout(() => {
                dispatch(cancelModal());
            }, 100);
            const codeError: number = recallDeviceRes.error.code;
            messageApi.open(showMessage('error', DataErrorRecallDevice[codeError]));
        }
    }, [recallDeviceRes]);
    return (
        <StyleModal
            open={visible}
            closable={false}
            title={textConstant.titleModal}
            onCancel={onCancelBtn}
            footer={[
                <Button key="back" onClick={onCancelBtn}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={submitRecallDevice} loading={loadingBtnDelete}>
                    Xác nhận
                </Button>,
            ]}
        >
            {contextHolder}
            Bạn xác nhận muốn thu hồi thiết bị <strong>{device.name}</strong> khỏi công trình{' '}
            <strong>{constructionName}</strong>?
        </StyleModal>
    );
};
