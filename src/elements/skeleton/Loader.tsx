import React, { useEffect, useState } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

export const Loader = ({
    contentLoader,
    children,
    loadingArea,
}: {
    contentLoader: React.ReactNode;
    children?: React.ReactNode;
    loadingArea?: string | undefined;
}) => {
    const { promiseInProgress } = usePromiseTracker({ area: loadingArea });
    const [promiseInProgressNew, setPromiseInProgressNew] = useState(false);
    useEffect(() => {
        setPromiseInProgressNew(promiseInProgress);
    }, [promiseInProgress]);
    return <>{!promiseInProgressNew ? children : contentLoader}</>;
};
