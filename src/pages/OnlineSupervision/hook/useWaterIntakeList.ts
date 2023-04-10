import { useEffect, useState } from 'react';

import { initWaterIntake } from '@/assets/data/InitWaterIntake';
import { useGetAllWaterIntake } from '@/fetcher/FireDepartment/WaterIntakeService';
import { PropsType } from '@/model/PropsType';
import { parseGeoJSON } from '@/util/parseGeoJSON';

interface Props {
    waterIntakeList: PropsType;
}

export const useWaterIntakeList: () => Props = () => {
    const [waterIntakeList, setWaterIntakeList] = useState(parseGeoJSON(initWaterIntake));
    const [waterIntakeRes, waterIntakeReq] = useGetAllWaterIntake();

    useEffect(() => {
        waterIntakeReq(undefined, [504]);
    }, []);

    useEffect(() => {
        if (!waterIntakeRes.data) return;
        setWaterIntakeList(parseGeoJSON(waterIntakeRes.data));
    }, [waterIntakeRes]);

    return { waterIntakeList };
};
