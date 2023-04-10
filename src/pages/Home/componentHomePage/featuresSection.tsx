import imgCommand from '@/assets/assets_home_page/img/giam-sat.png';
import imgGlobal from '@/assets/assets_home_page/img/tongquan.png';
function FeaturesSection() {
    return (
        <section id="features" className="features cus-pd-60">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Hệ thống cảnh báo cháy nhanh SafeFire là gì?</h2>
                    <p className="fst-italic text-center">
                        Hệ thống giám sát, truyền tin cảnh báo cháy nhanh SafeFire Là giải pháp thu thập pháp thu thập
                        tín hiệu cảnh báo cháy từ tủ báo cháy tại các điểm có nguy cơ cháy nổ (tòa nhà, cây xăng, công
                        trình kinh doanh, chung cư, hộ gia đình…) từ đó khi xảy ra sự cố cháy nổ sẽ tự động gọi điện
                        thoại cảnh báo, gửi tin nhắn SMS cảnh báo tới Trung tâm điều hành giám sát PCCC
                    </p>
                </div>
                <div className="row mt-3">
                    <div className="col-lg-4 aos-init aos-animate" data-aos="fade-left">
                        <h4>Tổng quan hệ thống.</h4>
                        <p className="fst-italic">
                            Hệ thống giám sát, truyền tin cảnh báo cháy nhanh SafeFire bao gồm Thiết bị truyền tin được
                            lắp đặt tại các Công trình kết hợp Hệ thống giám sát cảnh báo cháy nhanh bao gồm:
                        </p>
                        <ul>
                            <li>
                                <span>01.</span>Thiết bị vận hành
                            </li>
                            <li>
                                <span>02.</span>Phần mềm điều khiển
                            </li>
                            <li>
                                <span>03.</span>Phần mềm giám sát bằng &quot Bản đồ số &quot
                            </li>
                            <li>
                                <span>04.</span>Giải pháp trung tâm
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-8 aos-init aos-animate" data-aos="flip-left">
                        <img className="img-fluid rounded" src={imgGlobal} alt="Sơ đồ hệ thống" />
                    </div>
                </div>
            </div>
            <div className="container" data-aos="fade-up">
                <div className="row">
                    <div className="col-12">
                        <h4 className="mt-5 mb-3">Thông tin hiển thị trên bản đồ số:</h4>
                    </div>
                    <div className="row">
                        <div className="col-12 col-lg-7 aos-init aos-animate" data-aos="zoom-in">
                            <img className="img-fluid rounded" src={imgCommand} alt="Giám sát hệ thống" />
                        </div>
                        <div className="col-12 col-lg-5 mt-5 mt-lg-0 aos-init aos-animate" data-aos="fade-down-right">
                            <ul className="check check-right">
                                <li>Vị trí công trình xảy ra nguy cơ cháy, các tác động cảnh báo cháy</li>
                                <li>Vị trí các họng, trụ nước chữa cháy quanh khu vực công trình</li>
                                <li>
                                    Thông tin của các lực lượng phối hợp cứu nạn, cứu hộ như: cảnh sát trật tự, công an
                                    phường, điện lực, bệnh viện, cảnh sát giao thông
                                </li>
                                <li>
                                    Thông tin số hoá về phương án PCCC và các đầu mối liên lạc của công trình trong
                                    trường hợp cháy nổ
                                </li>
                                <li>
                                    Vị trí các Đội cảnh sát PCCC và CNCH gần nhất và đường đi ngắn nhất đến công trình
                                </li>
                                <li>Vị trí GPS các xe chữa cháy được điều động di chuyển trên nền bản đồ số</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
