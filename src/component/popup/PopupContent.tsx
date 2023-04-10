import { PopupWrapper } from '@/component/popup/style-popup';
import { geoJSONDetailsModel } from '@/model/Map/GeoJSONDetailsModel';
import { DetailConstructionPopup } from '@/pages/OnlineSupervision/Popup/DetailConstructionPopup';
import { DetailFireDepartmentPopup } from '@/pages/OnlineSupervision/Popup/DetailFireDepartmentPopup';
import { DetailWaterIntakePopup } from '@/pages/OnlineSupervision/Popup/DetailWaterIntakePopup';

export const PopupContent = ({ desc }: { desc: geoJSONDetailsModel }) => {
    return (
        <PopupWrapper>
            {desc.businessSector ? (
                <DetailConstructionPopup description={desc} />
            ) : desc.numberOfEmployees !== undefined ? (
                <DetailFireDepartmentPopup description={desc} />
            ) : (
                <DetailWaterIntakePopup description={desc} />
            )}
        </PopupWrapper>
    );
};
