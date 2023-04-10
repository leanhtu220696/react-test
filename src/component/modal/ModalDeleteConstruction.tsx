import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Modal } from 'antd';
import styled from 'styled-components';

import { DataErrorDeleteConstruction } from '@/assets/data/DataErrorCallApi';
import { useDeleteConstruction } from '@/fetcher/Construction/ConstructionService';
import { font } from '@/styles/Style-mixins';
import { CONSTRUCTION_URL } from '@/util/ConstantApp/Url';
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
                Bạn có chắc muốn xoá công trình {name} có địa chỉ tại {address} ?
            </p>
        </>
    );
};

function ModalDeleteConstruction({
    id,
    visible,
    nameConstruction,
    addressConstruction,
    handleOnClickCancel,
    makeRequest,
}: {
    id: number;
    visible: boolean;
    nameConstruction: string;
    addressConstruction: string;
    handleOnClickCancel: () => void;
    makeRequest?: (
        loadingArea?: string | undefined,
        expectedErrorStatus?: number[],
        requestBody?: Record<string, any>,
    ) => Promise<void>;
}) {
    const [resResultDeleteConstruction, makeReqDeleteConstruction] = useDeleteConstruction(+id);
    const navigate = useNavigate();
    const [loadingBtnDelete, setLoadingBtnDelete] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        setTimeout(() => {
            setLoadingBtnDelete(false);
        }, 500);
        if (resResultDeleteConstruction.data) {
            setTimeout(() => {
                handleOnClickCancel();
            }, 100);
            setTimeout(() => {
                navigate(CONSTRUCTION_URL, { state: setMessageRedirectUri('success', 'Xoá công trình thành công!') });
            }, 200);
            typeof makeRequest === 'function' && makeRequest();
        } else if (resResultDeleteConstruction.error) {
            setTimeout(() => {
                handleOnClickCancel();
            }, 100);
            const codeError: any = resResultDeleteConstruction.error.code;
            messageApi.open(showMessage('error', DataErrorDeleteConstruction[codeError]));
        }
    }, [resResultDeleteConstruction]);
    const handleOnClickOkModal = () => {
        setLoadingBtnDelete(true);
        makeReqDeleteConstruction(undefined, [500, 404, 409]);
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
            <ContentModal address={addressConstruction} name={nameConstruction} />
        </StyleModal>
    );
}

export default ModalDeleteConstruction;
