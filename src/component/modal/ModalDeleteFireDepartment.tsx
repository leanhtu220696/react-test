import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Modal } from 'antd';
import styled from 'styled-components';

import { DataCodeErrorDeleteFireDepartment, DataErrorDeleteFireDepartment } from '@/assets/data/DataErrorCallApi';
import { useDeleteFireDepartment } from '@/fetcher/FireDepartment/FireDepartmentService';
import { font } from '@/styles/Style-mixins';
import { FIRE_DEPARTMENT_URL } from '@/util/ConstantApp/Url';
import { setMessageRedirectUri, showMessage } from '@/util/Util';

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
                Bạn có chắc muốn xoá đơn vị PCCC {name} có địa chỉ tại {address} ?
            </p>
        </>
    );
};

function ModalDeleteFireDepartment({
    idDepartment,
    visible,
    nameFireDepartment,
    addressFireDepartment,
    handleOnClickCancel,
}: {
    idDepartment: number;
    visible: boolean;
    nameFireDepartment: string;
    addressFireDepartment: string;
    handleOnClickCancel: () => void;
}) {
    const [resResultDeleteFireDepartment, makeReqDeleteFireDepartment] = useDeleteFireDepartment(+idDepartment);
    const navigate = useNavigate();
    const [loadingBtnDelete, setLoadingBtnDelete] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        setTimeout(() => {
            setLoadingBtnDelete(false);
        }, 500);
        if (resResultDeleteFireDepartment.data) {
            setTimeout(() => {
                handleOnClickCancel();
            }, 100);
            setTimeout(() => {
                navigate(`${FIRE_DEPARTMENT_URL}`, {
                    state: setMessageRedirectUri('success', 'Xoá đơn vị PCCC thành công!'),
                });
            }, 200);
        } else if (resResultDeleteFireDepartment.error) {
            setTimeout(() => {
                handleOnClickCancel();
            }, 100);
            const codeError: any = resResultDeleteFireDepartment.error.code;
            messageApi.open(showMessage('error', DataErrorDeleteFireDepartment[codeError]));
        }
    }, [resResultDeleteFireDepartment]);
    const handleOnClickOkModal = () => {
        setLoadingBtnDelete(true);
        makeReqDeleteFireDepartment(undefined, DataCodeErrorDeleteFireDepartment);
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
            <ContentModal address={addressFireDepartment} name={nameFireDepartment} />
        </StyleModal>
    );
}

export default ModalDeleteFireDepartment;
