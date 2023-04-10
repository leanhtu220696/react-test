import { Form, Pagination, Table } from 'antd';
import styled from 'styled-components';

import { font } from './Style-mixins';

export const StyledPagination = styled(Pagination)`
    .ant-pagination-item-active a {
        background-color: #00adee;
        color: black !important;
    }

    .ant-pagination-item {
        color: #000;
        font-size: 18px;
        font-weight: 700;
        border: none;
        margin-right: 20px;
        margin-left: 15px;
        background-color: unset !important;
    }

    .ant-pagination-options {
        display: none;
    }

    .ant-pagination-next .ant-pagination-item-link,
    .ant-pagination-prev .ant-pagination-item-link {
        border: none !important;
    }
`;
export const StyledTable = styled(Table)`
    .ant-layout {
        background: #ffffff;
    }

    .ant-table-tbody,
    .ant-table-cell:first-child {
        border-left: 1px solid rgba(0, 0, 0, 0.5);
    }

    .ant-table-cell:last-child {
        border-right: 1px solid rgba(0, 0, 0, 0.5);
    }

    .ant-table-thead {
        .ant-table-cell {
            text-align: center;
            background-color: #0a7bff !important;
            color: #ffffff;
            font-size: 16px;
            font-weight: 700;
            line-height: 20px;
        }

        .ant-table-cell:first-child {
            border-left: 1px solid #000;
        }

        .ant-table-cell:last-child {
            border-right: 1px solid #000;
        }
    }

    .ant-table-wrapper {
        margin-left: 1rem;
    }

    .ant-table-cell::before {
        content: none !important;
    }

    .ant-table-thead {
        border: 1px solid #000 !important;
    }

    .ant-btn-primary {
        height: auto;
        width: 130px;
        font-size: 15px;
        line-height: 20px;
        font-weight: 700;
    }

    .ant-table-tbody > tr > td {
        text-align: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
        font-size: 14px;
        line-height: 20px;
        color: #000;
    }

    .ant-table-thead .ant-table-cell {
        text-align: center !important;
    }
`;
export const StyledInput = styled.div`
    display: flex;
    margin: 0 0 15px 0;

    .ant-select-selector {
        width: 230px !important;
        height: 40px !important;
        padding: 6px 10px !important;
        ${font(15, '#000', 400)}
    }

    .ant-input {
        padding: 0;
        width: 230px;
        height: 40px;
        border: 1px solid #000;
        border-radius: 5px;
        box-sizing: border-box;
        margin-right: 1rem;
        text-indent: 15px;
        font-size: 15px;
        font-weight: 400;
        line-height: 20px;
    }

    .ant-select-selection-placeholder {
        font-size: 15px;
        font-weight: 400;
        line-height: 20px;
    }

    input::placeholder {
        text-align: left;
        font-size: 15px;
    }

    .ant-select-selector {
        border-radius: 5px !important;
    }

    .ant-icon-search {
        font-size: 18px;
        font-weight: 400;
    }

    .ant-btn-primary {
        background-color: #00adee !important;
        width: 110px;
        height: 40px;
        border-radius: 5px;
        border: 1px solid #000;
        font-size: 15px;
        line-height: 20px;
        font-weight: 700;
    }

    .ant-icon-down {
        color: #000;
    }

    .ant-select-show-arrow {
        padding: 0;
        width: 230px;
        height: 40px;
        border-radius: 4px !important;
        box-sizing: border-box;
        margin-right: 1rem;
        cursor: pointer;
    }

    .ant-select-selector {
        height: 40px !important;
        padding-left: 20px !important;
        border: 1px solid #000 !important;
    }

    .ant-select-selection-search {
        padding: 7px 0 0 12px;
    }
`;
export const StyledFormHeaderTable = styled(Form)`
    display: flex;
    margin: 0 0 15px 0;

    .ant-select-selector {
        width: 230px !important;
        height: 40px !important;
        padding: 6px 10px !important;
        ${font(15, '#000', 400)}
    }

    .ant-input {
        padding: 0;
        width: 230px;
        height: 40px;
        border: 1px solid #000;
        border-radius: 5px;
        box-sizing: border-box;
        margin-right: 1rem;
        text-indent: 15px;
        font-size: 15px;
        font-weight: 400;
        line-height: 20px;
    }

    .ant-select-selection-placeholder {
        font-size: 15px;
        font-weight: 700;
        line-height: 20px;
    }

    input::placeholder {
        text-align: left;
        font-size: 15px;
    }

    .ant-select-selector {
        border-radius: 5px !important;
    }

    .ant-icon-search {
        font-size: 18px;
        font-weight: 900;
    }

    .ant-btn-primary {
        background-color: #00adee !important;
        width: 110px;
        height: 40px;
        border-radius: 5px;
        border: 1px solid #000;
        font-size: 15px;
        line-height: 20px;
        font-weight: 700;
    }

    .ant-icon-down {
        color: #000;
    }

    .ant-select-show-arrow {
        padding: 0;
        width: 230px;
        height: 40px;
        border-radius: 4px !important;
        box-sizing: border-box;
        margin-right: 1rem;
        cursor: pointer;
    }

    .ant-select-selector {
        height: 40px !important;
        padding-left: 20px !important;
        border: 1px solid #000 !important;
    }

    .ant-select-selection-search {
        padding: 7px 0 0 12px;
    }

    .ant-picker {
        padding: 10px;
        width: 230px;
        height: 40px;
        border: 1px solid #000;
        border-radius: 5px;
        margin-right: 1rem;
    }
`;
export const StyleInputFireDepartment = styled(StyledInput)`
    .ant-select-selector {
        width: 130px !important;
    }

    .ant-select-show-arrow {
        width: 130px;
    }
`;
export const StyledViewPageWithTable = styled.div`
    padding: 0 10px;
    overflow: auto;
    background-color: #fff;
    overflow: hidden !important;
    box-shadow: 0 20px 10px #ccc;
    padding-bottom: 250px;

    a:hover {
        color: #000000 !important;
        text-decoration: none !important;
    }
`;
