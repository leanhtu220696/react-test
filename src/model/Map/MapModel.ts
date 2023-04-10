export interface DetailAutoCompleteModel {
    description: string;
    matched_substrings: [];
    place_id: string;
    reference: string;
    structured_formatting: {
        main_text: string;
        secondary_text: string;
    };
    terms: [];
    has_children: boolean;
    display_type: string;
    score: number;
    plus_code: {
        compound_code: string;
        global_code: string;
    };
}

export interface AutoCompleteModel extends DetailAutoCompleteModel {
    predictions?: DetailAutoCompleteModel[];
    executed_time?: number;
    executed_time_all?: number;
    status?: string;
}

export interface DetailPlace {
    result: {
        place_id: string;
        formatted_address: string;
        geometry: {
            location: {
                lat: number;
                lng: number;
            };
        };
        name: string;
    };
    status: string;
}

export interface AddressComponentsModel {
    long_name: string;
    short_name: string;
}
export interface DetailReverseGeocodingModel {
    address_components: AddressComponentsModel[];
    formatted_address: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
        boundary: number;
    };
    place_id: string;
    reference: string;
    plus_code: {
        compound_code: string;
        global_code: string;
    };
    compound: {
        district: string;
        commune: string;
        province: string;
    };
    types: [];
}
export interface ReverseGeocodingModel {
    results: DetailReverseGeocodingModel[];
    status: string;
}
