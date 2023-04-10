//Key: Key localStorage
export const CREATE_DEVICE_LS_KEY = 'CREATE_DEVICE';
export const ORIGIN_AND_DESTINATION_LS_KEY = 'ORIGIN_AND_DESTINATION';
//Key: Key type customer
export const TYPE_PERSONAL = 'PERSONAL';
export const TYPE_HOUSEHOLD_BUSINESS = 'HOUSEHOLD_BUSINESS';
export const TYPE_ENTERPRISE = 'ENTERPRISE';

//Key: Type Constructor
export const TYPE_BUSINESS_TOWNHOUSE = 'BUSINESS_TOWNHOUSE';
export const TYPE_HOUSES_OVER_7_FLOORS = 'HOUSES_OVER_7_FLOORS';
export const TYPE_HOUSES_UNDER_7_FLOORS = 'HOUSES_UNDER_7_FLOORS';
export const OTHER = 'OTHER';

//Key: Business sector
export const BUSINESS_SECTOR_OFFICE_BUILDING = 'OFFICE_BUILDING';
export const BUSINESS_SECTOR_RESIDENTIAL_BUILDING = 'RESIDENTIAL_BUILDING';
export const BUSINESS_SECTOR_PRODUCTION_COMPANY = 'PRODUCTION_COMPANY';
export const BUSINESS_SECTOR_PRESS_POSTAL = 'PRESS_POSTAL';
export const BUSINESS_SECTOR_HOSPITALS_MEDICAL_FACILITIES = 'HOSPITALS_MEDICAL_FACILITIES';
export const BUSINESS_SECTOR_MARKET = 'MARKET';
export const BUSINESS_SECTOR_TEXTILE_FOOTWEAR_ESTABLISHMENTS = 'TEXTILE_FOOTWEAR_ESTABLISHMENTS';
export const BUSINESS_SECTOR_PRINTING_FACILITY = 'PRINTING_FACILITY';
export const BUSINESS_SECTOR_RESEARCH_FACILITY = 'RESEARCH_FACILITY';

export const SoldierRankUnion = [
    'COLONEL_GENERAL',
    'LIEUTENANT_GENERAL',
    'MAJOR_GENERAL',
    'SENIOR_COLONEL',
    'COLONEL',
    'LIEUTENANT_COLONEL',
    'MAJOR',
    'CAPTAIN',
    'SENIOR_LIEUTENANT',
    'LIEUTENANT',
    'JUNIOR_LIEUTENANT',
    'ASPIRANT',
    'SERGEANT_MAJOR',
    'SERGEANT',
    'COMMISSIONED',
    'MOST_SOLDIERS',
    'PRIVATE',
] as const;

export type SoldierRank = (typeof SoldierRankUnion)[number];

export const SoldierTeamUnion = ['FIREFIGHTING_AND_RESCUE', 'PREVENTION'] as const;

export type SoldierTeam = (typeof SoldierTeamUnion)[number];

export const TypeCustomerUnion = ['PERSONAL', 'HOUSEHOLD_BUSINESS', 'ENTERPRISE', 'ALL'] as const;

export type TypeCustomer = (typeof TypeCustomerUnion)[number];

export type FireLogStatus = (typeof FireLogStatusUnion)[number];

export const FireLogStatusUnion = ['PENDING', 'IN_PROCESS', 'RESOLVED', 'FIRE_DRILLS', 'FALSE_ALERT'] as const;

export const TypeCustomerWaterIntake = ['WATER_PILLAR', 'LAKE', 'POOL'] as const;

export type TypeWaterIntake = (typeof TypeCustomerWaterIntake)[number];

export const TypeCustomerUnit = ['TYPE_BUSINESS_UNIT', 'TYPE_ADMINISTRATIVE_UNIT'] as const;

export type TypeUnitDepartment = (typeof TypeCustomerUnit)[number];

export const TypeStatusDevice = ['ACTIVE', 'INACTIVE', 'STORAGE', 'MAINTENANCE', 'ERROR'];

export type TypeUnitStatusDevice = (typeof TypeStatusDevice)[number];

export const TypeStatusConnect = ['ONLINE', 'OFFLINE'];

export type TypeUnitStatusConnect = (typeof TypeStatusConnect)[number];

//Key: STATUS_FIRE_LOG fire happening
export const STATUS_FIRE_LOG_PENDING = 'PENDING';
export const STATUS_FIRE_LOG_IN_PROCESS = 'IN_PROCESS';
export const STATUS_FIRE_LOG_RESOLVED = 'RESOLVED';
export const STATUS_FIRE_LOG_FIRE_DRILLS = 'FIRE_DRILLS';
export const STATUS_FIRE_LOG_FALSE_ALERT = 'FALSE_ALERT';

//Key: Channel room
export const TYPE_CHANNEL_RS = 'TYPE_CHANNEL_RS';
export const TYPE_CHANNEL_IO = 'TYPE_CHANNEL_IO';

//Key: Format Date
export const DATE_TIME_FORMAT_PATTERN = 'HH:mm:ss DD/MM/YYYY';
