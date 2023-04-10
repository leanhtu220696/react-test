import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, message } from 'antd';

import { DataCodeErrorDeleteRoom, DataErrorDeleteRoom } from '@/assets/data/DataErrorCallApi';
import { StyleModal } from '@/component/modal/styleModal';
import { cancelModal, toggleDeleteModal } from '@/context/store/ModalSlice';
import { useDeleteRoom } from '@/fetcher/Construction/RoomService';
import { DetailRoomModel } from '@/model/Construction/RoomModel';
import { showMessage } from '@/util/Util';

const textConstant = {
    titleModal: 'Thông báo',
};

export const ModalDeleteRoom = ({
    isDelete,
    detailRoom,
    idCons,
    makeReload,
}: {
    isDelete: boolean;
    detailRoom: DetailRoomModel;
    idCons: number;
    makeReload?: (
        loadingArea?: string | undefined,
        expectedErrorStatus?: number[],
        requestBody?: Record<string, any>,
    ) => Promise<void>;
}) => {
    const dispatch = useDispatch();
    const [deleteRoomRes, deleteRoomReq] = useDeleteRoom(idCons, detailRoom.id);
    const [loadingBtnDelete, setLoadingBtnDelete] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        setTimeout(() => {
            setLoadingBtnDelete(false);
        }, 500);
        if (deleteRoomRes.data) {
            setTimeout(() => {
                dispatch(cancelModal());
            }, 100);
            typeof makeReload === 'function' && makeReload();
            messageApi.open(showMessage('success', 'Xóa phòng thành công'));
        } else if (deleteRoomRes.error) {
            setTimeout(() => {
                dispatch(toggleDeleteModal());
            }, 100);
            const codeError: any = deleteRoomRes.error.code;
            messageApi.open(showMessage('error', DataErrorDeleteRoom[codeError]));
        }
    }, [deleteRoomRes]);
    const acceptDelHandle = () => {
        setLoadingBtnDelete(true);
        deleteRoomReq(undefined, DataCodeErrorDeleteRoom);
    };
    return (
        <StyleModal
            title={textConstant.titleModal}
            open={isDelete}
            closable={false}
            onCancel={() => dispatch(toggleDeleteModal())}
            footer={[
                <Button key="back" onClick={() => dispatch(toggleDeleteModal())}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={acceptDelHandle} loading={loadingBtnDelete}>
                    Xác nhận
                </Button>,
            ]}
        >
            {contextHolder}
            Bạn có chắc chắn muốn xóa <strong>{detailRoom.name}</strong> khỏi danh sách phòng?
        </StyleModal>
    );
};
