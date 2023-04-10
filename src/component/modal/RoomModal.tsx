import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, message, Modal, Radio, RadioChangeEvent } from 'antd';
import styled from 'styled-components';

import { DataCodeErrorStorageRoom, DataErrorStorageRoom } from '@/assets/data/DataErrorCallApi';
import { ModalDeleteRoom } from '@/component/modal/ModalDeleteRoom';
import { RootState } from '@/context/store';
import { cancelModal, toggleDeleteModal } from '@/context/store/ModalSlice';
import { useStoreDetailRoom } from '@/fetcher/Construction/RoomService';
import { DetailRoomModel } from '@/model/Construction/RoomModel';
import { StyleItemForm } from '@/styles/form';
import { flex } from '@/styles/Style-mixins';
import { TYPE_CHANNEL_IO, TYPE_CHANNEL_RS } from '@/util/ConstantApp/TypeConstant';
import { DETAIL_ROOM_LOADER } from '@/util/ConstantApp/TypeLoader';
import { showMessage } from '@/util/Util';

const textConstant = {
    labelName: 'Tên phòng',
    labelZoneId: 'Zone',
    labelId: 'ID',
    labelChannel: 'Kênh',
    placeholderName: 'Nhập tên phòng',
    placeholderZone: 'Nhập zone',
    placeholderID: 'Nhập ID phòng',
    titleCreatePopup: 'Thêm mới phòng',
    titleDetailPopup: 'Thông tin phòng',
};
const validateMessages = {
    required: 'Vui lòng nhập ${label}',
    pattern: { mismatch: 'Vui lòng nhập một số nguyên!' },
};
export const RoomModal = ({
    visible,
    nameCons,
    addressCons,
    idConstruction,
    makeReload,
}: {
    visible: boolean;
    nameCons: string;
    addressCons: string;
    idConstruction: number;
    makeReload: (
        loadingArea?: string | undefined,
        expectedErrorStatus?: number[],
        requestBody?: Record<string, any>,
    ) => Promise<void>;
}) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { detailRoom, isAddModal } = useSelector((state: RootState) => state.modalState.modalRoom);
    const { isDelete } = useSelector((state: RootState) => state.modalState);
    const [typeRadio, setTypeRadio] = useState(detailRoom.typeChannel);
    const [updateRoomRes, makeUpdateRoomReq] = useStoreDetailRoom();
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        form.setFieldsValue({
            ...detailRoom,
        });
    }, [detailRoom]);

    useEffect(() => {
        setTypeRadio(detailRoom.typeChannel);
    }, [visible]);

    useEffect(() => {
        setIsLoading(false);
        if (updateRoomRes.data) {
            messageApi.open(
                showMessage('success', isAddModal ? 'Lưu thành công' : 'Thay đổi thông tin phòng thành công!'),
            );
            form.resetFields();
            setTimeout(() => {
                dispatch(cancelModal());
            }, 100);
            typeof makeReload === 'function' && makeReload();
        } else if (updateRoomRes.error) {
            const codeError: any = updateRoomRes.error.code;
            messageApi.open(showMessage('error', DataErrorStorageRoom[codeError]));
        }
    }, [updateRoomRes]);
    const onChange = (e: RadioChangeEvent) => {
        setTypeRadio(e.target.value);
    };
    const onFinish = (values: DetailRoomModel) => {
        const body = {
            ...values,
            constructionId: idConstruction,
        };
        setIsLoading(true);
        makeUpdateRoomReq(DETAIL_ROOM_LOADER, DataCodeErrorStorageRoom, body);
    };
    const onCancel = () => {
        dispatch(cancelModal());
        form.resetFields();
    };
    const onDeleteHandle = () => {
        dispatch(toggleDeleteModal());
    };
    return (
        <>
            <Modal open={visible} onCancel={onCancel} closable={false} footer={null} width={745}>
                {contextHolder}
                <WrapperContainer>
                    <HeaderModal>
                        <TitleModalForm>
                            {' '}
                            {isAddModal ? textConstant.titleCreatePopup : textConstant.titleDetailPopup}{' '}
                        </TitleModalForm>
                        <NameConstructionText>{nameCons}</NameConstructionText>
                        <AddressText>{addressCons}</AddressText>
                    </HeaderModal>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        labelWrap={true}
                        labelAlign="left"
                        labelCol={{ span: 5 }}
                        size={'large'}
                        initialValues={detailRoom}
                        validateMessages={validateMessages}
                    >
                        <StyleItemForm hidden={true} name="id">
                            <Input />
                        </StyleItemForm>
                        <StyleItemForm
                            name="name"
                            label={textConstant.labelName}
                            rules={[{ required: true }]}
                            isrequired="true"
                        >
                            <Input placeholder={textConstant.placeholderName} />
                        </StyleItemForm>
                        <StyleItemForm name="typeChannel" label={textConstant.labelChannel} isrequired="true">
                            <StyledRadioGroup name="typeChannel" onChange={onChange}>
                                <Radio name="rsChannel" value={TYPE_CHANNEL_RS}>
                                    RS chanel
                                </Radio>
                                <Radio name="ioChannel" value={TYPE_CHANNEL_IO}>
                                    IO chanel
                                </Radio>
                            </StyledRadioGroup>
                        </StyleItemForm>
                        {typeRadio === TYPE_CHANNEL_RS ? (
                            <>
                                <StyleItemForm
                                    name="zoneId"
                                    label={textConstant.labelZoneId}
                                    rules={[{ required: true }, { pattern: /^[0-9]*$/ }]}
                                    isrequired="true"
                                >
                                    <Input placeholder={textConstant.placeholderZone} />
                                </StyleItemForm>
                                <StyleItemForm
                                    name="rsDeviceId"
                                    label={textConstant.labelId}
                                    rules={[{ required: true }, { pattern: /^[0-9]*$/ }]}
                                    isrequired="true"
                                >
                                    <Input placeholder={textConstant.placeholderID} />
                                </StyleItemForm>
                            </>
                        ) : null}
                        {typeRadio === TYPE_CHANNEL_IO ? (
                            <StyleItemForm
                                name="ioChannel"
                                label={textConstant.labelId}
                                rules={[{ required: true }, { pattern: /^[0-9]*$/ }]}
                                isrequired="true"
                            >
                                <Input placeholder={textConstant.placeholderID} />
                            </StyleItemForm>
                        ) : null}
                        <StyleFormButton>
                            {isAddModal ? (
                                <StyleButton style={{ backgroundColor: '#EC1B25' }} onClick={onCancel}>
                                    Hủy
                                </StyleButton>
                            ) : (
                                <>
                                    <StyleButton style={{ backgroundColor: '#FF8A47' }} onClick={onCancel}>
                                        Quay lại
                                    </StyleButton>
                                    <StyleButton style={{ backgroundColor: '#EC1B25' }} onClick={onDeleteHandle}>
                                        Xóa
                                    </StyleButton>
                                </>
                            )}

                            <StyleButton
                                htmlType="submit"
                                style={{
                                    backgroundColor: '#1F8E4F',
                                }}
                                loading={isLoading}
                            >
                                Lưu
                            </StyleButton>
                        </StyleFormButton>
                    </Form>
                </WrapperContainer>
            </Modal>
            <ModalDeleteRoom
                isDelete={isDelete}
                detailRoom={detailRoom}
                idCons={idConstruction}
                makeReload={makeReload}
            />
        </>
    );
};

const HeaderModal = styled('div')`
    width: 100%;
    text-align: center;
`;

const TitleModalForm = styled('p')`
    color: #0188bb;
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 10px;
    text-transform: uppercase;
`;

const NameConstructionText = styled('p')`
    font-weight: 700;
    font-size: 14px;
`;
const AddressText = styled('p')`
    font-weight: 400;
    font-size: 15px;
    margin-bottom: 20px;
`;

const StyleFormButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 60px;
`;

const StyleButton = styled(Button)`
    width: 110px;
    height: 40px;
    font-weight: 700;
    line-height: 20px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    color: white !important;

    &:hover {
        color: white !important;
        opacity: 0.7;
    }
`;

const StyledRadioGroup = styled(Radio.Group)`
    width: 70%;
    ${flex('space-between', 'center')}
`;

const WrapperContainer = styled('div')`
    padding: 0 40px 20px 40px;
`;
