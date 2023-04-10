import ContentLoader from 'react-content-loader';
import { v4 as uuid } from 'uuid';

import { Loader } from './Loader';

export const ExampleLoader = (props: any) => {
    const contentLoader = (
        <ContentLoader
            speed={2}
            width={'100%'}
            height={60}
            viewBox="0 0 200 60"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="0" y="12" rx="5" ry="5" width="100%" height="15" />
            <rect x="0" y="39" rx="5" ry="5" width="100%" height="15" />
        </ContentLoader>
    );
    return (
        <Loader contentLoader={contentLoader} loadingArea={props.loadingarea}>
            {props.children}
        </Loader>
    );
};

export const SearchIndexLoader = (props: any) => {
    const contentLoader = (
        <ContentLoader
            speed={5}
            width={476}
            height={124}
            viewBox="0 0 476 124"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="5" y="14" rx="12" ry="12" width="324" height="38" />
        </ContentLoader>
    );
    return (
        <Loader contentLoader={contentLoader} loadingArea={props.loadingarea}>
            {props.children}
        </Loader>
    );
};

export const SelectLoader = (props: any) => {
    const contentLoader = (
        <ContentLoader speed={2} viewBox="0 0 360 35" backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...props}>
            <rect x="-2" y="3" rx="5" ry="5" width="360" height="35" />
        </ContentLoader>
    );
    return (
        <Loader contentLoader={contentLoader} loadingArea={props.loadingarea}>
            {props.children}
        </Loader>
    );
};

export const DetailFireDepartmentLoader = (props: any) => {
    const contentLoader = (
        <ContentLoader speed={2} viewBox="0 0 380 590" backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...props}>
            <rect x="5" y="100" rx="0" ry="0" width="352" height="29" />
            <rect x="7" y="145" rx="0" ry="0" width="353" height="24" />
            <rect x="8" y="184" rx="0" ry="0" width="353" height="25" />
            <rect x="9" y="226" rx="0" ry="0" width="352" height="26" />
            <rect x="4" y="20" rx="0" ry="0" width="360" height="38" />
            <rect x="13" y="317" rx="0" ry="0" width="159" height="52" />
            <rect x="13" y="387" rx="0" ry="0" width="158" height="49" />
            <rect x="194" y="316" rx="0" ry="0" width="155" height="53" />
            <rect x="195" y="384" rx="0" ry="0" width="153" height="52" />
        </ContentLoader>
    );
    return (
        <Loader contentLoader={contentLoader} loadingArea={props.loadingarea}>
            {props.children}
        </Loader>
    );
};

export const ItemDetailFireHappeningLoader = (props: any) => {
    const contentLoader = (
        <>
            {new Array(5).fill(' ').map(() => (
                <ContentLoader
                    key={uuid()}
                    speed={2}
                    viewBox="0 0 300 90"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    {...props}
                >
                    <rect x="9" y="7" rx="0" ry="0" width="160" height="23" />
                    <rect x="210" y="7" rx="0" ry="0" width="76" height="26" />
                    <rect x="9" y="39" rx="0" ry="0" width="279" height="20" />
                    <rect x="164" y="68" rx="0" ry="0" width="125" height="17" />
                </ContentLoader>
            ))}
        </>
    );
    return (
        <Loader contentLoader={contentLoader} loadingArea={props.loadingarea}>
            {props.children}
        </Loader>
    );
};

export const DetailCustomerLoader = (props: any) => {
    const contentLoader = (
        <ContentLoader
            speed={2}
            width={790}
            height={500}
            viewBox="0 0 790 500"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="-1" y="1" rx="0" ry="0" width="216" height="32" />
            <rect x="1" y="57" rx="0" ry="0" width="214" height="32" />
            <rect x="4" y="110" rx="0" ry="0" width="211" height="32" />
            <rect x="346" y="1" rx="0" ry="0" width="231" height="32" />
            <rect x="348" y="57" rx="0" ry="0" width="230" height="34" />
            <rect x="5" y="178" rx="0" ry="0" width="368" height="42" />
            <rect x="67" y="277" rx="0" ry="0" width="168" height="44" />
            <rect x="364" y="277" rx="0" ry="0" width="158" height="45" />
        </ContentLoader>
    );
    return (
        <Loader contentLoader={contentLoader} loadingArea={props.loadingarea}>
            {props.children}
        </Loader>
    );
};

