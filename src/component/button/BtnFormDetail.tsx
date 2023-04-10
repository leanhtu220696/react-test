import { Button } from 'antd';
import styled from 'styled-components';

import { flex, font } from '@/styles/Style-mixins';

interface PropsStyle {
    background: string;
}
const StyleBackground = styled.div`
    margin-top: 60px;
    ${flex('space-evenly', 'center', 'row')}
`;
const StyleButton = styled(Button)<PropsStyle>`
    background-color: ${(props) => (props.background ? props.background : '#fffff')};
    padding: 10px 20px;
    border-radius: 4px;
    height: auto;
    ${font(15, '#fff', 700)}
    &:hover {
        background-color: ${(props) => (props.background ? props.background : '#fffff')};
        opacity: 0.7;
        border: 1px solid ${(props) => (props.background ? props.background : '#fffff')};
        ${font(15, '#fff', 700)}
    }
    &:focus {
        background-color: ${(props) => (props.background ? props.background : '#fffff')};
        border: 1px solid ${(props) => (props.background ? props.background : '#fffff')};
        ${font(15, '#fff', 700)}
    }
`;
function BtnFormDetail({
    handledOnClickGoBack,
    handledOnClickDelete,
}: {
    handledOnClickGoBack: () => void;
    handledOnClickDelete: () => void;
}) {
    return (
        <StyleBackground>
            <StyleButton htmlType="button" background="#FF8A47" onClick={handledOnClickGoBack}>
                Quay lại
            </StyleButton>
            <StyleButton htmlType="button" background="#C71B1B" onClick={handledOnClickDelete}>
                Xoá công trình
            </StyleButton>
            <StyleButton htmlType="submit" background="#1F8E4F">
                Lưu
            </StyleButton>
        </StyleBackground>
    );
}

export default BtnFormDetail;
