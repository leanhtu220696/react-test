// import { useMemo } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

import IconBtnHappeningFire from '@/assets/svg/icon-btn-happening-fire.svg';
import { font } from '@/styles/Style-mixins';

interface StyleProps {
    totalmessage: string;
}

const StyleButton = styled(Button)<StyleProps>`
    width: 29px;
    height: 29px;
    border-radius: 50%;
    border: 0;
    background-color: transparent;
    position: relative;

    & > svg {
        position: absolute;
        left: 0;
        top: 0;
    }

    & > div {
        display: ${(props) => (props.totalmessage === '0' ? 'none' : 'flex')};
        position: absolute;
        top: -3px;
        right: -7px;
        height: 17px;
        width: 17px;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: #e42e2e;
        ${font(10, '#fff', 600)}
    }
`;

function BtnInMap({
    handleClickListHappeningFire,
    lengthListFireLog,
}: {
    handleClickListHappeningFire: () => void;
    lengthListFireLog: number;
}) {
    return (
        <div>
            <StyleButton
                totalmessage={`${lengthListFireLog}`}
                icon={<IconBtnHappeningFire />}
                onClick={handleClickListHappeningFire}
            >
                <div>{lengthListFireLog}</div>
            </StyleButton>
        </div>
    );
}

export default BtnInMap;
