import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { message, Modal } from 'antd';
import styled from 'styled-components';

import { DataErrorLockOrUnlock } from '@/assets/data/DataErrorCallApi';
import store from '@/context/store';
import { toggleModal } from '@/context/store/ModalSlice';
import { font } from '@/styles/Style-mixins';
import { showMessage } from '@/util/Util';

import { RootState } from '../../context/store/index';
import { useLockOrUnlockAccount } from '../../fetcher/Customer/CustomerService';

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

const ContentModal = ({
    phoneNumber,
    nameCustomer,
    status,
}: {
    phoneNumber: string;
    nameCustomer: string;
    status: string;
}) => {
    const desLockOrUnLock = status === 'ACTIVE' || status === 'PENDING' ? 'khoá' : 'mở khoá';
    return (
        <>
            <p>
                Bạn có chắc chắn muốn {desLockOrUnLock} tài khoản: {phoneNumber} - {nameCustomer}?
            </p>
        </>
    );
};

function LockOrUnlockAccountModal({
    visible,
    makeReload,
}: {
    visible: boolean;
    makeReload: (
        loadingArea?: string | undefined,
        expectedErrorStatus?: number[],
        requestBody?: Record<string, any>,
    ) => Promise<void>;
}) {
    const [statusNew, setStatusNew] = useState('');
    const { customerTarget } = useSelector((state: RootState) => state.modalState);
    const [resLockOrUnLock, makeReqLockOrUnlock] = useLockOrUnlockAccount(customerTarget?.id, statusNew);
    const [loadingBtnOk, setLoadingBtnOk] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (customerTarget) {
            if (customerTarget.status === 'ACTIVE' || customerTarget.status === 'PENDING') {
                setStatusNew('INACTIVE');
            }
            if (customerTarget.status === 'INACTIVE') {
                setStatusNew('PENDING');
            }
        }
    }, [customerTarget]);
    useEffect(() => {
        if (customerTarget && resLockOrUnLock) {
            setLoadingBtnOk(false);
            if (resLockOrUnLock.error) {
                const codeError = resLockOrUnLock.error.code;
                messageApi.open(showMessage('error', DataErrorLockOrUnlock[codeError]));
                setTimeout(() => {
                    store.dispatch(toggleModal());
                }, 100);
            } else if (resLockOrUnLock.data) {
                const desLockOrUnLock = statusNew === 'INACTIVE' ? 'Khoá' : 'Mở khoá';
                setTimeout(() => {
                    messageApi.open(
                        showMessage('success', `${desLockOrUnLock} tài khoản ${customerTarget.username} thành công!`),
                    );
                }, 100);
                makeReload();

                setTimeout(() => {
                    store.dispatch(toggleModal());
                }, 100);
            }
        }
    }, [resLockOrUnLock]);
    const handleOnClickOkModal = () => {
        setLoadingBtnOk(true);
        makeReqLockOrUnlock(undefined, [409, 404], { status: customerTarget.status });
    };
    const handleOnClickCancel = () => {
        if (!loadingBtnOk) {
            store.dispatch(toggleModal());
        }
    };
    return (
        <StyleModal
            title={dataTextConstant.titleModal}
            open={visible}
            cancelText={dataTextConstant.txtBtnCancelModal}
            okText={dataTextConstant.txtBtnOkModal}
            onOk={handleOnClickOkModal}
            onCancel={handleOnClickCancel}
            confirmLoading={loadingBtnOk}
        >
            {contextHolder}
            <ContentModal
                phoneNumber={customerTarget?.username}
                nameCustomer={customerTarget?.fullName}
                status={customerTarget?.status}
            />
        </StyleModal>
    );
}

export default LockOrUnlockAccountModal;
