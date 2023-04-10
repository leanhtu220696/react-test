import imgCategory from '@/assets/assets_home_page/img/san-pham-sf0-01.jpg';
import imgSystem from '@/assets/assets_home_page/img/so_do_he_thong.jpg';

function ProductSection() {
    return (
        <section id="products" className="products cus-pd-60">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Sản phẩm</h2>
                </div>
                <div className="row mt-3">
                    <div className="col-lg-6 aos-init aos-animate" data-aos="fade-left">
                        <h4>
                            Thiết bị truyền tin cảnh báo cháy nhanh <span>SFO 01</span>.
                        </h4>
                        <ul className="check check-circle">
                            <li>
                                Sản phẩm được <span>thiết kế</span> nhỏ gọn, sử dụng vỏ nhôm chống nhiễu từ trường chất
                                lượng cao.
                            </li>
                            <li>
                                {' '}
                                Thiết bị sử dụng 2 nguồn điện khác nhau. Nguồn điện dự phòng có thể sử dụng chung với{' '}
                                <span>nguyền có sẵn trong tủ báo cháy</span>
                                hoặc sử dụng pin dự phòng riêng
                            </li>
                            <li>
                                {' '}
                                Thiết bị có khả năng <span>nhận tín hiệu cảnh báo</span>
                                từ mọi loại tủ trên thị trường, có khả năng điều khiển các thiết bị lắp thêm như loa đèn
                                cảnh báo, <span>điều kiển</span> bật tắt đèn ...
                            </li>
                            <li>
                                {' '}
                                Sử dụng <span>băng tần viễn thông</span>
                                GSM/GPRS/4G và mạng truyền dẫn FTTH kết nối server trung tâm, nên tương thích mọi địa
                                điểm, công trình, không lo đường truyền bị gián đoạn do tác động bên ngoài
                            </li>
                            <li>
                                <span>Hỗ trợ gọi điện và SMS</span> lên tới 70 số điện thoại đồng thời, giúp đảm bảo
                                chắc chắn thông báo sự cố tới những đơn vị quản lý và có trách nhiệm
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-6 aos-init aos-animate" data-aos="zoom-in">
                        <img className="img-fluid rounded" src={imgCategory} alt="Hình ảnh thiết bị" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h4>Mô hình hoạt động</h4>
                    </div>
                    <div className="col-12 aos-init aos-animate" data-aos="fade-up">
                        <img className="img-fluid rounded" src={imgSystem} alt="Mô hình hoạt động" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductSection;
