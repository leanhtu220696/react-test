import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import styled from 'styled-components';

import { DataErrorUpdateStatusHappening } from '@/assets/data/DataErrorCallApi';
import { BtnFormDetailEdit } from '@/component/button/btnFormDetailAndCreate';
import FireLogFormDetail from '@/component/form/FireLog/FireLogFormDetail';
import { DetailFireLogLoader } from '@/elements/skeleton/ExampleLoader';
import { useGetDetailFireLog, useUpdateStatusFireHappening } from '@/fetcher/FireLog/FireLogService';
import { FireLogDetailModel } from '@/model/FireLog/FireLogDetailModel';
import { font } from '@/styles/Style-mixins';
import { DETAIL_FIRE_LOG_LOADER } from '@/util/ConstantApp/TypeLoader';
import { FIRE_LOG_URL } from '@/util/ConstantApp/Url';

import { DataCodeErrorUpdateStatusHappening } from '../../../assets/data/DataErrorCallApi';
import { setMessageRedirectUri, showMessage } from '../../../util/Util';

const dataTextConstant = {
    title: 'THÔNG TIN ĐIỂM CHÁY',
};

const FireLogDetail = () => {
    const { idFireLog } = useParams();
    const [responseDetailFireLog, makeReqDetailFireLog] = useGetDetailFireLog(+idFireLog);
    const [statusFireHappening, setStatusFireHappening] = useState('');
    const [resUpdateStatusFireHappening, makeReqUpdateStatusFireHapping] = useUpdateStatusFireHappening(
        +idFireLog,
        statusFireHappening,
    );
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        makeReqDetailFireLog(DETAIL_FIRE_LOG_LOADER, [404]);
    }, []);
    useEffect(() => {
        if (responseDetailFireLog.error) {
            if (responseDetailFireLog.error.code === 404) {
                navigate(`${FIRE_LOG_URL}`, { state: setMessageRedirectUri('error', 'Không tồn tại đám cháy') });
            }
        }
    }, [responseDetailFireLog]);
    useEffect(() => {
        if (statusFireHappening) {
            makeReqUpdateStatusFireHapping(undefined, DataCodeErrorUpdateStatusHappening);
        }
    }, [statusFireHappening]);
    useEffect(() => {
        if (resUpdateStatusFireHappening.data) {
            navigate(`${FIRE_LOG_URL}`, {
                state: setMessageRedirectUri('success', 'Thay đổi trạng thái điểm cháy thành công!'),
            });
        } else if (resUpdateStatusFireHappening.error) {
            const codeError = resUpdateStatusFireHappening.error.code;
            messageApi.open(showMessage('error', DataErrorUpdateStatusHappening[codeError]));
        }
    }, [resUpdateStatusFireHappening]);
    const handleOnClickSubmit = (value: FireLogDetailModel) => {
        setStatusFireHappening(value.status);
    };
    return (
        <>
            <StyleBackground>
                {contextHolder}
                <div>
                    <DetailFireLogLoader loadingarea={DETAIL_FIRE_LOG_LOADER}>
                        <StyleInformation>
                            <Title>{dataTextConstant.title}</Title>
                        </StyleInformation>
                        <FireLogFormDetail
                            detailFireLog={responseDetailFireLog.data}
                            handleOnClickSubmit={handleOnClickSubmit}
                        >
                            <BtnFormDetailEdit
                                htmlTypeBtnSave="submit"
                                handledOnClickGoBack={() => {
                                    navigate(-1);
                                }}
                            />
                        </FireLogFormDetail>
                    </DetailFireLogLoader>
                </div>
            </StyleBackground>
        </>
    );
};

export default FireLogDetail;

const StyleBackground = styled.div`
    width: 460px;
    margin: 0 20px;
    padding: 20px 0;
    background-color: #ffffff;
    box-shadow: 5px 0 5px #ccc;

    @media (max-width: 576px) {
        width: 100%;
        margin: 0;
        padding: 0;
    }

    & > div {
        min-height: 100vh;
        padding: 20px 20px;
        overflow: hidden;

        ::-webkit-scrollbar {
            width: 0;
        }

        @media (max-width: 576px) {
            height: 50vh;
        }
    }

    .ant-steps-item-title {
        width: 100%;
        font-size: 18px;
        font-weight: 700;
    }

    @media (max-width: 576px) {
        .ant-steps {
            padding: 0 30px;
        }
    }
`;

const Title = styled.h2`
    width: 100%;
    display: flex !important;
    margin-bottom: 25px;
    justify-content: center;
    text-transform: uppercase;
    ${font(20, '#000000', 600)}
`;

const StyleInformation = styled.div`
    margin-bottom: 20px;
`;
