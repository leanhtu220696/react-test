import styled from 'styled-components';

import { font } from '@/styles/Style-mixins';
import { TYPE_ENTERPRISE, TYPE_HOUSEHOLD_BUSINESS, TYPE_PERSONAL } from '@/util/ConstantApp/TypeConstant';

const Describe = styled.h4`
    margin-bottom: 40px;
    ${font(14, '#000000', 600)}
`;

const dataTextConstant = {
    desPersonal: 'Khách hàng cá nhân',
    desBusiness: 'Khách hàng hộ kinh doanh',
    desEnterprise: 'Khách hàng doanh nghiệp',
};

export default function ShowConvertTypeToText({
    typeRadio,
    isUpperCase,
    color,
}: {
    typeRadio: string;
    isUpperCase: boolean;
    color: string;
}) {
    const convertText = () => {
        if (typeRadio.includes(TYPE_PERSONAL)) {
            return isUpperCase ? dataTextConstant.desPersonal.toUpperCase() : dataTextConstant.desPersonal;
        } else if (typeRadio.includes(TYPE_HOUSEHOLD_BUSINESS)) {
            return isUpperCase ? dataTextConstant.desBusiness.toUpperCase() : dataTextConstant.desBusiness;
        } else if (typeRadio.includes(TYPE_ENTERPRISE)) {
            return isUpperCase ? dataTextConstant.desEnterprise.toUpperCase() : dataTextConstant.desEnterprise;
        } else {
            return '';
        }
    };
    return <Describe style={{ color: color }}>{convertText()}</Describe>;
}
