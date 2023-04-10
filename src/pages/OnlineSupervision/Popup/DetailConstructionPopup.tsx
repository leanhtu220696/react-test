import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { dataSelectBusinessSector, dataSelectTypeConstructor } from '@/assets/data/DataConstant';
import { IconAccountDetail, IconAddress, IconReceiver, IconTypeConstruction, LogoConstruction } from '@/assets/svg';
import { ContainerListItem, PopupContainer, PopupHeader, TitleName } from '@/component/popup/style-popup';
import { StyledDetailButton } from '@/elements/button/StyledButton';
import { geoJSONDetailsModel } from '@/model/Map/GeoJSONDetailsModel';
import { CONSTRUCTION_URL } from '@/util/ConstantApp/Url';
import { stringConvert } from '@/util/StringUtil';

export const DetailConstructionPopup = ({ description }: { description: geoJSONDetailsModel }) => {
    const navigate = useNavigate();
    const [checkType, setCheckType] = useState<{ value: string; label: string } | undefined>();
    const [checkBusiness, setCheckBusiness] = useState<{ value: string; label: string } | undefined>();
    useEffect(() => {
        setCheckType(dataSelectTypeConstructor.find((type) => type.value === description.type));
        setCheckBusiness(dataSelectBusinessSector.find((business) => business.value === description.businessSector));
    }, [description]);
    return (
        <>
            <PopupHeader className="header">
                <LogoConstruction />
                <TitleName className="title">{description.name}</TitleName>
            </PopupHeader>
            <PopupContainer>
                <ContainerListItem>
                    <IconTypeConstruction />
                    <span>{checkType ? checkType.label : description.type}</span>
                </ContainerListItem>
                <ContainerListItem>
                    <IconTypeConstruction />
                    <span>{checkBusiness ? checkBusiness.label : description.businessSector}</span>
                </ContainerListItem>
                <ContainerListItem>
                    <IconReceiver />
                    <span>{JSON.parse(stringConvert(description.alertReceiverList))[0].username}</span>
                </ContainerListItem>
                <ContainerListItem>
                    <IconAddress />
                    <span>
                        {description.fullAddress} - {JSON.parse(stringConvert(description.district)).name} -{' '}
                        {JSON.parse(stringConvert(description.province)).name}
                    </span>
                </ContainerListItem>
                <ContainerListItem>
                    <IconAccountDetail />
                    <span>
                        Tài khoản: {JSON.parse(stringConvert(description.accountCustomerViewable)).username} -{' '}
                        {JSON.parse(stringConvert(description.accountCustomerViewable)).fullName}
                    </span>
                </ContainerListItem>
            </PopupContainer>
            <StyledDetailButton onClick={() => navigate(`..${CONSTRUCTION_URL}/${description.id}`)}>
                Xem chi tiết
            </StyledDetailButton>
        </>
    );
};
