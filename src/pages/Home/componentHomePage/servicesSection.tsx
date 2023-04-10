import { SvgIcon1, SvgIcon2, SvgIcon3, SvgIcon4, SvgIcon5, SvgIcon6 } from '@/assets/assets_home_page/img';

function ServiceSection() {
    return (
        <section id="services" className="services services cus-pd-60">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Các tính năng nổi bật</h2>
                </div>

                <div className="row">
                    <div className="col-lg-4 col-sm-6 icon-box" data-aos="zoom-in" data-aos-delay="100">
                        <div className="icon">
                            <SvgIcon2 />
                        </div>
                        <h4 className="title">
                            <a href="">Hỗ trợ</a>
                        </h4>
                        <p className="description">
                            Hỗ trợ quản lý các nghiệp vụ PCCC (công cụ, dụng cụ, phương tiện, nhân lực, lý tập trung các
                            hệ thống PCCC…)
                        </p>
                    </div>
                    <div className="col-lg-4 col-sm-6 icon-box" data-aos="zoom-in" data-aos-delay="200">
                        <div className="icon">
                            <SvgIcon1 />
                        </div>
                        <h4 className="title">
                            <a href="">Phát hiện</a>
                        </h4>
                        <p className="description">
                            Phát hiện và báo cháy theo thời gian thực, báo theo hướng đa đối tượng
                        </p>
                    </div>
                    <div className="col-lg-4 col-sm-6 icon-box" data-aos="zoom-in" data-aos-delay="300">
                        <div className="icon">
                            <SvgIcon4 />
                        </div>
                        <h4 className="title">
                            <a href="">Tập huấn</a>
                        </h4>
                        <p className="description">
                            Thực hành tập huấn định kỳ hoặc bất thường đảm bảo công tác phòng chống cháy đánh giá số
                            liệu
                        </p>
                    </div>
                    <div className="col-lg-4 col-sm-6 icon-box" data-aos="zoom-in" data-aos-delay="100">
                        <div className="icon">
                            <SvgIcon3 />
                        </div>
                        <h4 className="title">
                            <a href="">Thông báo</a>
                        </h4>
                        <p className="description">
                            Thông báo khi có bất kỳ sự cố xảy ra (Cháy, nổ, lỗi hệ thống, chập nguồn, lỗi
                        </p>
                    </div>
                    <div className="col-lg-4 col-sm-6 icon-box" data-aos="zoom-in" data-aos-delay="200">
                        <div className="icon">
                            <SvgIcon5 />
                        </div>
                        <h4 className="title">
                            <a href="">Thông tin</a>
                        </h4>
                        <p className="description">
                            Cung cấp thông tin chi tiết điểm cháy: Sơ đổ thiết kế, thoát hiểm, loại hình,
                        </p>
                    </div>
                    <div className="col-lg-4 col-sm-6 icon-box" data-aos="zoom-in" data-aos-delay="300">
                        <div className="icon">
                            <SvgIcon6 />
                        </div>
                        <h4 className="title">
                            <a href="">Hỗ trợ tác chiến</a>
                        </h4>
                        <p className="description">
                            Hỗ trợ điểu hành tác chiến: Báo vị trí cháy, chỉ dẫn đường đi, chỉ dẫn thoát cháy…
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ServiceSection;
