import { useDispatch, useSelector } from 'react-redux';

import { dataTextConstant, StyleModal } from '@/component/modal/styleModal';
import { getPhoneNumberExists, setChangeModal } from '@/context/store/PhoneNumberExistsSlice';

const ContentModal = ({ phoneNumber, name }: { phoneNumber: any; name: any }) => {
    return (
        <>
            <p>
                Số điện thoại <b>{phoneNumber}</b> đã được đăng ký dưới tên <b>{name}</b>.
            </p>
            <p>Bạn có muốn thêm số điện thoại vào danh sách nhận cảnh báo? </p>
        </>
    );
};

function ModalNotificationOfDuplicatePhoneNumber() {
    const dispatch = useDispatch();
    const phoneNumberExists = useSelector(getPhoneNumberExists);

    const handleOnClickOkModal = () => {
        dispatch(
            setChangeModal({
                checked: true,
                phoneNumber: phoneNumberExists.phoneNumber,
                name: phoneNumberExists.name,
                visible: false,
            }),
        );
    };

    const handleOnClickCancelModal = () => {
        dispatch(
            setChangeModal({
                checked: false,
                phoneNumber: '',
                name: '',
                visible: false,
            }),
        );
    };

    return (
        <StyleModal
            title={dataTextConstant.titleModal}
            open={phoneNumberExists.visible}
            cancelText={dataTextConstant.txtBtnCancelModal}
            okText={dataTextConstant.txtBtnOkModal}
            onOk={handleOnClickOkModal}
            onCancel={handleOnClickCancelModal}
        >
            <ContentModal phoneNumber={phoneNumberExists.phoneNumber} name={phoneNumberExists.name} />
        </StyleModal>
    );
}

export default ModalNotificationOfDuplicatePhoneNumber;
