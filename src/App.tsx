import { IntlProvider } from 'react-intl';
import { Layout } from 'antd';

import { useLangContext } from '@/context/langCtx';
import ApplicationRoutes from '@/pages/ApplicationRoutes';
import GlobalStyle from '@/styles/GlobalStyle';

import { languageConfig } from './util/langConfig';

import 'antd/dist/antd.compact.css';

const App = () => {
    const lang = useLangContext((state) => state.lang);
    const { locale, messages } = languageConfig[lang];

    return (
        <div>
            <GlobalStyle />
            <IntlProvider locale={locale} messages={messages}>
                <Layout>
                    <ApplicationRoutes />
                </Layout>
            </IntlProvider>
        </div>
    );
};

export default App;
