export const DataErrorCreateConstruction: Record<CodeErrorCreateConstruction, string> = {
    461: 'Không tìm thấy tỉnh thành hoặc quận huyện với giá trị đã truyền lên.',
    463: 'Công trình, loại hình kinh doanh, hoặc kiểu công trình không tồn tại.',
    466: 'Không tìm thấy tài khoản khách hàng hoặc số điện thoại nhận cảnh báo',
    472: 'Tài khoản khách hàng đã tồn tại.',
    482: 'Thông tin Công trình không đầy đủ.',
    483: 'Email hoặc phoneNumber không đúng format.',
    484: 'Thông tin Tài khoản khách hàng không đầy đủ.',
    485: 'Thông tin Loại hình tài khoản khách hàng không đầy đủ.',
};

export const DataCodeErrorCreateConstruction = [461, 463, 466, 472, 482, 483, 484, 485];

export type CodeErrorCreateConstruction = (typeof DataCodeErrorCreateConstruction)[number];

export const DataErrorActiveDevice = {
    461: 'Không tìm thấy tỉnh thành hoặc quận huyện với giá trị đã truyền lên.',
    462: 'Không tìm thấy thông tin thiết bị.',
    463: 'Không tìm thấy thông tin Công trình.',
    466: 'Không tìm thấy tài khoản khách hàng với id truyền lên, có type hoặc trạng thái không hợp lệ.',
    471: 'Trạng thái thiết bị không hợp lệ.',
    472: 'Tài khoản khách hàng đã tồn tại.',
    481: 'Thông tin Thiết bị thiết bị không đầy đủ.',
    482: 'Thông tin Công trình không đầy đủ.',
    483: 'Email hoặc username không đúng format.',
    484: 'Thông tin Tài khoản khách hàng không đầy đủ.',
    485: 'Thông tin Loại hình tài khoản khách hàng không đầy đủ.',
};

export const DataCodeErrorActiveDevice = [461, 462, 463, 466, 471, 472, 481, 482, 483, 484, 485];

export const DataErrorCreateSoldier: Record<CodeErrorAddSoldier, string> = {
    464: 'Chiến sĩ không tồn tại.',
    465: 'Cơ sở PCCC không tồn tại.',
    474: 'Chiến sĩ không thuộc cơ sở PCCC.',
    483: 'Email hoặc phoneNumber không đúng format.',
    400: 'Thông tin chiến sĩ không đầy đủ.',
};

export const DataCodeErrorCreateAddSoldier = [464, 465, 474, 483, 400];

export type CodeErrorAddSoldier = (typeof DataCodeErrorCreateAddSoldier)[number];
export type CodeErrorActiveDevice = (typeof DataCodeErrorActiveDevice)[number];

export const DataErrorDeleteConstruction: Record<CodeErrorDeleteConstruction, string> = {
    404: 'Không tìm thấy thông tin Công trình.',
    409: 'Không thể xoá công trình đang được lắp thiết bị hoặc có lịch sử báo cháy.',
};

export const DataCodeErrorDeleteConstruction = [404, 409];

export type CodeErrorDeleteConstruction = (typeof DataCodeErrorDeleteConstruction)[number];

export const DataErrorDeleteSoldier: Record<CodeErrorDeleteSoldier, string> = {
    404: 'Cơ sở PCCC không tồn tại.',
};

export const DataCodeErrorDeleteSoldier = [404];

export type CodeErrorDeleteSoldier = (typeof DataCodeErrorDeleteSoldier)[number];

export const DataErrorDeleteWaterIntake: Record<CodeErrorDeleteWaterIntake, string> = {
    404: 'Không tìm thấy đơn vị PCCC hoặc điểm lấy nước.',
};

export const DataCodeErrorDeleteWaterIntake = [404];

export type CodeErrorDeleteWaterIntake = (typeof DataCodeErrorDeleteWaterIntake)[number];

export const DataErrorCreateWaterIntake: Record<CodeErrorCreateWaterIntake, string> = {
    461: 'Không tìm thấy tỉnh thành hoặc quận huyện với giá trị đã truyền lên.',
    465: 'Cơ sở PCCC không tồn tại.',
    467: 'Không tìm thấy điểm lấy nước.',
    483: 'Số điện thoại không đúng format.',
    400: 'Thông tin điểm lấy nước không đầy đủ.',
};

export const DataCodeErrorCreateWaterIntake = [461, 465, 467, 483, 400];

