import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import { useCoordinatesStore } from '@/component/hook/useCoordinatesStore';
import { ItemDetailFireHappeningLoader } from '@/elements/skeleton/ExampleLoader';
import { FireLogModel } from '@/model/FireLog/FireLogModel';
import { font } from '@/styles/Style-mixins';
import { ITEM_DETAIL_FIRE_HAPPENING_LOADER } from '@/util/ConstantApp/TypeLoader';

import ItemList from './ItemList';

const dataTextConstant = {
    title: 'DANH SÁCH ĐIỂM CHÁY',
    descDataEmpty: 'Không có vụ cháy nào',
};

interface StyleProps {
    ismenu: string;
}
const StyleBackground = styled.div`
    width: 420px;
    padding-top: 20px !important;
    @media (max-width: 1441px) {
        width: 380px;
    }
    @media (max-width: 1301px) {
        width: 360px;
    }
    @media (max-width: 1201px) {
        width: 320px;
    }
    @media (max-width: 1025px) {
        width: 315px;
    }
`;
const Title = styled.h2<StyleProps>`
    display: ${(props) => (props.ismenu === 'false' ? 'none' : 'block')};
    transition: display 0.01s;
    margin: 5px 0 30px;
    width: 100%;
    text-align: center;
    ${font(20, '#000000', 600)}
`;
const StyleViewItemList = styled.div`
    cursor: pointer;
    padding: 10px 20px;

    &:hover {
        background-color: #ccedfc;
    }
`;

function ListHappeningFire({
    isOpenMenu,
    listFireHappening,
    setDetailFireHappening,
}: {
    isOpenMenu: boolean;
    listFireHappening: FireLogModel[];
    setDetailFireHappening: (value: any) => void;
}) {
    const { setCoordinatesStore } = useCoordinatesStore();
    const handleOnClickItem = (item: FireLogModel) => {
        setDetailFireHappening(item);
        setCoordinatesStore({
            longitude: +item.longitude,
            latitude: +item.latitude,
        });
    };
    return (
        <StyleBackground>
            <Title ismenu={`${isOpenMenu}`}>{dataTextConstant.title}</Title>
            <ItemDetailFireHappeningLoader loadingarea={ITEM_DETAIL_FIRE_HAPPENING_LOADER}>
                {listFireHappening.length !== 0 ? (
                    listFireHappening.map((item) => {
                        return (
                            <StyleViewItemList
                                key={uuid()}
                                onClick={() => {
                                    handleOnClickItem(item);
                                }}
                            >
                                <ItemList detailFireLog={item} />
                            </StyleViewItemList>
                        );
                    })
                ) : (
                    <>
                        {isOpenMenu == true && (
                            <h2 style={{ textAlign: 'center' }}>{dataTextConstant.descDataEmpty}</h2>
                        )}
                    </>
                )}
            </ItemDetailFireHappeningLoader>
        </StyleBackground>
    );
}

export default ListHappeningFire;
