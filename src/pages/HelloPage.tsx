import styled from 'styled-components';

import { FontSize } from '@/assets/font';
import HelloComponent from '@/component/HelloComponent';
import { flex } from '@/styles/style-mixins';

const Paragraph = styled.div`
    margin: 2rem;

    ${flex({ justify: 'center', align: 'center' })}
    h1 {
        font-size: ${FontSize.xlarge};
    }
`;

const HelloPage = () => {
    return (
        <>
            <Paragraph>
                <h1>Hello</h1>
            </Paragraph>
            <HelloComponent>React - Typescript - Webpack 5 Template</HelloComponent>
        </>
    );
};

export default HelloPage;