export type CodeErrorCreateWaterIntake = (typeof DataCodeErrorCreateWaterIntake)[number];
export const DataErrorCreateCustomer: Record<CodeErrorDeleteSoldier, string> = {
    466: 'Không tìm thấy tài khoản khách hàng truyền lên, có kiểu hoặc trạng thái không hợp lệ.',
    472: 'Tài khoản khách hàng đã tồn tại.',
    483: 'Email hoặc số điện thoại không đúng định dạng.',
    484: 'Thông tin tài khoản khách hàng không đầy đủ.',
    485: 'Thông tin loại hình tài khoản khách hàng không đầy đủ.',
};

export const DataCodeErrorCreateCustomer = [466, 472, 483, 484, 485];

export type CodeErrorCreateCustomer = (typeof DataCodeErrorCreateCustomer)[number];

export const DataErrorCreateFireDepartment: Record<CodeErrorCreateFireDepartment, string> = {
    461: 'Không tìm thấy tỉnh thành hoặc quận huyện với giá trị đã truyền lên.',
    464: 'Chiến sĩ không tồn tại hoặc không thuộc cơ sở PCCC.',
    465: 'Cơ sở PCCC không tồn tại.',
    473: 'Tên hoặc mã đơn vị PCCC đã tồn tại.',
    483: 'Số điện thoại hoặc hotLine không đúng format.',
    400: 'Thông tin đơn vị PCCC không đầy đủ.',
};

export const DataCodeErrorCreateFireDepartment = [461, 464, 465, 473, 483, 486];

export type CodeErrorCreateFireDepartment = (typeof DataCodeErrorCreateFireDepartment)[number];

export const DataCodeErrorLockOrUnlockAccount = [404, 409];

export type CodeErrorLockOrUnlockAccount = (typeof DataCodeErrorLockOrUnlockAccount)[number];

export const DataErrorLockOrUnlock: Record<CodeErrorLockOrUnlockAccount, string> = {
    404: 'Không tìm thấy tài khoản khách hàng.',
    409: 'Trạng thái của khách hàng truyền vào không hợp lệ.',
};

export const DataCodeErrorStorageRoom = [409, 463, 468, 487];

export type CodeErrorStorageRoom = (typeof DataCodeErrorStorageRoom)[number];

export const DataErrorStorageRoom: Record<CodeErrorStorageRoom, string> = {
    409: 'Phòng đã tồn tại',
    463: 'Không tìm thấy thông tin công trình',
    468: 'Không tìm thấy phòng',
    487: 'Thông tin phòng không đầy đủ',
};
export const DataErrorDeleteFireDepartment: Record<CodeErrorDeleteFireDepartment, string> = {
    465: 'Cơ sở PCCC không tồn tại.',
    412: 'Không thể xóa cơ sở PCCC đang có chiến sĩ, điểm lấy nước hoặc phương tiện hỗ trợ.',
};

export const DataCodeErrorDeleteFireDepartment = [465, 412];

export type CodeErrorDeleteFireDepartment = (typeof DataCodeErrorDeleteFireDepartment)[number];

export const DataCodeErrorDeleteRoom = [404, 463];
export type CodeErrorDeleteRoom = (typeof DataCodeErrorDeleteRoom)[number];
export const DataErrorDeleteRoom: Record<CodeErrorDeleteRoom, string> = {
    404: 'Phòng không tồn tại hoặc không thuộc cơ sở',
    463: 'Không tìm thấy công trình với ID truyền lên',
};

export const DataCodeErrorDetailDevice = [404];
export type CodeErrorDetailDevice = (typeof DataCodeErrorDetailDevice)[number];
export const DataErrorDetailDevice: Record<CodeErrorDetailDevice, string> = {
    404: 'Thiết bị với id truyền lên không tồn tại',
};

export const DataCodeErrorUpdateDetailDevice = [412];
export type CodeErrorUpdateDetailDevice = (typeof DataCodeErrorUpdateDetailDevice)[number];
export const DataErrorUpdateDetailDevice: Record<CodeErrorUpdateDetailDevice, string> = {
    412: 'Tên thiết bị không được phép rỗng',
};

export const DataCodeErrorUpdateStatusHappening = [404, 409];
export type CodeErrorUpdateStatusHappening = (typeof DataCodeErrorUpdateStatusHappening)[number];
export const DataErrorUpdateStatusHappening: Record<CodeErrorUpdateStatusHappening, string> = {
    404: 'Đám cháy không tồn tại',
    409: 'Sai trạng thái đám cháy',
};

export const DataCodeErrorRecallDevice = [404];
export type CodeErrorRecallDevice = (typeof DataCodeErrorRecallDevice)[number];
export const DataErrorRecallDevice: Record<CodeErrorDetailDevice, string> = {
    404: 'Không tìm thấy thiết bị thuộc công trình',
};
