import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, DatePicker, Form, Input, message, Modal, Row, Select } from 'antd';
import moment from 'moment';
import styled from 'styled-components';

import { dataSelectTypeRank, dataSelectTypeTeam } from '@/assets/data/DataConstant';
import {
    DataCodeErrorCreateAddSoldier,
    DataErrorCreateSoldier,
    DataErrorDeleteSoldier,
} from '@/assets/data/DataErrorCallApi';
import { BtnFormDetail } from '@/component/button/btnFormDetailAndCreate';
import TitleTableSoldier from '@/component/header/TitleSoldier';
import { checkFormatPhoneNumber, checkLengthEqualTen, checkLengthIdCard } from '@/component/validate';
import { DetailSoldierLoader } from '@/elements/skeleton/ExampleLoader';
import {
    useAddSoldier,
    useDeleteSoldier,
    useGetDetailSoldier,
    useGetFireDepartmentById,
} from '@/fetcher/FireDepartment/FireDepartmentService';
import { CreateSoldierModel } from '@/model/FireDepartment/SoldierModel';
import { placeholderFiled, StyleForm, StyleItemForm } from '@/styles/form';
import { font } from '@/styles/Style-mixins';
import { DETAIL_CUSTOMER_LOADER } from '@/util/ConstantApp/TypeLoader';
import { FIRE_DEPARTMENT_URL, SOLDIERS_URL } from '@/util/ConstantApp/Url';
import { showMessage } from '@/util/Util';

import { setMessageRedirectUri } from '../../../../util/Util';

const dataTextConstant = {
    labelFullName: 'họ và tên',
    labelIdCard: 'CMND/CCCD',
    labelPhoneNumber: 'số điện thoại',
    labelUnder: 'Trực thuộc',
    labelPosition: 'chức vụ',
    labelEmail: 'email',
    labelRank: 'Cấp bậc',
    labelAddress: 'địa chỉ',
    labelDateOfBirth: 'ngày sinh',
    labelBeginningTime: 'thời gian bắt đầu',
    labelFunction: 'Chức năng công việc',
    labelCode: 'Mã số cán bộ ngành',
    messageCheckLengthIdCard: 'Số CMND/CCCD bao gồm 9 hoặc 12 ký tự số',
    messageCheckLengthPhoneNumber: 'Số điện thoại bao gồm 10 ký tự số',
    messageCheckLengthTaxCode: 'Mã số thuế bao gồm 10 ký tự số',
    messageCheckUsernameExists: 'Số điện thoại được sử dụng',
    messageCheckFormatPhoneNumber: 'Số điện thoại sai định dạng',
};
const validateMessages = {
    required: 'Vui lòng nhập ${label}',
    requiredSelect: 'Vui lòng chọn ${label}',
    types: {
        email: 'Email không đúng định dạng',
    },
};

const valueTeams = Object.values(dataSelectTypeTeam);
const keyTeams = Object.keys(dataSelectTypeTeam);

const teamOptions = valueTeams.map((v, i) => ({ value: keyTeams[i], label: v }));

const valueRanks = Object.values(dataSelectTypeRank);
const keyRank = Object.keys(dataSelectTypeRank);

const rankOptions = valueRanks.map((v, i) => ({ value: keyRank[i], label: v }));

const StyleModal = styled(Modal)`
    .ant-modal-title {
        ${font(14, '#fff', 600)}
    }
`;

const StyleBackground = styled.div`
    padding-bottom: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
`;

const dataTextSoldier = {
    title: 'Thông báo',
    txtBtnCancel: 'Huỷ',
    txtBtnOk: 'Xác nhận',
};

