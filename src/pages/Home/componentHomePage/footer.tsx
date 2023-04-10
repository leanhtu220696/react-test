import SvgAppStore from '@/assets/assets_home_page/img/download-on-the-app-store.svg';
import imgGgPlayBadge from '@/assets/assets_home_page/img/google-play-badge.png';

function FooterHomePage() {
    return (
        <footer id="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="footer-info">
                                <h3>CÔNG TY CỔ PHẦN SAFEFIRE</h3>
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td className="w-25">
                                                <i className="fa fa-certificate"></i>Mã số thuế:
                                            </td>
                                            <td>0110106249</td>
                                        </tr>
                                        <tr>
                                            <td className="w-25">
                                                <i className="fa fa-map-marker"></i>Địa chỉ:
                                            </td>
                                            <td>
                                                Số 14 lô 04 Khu nhà ở cán bộ Văn phòng Trung ương Đảng và Báo Nhân dân,
                                                Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="w-25">
                                                <i className="fa fa-phone"></i>Phone:
                                            </td>
                                            <td>
                                                <a href="tel:0568114114">0568 114</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="w-25">
                                                <i className="fa  fa-envelope"></i>Email:
                                            </td>
                                            <td>
                                                <a href="mailto:admin@safefire.vn">admin@safefire.vn</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="col-lg-2 d-none d-lg-flex footer-links"></div>

                        <div className="col-lg-4 col-md-12 footer-links download">
                            <h4 style={{ color: '#ffffff' }}>Tải app SAFEFIRE – Hệ thống báo cháy nhanh</h4>
                            <ul className="d-flex justify-content-start justify-content-lg-evenly">
                                <li>
                                    <a href="#">
                                        <SvgAppStore />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <img src={imgGgPlayBadge} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="copyright">
                    &copy; Copyright{' '}
                    <strong>
                        <span>SAFEFIRE</span>
                    </strong>
                    . All Rights Reserved
                </div>
            </div>
        </footer>
    );
}

export default FooterHomePage;
