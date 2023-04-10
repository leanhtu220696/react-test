export interface ProvinceModel {
    id?: number;
    name?: string;
    latitude?: number;
    longitude?: number;
}
export interface DistrictModel extends ProvinceModel {
    province?: ProvinceModel;
}