const DetailSoldier = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const { idDepartment, idSoldier } = useParams();
    const [form] = Form.useForm();
    const [responseSoldier, createSoldierRequest] = useAddSoldier();
    const [responseDetailSoldier, makeRequestDetailCustomerSoldier] = useGetDetailSoldier(+idDepartment, +idSoldier);
    const [isEditButton, setIsEditButton] = useState(false);
    const detailSoldier = responseDetailSoldier?.data;
    const [loadingBtnDelete, setLoadingBtnDelete] = useState(false);
    const [resResultDeleteSoldier, makeReqDeleteSoldier] = useDeleteSoldier(+idDepartment, +idSoldier);
    const [visible, setVisible] = useState(false);

    const handleOnClickOkModal = () => {
        setLoadingBtnDelete(true);
        makeReqDeleteSoldier(undefined, [404]);
    };

    useEffect(() => {
        if (resResultDeleteSoldier.data) {
            navigate(`${FIRE_DEPARTMENT_URL}/${+idDepartment}${SOLDIERS_URL}`, {
                state: setMessageRedirectUri('success', 'Xóa chiến sĩ thành công!'),
            });
        } else if (resResultDeleteSoldier.error) {
            const codeError: any = resResultDeleteSoldier.error.code;
            messageApi.open(showMessage('error', DataErrorDeleteSoldier[codeError]));
        }
        setLoadingBtnDelete(false);
    }, [resResultDeleteSoldier]);

    useEffect(() => {
        makeRequestDetailCustomerSoldier(DETAIL_CUSTOMER_LOADER, [404, 464]);
    }, []);
    useEffect(() => {
        form.setFieldsValue({
            fullName: detailSoldier?.fullName,
            idCard: detailSoldier?.idCard,
            phoneNumber: detailSoldier?.phoneNumber,
            team: detailSoldier?.team,
            position: detailSoldier?.position,
            email: detailSoldier?.email,
            rank: detailSoldier?.rank,
            dateOfBirth: detailSoldier?.dateOfBirth == null ? undefined : moment.unix(+detailSoldier?.dateOfBirth),
            beginningTime:
                detailSoldier?.beginningTime == null ? undefined : moment.unix(+detailSoldier?.beginningTime),
            function: detailSoldier?.function,
            code: detailSoldier?.code,
        });
        if (responseDetailSoldier.error) {
            if (responseDetailSoldier.error.code == 464)
                navigate(`${FIRE_DEPARTMENT_URL}/${+idDepartment}${SOLDIERS_URL}`, {
                    state: setMessageRedirectUri('error', `Chiến sĩ không tồn tại hoặc không thuộc cơ sở PCCC.`),
                });
        }
    }, [detailSoldier, responseDetailSoldier]);
    useEffect(() => {
        if (responseSoldier.data) {
            navigate(`${FIRE_DEPARTMENT_URL}/${idDepartment}${SOLDIERS_URL}`, {
                state: setMessageRedirectUri('success', 'Câp nhật thành công!'),
            });
        } else if (responseSoldier.error) {
            const codeError = responseSoldier.error.code;
            messageApi.open(showMessage('error', DataErrorCreateSoldier[codeError]));
        }
    }, [responseSoldier]);
    const handelOnFinish = (value: any) => {
        const param: CreateSoldierModel = {
            fireDepartmentId: idDepartment,
            id: idSoldier,
            ...value,
            dateOfBirth: value.dateOfBirth?.unix(),
            beginningTime: value.beginningTime?.unix(),
        };
        createSoldierRequest(undefined, DataCodeErrorCreateAddSoldier, param);
    };
    const markFormDirty = () => {
        if (!isEditButton) setIsEditButton(true);
    };
    return (
        <>
            <StyleBackground>
                <DetailSoldierLoader loadingarea={DETAIL_CUSTOMER_LOADER}>
                    {contextHolder}
                    <TitleTableSoldier makeRequest={useGetFireDepartmentById} title={'THÔNG TIN CHIẾN SĨ PCCC'} />
                    <StyleForm
                        style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}
                        form={form}
                        labelWrap={true}
                        onFinish={handelOnFinish}
                        labelCol={{ span: 8 }}
                        labelAlign="left"
                        size={'large'}
                        validateMessages={validateMessages}
                        onChange={markFormDirty}
                    >
                        <div style={{ width: '30%' }}>
                            <StyleItemForm
                                isrequired={'true'}
                                name="fullName"
                                label={dataTextConstant.labelFullName}
                                rules={[{ required: true }]}
                            >
                                <Input
                                    placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelFullName}`}
                                    type="text"
                                />
                            </StyleItemForm>
                            <StyleItemForm
                                isrequired={'true'}
                                name="idCard"
                                label={dataTextConstant.labelIdCard}
                                rules={[
                                    { required: true },
                                    {
                                        validator: checkLengthIdCard,
                                        message: `${dataTextConstant.messageCheckLengthIdCard}`,
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelIdCard}`}
                                    type="number"
                                />
                            </StyleItemForm>
                            <StyleItemForm
                                isrequired={'true'}
                                name="phoneNumber"
                                label={dataTextConstant.labelPhoneNumber}
                                rules={[
                                    { required: true },
                                    {
                                        validator: checkLengthEqualTen,
                                        message: `${dataTextConstant.messageCheckLengthPhoneNumber}`,
                                    },
                                    {
                                        validator: checkFormatPhoneNumber,
                                        message: `${dataTextConstant.messageCheckFormatPhoneNumber}`,
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={`${placeholderFiled.placeholderInput}${dataTextConstant.labelPhoneNumber}`}
                                    type="number"
                                />
                            </StyleItemForm>
                            <StyleItemForm
                                isrequired={'true'}
                                name="team"
                                label={dataTextConstant.labelUnder}
                                rules={[{ required: true, message: 'Vui lòng chọn trực thuộc' }]}
                            >
                                <Select
                                    onChange={markFormDirty}
                                    placeholder="Chọn trực thuộc"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    options={teamOptions}
                                />
                            </StyleItemForm>
                            <StyleItemForm name="position" label={dataTextConstant.labelPosition}>
                                <Input placeholder="Nhập chức vụ" />
                            </StyleItemForm>
                        </div>
                        <div style={{ width: '30%' }}>
                            <StyleItemForm name="email" label={dataTextConstant.labelEmail} rules={[{ type: 'email' }]}>
                                <Input placeholder={`${placeholderFiled.placeholderInput}email`} />
                            </StyleItemForm>
                            <StyleItemForm name="rank" label={dataTextConstant.labelRank}>
                                <Select
                                    allowClear
                                    onChange={markFormDirty}
                                    placeholder="Chọn cấp bậc"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(`${input.toLowerCase()}`)
                                    }
                                    options={rankOptions}
                                />
                            </StyleItemForm>
                            <StyleItemForm name="dateOfBirth" label={dataTextConstant.labelDateOfBirth}>
                                <DatePicker
                                    onChange={markFormDirty}
                                    format={'DD/MM/YYYY'}
                                    style={{ width: '100%' }}
                                    placeholder="dd/mm/yyyy"
                                />
                            </StyleItemForm>
                            <StyleItemForm name="beginningTime" label={dataTextConstant.labelBeginningTime}>
                                <DatePicker
                                    onChange={markFormDirty}
                                    format={'DD/MM/YYYY'}
                                    style={{ width: '100%' }}
                                    placeholder="dd/mm/yyyy"
                                />
                            </StyleItemForm>
                            <StyleItemForm name="function" label={dataTextConstant.labelFunction}>
                                <Input placeholder="Nhập chức năng công việc" />
                            </StyleItemForm>
                            <StyleItemForm name="code" label={dataTextConstant.labelCode}>
                                <Input placeholder="Nhập mã số" />
                            </StyleItemForm>
                        </div>
                        <Row style={{ width: '100%', justifyContent: 'center' }}>
                            <Col md={14} lg={12} xl={10} xxl={8}>
                                <BtnFormDetail
                                    handledOnClickGoBack={() => {
                                        navigate(-1);
                                    }}
                                    handledOnClickDelete={() => {
                                        setVisible(true);
                                    }}
                                />
                            </Col>
                        </Row>
                    </StyleForm>
                </DetailSoldierLoader>
            </StyleBackground>
            <StyleModal
                visible={visible}
                title={dataTextSoldier.title}
                onOk={handleOnClickOkModal}
                onCancel={() => {
                    setVisible(false);
                }}
                confirmLoading={loadingBtnDelete}
                cancelText={dataTextSoldier.txtBtnCancel}
                okText={dataTextSoldier.txtBtnOk}
            >
                <p>Bạn có chắc chắn muốn xóa chiến sĩ {detailSoldier?.fullName} khỏi đơn vị?</p>
            </StyleModal>
        </>
    );
};
export default DetailSoldier;
