import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styled from 'styled-components';

import { font } from '@/styles/Style-mixins';

interface StylesProps {
    step?: number;
}
const dataTextConstant = {
    btnPre: 'Quay lại',
    btnNext: 'Tiếp theo',
    btnFinish: 'Hoàn tất',
};
const StyleViewButton = styled.div<StylesProps>`
    margin-top: 40px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 ${(props) => (props.step !== 3 ? '0' : '35%')};

    button {
        border: none;
        background-color: transparent;
        ${font(14)}
    }
    button:hover {
        background-color: transparent;
    }
`;
function ButtonNextAndPer({
    totalStep,
    step,
    htmlTypePre,
    htmlTypeNext,
    onClickBtnPre,
    onClickBtnNext,
}: {
    onClickBtnNext?: () => void;
    onClickBtnPre?: () => void;
    totalStep?: number;
    step?: number;
    htmlTypePre?: 'button' | 'submit' | 'reset';
    htmlTypeNext?: 'button' | 'submit' | 'reset';
}) {
    return (
        <StyleViewButton step={step}>
            <Button onClick={onClickBtnPre} htmlType={htmlTypePre ? htmlTypePre : 'button'}>
                <DoubleLeftOutlined />
                {dataTextConstant.btnPre}
            </Button>
            <Button
                htmlType={htmlTypeNext ? htmlTypeNext : 'button'}
                id="cus-btn-next"
                onClick={() => {
                    if (typeof onClickBtnNext === 'function') {
                        onClickBtnNext();
                    }
                }}
            >
                {step === totalStep - 1 ? dataTextConstant.btnFinish : dataTextConstant.btnNext} <DoubleRightOutlined />
            </Button>
        </StyleViewButton>
    );
}

export default ButtonNextAndPer;
