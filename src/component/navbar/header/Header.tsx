import { useEffect, useState } from 'react';
import { BellOutlined, MenuOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import styled from 'styled-components';

import imgAvatar from '@/assets/image/avatar.png';
import imgLogo from '@/assets/image/logo.png';
import imgTextLogo from '@/assets/image/logoText.png';
import { dataMenu } from '@/router/Route';
import { flex, font } from '@/styles/Style-mixins';

const StyleBackgroundHeader = styled(Row)`
    width: 100vw;
    height: 50px;
    position: fixed;
    top: 0;
    z-index: 1000;
    background-color: #001529;
    box-shadow: 0 5px 10px #fff;
    ${flex('flex-end', 'center')};
    padding: 0 16px;
    @media (max-width: 576px) {
        padding: 10px 15px;
    }
`;
const ViewButtonHeader = styled(Col)`
    ${flex('flex-end', 'center')};
    padding-right: 10px;

    div:nth-child(2) {
        margin-left: 15px;
        border: 2px solid #00adee;
        border-radius: 50%;
    }
`;
const ViewTitle = styled(Col)`
    & > div {
        width: 100%;
        ${flex('center')};

        h1 {
            ${font(18, '#ffffff', 800)}
        }
    }

    @media (max-width: 768px) {
        & > div {
            h1 {
                ${font(12, '#ffffff', 600)}
            }
        }
    }
`;

const ViewButtonAndLogo = styled(Col)`
    ${flex('flex-start', 'center', 'row')}
    & > img {
        width: 40px;
        height: 40px;
    }

    & > button {
        margin-left: 15px;
        background-color: transparent;
        border: 0;
        font-size: 15px;
    }

    & > button {
        margin-left: 15px;
        background-color: transparent;
        border: 0;
        font-size: 15px;
    }

    @media (min-width: 992px) {
        display: none;
    }
`;

const ViewLogo = styled.div`
    ${flex('flex-start', 'center', 'row')};
    padding: 10px 20px 10px 0;
    img:nth-child(2) {
        margin-left: 10px;
    }
`;

function Header({ setOpen }: { setOpen: (string: any) => void }) {
    const [title, setTitle] = useState('');
    useEffect(() => {
        setOpen(false);
        const pathName = location.pathname;
        const detailMenu = dataMenu.find((item) => {
            return pathName.includes(item.route);
        });
        if (detailMenu) {
            const titleNew = detailMenu.title.toUpperCase();
            setTitle(titleNew);
        }
    }, []);

    return (
        <StyleBackgroundHeader>
            <ViewButtonAndLogo xs={6} lg={0}>
                <img src={imgLogo} alt="Ảnh logo" />
                <button
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    <MenuOutlined style={{ color: '#ffffff' }} />
                </button>
            </ViewButtonAndLogo>
            <Col xs={0} lg={3}>
                <ViewLogo>
                    <img alt="" src={imgLogo} width={'30px'} height={'30px'} />
                    <img alt="" src={imgTextLogo} width={'70px'} height={'18px'} />
                </ViewLogo>
            </Col>
            <ViewTitle xs={12} lg={20}>
                <div>
                    <h1>{title}</h1>
                </div>
            </ViewTitle>
            <ViewButtonHeader xs={6} lg={1}>
                <div>
                    <BellOutlined style={{ fontSize: '16px', color: '#fff' }} />
                </div>
                <div>
                    <img src={imgAvatar} alt="Ảnh avatar" height={'25px'} width={'25px'} />
                </div>
            </ViewButtonHeader>
        </StyleBackgroundHeader>
    );
}

export default Header;
