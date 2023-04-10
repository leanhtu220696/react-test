import AboutUsSection from './componentHomePage/aboutUsSection';
import BenefitSection from './componentHomePage/benefitSection';
import FeaturesSection from './componentHomePage/featuresSection';
import FooterHomePage from './componentHomePage/footer';
import HeaderHomePage from './componentHomePage/header';
import HeroSection from './componentHomePage/heroSection';
import ProductSection from './componentHomePage/productsSection';
import ServiceSection from './componentHomePage/servicesSection';
import SpecificationsSection from './componentHomePage/specificationsSection';

import '@/assets/assets_home_page/css/style.css';
import '@/assets/assets_home_page/vendor/aos/aos.css';

function HomePage() {
    return (
        <>
            <div>
                <HeaderHomePage />
                <HeroSection />
                <main id="main">
                    <AboutUsSection />
                    <FeaturesSection />
                    <ServiceSection />
                    <BenefitSection />
                    <ProductSection />
                    <SpecificationsSection />
                </main>
                <FooterHomePage />
            </div>
            <a href="#" className="back-to-top d-flex align-items-center justify-content-center">
                <i className="fa fa-angle-up" aria-hidden="true"></i>
            </a>
        </>
    );
}
export default HomePage;
