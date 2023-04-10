import { useNavigate } from 'react-router-dom';

import {
    IconAddress,
    IconAvailableWater,
    IconCommander,
    IconHotLine,
    IconPeople,
    IconReceiver,
    LogoFireDepartment,
} from '@/assets/svg';
import { ContainerListItem, PopupContainer, PopupHeader, TitleName } from '@/component/popup/style-popup';
import { StyledDetailButton } from '@/elements/button/StyledButton';
import { geoJSONDetailsModel } from '@/model/Map/GeoJSONDetailsModel';
import { FIRE_DEPARTMENT_URL } from '@/util/ConstantApp/Url';

export const DetailFireDepartmentPopup = ({ description }: { description: geoJSONDetailsModel }) => {
    const navigate = useNavigate();
    return (
        <>
            <PopupHeader className="header">
                <LogoFireDepartment />
                <TitleName className="title">
                    [{description.code}] {description.name}
                </TitleName>
            </PopupHeader>
            <PopupContainer>
                <ContainerListItem>
                    <IconAddress />
                    <span>{description.fullAddress}</span>
                </ContainerListItem>
                <ContainerListItem>
                    <IconCommander />
                    <span>Cán bộ quản lý: {description.firefighter?.fullName}</span>
                </ContainerListItem>
                <ContainerListItem>
                    <IconReceiver />
                    <span>{description.phoneNumber}</span>
                </ContainerListItem>
                <ContainerListItem>
                    <IconHotLine />
                    <span>SĐT trực ban: {description.hotLine}</span>
                </ContainerListItem>
                <ContainerListItem>
                    <IconPeople />
                    <span>Nhân sự: {description.numberOfEmployees} cán bộ chiến sĩ</span>
                </ContainerListItem>
                <ContainerListItem>
                    <IconAvailableWater />
                    <span>Quản lý: {description.numberWaterIntake} điểm lấy nước</span>
                </ContainerListItem>
            </PopupContainer>
            <StyledDetailButton onClick={() => navigate(`..${FIRE_DEPARTMENT_URL}/${description.id}`)}>
                Xem chi tiết
            </StyledDetailButton>
        </>
    );
};
