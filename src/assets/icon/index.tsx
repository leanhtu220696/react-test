import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';

import {
    IconDelete,
    IconEditInTable,
    IconEye,
    IconLock,
    IconLockBlack,
    IconRecall,
    IconSoldier,
    IconUnLock,
    IconViewDevice,
    IconViewRoom,
    IconWaterPillar,
} from '../svg';

interface Props {
    to?: string;
    state?: any;
    onClick?: React.MouseEventHandler<HTMLSpanElement> | undefined;
}

const FormIcon = ({ children, title }: { children: React.ReactNode; title: string }) => {
    return (
        <Tooltip color="#108ee9" placement="top" title={title}>
            <div style={{ cursor: 'pointer' }}>{children}</div>
        </Tooltip>
    );
};
export const IconSoldierTooltip = ({ to, state }: Props) => {
    return (
        <Link to={to} state={state}>
            <FormIcon title="Xem chiến sĩ">
                <IconSoldier />
            </FormIcon>
        </Link>
    );
};

export const IconWaterPillarTooltip = ({ to, state }: Props) => {
    return (
        <Link to={to} state={state}>
            <FormIcon title="Xem trụ nước">
                <IconWaterPillar />
            </FormIcon>
        </Link>
    );
};

export const IconViewTooltip = ({ to, state, onClick }: Props) => {
    return (
        <Link to={to} state={state} onClick={onClick}>
            <FormIcon title="Xem/sửa">
                <IconEditInTable />
            </FormIcon>
        </Link>
    );
};

export const IconDeleteTooltip = ({ to, state, onClick }: Props) => {
    return (
        <Link to={to} state={state} onClick={onClick}>
            <FormIcon title="Xoá">
                <IconDelete />
            </FormIcon>
        </Link>
    );
};

export const IconViewDeviceTooltip = ({ to, state }: Props) => {
    return (
        <Link to={to} state={state}>
            <FormIcon title="Xem thiết bị">
                <IconViewDevice />
            </FormIcon>
        </Link>
    );
};

export const IconViewRoomTooltip = ({ to, state }: Props) => {
    return (
        <Link to={to} state={state}>
            <FormIcon title="Xem phòng">
                <IconViewRoom />
            </FormIcon>
        </Link>
    );
};

type typeStatus = 'PENDING' | 'ACTIVE' | 'INACTIVE';
export const IconLockAndUnLockTooltip = ({
    to,
    state,
    status,
    onClick,
}: {
    to?: string;
    state?: any;
    status: typeStatus;
    onClick: () => void;
}) => {
    const title = status === 'PENDING' ? 'Không thể khoá' : status === 'ACTIVE' ? 'Khoá tài khoản' : 'Mở tài khoản';
    return (
        <Link to={to} state={state} onClick={onClick}>
            <FormIcon title={title}>
                {status === 'PENDING' && <IconLockBlack />}
                {status === 'INACTIVE' && <IconUnLock />}
                {status === 'ACTIVE' && <IconLock />}
            </FormIcon>
        </Link>
    );
};

export const IconEyeTooltip = ({ to, state }: Props) => {
    return (
        <Link to={to} state={state}>
            <FormIcon title="Xem">
                <IconEye />
            </FormIcon>
        </Link>
    );
};

export const IconRecallTooltip = ({ to, state, onClick }: Props) => {
    return (
        <Link to={to} state={state} onClick={onClick}>
            <FormIcon title="Thu hồi">
                <IconRecall />
            </FormIcon>
        </Link>
    );
};
