import { useNavigate } from 'react-router-dom';

import {
    IconAddress,
    IconAvailableWater,
    IconCheck,
    IconReceiver,
    IconTypeWaterIntake,
    IconUnitManagement,
    LogoWaterIntake,
} from '@/assets/svg';
import { ContainerListItem, PopupContainer, PopupHeader, TitleName } from '@/component/popup/style-popup';
import { StyledDetailButton } from '@/elements/button/StyledButton';
import { geoJSONDetailsModel } from '@/model/Map/GeoJSONDetailsModel';
import { FIRE_DEPARTMENT_URL, WATER_INTAKE_URL } from '@/util/ConstantApp/Url';
import { stringConvert } from '@/util/StringUtil';

export const DetailWaterIntakePopup = ({ description }: { description: geoJSONDetailsModel }) => {
    const navigate = useNavigate();
    return (
        <>
            <PopupHeader className="header">
                <LogoWaterIntake />
                <TitleName className="title">
                    [{description.code}] Điểm lấy nước số {description.id}
                </TitleName>
            </PopupHeader>
            <PopupContainer>
                <ContainerListItem>
                    <IconAvailableWater />
                    <span>Khả năng cấp nước: {description.available ? 'có' : 'không'}</span>
                </ContainerListItem>
                <ContainerListItem>
                    <IconTypeWaterIntake />
                    <span>Loại: {description.type}</span>
                </ContainerListItem>
                <ContainerListItem>
                    <IconCheck />
                    <span>Mô tả: {description.description}</span>
                </ContainerListItem>
                <ContainerListItem>
                    <IconAddress />
                    <span>{description.fullAddress}</span>
                </ContainerListItem>
                <ContainerListItem>
                    <IconReceiver />
                    <span>{description.phoneNumber}</span>
                </ContainerListItem>
                <ContainerListItem>
                    <IconUnitManagement />
                    <span>Cơ quan quản lý: {JSON.parse(stringConvert(description.fireDepartment)).name}</span>
                </ContainerListItem>
            </PopupContainer>
            <StyledDetailButton
                onClick={() =>
                    navigate(
                        `..${FIRE_DEPARTMENT_URL}/${
                            JSON.parse(stringConvert(description.fireDepartment)).id
                        }${WATER_INTAKE_URL}/${description.id}`,
                    )
                }
            >
                Xem chi tiết{' '}
            </StyledDetailButton>
        </>
    );
};