export const DetailWaterIntakeLoader = (props: any) => {
    const contentLoader = (
        <ContentLoader
            speed={2}
            width={400}
            height={900}
            viewBox="0 0 400 900"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="7" y="-68" rx="0" ry="0" width="376" height="28" />
            <rect x="16" y="184" rx="0" ry="0" width="423" height="32" />
            <rect x="17" y="232" rx="0" ry="0" width="422" height="31" />
            <rect x="18" y="280" rx="0" ry="0" width="421" height="32" />
            <rect x="15" y="328" rx="0" ry="0" width="422" height="33" />
            <rect x="12" y="590" rx="0" ry="0" width="427" height="31" />
            <rect x="12" y="638" rx="0" ry="0" width="425" height="30" />
            <rect x="12" y="686" rx="0" ry="0" width="426" height="32" />
            <rect x="12" y="735" rx="0" ry="0" width="423" height="33" />
            <rect x="15" y="376" rx="0" ry="0" width="422" height="102" />
            <rect x="13" y="541" rx="0" ry="0" width="426" height="35" />
            <rect x="15" y="493" rx="0" ry="0" width="425" height="34" />
            <rect x="15" y="119" rx="0" ry="0" width="426" height="37" />
            <rect x="44" y="43" rx="0" ry="0" width="375" height="35" />
            <rect x="90" y="13" rx="0" ry="0" width="293" height="26" />
            <rect x="47" y="827" rx="0" ry="0" width="370" height="42" />
        </ContentLoader>
    );
    return (
        <Loader contentLoader={contentLoader} loadingArea={props.loadingarea}>
            {props.children}
        </Loader>
    );
};

export const DetailDepartmentLoader = (props: any) => {
    const contentLoader = (
        <ContentLoader
            speed={2}
            width={400}
            height={900}
            viewBox="0 0 400 900"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="14" y="68" rx="0" ry="0" width="347" height="26" />
            <rect x="15" y="112" rx="0" ry="0" width="347" height="33" />
            <rect x="14" y="157" rx="0" ry="0" width="345" height="33" />
            <rect x="13" y="201" rx="0" ry="0" width="346" height="34" />
            <rect x="15" y="247" rx="0" ry="0" width="346" height="35" />
            <rect x="13" y="292" rx="0" ry="0" width="349" height="33" />
            <rect x="14" y="342" rx="0" ry="0" width="347" height="35" />
            <rect x="14" y="389" rx="0" ry="0" width="347" height="35" />
            <rect x="15" y="434" rx="0" ry="0" width="346" height="34" />
            <rect x="14" y="477" rx="0" ry="0" width="346" height="35" />
            <rect x="11" y="521" rx="0" ry="0" width="351" height="37" />
            <rect x="14" y="615" rx="0" ry="0" width="347" height="36" />
            <rect x="11" y="704" rx="0" ry="0" width="109" height="33" />
            <rect x="129" y="704" rx="0" ry="0" width="110" height="35" />
            <rect x="251" y="703" rx="0" ry="0" width="107" height="36" />
        </ContentLoader>
    );
    return (
        <Loader contentLoader={contentLoader} loadingArea={props.loadingarea}>
            {props.children}
        </Loader>
    );
};
export const DetailSoldierLoader = (props: any) => {
    const contentLoader = (
        <ContentLoader speed={2} width={800} height={500} viewBox="0 0 800 500">
            <rect x="241" y="29" rx="0" ry="0" width="297" height="28" />
            <rect x="327" y="69" rx="0" ry="0" width="114" height="24" />
            <rect x="255" y="100" rx="0" ry="0" width="273" height="28" />
            <rect x="-35" y="165" rx="0" ry="0" width="297" height="29" />
            <rect x="-37" y="209" rx="0" ry="0" width="297" height="29" />
            <rect x="-34" y="250" rx="0" ry="0" width="297" height="29" />
            <rect x="-33" y="291" rx="0" ry="0" width="297" height="29" />
            <rect x="-32" y="330" rx="0" ry="0" width="297" height="29" />
            <rect x="501" y="165" rx="0" ry="0" width="297" height="29" />
            <rect x="502" y="205" rx="0" ry="0" width="297" height="29" />
            <rect x="504" y="248" rx="0" ry="0" width="297" height="29" />
            <rect x="504" y="291" rx="0" ry="0" width="297" height="29" />
            <rect x="504" y="330" rx="0" ry="0" width="297" height="29" />
            <rect x="504" y="375" rx="0" ry="0" width="297" height="29" />
            <rect x="161" y="457" rx="0" ry="0" width="97" height="32" />
            <rect x="204" y="479" rx="0" ry="0" width="18" height="0" />
            <rect x="298" y="456" rx="0" ry="0" width="94" height="32" />
            <rect x="419" y="455" rx="0" ry="0" width="80" height="33" />
        </ContentLoader>
    );
    return (
        <Loader contentLoader={contentLoader} loadingArea={props.loadingarea}>
            {props.children}
        </Loader>
    );
};
export const DetailDeviceLoader = (props: any) => {
    const contentLoader = (
        <ContentLoader
            speed={2}
            width={'90vh'}
            height={'40vh'}
            viewBox="0 0 1000 500"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="178" y="11" rx="0" ry="0" width="242" height="35" />
            <rect x="12" y="75" rx="0" ry="0" width="167" height="27" />
            <rect x="15" y="123" rx="0" ry="0" width="210" height="29" />
            <rect x="17" y="169" rx="0" ry="0" width="208" height="27" />
            <rect x="16" y="212" rx="0" ry="0" width="212" height="28" />
            <rect x="16" y="256" rx="0" ry="0" width="213" height="28" />
            <rect x="18" y="298" rx="0" ry="0" width="209" height="28" />
            <rect x="370" y="122" rx="0" ry="0" width="222" height="32" />
            <rect x="370" y="172" rx="0" ry="0" width="221" height="27" />
            <rect x="369" y="214" rx="0" ry="0" width="221" height="30" />
            <rect x="370" y="258" rx="0" ry="0" width="222" height="29" />
            <rect x="368" y="298" rx="0" ry="0" width="224" height="30" />
            <rect x="137" y="416" rx="0" ry="0" width="134" height="52" />
            <rect x="359" y="418" rx="0" ry="0" width="124" height="49" />
            <rect x="14" y="346" rx="0" ry="0" width="212" height="33" />
        </ContentLoader>
    );
    return (
        <Loader contentLoader={contentLoader} loadingArea={props.loadingarea}>
            {props.children}
        </Loader>
    );
};

