import styled from 'styled-components';

import { flex } from '@/styles/style-mixins';

export const PopupWrapper = styled('div')`
    width: 210px;
`;
export const PopupHeader = styled('div')`
    border-bottom: 1px solid #000000;
    padding-bottom: 6px;
    ${flex('flex-start', 'center')}
`;

export const Logo = styled('div')`
    text-align: center;
    width: 25px;
    height: 25px;
`;

export const TitleName = styled('p')`
    text-align: center;
    font-weight: 600;
    width: 100%;
    overflow-wrap: normal;
    font-size: 14px;
`;

export const PopupContainer = styled('div')`
    padding-top: 6px;
`;

export const ContainerListItem = styled('div')`
    ${flex('flex-start', 'flex-start')}
    margin-top: 6px;

    span {
        width: calc(100% - 30px);
        margin-left: 6px;
        overflow-wrap: normal;
        font-size: 14px;
    }
`;
