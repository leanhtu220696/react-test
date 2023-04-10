import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { LoadingDataState } from '@/util/UseApi';
interface Props {
    makeRequest: (
        id?: number,
    ) => [
        LoadingDataState<any>,
        (loadingArea?: string, expectedErrorStatus?: number[], requestBody?: Record<string, any>) => Promise<any>,
    ];
    title: string;
}

export const TitleTableSoldier = ({ makeRequest, title }: Props) => {
    const { idDepartment } = useParams();
    const [responseTitleSoldier, sendRequestGetTitleSoldier] = makeRequest(+idDepartment);
    const dataTitleSoldier = responseTitleSoldier.data;
    useEffect(() => {
        sendRequestGetTitleSoldier(undefined, [465]);
    }, []);
    return (
        <div>
            <div style={{ textAlign: 'center', marginTop: 25, marginBottom: 25 }}>
                <div style={{ marginBottom: 10 }}>
                    <p style={{ fontSize: 22, fontWeight: 700 }}>{title}</p>
                    <p style={{ fontSize: 20, fontWeight: 700 }}>{dataTitleSoldier?.name}</p>
                    <p style={{ fontSize: 20, fontWeight: 400 }}>
                        Số {dataTitleSoldier?.fullAddress} - {dataTitleSoldier?.district.name} -{' '}
                        {dataTitleSoldier?.province.name}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default TitleTableSoldier;
