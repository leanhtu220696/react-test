import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'antd';
import styled from 'styled-components';

import { getIsExpandMenu } from '@/context/store/expandMenuSlice';
import { calcHeight, flex } from '@/styles/Style-mixins';
interface StyleProps {
    width: number;
    colheader: number;
}
const StyleViewMap = styled(Row)<StyleProps>`
    width: max-content;
    position: fixed;
    top: 50px;
    right: 0;
    ${flex('flex-end', 'flex-start')}

    #cus-view-map {
        width: calc(
            100vw / 24 * ${(props) => (props.colheader ? props.colheader : 0)} -
                ${(props) => (props.width ? props.width : 0)}px
        );
        width: -moz-calc(
            100vw / 24 * ${(props) => (props.colheader ? props.colheader : 0)} -
                ${(props) => (props.width ? props.width : 0)}px
        );
        width: -webkit-calc(
            100vw / 24 * ${(props) => (props.colheader ? props.colheader : 0)} -
                ${(props) => (props.width ? props.width : 0)}px
        );
        ${calcHeight()}
    }
    @media (max-width: 1200px) {
        #cus-view-map {
            width: calc(
                100vw / 24 * ${(props) => (props.colheader ? props.colheader - 1 : 0)} -
                    ${(props) => (props.width ? props.width : 0)}px
            );
            width: -moz-calc(
                100vw / 24 * ${(props) => (props.colheader ? props.colheader - 1 : 0)} -
                    ${(props) => (props.width ? props.width : 0)}px
            );
            width: -webkit-calc(
                100vw / 24 * ${(props) => (props.colheader ? props.colheader - 1 : 0)} -
                    ${(props) => (props.width ? props.width : 0)}px
            );
        }
    }
`;

function ViewMapWhenPopup({ children, deductedWidth }: { children: React.ReactNode; deductedWidth: number }) {
    const isExpandSideBar = useSelector(getIsExpandMenu).isExpandMenu;
    const [colHeader, setHeader] = useState(23);
    useEffect(() => {
        if (isExpandSideBar) {
            setHeader(23);
        } else {
            setHeader(21);
        }
    }, [isExpandSideBar]);
    return (
        <StyleViewMap width={deductedWidth} colheader={colHeader}>
            <div id="cus-view-map">{children}</div>
        </StyleViewMap>
    );
}
export default ViewMapWhenPopup;
