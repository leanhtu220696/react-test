import { Feature, FeatureCollection, Geometry } from 'geojson';

export type PropsType =
    | undefined
    | Feature<Geometry, { [p: string]: any }>
    | FeatureCollection<Geometry, { [p: string]: any }>;
