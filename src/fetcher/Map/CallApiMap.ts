import { AutoCompleteModel, DetailPlace, ReverseGeocodingModel } from '@/model/Map/MapModel';
import { MAP_API_KEY } from '@/util/ConstantApp/KeyMap';

import { useFetchMap } from '../Api/ApiFetcherMap';

export interface ParamCoordinates {
    latitude: number;
    longitude: number;
}
export interface ParamSearchMap extends ParamCoordinates {
    keyWord: string;
}
export const useFetcherAutoComplete = (param: ParamSearchMap) => {
    const enCodeKeyWord = encodeURI(param.keyWord);
    return useFetchMap<AutoCompleteModel>(
        `/Place/AutoComplete?api_key=${MAP_API_KEY}&location=${param.latitude},${param.longitude}&input=${enCodeKeyWord}`,
    );
};

export const useFetcherPlaceDetail = (place_id: string) => {
    return useFetchMap<DetailPlace>(`/Place/Detail?place_id=${place_id}&api_key=${MAP_API_KEY}`);
};

export const useFetcherReverseGeocoding = (param: ParamCoordinates) => {
    return useFetchMap<ReverseGeocodingModel>(
        `/Geocode?latlng=${param.latitude},${param.longitude}&api_key=${MAP_API_KEY}`,
    );
};

export const useFetcherDirection = (origin: string, destination: string) => {
    return useFetchMap<any>(
        `/Direction?origin=${origin}&destination=${destination}&vehicle=car&api_key=${MAP_API_KEY}`,
    );
};
