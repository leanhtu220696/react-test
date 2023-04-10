import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { Layout } from 'antd';
import styled from 'styled-components';

import { useLangContext } from '@/context/langCtx';
import ApplicationRoutes from '@/pages/ApplicationRoutes';
import GlobalStyle from '@/styles/GlobalStyle';

import store from './context/store';
import { HOME_URL } from './util/ConstantApp/Url';
import { languageConfig } from './util/langConfig';

import 'antd/dist/antd.compact.css';
interface StyleProps {
    ishomepage: boolean;
}
const StyleHomePage = styled.div<StyleProps>`
    section {
        overflow: auto;
        padding: 0;
    }
    .cus-pd-60 {
        overflow: hidden;
        padding: 60px 0;
    }
`;
const App = () => {
    const lang = useLangContext((state) => state.lang);
    const { locale, messages } = languageConfig[lang];
    const pathName = location.pathname;
    return (
        <div>
            <Provider store={store}>
                <StyleHomePage ishomepage={pathName.includes(HOME_URL)}>
                    <GlobalStyle />
                    <IntlProvider locale={locale} messages={messages}>
                        <Layout>
                            <ApplicationRoutes />
                        </Layout>
                    </IntlProvider>
                </StyleHomePage>
            </Provider>
        </div>
    );
};

export default App;
