import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Popover, Row } from 'antd';
import styled, { keyframes } from 'styled-components';
import { v4 as uuid } from 'uuid';

import { getIsExpandMenu } from '@/context/store/ExpandMenuSlice';
import { dataMenu } from '@/router/Route';
import { flex } from '@/styles/Style-mixins';

interface StyleProps {
    isexpandsidebar?: string;
    active?: string;
}

const StyleBackground = styled(Row)<StyleProps>``;

const swing = keyframes`
  0%,
  30%,
  50%,
  70%,
  100% {
    transform: rotate(0deg);
  }

  10% {
    transform: rotate(20deg);
  }

  40% {
    transform: rotate(-20deg);
  }

  60% {
    transform: rotate(10deg);
  }

  80% {
    transform: rotate(-10deg);
  }
`;
const StyleItemPopover = styled(Link)<StyleProps>`
    ${flex('center', 'center', 'row')};
    justify-content: ${(props) => (props.isexpandsidebar === 'true' ? 'center' : 'flex-start')};
    background-color: ${(props) => (props.active === 'true' ? '#e5f7ff' : 'transparent')};
    padding: 5px 15px;
    @media (max-width: 578px) {
        padding: 15px 5px;
    }

    & > h2 {
        margin: 0;
        padding: 0;
        font-size: 14px;
        color: ${(props) => (props.active === 'true' ? '#1890ff' : '#000')};
    }

    &:hover {
        & h2 {
            color: #1890ff;
        }
    }
`;

const StyleItem = styled(Link)<StyleProps>`
    width: 100%;
    margin: 5px 0;
    ${flex('center', 'center', 'row')};
    justify-content: ${(props) => (props.isexpandsidebar === 'true' ? 'center' : 'flex-start')};
    padding: 15px 15px;
    background-color: ${(props) => (props.active === 'true' ? '#e5f7ff' : 'transparent')};
    border-right: ${(props) => (props.active === 'true' ? '5px solid #1890ff' : 'none')};
    @media (max-width: 578px) {
        padding: 15px 5px;
    }

    & > h2 {
        margin: 0 0 0 10px;
        padding: 0;
        color: ${(props) => (props.active === 'true' ? '#1890ff' : '#000')};
    }

    & span {
        font-size: 18px;
    }

    & > svg {
        min-width: 25px;
    }

    & path {
        fill: ${(props) => (props.active === 'true' ? '#1890ff' : '#000')};
    }

    &:hover {
        & h2 {
            color: #1890ff;
        }

        & svg {
            fill: #1890ff;
            animation: ${swing} 0.5s linear alternate;
        }

        & path {
            fill: #1890ff;
        }
    }
`;

function Menu() {
    const isExpandMenu = useSelector(getIsExpandMenu).isExpandMenu;
    const pathName = location.pathname;
    if (isExpandMenu) {
        return (
            <div>
                {dataMenu.map((item) => {
                    return (
                        <StyleBackground key={uuid()}>
                            <Popover
                                content={
                                    <StyleItemPopover
                                        active={`${pathName.includes(item.route)}`}
                                        isexpandsidebar={`${isExpandMenu}`}
                                        to={item.route}
                                    >
                                        <h2>{item.title}</h2>
                                    </StyleItemPopover>
                                }
                                trigger="hover"
                                placement="right"
                            >
                                <StyleItem
                                    onMouseLeave={() => {
                                        setTimeout(() => {
                                            const collection = document.getElementsByClassName('ant-popover-content');
                                            for (let i = 0; i < collection.length; i++) {
                                                //@ts-ignore
                                                collection[i].style.left = '0';
                                            }
                                        });
                                    }}
                                    active={`${pathName.includes(item.route)}`}
                                    isexpandsidebar={`${isExpandMenu}`}
                                    to={item.route}
                                >
                                    {item.icon}
                                    {!isExpandMenu && <h2>{item.title}</h2>}
                                </StyleItem>
                            </Popover>
                        </StyleBackground>
                    );
                })}
            </div>
        );
    } else {
        return (
            <div>
                {dataMenu.map((item) => {
                    return (
                        <StyleBackground key={uuid()}>
                            <StyleItem
                                active={`${pathName.includes(item.route)}`}
                                isexpandsidebar={`${isExpandMenu}`}
                                to={item.route}
                            >
                                {item.icon}
                                {!isExpandMenu && <h2>{item.title}</h2>}
                            </StyleItem>
                        </StyleBackground>
                    );
                })}
            </div>
        );
    }
}

export default Menu;
