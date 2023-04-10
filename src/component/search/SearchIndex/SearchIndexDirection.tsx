import { useEffect, useState } from 'react';
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import styled from 'styled-components';

import { IconDirect } from '@/assets/svg';
import { OriginAndDestinationItemModel } from '@/context/store/OriginAndDestinationListSlice';
import {
    ParamCoordinates,
    ParamSearchMap,
    useFetcherAutoComplete,
    useFetcherPlaceDetail,
    useFetcherReverseGeocoding,
} from '@/fetcher/Map/CallApiMap';
import { DetailAutoCompleteModel, ReverseGeocodingModel } from '@/model/Map/MapModel';
import { font } from '@/styles/Style-mixins';

import { FireLogModel } from '../../../model/FireLog/FireLogModel';
import { useCoordinatesOriginStore } from '../../hook/useCoordinatesOriginStore';
import { useOriginAndDestinationListStore } from '../../hook/useOriginAndDestinationListStore';

const dataTextConstant = {
    placeholderSearchIndex: 'Tìm kiếm trên bản đồ',
};
const StyleSearchIndex = styled.div`
    width: 100%;
    margin: 0;
    padding: 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .icon-svg-direct {
        display: flex;
        margin-left: 9px;
        position: relative;
    }
    .icon-svg-direct > svg {
        min-height: 20px;
        min-width: 20px;
    }
    .icon-svg-direct::before {
        content: ' ';
        height: 20px;
        width: 1px;
        background-color: #000000;
        opacity: 0.5;
        position: absolute;
        left: -9px;
        top: 0;
    }
    .ant-select {
        width: 85%;
        padding: 0;
    }
    .ant-select-selector {
        padding: 0;
        margin: 0;
        border: none !important;
        padding: 0 10px;
        ${font(14, '#000000', 600)}
    }
    .ant-select-item {
        width: 300px;
    }
    .ant-select-focused .ant-select-selector,
    .ant-select-selector:focus,
    .ant-select-selector:active,
    .ant-select-open .ant-select-selector {
        border-color: #d9d9d9 !important;
        box-shadow: none !important;
    }
    .ant-select-arrow {
        display: none;
    }
    button {
        width: 20px;
        height: 20px;
        padding: 0;
        margin: 7px;
        border: none;
        background: transparent;
    }
`;
const StyleLabel = styled.div`
    & > h4 {
        height: 30px;
        display: flex;
        align-items: center;
        margin: 0;
        padding: 0;
        ${font(14, '#00000', 800)}
    }
    & > h5 {
        height: 30px;
        display: flex;
        align-items: center;
        margin: 0;
        padding: 0;
        ${font(14, '#00000', 400)}
    }
`;

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;
function SearchIndexDirect({
    detailHappeningFire,
    setOrigin,
    setIsCallApiBySelect,
    isCallApiBySelect,
}: {
    detailHappeningFire: FireLogModel;
    isCallApiBySelect: boolean;
    setOrigin: React.Dispatch<React.SetStateAction<any>>;
    setIsCallApiBySelect: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [paramSearchMap, setParamSearchMap] = useState<ParamSearchMap>({
        longitude: 0,
        latitude: 0,
        keyWord: '',
    });
    const [paramCoordinates, setParamCoordinates] = useState<ParamCoordinates>({
        longitude: 0,
        latitude: 0,
    });
    const { coordinatesOriginStore, setCoordinatesOriginStore } = useCoordinatesOriginStore();
    const [placeId, setPlaceId] = useState('');
    const [responseAutoComplete, makeRequestAutoComplete] = useFetcherAutoComplete(paramSearchMap);
    const [responsePlaceDetail, makeRequestPlaceDetail] = useFetcherPlaceDetail(placeId);
    const [responseRevertGeocoding, makeRequestRevertGeocoding] = useFetcherReverseGeocoding(paramCoordinates);
    const [value, setValue] = useState<string>();
    const [dataSearch, setDataSearch] = useState<DetailAutoCompleteModel[]>([]);
    const { originAndDestinationListStore, setOriginAndDestinationListStore } = useOriginAndDestinationListStore();
    const itemExist = originAndDestinationListStore.find((item) => item.idHappeningFire === detailHappeningFire?.id);

    useEffect(() => {
        if (isCallApiBySelect === true) {
            setValue(null);
        }
    }, [isCallApiBySelect]);
    useEffect(() => {
        if (coordinatesOriginStore.latitude !== 0) {
            setParamCoordinates({
                longitude: coordinatesOriginStore.longitude,
                latitude: coordinatesOriginStore.latitude,
            });
        }
    }, [coordinatesOriginStore]);

    useEffect(() => {
        if (itemExist && itemExist.placeId) {
            setPlaceId(itemExist.placeId);
        }
    }, [detailHappeningFire]);
    useEffect(() => {
        if (paramSearchMap) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            const callApi = () => {
                if (currentValue === paramSearchMap.keyWord) {
                    makeRequestAutoComplete();
                }
            };
            timeout = setTimeout(callApi, 500);
        }
    }, [paramSearchMap]);
    useEffect(() => {
        if (responseAutoComplete) {
            setDataSearch(responseAutoComplete.predictions);
        }
    }, [responseAutoComplete]);
    useEffect(() => {
        if (placeId) {
            makeRequestPlaceDetail();
        }
    }, [placeId]);
    useEffect(() => {
        if (placeId && value) {
            makeRequestPlaceDetail();
        }
    }, [value]);
    useEffect(() => {
        if (responsePlaceDetail) {
            if (placeId) {
                let list: OriginAndDestinationItemModel[] = originAndDestinationListStore;
                if (itemExist) {
                    const listNew: OriginAndDestinationItemModel[] = [];
                    list.forEach((item) => {
                        if (item.idHappeningFire !== itemExist.idHappeningFire) {
                            listNew.push(item);
                        }
                    });
                    list = listNew;
                }
                list = [
                    ...list,
                    {
                        ...itemExist,
                        idFireDepartment: placeId ? null : itemExist.idFireDepartment,
                        placeId: placeId,
                    },
                ];
                setOriginAndDestinationListStore(list);
            }
            if (responsePlaceDetail.result) {
                setPlaceId(null);
                setIsCallApiBySelect(false);
                const latitude = responsePlaceDetail.result.geometry.location.lat;
                const longitude = responsePlaceDetail.result.geometry.location.lng;
                setValue(`${responsePlaceDetail.result.formatted_address}`);
                setTimeout(() => {
                    setCoordinatesOriginStore({
                        longitude: longitude,
                        latitude: latitude,
                    });
                }, 100);
                setTimeout(() => {
                    setOrigin(`${latitude},${longitude}`);
                }, 200);
            }
        }
    }, [responsePlaceDetail]);
    useEffect(() => {
        if (paramCoordinates) {
            makeRequestRevertGeocoding();
        }
    }, [paramCoordinates]);
    useEffect(() => {
        if (responseRevertGeocoding) {
            const dataResult: ReverseGeocodingModel = responseRevertGeocoding;
            const formattedAddress = dataResult.results[0].formatted_address;
            setIsCallApiBySelect(false);
            setPlaceId(dataResult.results[0].place_id);
            setValue(formattedAddress);
        }
    }, [responseRevertGeocoding]);

    const handleSearch = (newValue: string) => {
        currentValue = newValue;
        setParamSearchMap({ ...paramSearchMap, keyWord: newValue });
    };

    const handleChange = (newValue: string) => {
        const val = dataSearch.find((item) => {
            return item.place_id === newValue;
        });
        if (val) {
            setValue(`${val.description}`);
            setPlaceId(val.place_id);
        }
    };

    const handleOnButtonSearch = () => {
        if (dataSearch && dataSearch.length !== 0) {
            const keyWord = dataSearch[0].place_id;
            const val = dataSearch.find((item) => {
                return item.place_id === keyWord;
            });
            if (val) {
                setValue(`${val.description}`);
                setPlaceId(val.place_id);
            }
        }
    };

    const handleOnKeyPressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleOnButtonSearch();
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <StyleSearchIndex>
                <Select
                    id="cus-search-index-map"
                    showSearch
                    onKeyUp={handleOnKeyPressEnter}
                    placeholder={dataTextConstant.placeholderSearchIndex}
                    value={value}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={handleSearch}
                    onChange={handleChange}
                    notFoundContent={null}
                    options={(dataSearch || []).map((item) => ({
                        value: item.place_id,
                        label: (
                            <StyleLabel>
                                <h4>{item.structured_formatting.main_text}</h4>
                                <h5>{item.structured_formatting.secondary_text}</h5>
                            </StyleLabel>
                        ),
                    }))}
                />
                <button onClick={handleOnButtonSearch}>
                    <SearchOutlined style={{ fontSize: '20px' }} />
                </button>
                <div className="icon-svg-direct">
                    <IconDirect />
                </div>
            </StyleSearchIndex>
        </div>
    );
}
export default SearchIndexDirect;
