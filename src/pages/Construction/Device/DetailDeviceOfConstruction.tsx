import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import styled from 'styled-components';

import { BtnFormDetailEdit } from '@/component/button/btnFormDetailAndCreate';
import FormDeviceDetail from '@/component/form/Device/FormDeviceDetail';
import { DetailDeviceLoader } from '@/elements/skeleton/ExampleLoader';
import { useGetDetailDeviceOfConstruction } from '@/fetcher/Device/DeviceService';
import { font } from '@/styles/Style-mixins';
import { DETAIL_DEVICE_LOADER } from '@/util/ConstantApp/TypeLoader';
import { CONSTRUCTION_URL, DEVICE_URL } from '@/util/ConstantApp/Url';
import { showMessage } from '@/util/Util';

import {
    DataCodeErrorDetailDevice,
    DataCodeErrorUpdateDetailDevice,
    DataErrorDetailDevice,
    DataErrorUpdateDetailDevice,
} from '../../../assets/data/DataErrorCallApi';
import { useUpdateDeviceName } from '../../../fetcher/Device/DeviceService';
import { DetailConstructionModel } from '../../../model/Construction/ConstructionModel';
import { setMessageRedirectUri } from '../../../util/Util';

const StyleBackground = styled.div`
    background-color: #ffffff;
    padding: 30px 0 300px 0;
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Title = styled.h2`
    margin: 20px 0 10px;
    ${font(22, '#000000', 600)}
`;

const dataTextConstant = {
    title: 'THÔNG TIN THIẾT BỊ THUỘC CÔNG TRÌNH',
};

function DetailDeviceOfConstruction() {
    const { constructionId, deviceId } = useParams();
    const [resDetailDevice, makeReqDetailDevice] = useGetDetailDeviceOfConstruction(+constructionId, +deviceId);
    const [constructionDetail, setConstructionDetail] = useState<DetailConstructionModel>();
    const navigate = useNavigate();
    const [reqUpdateDeviceName, makeResUpdateDeviceName] = useUpdateDeviceName(+deviceId);
    const [deviceName, setDeviceName] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(false);
        if (reqUpdateDeviceName.data) {
            navigate(`${CONSTRUCTION_URL}/${constructionId}${DEVICE_URL}`, {
                state: setMessageRedirectUri('success', 'Đổi tên thiết bị thành công!'),
            });
        } else if (reqUpdateDeviceName.error) {
            const codeError = reqUpdateDeviceName.error?.code;
            messageApi.open(showMessage('error', DataErrorUpdateDetailDevice[codeError]));
        }
    }, [reqUpdateDeviceName]);
    useEffect(() => {
        makeReqDetailDevice(DETAIL_DEVICE_LOADER, DataCodeErrorDetailDevice);
    }, []);
    useEffect(() => {
        if (resDetailDevice.data) {
            setDeviceName(resDetailDevice.data?.name);
            setConstructionDetail(resDetailDevice.data?.construction);
        } else if (resDetailDevice.error) {
            const codeError = resDetailDevice.error?.code;
            navigate(`${CONSTRUCTION_URL}/${constructionId}${DEVICE_URL}`, {
                state: setMessageRedirectUri('error', `${DataErrorDetailDevice[codeError]}`),
            });
        }
    }, [resDetailDevice]);
    const onChangeInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeviceName(event.target.value);
    };
    const handleOnClickSave = () => {
        if (deviceName) {
            setIsLoading(true);
            makeResUpdateDeviceName(undefined, DataCodeErrorUpdateDetailDevice, { name: deviceName });
        }
    };
    return (
        <StyleBackground>
            {contextHolder}
            <DetailDeviceLoader loadingarea={DETAIL_DEVICE_LOADER}>
                <Title>{dataTextConstant.title}</Title>
                <div
                    style={{
                        marginBottom: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <p style={{ fontSize: 20, fontWeight: 700 }}>{constructionDetail?.name}</p>
                    <p style={{ fontSize: 20, fontWeight: 400 }}>{constructionDetail?.fullAddress}</p>
                </div>
                <FormDeviceDetail detailDevice={resDetailDevice?.data} onChangeInputName={onChangeInputName}>
                    <BtnFormDetailEdit
                        htmlTypeBtnSave="button"
                        handledOnClickGoBack={() => {
                            navigate(-1);
                        }}
                        isLoadingSave={isLoading}
                        handleOnClickSave={handleOnClickSave}
                    />
                </FormDeviceDetail>
            </DetailDeviceLoader>
        </StyleBackground>
    );
}

export default DetailDeviceOfConstruction;
