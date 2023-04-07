import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes, useLocation } from 'react-router-dom';

import LoadingComponent from '@/component/LoadingComponent';

const NotFoundPage = React.lazy(/* webpackChunkName: "not-found-page" */ () => import('@/pages/NotFoundPage'));
const ErrorFallBack = React.lazy(/* webpackChunkName: "login-page" */ () => import('@/pages/ErrorFallbackPage'));
const DeviceList = React.lazy(/* webpackChunkName: "login-page" */ () => import('@/pages/List/DeviceList'));

const ApplicationRoutes = () => {
    const location = useLocation();

    return (
        <Suspense fallback={<LoadingComponent />}>
            <ErrorBoundary FallbackComponent={ErrorFallBack} key={location.pathname}>
                <Routes>
                    <Route path={'/'} element={<DeviceList />} />
                    <Route element={<NotFoundPage />} />
                </Routes>
            </ErrorBoundary>
        </Suspense>
    );
};

export default ApplicationRoutes;
