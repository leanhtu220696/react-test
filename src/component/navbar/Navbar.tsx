import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Drawer, Row } from 'antd';
import styled from 'styled-components';

import { getIsExpandMenu } from '@/context/store/ExpandMenuSlice';
import { HOME_URL } from '@/util/ConstantApp/Url';

import Header from './header/Header';
import Menu from './menu/Menu';
import SideBar from './sideBar/SideBar';

const ViewComponentChild = styled.div`
    padding: 0 0 0 10px;
`;
const ViewDrawer = styled(Drawer)`
    .ant-drawer-body {
        padding: 0;
    }
`;

function NarBar({ children }: { children: ReactNode }) {
    const isExpandSideBar = useSelector(getIsExpandMenu).isExpandMenu;
    const [colSidebar, setColSidebar] = useState(3);
    const [colHeader, setHeader] = useState(23);
    const [open, setOpen] = useState(false);
    const pathName = location.pathname;
    useEffect(() => {
        if (isExpandSideBar) {
            setColSidebar(1);
            setHeader(23);
        } else {
            setColSidebar(3);
            setHeader(21);
        }
    }, [isExpandSideBar]);
    return (
        <>
            {pathName.includes(HOME_URL) ? (
                <div>{children}</div>
            ) : (
                <div style={{ position: 'relative', zIndex: 0, overflow: 'hidden', overflowY: 'scroll' }}>
                    <Header setOpen={setOpen} />
                    <Row style={{ position: 'fixed', left: 0, height: '100vh', width: '100vw', paddingTop: '50px' }}>
                        <Col xs={0} lg={colSidebar + 1} xl={colSidebar}>
                            <SideBar></SideBar>
                        </Col>
                    </Row>
                    <Row style={{ paddingTop: '50px' }}>
                        <Col xs={0} lg={colSidebar + 1} xl={colSidebar} style={{ visibility: 'hidden' }}></Col>
                        <Col xs={24} lg={colHeader - 1} xl={colHeader}>
                            <ViewDrawer
                                width={'50%'}
                                open={open}
                                closable={false}
                                onClose={() => {
                                    setOpen(false);
                                }}
                                placement={'left'}
                            >
                                <Menu />
                            </ViewDrawer>
                            <ViewComponentChild>{children}</ViewComponentChild>
                        </Col>
                    </Row>
                </div>
            )}
        </>
    );
}

export default NarBar;
