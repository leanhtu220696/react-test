export const checkLengthIdCard = (_rule: any, _value: any) => {
    if (_value == undefined || _value.length === 0) {
        return Promise.resolve();
    } else if (_value.length == 9 || _value.length == 12) {
        return Promise.resolve();
    }
    return Promise.reject();
};
export const checkLengthEqualTen = (_rule: any, _value: any) => {
    if (_value !== undefined) {
        if (_value.length !== 0) {
            if (_value.length === 10) {
                return Promise.resolve();
            } else {
                return Promise.reject();
            }
        }
    }
    return Promise.resolve();
};
export const regexPhoneNumber = (phoneNumber: any) => {
    const regexPhoneNumber = /(0[2|3|5|7|8|9])+([0-9]{8})\b/g;
    return phoneNumber.match(regexPhoneNumber) ? true : false;
};
export const checkFormatPhoneNumber = (_rule: any, _value: any) => {
    if (_value !== undefined) {
        if (_value.length !== 0) {
            if (_value.length === 10) {
                if (regexPhoneNumber(_value)) {
                    return Promise.resolve();
                } else {
                    return Promise.reject();
                }
            }
        }
    }
    return Promise.resolve();
};
