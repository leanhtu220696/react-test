import {
    BUSINESS_SECTOR_HOSPITALS_MEDICAL_FACILITIES,
    BUSINESS_SECTOR_MARKET,
    BUSINESS_SECTOR_OFFICE_BUILDING,
    BUSINESS_SECTOR_PRESS_POSTAL,
    BUSINESS_SECTOR_PRINTING_FACILITY,
    BUSINESS_SECTOR_PRODUCTION_COMPANY,
    BUSINESS_SECTOR_RESEARCH_FACILITY,
    BUSINESS_SECTOR_RESIDENTIAL_BUILDING,
    BUSINESS_SECTOR_TEXTILE_FOOTWEAR_ESTABLISHMENTS,
    FireLogStatus,
    OTHER,
    SoldierRank,
    SoldierTeam,
    STATUS_FIRE_LOG_FALSE_ALERT,
    STATUS_FIRE_LOG_FIRE_DRILLS,
    STATUS_FIRE_LOG_IN_PROCESS,
    STATUS_FIRE_LOG_PENDING,
    STATUS_FIRE_LOG_RESOLVED,
    TYPE_BUSINESS_TOWNHOUSE,
    TYPE_HOUSES_OVER_7_FLOORS,
    TYPE_HOUSES_UNDER_7_FLOORS,
    TypeCustomer,
    TypeUnitDepartment,
    TypeUnitStatusConnect,
    TypeUnitStatusDevice,
    TypeWaterIntake,
} from '@/util/ConstantApp/TypeConstant';

export const dataSelectStatusFireHappening = [
    {
        value: STATUS_FIRE_LOG_PENDING,
        label: 'Chờ xử lý',
    },
    {
        value: STATUS_FIRE_LOG_IN_PROCESS,
        label: 'Đang xử lý',
    },
    {
        value: STATUS_FIRE_LOG_RESOLVED,
        label: 'Đã xử lý',
    },
    {
        value: STATUS_FIRE_LOG_FIRE_DRILLS,
        label: 'Diễn tập',
    },
    {
        value: STATUS_FIRE_LOG_FALSE_ALERT,
        label: 'Cảnh báo sai',
    },
];
export const dataSelectTypeConstructor = [
    {
        value: TYPE_BUSINESS_TOWNHOUSE,
        label: 'Nhà phố kinh doanh',
    },
    {
        value: TYPE_HOUSES_OVER_7_FLOORS,
        label: 'Nhà trên 7 tầng',
    },
    {
        value: TYPE_HOUSES_UNDER_7_FLOORS,
        label: 'Nhà dưới 7 tầng',
    },
    {
        value: OTHER,
        label: 'Khác',
    },
];
export const dataSelectBusinessSector = [
    {
        value: BUSINESS_SECTOR_OFFICE_BUILDING,
        label: 'Tòa nhà văn phòng',
    },
    {
        value: BUSINESS_SECTOR_RESIDENTIAL_BUILDING,
        label: 'Tòa nhà dân cư',
    },
    {
        value: BUSINESS_SECTOR_PRODUCTION_COMPANY,
        label: 'Công ty sản xuất',
    },
    {
        value: BUSINESS_SECTOR_PRESS_POSTAL,
        label: 'Báo chí, bưu chính',
    },
    {
        value: BUSINESS_SECTOR_HOSPITALS_MEDICAL_FACILITIES,
        label: 'Bệnh viện, cơ sở y tế',
    },
    {
        value: BUSINESS_SECTOR_MARKET,
        label: 'Chợ',
    },
    {
        value: BUSINESS_SECTOR_TEXTILE_FOOTWEAR_ESTABLISHMENTS,
        label: 'Cơ sở dệt may, da giày',
    },
    {
        value: BUSINESS_SECTOR_PRINTING_FACILITY,
        label: 'Cơ sở in ấn',
    },
    {
        value: BUSINESS_SECTOR_RESEARCH_FACILITY,
        label: 'Cơ sở nghiên cứu KH',
    },
    {
        value: OTHER,
        label: 'Khác',
    },
];
export const dataStepCreateBuilding = [
    {
        title: 'Chọn vị trí lắp đặt',
    },
    {
        title: 'Chọn tài khoản khách hàng',
    },
    {
        title: 'Điền thông tin kích hoạt',
    },
    {
        title: 'Hoàn tất kích hoạt',
    },
];
export const dataStepAddConstruction = [
    {
        title: 'Nhập thông tin công trình',
    },
    {
        title: 'Nhập thông tin khách hàng',
    },
];
export const optionSearchStatus = [
    {
        value: 'ACTIVE',
        label: 'Đang hoạt động',
    },
    {
        value: 'LOCKED',
        label: 'Khoá',
    },
    {
        value: 'STORAGE',
        label: 'Lưu kho',
    },
    {
        value: 'MAINTENANCE',
        label: 'Bảo hành',
    },
    {
        value: 'ERROR',
        label: 'Lỗi',
    },
];

