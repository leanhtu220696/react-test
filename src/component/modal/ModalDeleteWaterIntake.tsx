import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Modal } from 'antd';
import styled from 'styled-components';

import { DataErrorDeleteWaterIntake } from '@/assets/data/DataErrorCallApi';
import { useDeleteWaterIntake } from '@/fetcher/FireDepartment/FireDepartmentService';
import { font } from '@/styles/Style-mixins';
import { FIRE_DEPARTMENT_URL, WATER_INTAKE_URL } from '@/util/ConstantApp/Url';
import { showMessage } from '@/util/Util';

import { setMessageRedirectUri } from '../../util/Util';

const StyleModal = styled(Modal)`
    .ant-modal-title {
        ${font(14, '#fff', 600)}
    }
`;
const dataTextConstant = {
    titleModal: 'Thông báo',
    txtBtnCancelModal: 'Huỷ',
    txtBtnOkModal: 'Xác Nhận',
};

const ContentModal = ({ name, address }: { name: any; address: any }) => {
    return (
        <>
            <p>
                Bạn có chắc muốn xoá điểm lấy nước {name} có địa chỉ tại {address} ?
            </p>
        </>
    );
};

function ModalDeleteWaterIntake({
    idWaterIntake,
    idDepartment,
    visible,
    nameWaterIntake,
    addressWaterIntake,
    handleOnClickCancel,
}: {
    idDepartment: number;
    idWaterIntake: number;
    visible: boolean;
    nameWaterIntake: string;
    addressWaterIntake: string;
    handleOnClickCancel: () => void;
}) {
    const [resResultDeleteWaterIntake, makeReqDeleteWaterIntake] = useDeleteWaterIntake(+idDepartment, +idWaterIntake);
    const navigate = useNavigate();
    const [loadingBtnDelete, setLoadingBtnDelete] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        setTimeout(() => {
            setLoadingBtnDelete(false);
        }, 500);
        if (resResultDeleteWaterIntake.data) {
            setTimeout(() => {
                handleOnClickCancel();
            }, 100);
            setTimeout(() => {
                navigate(`${FIRE_DEPARTMENT_URL}/${idDepartment}${WATER_INTAKE_URL}`, {
                    state: setMessageRedirectUri('success', 'Xoá điểm lấy nước thành công!'),
                });
            }, 200);
        } else if (resResultDeleteWaterIntake.error) {
            setTimeout(() => {
                handleOnClickCancel();
            }, 100);
            const codeError: any = resResultDeleteWaterIntake.error.code;
            messageApi.open(showMessage('error', DataErrorDeleteWaterIntake[codeError]));
        }
    }, [resResultDeleteWaterIntake]);
    const handleOnClickOkModal = () => {
        setLoadingBtnDelete(true);
        makeReqDeleteWaterIntake(undefined, [404]);
    };

    return (
        <StyleModal
            title={dataTextConstant.titleModal}
            open={visible}
            cancelText={dataTextConstant.txtBtnCancelModal}
            okText={dataTextConstant.txtBtnOkModal}
            onOk={handleOnClickOkModal}
            onCancel={handleOnClickCancel}
            confirmLoading={loadingBtnDelete}
        >
            {contextHolder}
            <ContentModal address={addressWaterIntake} name={nameWaterIntake} />
        </StyleModal>
    );
}

export default ModalDeleteWaterIntake;
