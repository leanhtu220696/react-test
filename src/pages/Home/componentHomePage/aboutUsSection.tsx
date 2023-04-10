function AboutUsSection() {
    return (
        <section id="about" className="about section-bg cus-pd-60">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Về Chúng Tôi</h2>
                    <p className="fst-italic text-center">
                        <strong> Công ty CP SafeFire (SafeFire)</strong> là Công ty con của{' '}
                        <strong>Công ty CP Công nghệ Phòng cháy Thành Nam</strong> và{' '}
                        <strong>Công ty CP Esystech </strong>.
                    </p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-12 mb-3">
                        <div className="box featured aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                            <h3>Công ty CP Công nghệ Phòng cháy Thành Nam</h3>
                            <ul className="icon-list">
                                <li>
                                    <i className="fa fa-calendar-o" aria-hidden="true"></i>
                                    <span>Thành lập: năm 2018</span>
                                </li>
                                <li>
                                    <i className="fa fa-flag-o" aria-hidden="true"></i>
                                    <span>
                                        Hoạt động trong lĩnh vực: Thiết kế - Thẩm duyệt – Thi công – Cung cấp - Lắp đặt
                                        thiết bị PCCC
                                    </span>
                                </li>
                                <li>
                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                    <span>
                                        Thực hiện nhiều các dự án trong các lĩnh vực: Năng lượng tái tạo, Công nghiệp,
                                        Dân dụng{' '}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 mb-3">
                        <div className="box aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                            <h3>Công ty CP Esystech</h3>
                            <ul className="icon-list">
                                <li>
                                    <i className="fa fa-calendar-o" aria-hidden="true"></i>
                                    <span>Thành lập: năm 2016</span>
                                </li>
                                <li>
                                    <i className="fa fa-flag-o" aria-hidden="true"></i>
                                    <span>Hoạt động trong lĩnh vực: Công nghệ thông tin, thiết bị điện tử</span>
                                </li>
                                <li>
                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                    <span>
                                        {' '}
                                        Thế mạnh : sản phẩm công nghệ mới như bo mạch nhúng, IoT dùng Bluetooth - Zigbee
                                        - Lora với công nghệ Mesh network, FPGA, và các dòng SoC.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUsSection;