export const dataSelectTypeRank: Record<SoldierRank, string> = {
    COLONEL_GENERAL: 'Đại tướng',
    LIEUTENANT_GENERAL: 'Thượng tướng',
    MAJOR_GENERAL: 'Trung tướng',
    SENIOR_COLONEL: 'Thiếu tướng',
    COLONEL: 'Đại tá',
    LIEUTENANT_COLONEL: 'Thượng tá',
    MAJOR: 'Trung tá',
    CAPTAIN: 'Thiếu tá',
    SENIOR_LIEUTENANT: 'Đại úy',
    LIEUTENANT: 'Thượng úy',
    JUNIOR_LIEUTENANT: 'Trung úy',
    ASPIRANT: 'Thiếu úy',
    SERGEANT_MAJOR: 'Thượng sĩ',
    SERGEANT: 'Trung sĩ',
    COMMISSIONED: 'Hạ sĩ',
    MOST_SOLDIERS: 'Binh nhất',
    PRIVATE: 'Binh nhì',
};

export const dataSelectTypeTeam: Record<SoldierTeam, string> = {
    PREVENTION: 'Đội PC',
    FIREFIGHTING_AND_RESCUE: 'Đội CC&CHCN',
};

export const dateSelectTypeCustomer: Record<TypeCustomer, string> = {
    ALL: 'Tất cả',
    PERSONAL: 'Khách hàng cá nhân',
    HOUSEHOLD_BUSINESS: 'Hộ kinh doanh',
    ENTERPRISE: 'Doanh nghiệp',
};
export const dataSelectTypeWater: Record<TypeWaterIntake, string> = {
    WATER_PILLAR: 'Trụ nước',
    LAKE: 'Ao hồ',
    POOL: 'Bể nước',
};

export const fireLogStatus: Record<FireLogStatus, string> = {
    PENDING: 'Chờ xử lý',
    IN_PROCESS: 'Đang xử lý',
    RESOLVED: 'Đã xử lý',
    FIRE_DRILLS: 'Diễn tập',
    FALSE_ALERT: 'Cảnh báo sai',
};

export const fireLogStatusColor: Record<FireLogStatus, string> = {
    PENDING: '#EC1B25',
    IN_PROCESS: '#FF8A47',
    RESOLVED: '#32AF64',
    FIRE_DRILLS: '#3A3A3A',
    FALSE_ALERT: '#3A3A3A',
};
export const dataSelectTypeUnit: Record<TypeUnitDepartment, string> = {
    TYPE_BUSINESS_UNIT: 'Nghiệp vụ',
    TYPE_ADMINISTRATIVE_UNIT: 'Hành chính',
};

export const dataStatusDeviceTypeUnit: Record<TypeUnitStatusDevice, string> = {
    ACTIVE: 'Đang hoạt động',
    LOCKED: 'Khoá',
    STORAGE: 'Lưu kho',
    MAINTENANCE: 'Bảo hành',
    ERROR: 'Lỗi',
};

export const dataStatusConnectUnit: Record<TypeUnitStatusConnect, string> = {
    ONLINE: 'Kết nối',
    OFFLINE: 'Không kết nối',
};
