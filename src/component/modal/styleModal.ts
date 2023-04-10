import { Modal } from 'antd';
import styled from 'styled-components';

import { font } from '@/styles/style-mixins';

export const StyleModal = styled(Modal)`
    .ant-modal-title {
        ${font(14, '#fff', 600)}
    }
`;
export const dataTextConstant = {
    titleModal: 'Thông báo',
    txtBtnCancelModal: 'Huỷ',
    txtBtnOkModal: 'Xác Nhận',
};
