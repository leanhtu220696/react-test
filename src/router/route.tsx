import { IconConstructionNavbar, IconCustomer, IconFire } from '@/assets/svg';
import IconCommandCenter from '@/assets/svg/icon-command-center.svg';
import IconDevice from '@/assets/svg/icon-device.svg';
import IconShield from '@/assets/svg/icon-shield.svg';
import IconCamera from '@/assets/svg/icon-supervision.svg';
import { RouteDetailModel } from '@/model/RouteModel';
import {
    COMMAND_CENTER_URL,
    CONSTRUCTION_URL,
    CUSTOMER_URL,
    EQUIPMENT_MANAGEMENT_URL,
    FIRE_DEPARTMENT_URL,
    FIRE_LOG_URL,
    ONLINE_SUPERVISION_URL,
} from '@/util/ConstantApp/Url';

export const dataMenu: RouteDetailModel[] = [
    {
        title: 'Trung tâm chỉ huy',
        icon: <IconCommandCenter />,
        route: COMMAND_CENTER_URL,
    },
    {
        title: 'Giám sát trực tuyến',
        icon: <IconCamera />,
        route: ONLINE_SUPERVISION_URL,
    },
    {
        title: 'Quản lý vụ cháy',
        icon: <IconFire />,
        route: FIRE_LOG_URL,
    },
    {
        title: 'Quản lý thiết bị',
        icon: <IconDevice />,
        route: EQUIPMENT_MANAGEMENT_URL,
    },
    {
        title: 'Quản lý khách hàng',
        icon: <IconCustomer />,
        route: CUSTOMER_URL,
    },
    {
        title: 'Quản lý công trình',
        icon: <IconConstructionNavbar />,
        route: CONSTRUCTION_URL,
    },
    {
        title: 'Quản lý đơn vị PCCC',
        icon: <IconShield />,
        route: FIRE_DEPARTMENT_URL,
    },
];
