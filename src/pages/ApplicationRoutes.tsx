import React, { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { message } from 'antd';

import LoadingComponent from '@/component/LoadingComponent';
import NarBar from '@/component/navbar/Navbar';
import { resetCoordinates } from '@/context/store/CoordinatesSlice';
import { resetIsExpandMenu } from '@/context/store/ExpandMenuSlice';
import { resetIdCheckedSelect } from '@/context/store/IdCheckedSelectSlice';
import { resetChangeModal } from '@/context/store/PhoneNumberExistsSlice';
import {
    ACTIVATED_DEVICE_URL,
    ADD_CONSTRUCTION_URL,
    ADD_CUSTOMER_URL,
    ADD_SOLDIER_URL,
    COMMAND_CENTER_URL,
    CONSTRUCTION_URL,
    CREATE_FIRE_DEPARTMENT,
    CREATE_WATER_INTAKE_URL,
    CUSTOMER_URL,
    DEVICE_URL,
    EQUIPMENT_MANAGEMENT_URL,
    FIRE_DEPARTMENT_URL,
    FIRE_LOG_URL,
    HOME_URL,
    ONLINE_SUPERVISION_URL,
    ROOM_URL,
    SOLDIERS_URL,
    WATER_INTAKE_URL,
} from '@/util/ConstantApp/Url';
import { showMessage } from '@/util/Util';

const NotFoundPage = React.lazy(/* webpackChunkName: "not-found-page" */ () => import('@/pages/NotFoundPage'));
const ErrorFallBack = React.lazy(/* webpackChunkName: "login-page" */ () => import('@/pages/ErrorFallbackPage'));
const OnlineSupervision = React.lazy(() => import('@/pages/OnlineSupervision/OnlineSupervision'));
const ManagerDevicePage = React.lazy(() => import('@/pages/EquipmentManagement/DeviceList'));
const ActivatedDeviceScreen = React.lazy(() => import('@/pages/EquipmentManagement/ActivatedDevice'));
const CommandCenterPage = React.lazy(() => import('@/pages/CommandCenterPage/CommandCenter'));
const FireLogManagerPage = React.lazy(() => import('@/pages/FireLog/FireLogManagerPage'));
const FireLogDetailPage = React.lazy(() => import('@/pages/FireLog/Detail/FireLogDetailPage'));
const ConstructionPage = React.lazy(() => import('@/pages/Construction/ListConstruction'));
const FireDepartmentPage = React.lazy(() => import('@/pages/FireDepartment/FireDepartmentPage/FireDepartmentPage'));
const ListOfSoldierPage = React.lazy(() => import('@/pages/FireDepartment/Soldier/ListOfSoldierPage'));
const AddSoldierPage = React.lazy(() => import('@/pages/FireDepartment/Soldier/AddSoldiersPage/AddSoldiersPage'));
const HomePage = React.lazy(() => import('@/pages/Home/HomePage'));
const AddConstructionPage = React.lazy(
    () => import('@/pages/Construction/Construction/CreateConstructionPage/CreateConstruction'),
);
const DetailSoldierPage = React.lazy(
    () => import('@/pages/FireDepartment/Soldier/DetailSoldierPage/DetailSoldierPage'),
);
const DetailConstruction = React.lazy(
    () => import('@/pages/Construction/Construction/DetailConstructionPage/DetailConstruction'),
);
const ListWaterLocationPage = React.lazy(() => import('@/pages/FireDepartment/WaterIntake/ListWaterIntakePage'));
const DetailWaterIntakePage = React.lazy(
    () => import('@/pages/FireDepartment/WaterIntake/DetailWaterIntakePage/DetailWaterIntake'),
);
const CreateWaterIntakePage = React.lazy(
    () => import('@/pages/FireDepartment/WaterIntake/CreateWaterIntakePage/CreateWaterIntakePage'),
);
const CreateFireDepartmentPage = React.lazy(
    () => import('@/pages/FireDepartment/FireDepartmentPage/CreateFireDepartment/CreateFireDepartmentPage'),
);
const DetailFireDepartment = React.lazy(
    () => import('@/pages/FireDepartment/FireDepartmentPage/DetailFireDepartmentPage/DetailFireDepartmentPage'),
);

const DetailDevice = React.lazy(() => import('@/pages/EquipmentManagement/DetailDevice/DetailDevice'));
const RoomPage = React.lazy(() => import('@/pages/Construction/Room/ListRoom'));
const CustomerPage = React.lazy(() => import('@/pages/Customer/CustomerList'));
const AddCustomer = React.lazy(() => import('@/pages/Customer/AddCustomer/AddCustomer'));
const DetailCustomer = React.lazy(() => import('@/pages/Customer/DetailCustomer/DetailCustomer'));
const DeviceListOfConstruction = React.lazy(() => import('@/pages/Construction/Device/DeviceListOfConstruction'));
const DetailDeviceOfConstruction = React.lazy(() => import('@/pages/Construction/Device/DetailDeviceOfConstruction'));

const ApplicationRoutes = () => {
    const location = useLocation();
    const state = location.state;
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetChangeModal());
        dispatch(resetCoordinates());
        dispatch(resetIdCheckedSelect());
        dispatch(resetIsExpandMenu());
    }, [location.pathname]);
    useEffect(() => {
        if (state && state.message && state.type) {
            messageApi.open(showMessage(state.type, state.message));
            window.history.replaceState({}, document.title);
        }
    }, [state]);
    return (
        <Suspense fallback={<LoadingComponent />}>
            {contextHolder}
            <ErrorBoundary FallbackComponent={ErrorFallBack} key={location.pathname}>
                <NarBar>
                    <Routes>
                        <Route path={'/'} element={<Navigate to={HOME_URL} />} />
                        <Route path={HOME_URL} element={<HomePage />} />
                        <Route path={COMMAND_CENTER_URL} element={<CommandCenterPage />} />
                        <Route path={EQUIPMENT_MANAGEMENT_URL} element={<ManagerDevicePage />} />
                        <Route path={ACTIVATED_DEVICE_URL} element={<ActivatedDeviceScreen />} />
                        <Route path={ONLINE_SUPERVISION_URL} element={<OnlineSupervision />} />
                        <Route path={CONSTRUCTION_URL} element={<ConstructionPage />} />
                        <Route path={FIRE_DEPARTMENT_URL} element={<FireDepartmentPage />} />
                        <Route
                            path={`${FIRE_DEPARTMENT_URL}${CREATE_FIRE_DEPARTMENT}`}
                            element={<CreateFireDepartmentPage />}
                        />
                        <Route path={`${FIRE_DEPARTMENT_URL}/:idDepartment`} element={<DetailFireDepartment />} />
                        <Route
                            path={`${FIRE_DEPARTMENT_URL}/:idDepartment${SOLDIERS_URL}`}
                            element={<ListOfSoldierPage />}
                        />
                        <Route
                            path={`${FIRE_DEPARTMENT_URL}/:idDepartment${ADD_SOLDIER_URL}`}
                            element={<AddSoldierPage />}
                        />
                        <Route
                            path={`${FIRE_DEPARTMENT_URL}/:idDepartment${SOLDIERS_URL}/:idSoldier`}
                            element={<DetailSoldierPage />}
                        />
                        <Route
                            path={`${FIRE_DEPARTMENT_URL}/:idDepartment${WATER_INTAKE_URL}`}
                            element={<ListWaterLocationPage />}
                        />
                        <Route
                            path={`${FIRE_DEPARTMENT_URL}/:idDepartment${WATER_INTAKE_URL}/:idWaterIntake`}
                            element={<DetailWaterIntakePage />}
                        />
                        <Route
                            path={`${FIRE_DEPARTMENT_URL}/:idDepartment${CREATE_WATER_INTAKE_URL}`}
                            element={<CreateWaterIntakePage />}
                        />
                        <Route path={`${CONSTRUCTION_URL}/:id`} element={<DetailConstruction />} />
                        <Route path={FIRE_LOG_URL} element={<FireLogManagerPage />} />
                        <Route path={`${FIRE_LOG_URL}/:idFireLog`} element={<FireLogDetailPage />} />
                        <Route path={ADD_CONSTRUCTION_URL} element={<AddConstructionPage />} />
                        <Route path={`${CONSTRUCTION_URL}/:id${ROOM_URL}`} element={<RoomPage />} />
                        <Route path={`${CUSTOMER_URL}`} element={<CustomerPage />} />
                        <Route path={`${CUSTOMER_URL}/:username`} element={<DetailCustomer />} />
                        <Route path={`${ADD_CUSTOMER_URL}`} element={<AddCustomer />} />
                        <Route
                            path={`${CONSTRUCTION_URL}/:constructionId${DEVICE_URL}`}
                            element={<DeviceListOfConstruction />}
                        />
                        <Route path={`${EQUIPMENT_MANAGEMENT_URL}/:id`} element={<DetailDevice />} />
                        <Route
                            path={`${CONSTRUCTION_URL}/:constructionId${DEVICE_URL}/:deviceId`}
                            element={<DetailDeviceOfConstruction />}
                        />
                        <Route element={<NotFoundPage />} />
                    </Routes>
                </NarBar>
            </ErrorBoundary>
        </Suspense>
    );
};

export default ApplicationRoutes;
