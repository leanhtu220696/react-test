import { Form, Row } from 'antd';
import styled from 'styled-components';

import { flex, font } from '@/styles/Style-mixins';

interface StyleProps {
    isrequired?: string;
}
export const placeholderFiled = {
    placeholderInput: 'Nhập ',
    placeholderSelect: 'Chọn ',
};
export const StyleForm = styled(Form)<StyleProps>`
    width: 100%;
`;

export const StyleItemForm = styled(Form.Item)<StyleProps>`
    .ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector {
        color: #000;
    }
    .ant-select-selection-search-input[disabled] {
        color: #000;
    }
    .ant-input[disabled] {
        color: #000;
    }
    .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
        display: none;
    }
    .ant-form-item-row {
        align-items: flex-start;
    }
    .ant-form-item-row > .ant-form-item-label {
        height: max-content;
        margin-top: 5px;
    }
    .ant-form-item-label > label {
        height: auto;
    }
    label:first-letter {
        text-transform: capitalize;
    }
    label {
        ${font(14, '#000000', 600)}
    }
    label {
        display: inline-block;
    }
    label::after {
        right: 0;
        content: ' *';
        display: ${(props) => (props.isrequired == 'true' ? 'revert' : 'none')};
        ${font(14, 'red', 600)}
    }

    input[type='number']::-webkit-outer-spin-button,
    input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const StyleBackgroundSelect = styled(Row)<StyleProps>`
    width: 100%;
    margin: 20px 0;
    ${flex('center', 'center', 'row')}
    & > div > label {
        display: inline-block;
        padding-right: 10px;
        ${font(14, '#000', 600)}
    }
    & > div > label:first-letter {
        text-transform: capitalize;
    }
    & > div > label::after {
        right: 0;
        content: ' *';
        display: ${(props) => (props.isrequired == 'true' ? 'revert' : 'none')};
        ${font(14, 'red', 600)}
    }
`;
