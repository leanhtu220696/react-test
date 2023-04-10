import { useDispatch, useSelector } from 'react-redux';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { getIsExpandMenu, setIsExpandMenu } from '@/context/store/ExpandMenuSlice';
import { calcHeight } from '@/styles/Style-mixins';

import Menu from '../menu/Menu';

const StyleBackgroundSideBar = styled.div`
    width: 100%;
    padding-bottom: 50px;
    background-color: #ffffff;
    box-shadow: 5px 0 5px rgba(192, 194, 192, 0.5);
    overflow-x: hidden;
    overflow-y: auto;
    ${calcHeight()}
`;

const ViewButtonMenu = styled.div`
    border-top: 1px solid #ccc;
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 10px 20px;
    background-color: #ffffff;
    & > button {
        background-color: transparent;
        border: 0;
    }
`;

function SideBar() {
    const isExpandMenu = useSelector(getIsExpandMenu).isExpandMenu;
    const dispatchIsExpandMenu = useDispatch();
    return (
        <StyleBackgroundSideBar>
            <Menu />
            <ViewButtonMenu>
                <button
                    onClick={() => {
                        dispatchIsExpandMenu(setIsExpandMenu(!isExpandMenu));
                    }}
                >
                    {isExpandMenu ? (
                        <MenuUnfoldOutlined style={{ fontSize: '18px', color: '#1890ff' }} />
                    ) : (
                        <MenuFoldOutlined style={{ fontSize: '18px' }} />
                    )}
                </button>
            </ViewButtonMenu>
        </StyleBackgroundSideBar>
    );
}

export default SideBar;
