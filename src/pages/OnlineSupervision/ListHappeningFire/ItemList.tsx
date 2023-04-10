import moment from 'moment';
import styled, { keyframes } from 'styled-components';

import IconHappeningFire from '@/assets/svg/icon-happening-fire.svg';
import { FireLogModel } from '@/model/FireLog/FireLogModel';
import { flex, font } from '@/styles/Style-mixins';
import { STATUS_FIRE_LOG_PENDING } from '@/util/ConstantApp/TypeConstant';

const dataTextConstant = {
    descPending: 'Chờ xử lý',
    descInProcess: 'Đang xử lý',
};
interface StyleProps {
    checkedstatus: string;
}
export const animatePulse = keyframes`
    0% {
        box-shadow: 0 0 0 0 rgba(255, 0, 64, 0.7), 0 0 0 0 rgba(255, 0, 64, 0.7);
    }
    40% {
        box-shadow: 0 0 0 10px rgba(255, 0, 64, 0), 0 0 0 0 rgba(255, 0, 64, 0.7);
    }
    80% {
        box-shadow: 0 0 0 10px rgba(255, 0, 64, 0), 0 0 0 3px rgba(255, 0, 64, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(255, 0, 64, 0), 0 0 0 3px rgba(255, 0, 64, 0);
    }
`;

const StyleBackground = styled.div<StyleProps>`
    & > div {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin: 5px 0;
    }
    & > div:nth-child(1) {
        ${flex('space-between', 'center')}
        div:nth-child(1) {
            width: 80%;
            ${flex('flex-start', 'center', 'row')}
            svg {
                min-height: 16px;
                min-width: 15px;
                margin-right: 8px;
            }
            h2 {
                margin: 0;
                ${font(16, '#000', 600)}
            }
        }
        div:nth-child(2) {
            width: 70px;
            height: 25px;
            text-align: center;
            margin: 0;
            margin-left: 10px;
            padding: 2px 6px;
            background-color: ${(props) => (props.checkedstatus === 'true' ? '#ec1b25' : '#ff5e13b3')};
            animation: ${(props) => (props.checkedstatus === 'true' ? animatePulse : '')} 0.7s linear infinite;
            ${font(11, '#fff', 700)};
        }
    }
    & > div:nth-child(2) {
        margin: 7px 0;
        h3 {
            margin: 0;
            margin-left: 20px;
            ${font(12, '#000', 400)}
        }
    }
    & > div:nth-child(3) {
        h5 {
            width: 100%;
            margin: 0;
            ${font(11)}
            font-style: italic;
            text-align: right;
        }
    }
`;
function ItemList({ detailFireLog }: { detailFireLog: FireLogModel }) {
    const localTime = moment(detailFireLog?.dateCreated * 1000).format('HH:mm DD/MM/YYYY');
    return (
        <StyleBackground checkedstatus={`${detailFireLog.status === STATUS_FIRE_LOG_PENDING}`}>
            <div>
                <div>
                    <IconHappeningFire />
                    <h2>{detailFireLog.constructionName}</h2>
                </div>
                <div>
                    {detailFireLog.status === STATUS_FIRE_LOG_PENDING
                        ? dataTextConstant.descPending
                        : dataTextConstant.descInProcess}
                </div>
            </div>
            <div>
                <h3>Địa chỉ : {detailFireLog.constructionFullAddress} </h3>
            </div>
            <div>
                <h5>{localTime}</h5>
            </div>
        </StyleBackground>
    );
}

export default ItemList;
