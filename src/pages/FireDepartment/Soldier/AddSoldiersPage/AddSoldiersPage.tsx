import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, DatePicker, Form, Input, message, Select } from 'antd';
import styled from 'styled-components';

import { dataSelectTypeRank, dataSelectTypeTeam } from '@/assets/data/DataConstant';
import { DataCodeErrorCreateAddSoldier, DataErrorCreateSoldier } from '@/assets/data/DataErrorCallApi';
import TitleTableSoldier from '@/component/header/TitleSoldier';
import { checkFormatPhoneNumber, checkLengthEqualTen, checkLengthIdCard } from '@/component/validate';
import { useAddSoldier, useGetFireDepartmentById } from '@/fetcher/FireDepartment/FireDepartmentService';
import { CreateSoldierModel } from '@/model/FireDepartment/SoldierModel';
import { placeholderFiled, StyleForm, StyleItemForm } from '@/styles/form';
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

const StyleFormButton = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-left: -150%;
    margin-top: 50px;
`;
const StyleButton = styled(Button)`
    width: 130px;
    height: 40px;
    font-weight: 700;
    line-height: 20px;
    border: none;
    border-radius: 4px;
    font-size: 18px;
    color: white !important;
    &:hover {
        color: white !important;
        opacity: 0.7;
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
export const FromAddSoldier = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const { idDepartment } = useParams();
    const [form] = Form.useForm();
    const [responseSoldier, createSoldierRequest] = useAddSoldier();
    useEffect(() => {
        if (responseSoldier.data) {
            navigate(`${FIRE_DEPARTMENT_URL}/${idDepartment}${SOLDIERS_URL}`, {
                state: setMessageRedirectUri('success', 'Thêm chiến sĩ thành công'),
            });
        } else if (responseSoldier.error) {
            const codeError = responseSoldier.error.code;
            messageApi.open(showMessage('error', DataErrorCreateSoldier[codeError]));
        }
    }, [responseSoldier]);
    const handelOnFinish = (value: any) => {
        const param: CreateSoldierModel = {
            fireDepartmentId: idDepartment,
            ...value,
            dateOfBirth: value.dateOfBirth?.unix(),
            beginningTime: value.beginningTime?.unix(),
        };
        createSoldierRequest(undefined, DataCodeErrorCreateAddSoldier, param);
    };
    return (
        <StyleBackground>
            <TitleTableSoldier makeRequest={useGetFireDepartmentById} title={'THÊM MỚI CHIẾN SĨ PCCC'} />
            <div>{contextHolder}</div>
            <StyleForm
                style={{ display: 'flex', justifyContent: 'space-evenly' }}
                form={form}
                labelWrap={true}
                onFinish={handelOnFinish}
                labelCol={{ span: 8 }}
                labelAlign="left"
                size={'large'}
                validateMessages={validateMessages}
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
                            { validator: checkLengthIdCard, message: `${dataTextConstant.messageCheckLengthIdCard}` },
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
                            placeholder="Chọn cấp bậc"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(`${input.toLowerCase()}`)
                            }
                            options={rankOptions}
                        />
                    </StyleItemForm>
                    <StyleItemForm name="dateOfBirth" label={dataTextConstant.labelDateOfBirth}>
                        <DatePicker format={'DD/MM/YYYY'} style={{ width: '100%' }} placeholder="dd/mm/yyyy" />
                    </StyleItemForm>
                    <StyleItemForm name="beginningTime" label={dataTextConstant.labelBeginningTime}>
                        <DatePicker format={'DD/MM/YYYY'} style={{ width: '100%' }} placeholder="dd/mm/yyyy" />
                    </StyleItemForm>
                    <StyleItemForm name="function" label={dataTextConstant.labelFunction}>
                        <Input placeholder="Nhập chức năng công việc" />
                    </StyleItemForm>
                    <StyleItemForm name="code" label={dataTextConstant.labelCode}>
                        <Input placeholder="Nhập mã số" />
                    </StyleItemForm>
                    <StyleFormButton>
                        <StyleButton style={{ backgroundColor: '#c71b1b' }} onClick={() => navigate(-1)}>
                            Hủy
                        </StyleButton>
                        <StyleButton style={{ backgroundColor: '#1f8e4f' }} htmlType="submit">
                            Lưu
                        </StyleButton>
                    </StyleFormButton>
                </div>
            </StyleForm>
        </StyleBackground>
    );
};
export default FromAddSoldier;
