function HeroSection() {
    return (
        <section id="hero" className="d-flex align-items-center cus-pd-60">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
                        <h1>
                            Hệ thống giám sát, truyền tin <br />
                            cảnh báo cháy nhanh SAFEFIRE
                        </h1>
                        <h2>Hệ thống cảnh báo công nghệ cao</h2>

                        <div className="d-flex mt-5">
                            <a href="#about" className="btn-get-started scrollto">
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 order-1 order-lg-2 hero-img"></div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
