import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import styled from 'styled-components';

import imgIndex from '@/assets/image/iconIndex.png';
import { useCoordinatesStore } from '@/component/hook/useCoordinatesStore';
import { useDataCreateDeviceStore } from '@/component/hook/useDataCreateDevice';
import { getIdCheckedSelect } from '@/context/store/IdCheckedSelectSlice';
import {
    ParamCoordinates,
    ParamSearchMap,
    useFetcherAutoComplete,
    useFetcherPlaceDetail,
    useFetcherReverseGeocoding,
} from '@/fetcher/Map/CallApiMap';
import { CoordinatesModel } from '@/model/Map/CoordinatesModel';
import { DetailAutoCompleteModel, ReverseGeocodingModel } from '@/model/Map/MapModel';
import { font } from '@/styles/Style-mixins';

interface StylePorps {
    disable: string;
}
const dataTextConstant = {
    placeholderSearchIndex: 'Tìm kiếm trên bản đồ',
};
const StyleSearchIndex = styled.div`
    width: 100%;
    margin: 25px 0 30px;
    padding: 0 0 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    img {
        width: 18px;
        height: 18px;
    }
    .ant-select {
        width: 330px;
        padding: 0 10px;
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
        margin: 5px;
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
const StyleDisable = styled.div<StylePorps>`
    display: ${(props) => (props.disable === 'true' ? 'block' : 'none')};
    background-color: rgba(0, 0, 0, 0.05);
    width: 100%;
    height: 32px;
    top: 25px;
    position: absolute;
    border-radius: 5px;
`;
let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;
function SearchIndex() {
    const [paramSearchMap, setParamSearchMap] = useState<ParamSearchMap>({
        longitude: 0,
        latitude: 0,
        keyWord: '',
    });
    const [paramCoordinates, setParamCoordinates] = useState<ParamCoordinates>({
        longitude: 0,
        latitude: 0,
    });
    const [placeId, setPlaceId] = useState('');
    const [responseAutoComplete, makeRequestAutoComplete] = useFetcherAutoComplete(paramSearchMap);
    const [responsePlaceDetail, makeRequestPlaceDetail] = useFetcherPlaceDetail(placeId);
    const [responseRevertGeocoding, makeRequestRevertGeocoding] = useFetcherReverseGeocoding(paramCoordinates);
    const [value, setValue] = useState<string>();
    const [dataSearch, setDataSearch] = useState<DetailAutoCompleteModel[]>([]);
    const { coordinatesStore, setCoordinatesStore } = useCoordinatesStore();
    const [coordinatesSearch, setCoordinatesSearch] = useState<CoordinatesModel>({
        latitude: 0,
        longitude: 0,
    });
    const [disabledForm, setDisabledForm] = useState(false);
    const idCheckedSelectConstruction = useSelector(getIdCheckedSelect).idConstruction;
    const { dataCreateDeviceStore } = useDataCreateDeviceStore();
    useEffect(() => {
        if (idCheckedSelectConstruction) {
            if (idCheckedSelectConstruction != -1) {
                setDisabledForm(true);
            } else {
                setDisabledForm(false);
            }
        }
    }, [idCheckedSelectConstruction]);

    useEffect(() => {
        const checkedExistsDataLocal = Boolean(dataCreateDeviceStore.constructionModel);
        if (checkedExistsDataLocal) {
            const idExists = Boolean(dataCreateDeviceStore.constructionModel.id);
            if (idExists) {
                setDisabledForm(true);
            }
        }
    }, [dataCreateDeviceStore]);
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
        if (placeId && value) {
            makeRequestPlaceDetail();
        }
    }, [value]);
    useEffect(() => {
        if (responsePlaceDetail) {
            if (responsePlaceDetail.result) {
                setPlaceId(null);
                setCoordinatesStore({
                    latitude: responsePlaceDetail.result.geometry.location.lat,
                    longitude: responsePlaceDetail.result.geometry.location.lng,
                });
                setCoordinatesSearch({
                    latitude: responsePlaceDetail.result.geometry.location.lat,
                    longitude: responsePlaceDetail.result.geometry.location.lng,
                });
            }
        }
    }, [responsePlaceDetail]);
    useEffect(() => {
        if (coordinatesStore.longitude) {
            const differentLongitude = coordinatesSearch.longitude !== coordinatesStore.longitude;
            const differentLatitude = coordinatesSearch.latitude !== coordinatesStore.latitude;
            if (differentLatitude && differentLongitude) {
                setParamCoordinates(coordinatesStore);
            }
        } else {
            setValue(null);
        }
    }, [coordinatesStore.longitude]);
    useEffect(() => {
        if (paramCoordinates) {
            makeRequestRevertGeocoding();
        }
    }, [paramCoordinates]);
    useEffect(() => {
        if (responseRevertGeocoding) {
            const dataResult: ReverseGeocodingModel = responseRevertGeocoding;
            const formattedAddress = dataResult.results[0].formatted_address;
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
                <img src={imgIndex} alt="icon" />
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
            </StyleSearchIndex>
            <StyleDisable disable={`${disabledForm}`}></StyleDisable>
        </div>
    );
}
export default SearchIndex;
