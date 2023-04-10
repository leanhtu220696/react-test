import { DetailConstructionModel } from '@/model/Construction/ConstructionModel';
import { OverviewDeviceModel } from '@/model/Device/DeviceModel';
import { DetailFireDepartmentModel } from '@/model/FireDepartment/FireDepartmentModel';
import { WaterIntakeModel } from '@/model/FireDepartment/WaterIntakeModel';
import { FireLogModel } from '@/model/FireLog/FireLogModel';

const GeoJSON = require('geojson');
export const parseGeoJSON = (
    data:
        | DetailConstructionModel[]
        | DetailFireDepartmentModel[]
        | FireLogModel[]
        | OverviewDeviceModel[]
        | WaterIntakeModel[]
        | undefined,
) => GeoJSON.parse(data, { Point: ['latitude', 'longitude'] });