export const DetailConstructionLoader = (props: any) => {
    const contentLoader = (
        <ContentLoader
            speed={2}
            width={420}
            height={800}
            viewBox="0 0 420 800"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="22" y="12" rx="0" ry="0" width="374" height="28" />
            <rect x="23" y="67" rx="0" ry="0" width="380" height="38" />
            <rect x="23" y="124" rx="0" ry="0" width="380" height="31" />
            <rect x="23" y="179" rx="0" ry="0" width="381" height="32" />
            <rect x="21" y="228" rx="0" ry="0" width="383" height="36" />
            <rect x="23" y="284" rx="0" ry="0" width="384" height="37" />
            <rect x="24" y="338" rx="0" ry="0" width="383" height="39" />
            <rect x="26" y="400" rx="0" ry="0" width="385" height="39" />
            <rect x="26" y="454" rx="0" ry="0" width="388" height="40" />
            <rect x="28" y="526" rx="0" ry="0" width="111" height="48" />
            <rect x="167" y="522" rx="0" ry="0" width="103" height="50" />
            <rect x="303" y="521" rx="0" ry="0" width="114" height="47" />
        </ContentLoader>
    );
    return (
        <Loader contentLoader={contentLoader} loadingArea={props.loadingarea}>
            {props.children}
        </Loader>
    );
};

export const FormAccountInDetailConstructionLoader = (props: any) => {
    const contentLoader = (
        <ContentLoader
            speed={2}
            width={420}
            height={300}
            viewBox="0 0 420 300"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="50" y="20" rx="0" ry="0" width="290" height="36" />
            <rect x="31" y="75" rx="0" ry="0" width="330" height="41" />
        </ContentLoader>
    );
    return (
        <Loader contentLoader={contentLoader} loadingArea={props.loadingarea}>
            {props.children}
        </Loader>
    );
};

export const DetailFireLogLoader = (props: any) => {
    const contentLoader = (
        <ContentLoader
            speed={2}
            width={420}
            height={480}
            viewBox="0 0 420 480"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="50" y="20" rx="0" ry="0" width="290" height="36" />
            <rect x="26" y="77" rx="0" ry="0" width="343" height="41" />
            <rect x="24" y="136" rx="0" ry="0" width="344" height="42" />
            <rect x="25" y="197" rx="0" ry="0" width="342" height="41" />
            <rect x="26" y="256" rx="0" ry="0" width="342" height="41" />
            <rect x="26" y="317" rx="0" ry="0" width="341" height="41" />
            <rect x="52" y="376" rx="0" ry="0" width="121" height="42" />
            <rect x="240" y="374" rx="0" ry="0" width="102" height="44" />
        </ContentLoader>
    );
    return (
        <Loader contentLoader={contentLoader} loadingArea={props.loadingarea}>
            {props.children}
        </Loader>
    );
};
