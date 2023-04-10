import { useCallback, useState } from 'react';
import axios from 'axios';

export const useFetchMap = <T,>(pathName: string): [any, () => Promise<() => void>] => {
    const [data, setData] = useState<T>(null);
    const [, setLoading] = useState(null);
    const [, setError] = useState(null);

    const makeRequest = useCallback(async () => {
        setLoading('loading...');
        setData(null);
        setError(null);
        const source = axios.CancelToken.source();
        axios
            .get(`https://rsapi.goong.io${pathName}`, { cancelToken: source.token })
            .then((res: any) => {
                setLoading(false);
                res.data && setData(res.data);
            })
            .catch((err) => {
                setLoading(false);
                setError('An error occurred. Awkward..');
                console.log(err);
            });
        return () => {
            source.cancel();
        };
    }, [pathName]);

    return [data, makeRequest];
};
