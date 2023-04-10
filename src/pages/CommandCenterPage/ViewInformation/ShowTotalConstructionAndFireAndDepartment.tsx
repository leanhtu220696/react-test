import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import IconConstruction from '@/assets/svg/icon-construction.svg';
import IconFire from '@/assets/svg/icon-fire.svg';
import IconLocateFixed from '@/assets/svg/icon-locate-fixed.svg';
import IconSiren from '@/assets/svg/icon-siren.svg';
import { useGetDataOverviewReport } from '@/fetcher/Device/DeviceService';
import { OverviewReportModel } from '@/model/Device/DeviceModel';
import { flex, font } from '@/styles/Style-mixins';
import { CONSTRUCTION_URL, FIRE_DEPARTMENT_URL, FIRE_LOG_URL, ONLINE_SUPERVISION_URL } from '@/util/ConstantApp/Url';

const dataTextConstant = {
    totalConstruction: 'Công trình',
    totalHappeningFire: 'Đang cháy',
    totalFireDepartment: 'Đơn vị PCCC',
    totalHappenedFire: 'Vụ cháy',
};
const StyleBackground = styled.div`
    border: 1px solid #000;
    border-radius: 4px;
    margin-top: 20px;
    width: 100%;
    ${flex('space-between', 'center', 'column')}
    & > a {
        padding: 10px;
        width: 100%;
        ${flex('space-between', 'center', 'row')}
        div {
            width: 65%;
            ${flex('flex-start', 'center')}
            h3 {
                margin: 0 10px;
                ${font(12, '#000', 600)}
            }
        }
        h2 {
            margin: 0;
            width: 35%;
            ${font(24, '#000', 500)}
            line-height: '0';
        }
    }
    & > a:nth-child(2) {
        & > h2 {
            ${font(24, 'red', 500)}
        }
    }
`;
const StyleLink = styled(Link)`
    &:hover {
        background-color: #e5f7ff;
    }
`;
function ShowTotalConstructionAndFireAndDepartment() {
    const [responseDataOverviewReport, makeRequestDataOverviewReport] = useGetDataOverviewReport();
    const [overviewReport, setOverviewReport] = useState<OverviewReportModel>({
        totalHappeningFire: 0,
        totalHappenedFire: 0,
        totalConstruction: 0,
        totalFireDepartment: 0,
    });
    useEffect(() => {
        makeRequestDataOverviewReport();
    }, []);
    useEffect(() => {
        if (responseDataOverviewReport.data) {
            setOverviewReport(responseDataOverviewReport.data);
        }
    }, [responseDataOverviewReport]);
    return (
        <StyleBackground>
            <StyleLink to={CONSTRUCTION_URL}>
                <div>
                    <IconConstruction />
                    <h3>{dataTextConstant.totalConstruction}</h3>
                </div>
                <h2>{overviewReport.totalConstruction}</h2>
            </StyleLink>
            <StyleLink to={ONLINE_SUPERVISION_URL}>
                <div>
                    <IconSiren />
                    <h3>{dataTextConstant.totalHappeningFire}</h3>
                </div>
                <h2>{overviewReport.totalHappeningFire}</h2>
            </StyleLink>
            <StyleLink to={FIRE_DEPARTMENT_URL}>
                <div>
                    <IconLocateFixed />
                    <h3>{dataTextConstant.totalFireDepartment}</h3>
                </div>
                <h2>{overviewReport.totalFireDepartment}</h2>
            </StyleLink>
            <StyleLink to={FIRE_LOG_URL}>
                <div>
                    <IconFire />
                    <h3>{dataTextConstant.totalHappenedFire}</h3>
                </div>
                <h2>{overviewReport.totalHappenedFire}</h2>
            </StyleLink>
        </StyleBackground>
    );
}

export default ShowTotalConstructionAndFireAndDepartment;
