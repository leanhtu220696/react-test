// import { useEffect } from 'react';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import imgLogo from '@/assets/assets_home_page/img/logo.png';

function HeaderHomePage() {
    useEffect(() => {
        // @ts-ignore
        navbarToggle();
    }, []);

    return (
        <header id="header" className="fixed-top">
            <div className="container d-flex align-items-center">
                <Link to={'/'} className="logo me-auto">
                    <img src={imgLogo} alt="" />
                </Link>
                <nav id="navbar" className="navbar order-last order-lg-0">
                    <ul>
                        <li>
                            <a className="nav-link scrollto " href="#hero">
                                Trang chủ
                            </a>
                        </li>
                        <li>
                            <a className="nav-link scrollto" href="#about">
                                Về chúng tôi
                            </a>
                        </li>
                        <li>
                            <a className="nav-link scrollto" href="#features">
                                Giới thiệu hệ thống
                            </a>
                        </li>
                        <li>
                            <a className="nav-link scrollto" href="#products">
                                Sản phẩm
                            </a>
                        </li>
                        <li>
                            <a className="nav-link scrollto" href="#specifications">
                                Tiêu chuẩn kỹ thuật
                            </a>
                        </li>
                        <li>
                            <a className="nav-link scrollto" href="#footer">
                                Liên hệ
                            </a>
                        </li>
                    </ul>
                    <i className="fa fa-bars mobile-nav-toggle"></i>
                </nav>
                <a href="tel:0568114114" className="appointment-btn scrollto">
                    <i className="fa fa-phone"></i> Hotline: 0568 114 114
                </a>
            </div>
        </header>
    );
}

export default HeaderHomePage;
