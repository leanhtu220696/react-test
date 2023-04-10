import { useEffect, useState } from 'react';

import { initFireDepartment } from '@/assets/data/InitFireDepartment';
import { useGetAllFireDepartment } from '@/fetcher/FireDepartment/FireDepartmentService';
import { PropsType } from '@/model/PropsType';
import { parseGeoJSON } from '@/util/parseGeoJSON';

interface Props {
    fireDepartmentList: PropsType;
}

export const useFireDepartmentList: () => Props = () => {
    const [fireDepartmentList, setFireDepartmentList] = useState(parseGeoJSON(initFireDepartment));
    const [fireDepartmentRes, fireDepartmentReq] = useGetAllFireDepartment();

    useEffect(() => {
        fireDepartmentReq(undefined, [504]);
    }, []);

    useEffect(() => {
        if (!fireDepartmentRes.data) return;
        setFireDepartmentList(parseGeoJSON(fireDepartmentRes.data));
    }, [fireDepartmentRes]);

    return { fireDepartmentList };
};
