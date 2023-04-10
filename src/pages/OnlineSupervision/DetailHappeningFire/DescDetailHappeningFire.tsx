import moment from 'moment';
import styled from 'styled-components';

import { IconAddress, IconHappeningFire, IconReceiver, IconStatusFireLog } from '@/assets/svg';
import { FireLogModel } from '@/model/FireLog/FireLogModel';
import { flex, font } from '@/styles/Style-mixins';
import { STATUS_FIRE_LOG_PENDING } from '@/util/ConstantApp/TypeConstant';

import { animatePulse } from '../ListHappeningFire/ItemList';

interface StyledProps {
    checkedstatus?: string;
}

const dataTextConstant = {
    descPending: 'Chờ xử lý',
    descInProcess: 'Đang xử lý',
};

const StyleTitle = styled.div`
    margin: 15px 0;
    ${flex('flex-start', 'center', 'row')}
    & > svg {
        margin-right: 10px;
        min-height: 16px;
        min-width: 15px;
    }
    & > h2 {
        margin: 0;
        ${font(14, '#000', 700)};
    }
`;
const StyleDescFireHappening = styled(StyleTitle)<StyledProps>`
    margin: 10px 0;
    ${flex('flex-start', 'center')}
    & > svg {
        margin-right: 10px;
        min-height: 25px;
        min-width: 25px;
    }
    & > h3 {
        margin: 0;
        ${font(14, '#000', 400)}
    }
    & > h4 {
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
`;
const StyleViewDate = styled.div`
    ${flex('flex-end', 'center')}
    & > h3 {
        ${font(14, '#000', 400)}
    }
`;
function DescDetailHappeningFire({ detailFireHappening }: { detailFireHappening: FireLogModel }) {
    const localTime = moment(detailFireHappening?.dateCreated * 1000).format('HH:mm DD/MM/YYYY');
    return (
        <>
            <StyleTitle>
                <IconHappeningFire />
                <h2>{detailFireHappening?.constructionName}</h2>
            </StyleTitle>
            <div style={{ paddingLeft: 20 }}>
                <StyleDescFireHappening checkedstatus="true">
                    <IconAddress />
                    <h3>{detailFireHappening?.constructionFullAddress}</h3>
                </StyleDescFireHappening>
                <StyleDescFireHappening checkedstatus="true">
                    <IconReceiver />
                    <h3>Số điện thoại: {detailFireHappening?.username}</h3>
                </StyleDescFireHappening>
                <StyleDescFireHappening checkedstatus={`${detailFireHappening?.status === STATUS_FIRE_LOG_PENDING}`}>
                    <IconStatusFireLog />
                    <h3>Trạng thái đám cháy :</h3>
                    <h4>
                        {detailFireHappening?.status === STATUS_FIRE_LOG_PENDING
                            ? dataTextConstant.descPending
                            : dataTextConstant.descInProcess}
                    </h4>
                </StyleDescFireHappening>
                <StyleViewDate>
                    <h3>{localTime}</h3>
                </StyleViewDate>
            </div>
        </>
    );
}

export default DescDetailHappeningFire;
